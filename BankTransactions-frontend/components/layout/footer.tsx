import Link from "next/link"

const footerLinks = {
  platform: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/transactions", label: "Transactions" },
    { href: "/blockchain", label: "Blockchain" },
    { href: "/auth", label: "Authentication" },
  ],
  resources: [
    { href: "#", label: "Documentation" },
    { href: "#", label: "API Reference" },
    { href: "#", label: "Smart Contracts" },
    { href: "#", label: "Security" },
  ],
  company: [
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">FC</span>
              </div>
              <span className="text-lg font-semibold text-foreground">FinChain</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Decentralized financial services powered by blockchain technology and modern cloud infrastructure.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
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
        {footerLinks.resources.map((link, index) => (
  <li key={`${link.href}-${index}`}>
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

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
  <li key={`${link.href}-${index}`}>
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
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FinChain. All rights reserved.</p>
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
