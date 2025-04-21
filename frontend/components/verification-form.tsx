"use client"

import { CheckCircle, Loader2, Shield, XCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export default function VerificationForm() {
  const [threshold, setThreshold] = useState<number>(100)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const verifyFunds = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock PSD2 API response
      const balance = 500

      // Mock circuit execution and proof generation
      // In a real implementation, you would use:
      // const circuit = require('../public/circuit.json');
      // const backend = new UltraHonkBackend(circuit.bytecode);
      // const noir = new Noir(circuit);
      // const inputs = { balance, threshold };
      // const { witness } = await noir.execute(inputs);
      // const proof = await backend.generateProof(witness);
      // const isValid = await backend.verifyProof(proof);

      // Simulate verification result based on threshold
      const isValid = threshold <= balance

      setIsSuccess(isValid)
      setResult(
        isValid
          ? "Funds verified! Balance meets the required threshold."
          : "Verification failed. Balance does not meet the required threshold.",
      )
    } catch (error) {
      console.error("Verification error:", error)
      setIsSuccess(false)
      setResult("Error: Unable to verify funds. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="threshold">Minimum Balance Threshold</Label>
          <div className="flex gap-2">
            <Input
              id="threshold"
              type="number"
              value={threshold}
              onChange={(e: { target: { value: any } }) => setThreshold(Number(e.target.value))}
              placeholder="Enter threshold amount"
              className="flex-1"
            />
            <Button onClick={verifyFunds} disabled={isLoading} className="gap-2 cursor-pointer">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Verify Funds
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Enter the minimum balance amount you want to verify</p>
        </div>
      </div>

      {result && (
        <Card
          className={`p-4 border ${
            isSuccess === true
              ? "bg-success/10 border-success/20"
              : isSuccess === false
                ? "bg-destructive/10 border-destructive/20"
                : ""
          }`}
        >
          <div className="flex items-start gap-3">
            {isSuccess === true && <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />}
            {isSuccess === false && <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />}
            <div>
              <p
                className={`font-medium ${
                  isSuccess === true ? "text-success" : isSuccess === false ? "text-destructive" : ""
                }`}
              >
                {isSuccess === true ? "Verification Successful" : "Verification Failed"}
              </p>
              <p className="text-sm text-muted-foreground">{result}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="rounded-md bg-muted p-4">
        <div className="flex gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Zero-Knowledge Verification</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Your actual balance is never revealed during verification. Only the result of the comparison is shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
