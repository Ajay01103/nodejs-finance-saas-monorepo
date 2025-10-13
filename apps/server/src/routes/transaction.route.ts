import { Router } from "express"
import {
  createTransactionController,
  getAllTransactionController,
} from "@/controllers/transaction.controller"

const transactionRoutes: Router = Router()

transactionRoutes.get("/all", getAllTransactionController)

transactionRoutes.post("/create", createTransactionController)

export default transactionRoutes
