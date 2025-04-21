import type { Metadata } from "next"
import VerificationForm from "../components/verification-form"

export const metadata: Metadata = {
  title: "BankProof | Secure Financial Verification",
  description: "Securely verify bank account balances with zero-knowledge proofs",
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">BankProof</h1>
          <p className="text-muted-foreground">
            Securely verify financial data without revealing sensitive information
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">Balance Verification</h2>
              <p className="text-sm text-muted-foreground">
                Verify your bank balance meets a threshold without revealing the exact amount
              </p>
            </div>
            <VerificationForm />
          </div>
        </div>
      </div>
    </div>
  )
}
