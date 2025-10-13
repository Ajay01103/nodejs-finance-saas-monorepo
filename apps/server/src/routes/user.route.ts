import type { Router as RouterType } from "express"
import { Router } from "express"
import { upload } from "@/config/cloudinary.config"
import {
  getCurrentUserController,
  updateUserController,
} from "@/controllers/user.controller"

const userRoutes: RouterType = Router()

userRoutes.get("/current-user", getCurrentUserController)
userRoutes.put("/update", upload.single("profilePicture"), updateUserController)

export default userRoutes
