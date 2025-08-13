import { useState } from "react"
import type { DateRangeType } from "@/components/date-range-select"
import PageLayout from "@/components/page-layout"
import DashboardDataChart from "./dashboard-data-chart"
import DashboardRecentTransactions from "./dashboard-recent-transactions"
import DashboardSummary from "./dashboard-summary"
//import ExpenseBreakDown from "./expense-breakdown";
import ExpensePieChart from "./expense-pie-chart"

const Dashboard = () => {
  const [dateRange, _setDateRange] = useState<DateRangeType>(null)

  return (
    <div className="flex w-full flex-col">
      {/* Dashboard Summary Overview */}
      <PageLayout
        className="space-y-6"
        renderPageHeader={
          <DashboardSummary
            dateRange={dateRange}
            setDateRange={_setDateRange}
          />
        }>
        {/* Dashboard Main Section */}
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-6">
          <div className="lg:col-span-4">
            <DashboardDataChart dateRange={dateRange} />
          </div>
          <div className="lg:col-span-2">
            <ExpensePieChart dateRange={dateRange} />
          </div>
        </div>
        {/* Dashboard Recent Transactions */}
        <div className="mt-0 w-full">
          <DashboardRecentTransactions />
        </div>
      </PageLayout>
    </div>
  )
}

export default Dashboard
