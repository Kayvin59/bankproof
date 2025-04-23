import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import Header from "../components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BankProof",
  description: "Secure financial data verification with zero-knowledge proofs",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-background">{children}</main>
        </div>
      </body>
    </html>
  )
}
