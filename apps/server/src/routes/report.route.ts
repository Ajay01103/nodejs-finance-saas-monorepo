import { Router } from "express"
import {
  generateReportController,
  getAllReportsController,
  updateReportSettingController,
} from "@/controllers/report.controller"

const reportRoutes: Router = Router()

reportRoutes.get("/all", getAllReportsController)
reportRoutes.get("/generate", generateReportController)

reportRoutes.put("/update-setting", updateReportSettingController)

export default reportRoutes
