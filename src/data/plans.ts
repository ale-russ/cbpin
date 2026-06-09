
export const plans = [
    {
      id: "Free",
      name: "Guest / Free",
      price: "0",
      role: "Guest",
      desc: "Perfect for testing basic search indices and public gazettes.",
      frequency: "forever",
      features: [
        "View limited opportunities (Uganda Roads, UNHCR cookstoves)",
        "Basic keyword matching checks",
        "Community help forums",
        "Average 2-second search latency",
      ],
      usage: "Standard indexing speed",
    },
    {
      id: "SME",
      name: "SME User Tier",
      price: "49",
      role: "SME User",
      desc: "Designed for small contracting firms looking to secure early contracts.",
      frequency: "month",
      features: [
        "Unrestricted search over 500 Opportunities",
        "Save bookmark opportunities & draft listings",
        "Set custom email alerts dispatches",
        "Elasticsearch Typo tolerance",
        "3 dynamic AI checklists reviews per month",
      ],
      usage: "API Limits: 100 queries / day",
    },
    {
      id: "Professional",
      name: "Professional Core",
      price: "149",
      role: "Professional User",
      desc: "For growing operators hunting international contracts & joint ventures.",
      frequency: "month",
      features: [
        "Full regional forecasts access",
        "Unlocks premium Opportunity Match Scores",
        "View historical Buyer Intelligence reviews",
        "Review comprehensive Competitor analytics",
        "Configurable custom SMS alerts system",
      ],
      usage: "API Limits: 2,500 queries / day",
    },
    {
      id: "Enterprise",
      name: "Enterprise Terminal",
      price: "499",
      role: "Enterprise User",
      desc: "Bloomberg-grade operational desk for multi-national conglomerates.",
      frequency: "month",
      features: [
        "Strategic Partner Consortium recommendation matching",
        "Unlimited AI checklist calculations",
        "Access Interactive Regional Trade Maps",
        "Interactive Procurement Graph Relationship Map",
        "Full team member workspaces",
        "Direct JSON data export & CRM syncing dispatches",
      ],
      usage: "API Limits: Unlimited queries",
    },
  ];

  export const billingHistory = [
    {
      id: "INV-2026-0044",
      date: "2026-05-01",
      amount: "$149.00",
      status: "Paid",
      description: "Professional Core Subscription (Monthly)",
      method: "Visa Code ending 4242",
    },
    {
      id: "INV-2026-0032",
      date: "2026-04-01",
      amount: "$149.00",
      status: "Paid",
      description: "Professional Core Subscription (Monthly)",
      method: "Visa Code ending 4242",
    },
    {
      id: "INV-2026-0019",
      date: "2026-03-01",
      amount: "$149.00",
      status: "Paid",
      description: "Professional Core Subscription (Monthly)",
      method: "Visa Code ending 4242",
    },
  ];

//   const usageStats = {
//     searchesPerformed: 145,
//     searchesLimit:
//       currentRole === "Guest"
//         ? 5
//         : currentRole === "SME User"
//           ? 100
//           : currentRole === "Professional User"
//             ? 2500
//             : 999999,
//     aiUnitsUsed: 22,
//     aiUnitsLimit:
//       currentRole === "Guest"
//         ? 0
//         : currentRole === "SME User"
//           ? 3
//           : currentRole === "Professional User"
//             ? 15
//             : 999999,
//     alertsConfigured: 3,
//     alertsLimit:
//       currentRole === "Guest"
//         ? 1
//         : currentRole === "SME User"
//           ? 5
//           : currentRole === "Professional User"
//             ? 15
//             : 999999,
//   };