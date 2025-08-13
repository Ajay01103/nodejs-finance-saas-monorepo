import { Router } from "express"
import {
  loginController,
  registerController,
} from "@/controllers/auth.controller"

// Explicitly type the router as Express Router
const authRoutes: Router = Router()

authRoutes.post("/register", registerController)
authRoutes.post("/login", loginController)

export default authRoutes
