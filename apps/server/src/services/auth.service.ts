import mongoose from "mongoose"
import ReportSettingModel, {
  ReportFrequencyEnum,
} from "@/models/report-setting.model"
import UserModel, { type UserDocument } from "@/models/user.model"
import { NotFoundException, UnauthorizedException } from "@/utils/app-error"
import { calulateNextReportDate } from "@/utils/helper"
import { signJwtToken } from "@/utils/jwt"
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/validators/auth.validator"

// Define explicit return types for the services
type LoginServiceReturn = {
  user: Omit<UserDocument, "password">
  accessToken: string
  expiresAt: number | undefined
  reportSetting: {
    _id: any
    frequency: keyof typeof ReportFrequencyEnum
    isEnabled: boolean
  } | null
}

type RegisterServiceReturn = {
  user: Omit<UserDocument, "password">
}

export const registerService = async (
  body: RegisterSchemaType
): Promise<RegisterServiceReturn> => {
  const { email } = body

  const session = await mongoose.startSession()

  try {
    const result = await session.withTransaction(async () => {
      const existingUser = await UserModel.findOne({ email }).session(session)
      if (existingUser) throw new UnauthorizedException("User already exists")

      const newUser = new UserModel({
        ...body,
      })

      await newUser.save({ session })

      const reportSetting = new ReportSettingModel({
        userId: newUser._id,
        frequency: ReportFrequencyEnum.MONTHLY,
        isEnabled: true,
        nextReportDate: calulateNextReportDate(),
        lastSentDate: null,
      })
      await reportSetting.save({ session })

      return { user: newUser.omitPassword() }
    })

    return result!
  } catch (error) {
    throw error
  } finally {
    await session.endSession()
  }
}

export const loginService = async (
  body: LoginSchemaType
): Promise<LoginServiceReturn> => {
  const { email, password } = body
  const user = await UserModel.findOne({ email })
  if (!user) throw new NotFoundException("Email/password not found")

  const isPasswordValid = await user.comparePassword(password)

  if (!isPasswordValid)
    throw new UnauthorizedException("Invalid email/password")

  const { token, expiresAt } = signJwtToken({ userId: user.id })

  const reportSetting = await ReportSettingModel.findOne(
    {
      userId: user.id,
    },
    { _id: 1, frequency: 1, isEnabled: 1 }
  ).lean()

  return {
    user: user.omitPassword(),
    accessToken: token,
    expiresAt,
    reportSetting,
  }
}
