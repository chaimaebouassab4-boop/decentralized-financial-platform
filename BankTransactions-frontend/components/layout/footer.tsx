import Link from "next/link"
import { Logo } from "@/components/layout/logo"

const footerLinks = {
  platform: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/declarations", label: "Declarations" },
    { href: "/transactions", label: "Transactions" },
    { href: "/blockchain", label: "Blockchain" },
  ],
  modules: [
    { href: "/documents", label: "Document Verification" },
    { href: "/risk-analysis", label: "Risk Analysis" },
    { href: "/blockchain", label: "Smart Contracts" },
    { href: "/auth", label: "Access & Login" },
  ],
  resources: [
    { href: "#", label: "User Guide" },
    { href: "#", label: "API Reference" },
    { href: "#", label: "WCO Data Model" },
    { href: "#", label: "Contact Support" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <Logo size="sm" showText={true} />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Digital customs declarations, secure trade transactions, blockchain traceability, and
              smart contract verification unified in one platform.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Modules Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Modules</h3>
            <ul className="space-y-3">
              {footerLinks.modules.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DouaneChain — Digital Customs Blockchain Platform. Final Year Project (PFE).
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
