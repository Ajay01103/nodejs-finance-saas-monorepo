import { Router } from "express"
import { upload } from "@/config/cloudinary.config"
import {
  bulkDeleteTransactionController,
  bulkTransactionController,
  createTransactionController,
  deleteTransactionController,
  duplicateTransactionController,
  getAllTransactionController,
  getTransactionByIdController,
  scanReceiptController,
  updateTransactionController,
} from "@/controllers/transaction.controller"

const transactionRoutes: Router = Router()

transactionRoutes.get("/all", getAllTransactionController)
transactionRoutes.get("/:id", getTransactionByIdController)

transactionRoutes.post("/create", createTransactionController)
transactionRoutes.post("/bulk-transaction", bulkTransactionController)
transactionRoutes.post(
  "/scan-receipt",
  upload.single("receipt"),
  scanReceiptController
)

transactionRoutes.put("/duplicate/:id", duplicateTransactionController)
transactionRoutes.put("/update/:id", updateTransactionController)

transactionRoutes.delete("/delete/:id", deleteTransactionController)
transactionRoutes.delete("/bulk-delete", bulkDeleteTransactionController)

export default transactionRoutes
