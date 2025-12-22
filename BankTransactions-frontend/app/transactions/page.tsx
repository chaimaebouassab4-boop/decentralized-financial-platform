import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-16">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <span className="text-sm text-muted-foreground">Coming Soon</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Transactions</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            Send, receive, and track all your blockchain transactions. This feature is under development.
          </p>
          <Link href="/" className="mt-8 inline-block">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
