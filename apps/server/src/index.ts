import "dotenv/config"
import cors from "cors"
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express"
import passport from "passport"
import connctDatabase from "./config/database.config"
import { Env } from "./config/env.config"
import { HTTPSTATUS } from "./config/http.config"
import { passportAuthenticateJwt } from "./config/passport.config"
import { initializeCrons } from "./cron"
import { asyncHandler } from "./middlewares/async-handler.middleware"
import analyticsRoutes from "./routes/analytics.route"
import authRoutes from "./routes/auth.route"
import reportRoutes from "./routes/report.route"
import transactionRoutes from "./routes/transaction.route"
import userRoutes from "./routes/user.route"

const app = express()
const port = Env.PORT || 3000
const BASE_PATH = Env.BASE_PATH

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
)

app.use(express.json())

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HTTPSTATUS.OK).json({
      message: "The API is up and running!!",
    })
  })
)

app.use(`${BASE_PATH}/auth`, authRoutes)
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes)
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes)
app.use(`${BASE_PATH}/report`, passportAuthenticateJwt, reportRoutes)
app.use(`${BASE_PATH}/analytics`, passportAuthenticateJwt, analyticsRoutes)

app.listen(port, async () => {
  await connctDatabase()
  if (Env.NODE_ENV === "development") {
    await initializeCrons()
  }

  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`)
})
