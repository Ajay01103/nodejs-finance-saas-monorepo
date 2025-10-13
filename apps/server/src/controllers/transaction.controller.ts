import type { Request, Response } from "express"
import { HTTPSTATUS } from "@/config/http.config"
import { asyncHandler } from "@/middlewares/async-handler.middleware"
import type { TransactionTypeEnum } from "@/models/transaction.model"
import {
  createTransactionService,
  getAllTransactionService,
} from "@/services/transaction.service"
import { createTransactionSchema } from "@/validators/transaction.validator"

export const createTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createTransactionSchema.parse(req.body)
    const userId = req.user?._id

    const transaction = await createTransactionService(body, userId)

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Transacton created successfully",
      transaction,
    })
  }
)

export const getAllTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id

    const filters = {
      keyword: req.query.keyword as string | undefined,
      type: req.query.type as keyof typeof TransactionTypeEnum | undefined,
      recurringStatus: req.query.recurringStatus as
        | "RECURRING"
        | "NON_RECURRING"
        | undefined,
    }

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    }

    const result = await getAllTransactionService(userId, filters, pagination)

    return res.status(HTTPSTATUS.OK).json({
      message: "Transaction fetched successfully",
      ...result,
    })
  }
)
