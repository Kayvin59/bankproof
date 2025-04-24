"use client"

import { CheckCircle, Loader2, Shield, XCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

import { UltraHonkBackend } from '@aztec/bb.js'
import { Noir } from '@noir-lang/noir_js'

export default function VerificationForm() {
  const [threshold, setThreshold] = useState<number>(100)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const verifyFunds = async () => {
    setIsLoading(true)
    setResult(null)

    try {

      // Mock PSD2 API response
      const balance = 500

      // Load the compiled Noir circuit
      const circuit = require('../public/bankproof.json');
      const backend = new UltraHonkBackend(circuit.bytecode);
      const noir = new Noir(circuit);

      // Prepare inputs for the circuit
      const inputs = { balance, threshold };

      // Execute the circuit to generate a witness
      const { witness, returnValue } = await noir.execute(inputs);
      console.log("witness:", witness)
      console.log("Circuit output: ", returnValue);

      // Generate the zero-knowledge proof
      const proof = await backend.generateProof(witness);
      console.log("proof:", proof)

      // Verify the proof
      const isValid = await backend.verifyProof(proof);
      console.log("Proof verification:", isValid)
      
      // Determine the result based on both isValid and returnValue
      if (isValid && returnValue) {
        setIsSuccess(true);
        setResult("Funds verified! Balance meets the required threshold.");
      } else if (isValid && !returnValue) {
        setIsSuccess(false);
        setResult("Verification failed. Balance does not meet the required threshold.");
      } else {
        setIsSuccess(false);
        setResult("Error: Proof verification failed.");
      }

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
