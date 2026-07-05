import { redirect } from "next/navigation"

// Transactions now live at the top-level /transactions route (customs payments).
// This redirect keeps the legacy dashboard URL working.
export default function DashboardTransactionsPage() {
  redirect("/transactions")
}
