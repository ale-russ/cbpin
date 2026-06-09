import { useState } from "react";

import { billingHistory, plans } from "@/src/data/plans";
import { TerminalControl } from "./TerminalControl";
import { UsageAnalyticsIndicator } from "./UsageAnalyticsIndicator";
import { PrincingPlans } from "./PrincingPlans";
import { BillingHistory } from "./BillingHistory";
import { SelectedPlanModal } from "./SelectedPlanModal";

interface SubscriptionDeskProps {
  currentRole:
    | "Guest"
    | "SME User"
    | "Professional User"
    | "Enterprise User"
    | "Administrator";
  onUpgradeCompleted: (
    newRole:
      | "Guest"
      | "SME User"
      | "Professional User"
      | "Enterprise User"
      | "Administrator",
  ) => void;
  onNavigateToView?: (view: string) => void;
}

export default function SubscriptionDesk({
  currentRole,
  onUpgradeCompleted,
  onNavigateToView,
}: SubscriptionDeskProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cardNo, setCardNo] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [selectedBillingHistoryItem, setSelectedBillingHistoryItem] = useState<
    any | null
  >(null);

  const usageStats = {
    searchesPerformed: 145,
    searchesLimit:
      currentRole === "Guest"
        ? 5
        : currentRole === "SME User"
          ? 100
          : currentRole === "Professional User"
            ? 2500
            : 999999,
    aiUnitsUsed: 22,
    aiUnitsLimit:
      currentRole === "Guest"
        ? 0
        : currentRole === "SME User"
          ? 3
          : currentRole === "Professional User"
            ? 15
            : 999999,
    alertsConfigured: 3,
    alertsLimit:
      currentRole === "Guest"
        ? 1
        : currentRole === "SME User"
          ? 5
          : currentRole === "Professional User"
            ? 15
            : 999999,
  };

  const currentPlanName =
    currentRole === "Guest"
      ? "Guest / Free"
      : currentRole === "SME User"
        ? "SME User"
        : currentRole === "Professional User"
          ? "Professional Core"
          : currentRole === "Enterprise User"
            ? "Enterprise Terminal"
            : "Administrator Supreme";

  const handleOpenUpgrade = (planId: string) => {
    // If Admin, bypass
    if (currentRole === "Administrator") return;
    setSelectedPlan(planId);
    setCardNo("4242 4242 4242 4242");
    setCardHolder("Sarah Alubas - CPIN Procurement");
    setCvv("385");
    setExpiry("12/28");
    setPaymentSuccess(false);
  };

  const handleCheckoutSubmit = (e: any) => {
    e.preventDefault();
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      const matchedPlan = plans.find((p) => p.id === selectedPlan);
      if (matchedPlan) {
        onUpgradeCompleted(matchedPlan.role as any);
      }
      setTimeout(() => {
        setSelectedPlan(null);
        setPaymentSuccess(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Alert bar if user upgraded */}
      {paymentSuccess && (
        <div className="bg-emerald-900 border-2 border-[#00FF00] p-4 rounded-xl flex items-center justify-between text-xs font-mono animate-bounce shadow-[0_0_15px_#00FF00]">
          <span className="text-[#00FF00] font-black uppercase">
            ✔ PAYMENT CLEAR // LICENSING GRANTED // ROLE RE-CONFIGURED INSTANTLY
          </span>
          <span className="text-slate-300">Synchronized (1ms)</span>
        </div>
      )}

      {/* Main SaaS billing detail row */}
      <TerminalControl currentPlanName={currentPlanName} />

      {/* Usage Analytics indicators */}
      <UsageAnalyticsIndicator usageStats={usageStats} />

      {/* PRICING PLANS COMPILER GRID */}
      <PrincingPlans
        currentRole={currentRole}
        plans={plans}
        handleOpenUpgrade={handleOpenUpgrade}
      />

      {/* BILLING HISTORY DESK */}
      <BillingHistory
        billingHistory={billingHistory}
        selectedBillingHistoryItem={selectedBillingHistoryItem}
        setSelectedBillingHistoryItem={setSelectedBillingHistoryItem}
      />

      {/* CHECKOUT PAYMENT GATEWAY MODAL DOCK */}
      <SelectedPlanModal
        selectedPlan={selectedPlan}
        plans={plans}
        setSelectedPlan={setSelectedPlan}
        cardNo={cardNo}
        setCardNo={setCardNo}
        expiry={expiry}
        setExpiry={setExpiry}
        cvv={cvv}
        setCvv={setCvv}
        cardHolder={cardHolder}
        setCardHolder={setCardHolder}
        paymentProcessing={paymentProcessing}
        handleCheckoutSubmit={handleCheckoutSubmit}
      />
    </div>
  );
}
