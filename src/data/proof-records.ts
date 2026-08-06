export type ApprovalStatus =
  | "Draft"
  | "Internal review"
  | "External approval"
  | "Ready to use"
  | "Needs update";

export type Permission = "Public use" | "Private use" | "Restricted";

export type CustomerLoad = "Available" | "Reuse only" | "Paused";

export type OutputId =
  | "sales-outreach"
  | "expansion-note"
  | "case-study-brief"
  | "website-block"
  | "external-note";

export type ProofRecord = {
  id: string;
  category: string;
  shortLabel: string;
  vertical: string;
  rawNotes: string[];
  customerContext: string;
  proofPriority: string;
  buyerProblem: string;
  approvedProof: string;
  useControls: {
    evidenceStrength: string[];
    approvalStatus: ApprovalStatus;
    permission: Permission;
    customerLoad: CustomerLoad;
  };
  hasSourceMaterial: boolean;
  updateFlag: boolean;
  primaryOutput: OutputId;
  primaryOutputCopy: string;
  claimReview: { ai: string; approved: string };
  reuseCount: number;
  source?: "sample" | "notes";
  excludedClaims?: { claim: string; reason: string }[];
};

export const SAMPLE_DISCLAIMER =
  "Sample data — category-referenced synthetic example.";

export const SAMPLE_DISCLAIMER_GLOBAL =
  "Sample data — category-referenced synthetic examples.";

export const CLAIM_REVIEW = {
  ai: "The platform increased conversion by 12%.",
  approved:
    "During a six-week pilot, AI-referred sessions converted 12% above the site average. Referral volume remained limited, so this is classified as an early commercial signal, not validated enterprise ROI.",
};

export const EXCLUSION_NOTE =
  "Excluded \u201Cvalidated ROI\u201D language because the record is approved only as an early commercial signal.";

export const GOVERNANCE_CHECKS = [
  "Source attached",
  "Permission checked",
  "Approval checked",
  "Claim scope preserved",
];

export const PROCESSING_STEPS = [
  "Identifying buyer problem",
  "Extracting proof",
  "Mapping proof priority",
  "Checking approval and permission risks",
  "Creating Customer Proof Record",
];

export const RECORD_FIELD_LABELS = [
  "Customer context",
  "Proof priority",
  "Buyer problem",
  "Approved proof",
  "Use controls",
] as const;

export type OutputDefinition = {
  id: OutputId;
  label: string;
  team: string;
  purpose: string;
  requiresPublic: boolean;
};

export const OUTPUTS: OutputDefinition[] = [
  {
    id: "sales-outreach",
    label: "Proof summary for Sales outreach",
    team: "Sales / AE",
    purpose: "Answer a buyer objection in a live deal cycle with sourced proof.",
    requiresPublic: false,
  },
  {
    id: "expansion-note",
    label: "Business expansion note",
    team: "Customer Success / Account leadership",
    purpose: "Support a renewal or expansion conversation with account-level evidence.",
    requiresPublic: false,
  },
  {
    id: "case-study-brief",
    label: "Marketing case study brief",
    team: "Customer marketing",
    purpose: "Brief a writer on angle, buyer problem, and approved proof points.",
    requiresPublic: true,
  },
  {
    id: "website-block",
    label: "Website proof block",
    team: "Web / Demand",
    purpose: "Publish a short proof module on a product or solution page.",
    requiresPublic: true,
  },
  {
    id: "external-note",
    label: "External approved proof note",
    team: "Analyst relations / PR / Events",
    purpose: "Reference customer evidence in analyst, press, or event contexts.",
    requiresPublic: true,
  },
];

const RECORD_DEFINITIONS: ProofRecord[] = [
  {
    id: "enterprise-payments",
    category: "Enterprise payments platform",
    shortLabel: "Enterprise payments",
    vertical: "Payments / Marketplace",
    rawNotes: [
      "Marketplace buyer operates across multiple regions and seller types.",
      "Current payments setup works, but approval rates vary by market.",
      "Finance lacks transaction-level visibility into failed payments.",
      "Risk team wants fraud control without adding checkout friction.",
      "Buyer cares about conversion, dispute reduction, and expansion speed.",
      "Customer said improved routing helped them \u201Csee where revenue was leaking.\u201D",
    ],
    customerContext:
      "Marketplace platform with multi-region sellers and buyers; needs reliable payments infrastructure.",
    proofPriority:
      "Show that payments orchestration can improve visibility and reliability without increasing operational risk.",
    buyerProblem:
      "Payment failures and fraud controls created revenue leakage and uncertainty.",
    approvedProof:
      "Customer identified payment failure patterns by region and transaction type, giving Finance and Risk clearer visibility into where revenue was being lost.",
    useControls: {
      evidenceStrength: ["Sourced", "Approved"],
      approvalStatus: "Ready to use",
      permission: "Private use",
      customerLoad: "Available",
    },
    hasSourceMaterial: true,
    updateFlag: false,
    primaryOutput: "sales-outreach",
    primaryOutputCopy:
      "Use this when a buyer is worried that changing payment infrastructure will add risk. The proof shows that better payment visibility helped the customer identify where revenue was leaking and where reliability needed improvement.",
    claimReview: CLAIM_REVIEW,
    reuseCount: 1,
  },
  {
    id: "agentic-commerce",
    category: "Agentic commerce / product intelligence platform",
    shortLabel: "Agentic commerce",
    vertical: "Retail / Commerce",
    rawNotes: [
      "Retailer has a large catalog with inconsistent attributes across product pages.",
      "Product data works for web search but not reliably for AI shopping assistants.",
      "Merchandising team does not know which fields agents need for comparison.",
      "Inventory, variants, sizing, and FAQs are spread across several systems.",
      "Buyer wants products to be discoverable and accurately represented in AI channels.",
      "Customer said the issue was \u201Cnot more content, but cleaner product context.\u201D",
    ],
    customerContext:
      "Enterprise retailer preparing product catalog data for AI-assisted shopping and comparison.",
    proofPriority:
      "Show that structured product intelligence improves AI understanding without requiring a full commerce replatform.",
    buyerProblem:
      "Product information was fragmented, making AI discovery and comparison less reliable.",
    approvedProof:
      "Customer improved the structure of product details, variants, FAQs, and inventory context so AI systems could interpret product information more accurately.",
    useControls: {
      evidenceStrength: ["Sourced", "Approved", "Quantified"],
      approvalStatus: "Ready to use",
      permission: "Public use",
      customerLoad: "Available",
    },
    hasSourceMaterial: true,
    updateFlag: false,
    primaryOutput: "website-block",
    primaryOutputCopy:
      "Retailers preparing for AI-assisted shopping need product data that agents can understand. This sample proof shows how structured product context can make variants, availability, and product comparisons easier for AI systems to interpret.",
    claimReview: CLAIM_REVIEW,
    reuseCount: 1,
  },
  {
    id: "ai-infrastructure",
    category: "AI infrastructure / developer platform",
    shortLabel: "AI infrastructure",
    vertical: "Developer platform / Enterprise IT",
    rawNotes: [
      "Enterprise AI team is running experiments across disconnected environments.",
      "Developers lose time moving between tools, approvals, and infrastructure queues.",
      "Security requires a governed path before production expansion.",
      "Platform team wants repeatable infrastructure for multiple AI use cases.",
      "Buyer needs faster experimentation without losing control.",
      "Customer said value came from \u201Cturning one-off AI experiments into a repeatable path.\u201D",
    ],
    customerContext:
      "Enterprise AI platform team building internal AI applications across multiple business units.",
    proofPriority:
      "Show that AI infrastructure can move teams from isolated experiments to governed production workflows.",
    buyerProblem:
      "AI experimentation was fragmented, slow, and difficult to move into production.",
    approvedProof:
      "Customer created a repeatable development and deployment path for AI use cases across teams.",
    useControls: {
      evidenceStrength: ["Sourced", "Approved", "Quantified pending"],
      approvalStatus: "Ready to use",
      permission: "Public use",
      customerLoad: "Available",
    },
    hasSourceMaterial: true,
    updateFlag: false,
    primaryOutput: "external-note",
    primaryOutputCopy:
      "Use this for analyst, PR, or event contexts where the company needs to explain enterprise AI adoption. The proof supports the message that governed AI infrastructure helps teams move from prototype activity to operational scale.",
    claimReview: CLAIM_REVIEW,
    reuseCount: 1,
  },
  {
    id: "crm-platform",
    category: "CRM platform",
    shortLabel: "CRM platform",
    vertical: "B2B revenue operations",
    rawNotes: [
      "Sales, marketing, and CS were tracking customer information in separate tools.",
      "Renewal risks were not visible early enough.",
      "Sales managers lacked a single view of account activity and next-best actions.",
      "CS needed better context before expansion conversations.",
      "Buyer cared about forecast accuracy, customer visibility, and reducing manual updates.",
      "Customer said, \u201CWe finally had one place to see what was happening with the account.\u201D",
    ],
    customerContext:
      "B2B company aligning sales, marketing, and customer success around shared account visibility.",
    proofPriority:
      "Show that a CRM platform can improve lifecycle visibility across sales, marketing, and CS.",
    buyerProblem:
      "Fragmented customer data made it harder to forecast, renew, and expand accounts.",
    approvedProof:
      "Customer unified account activity across teams, improving visibility into renewal risk and expansion opportunities.",
    useControls: {
      evidenceStrength: ["Sourced", "Approved"],
      approvalStatus: "Ready to use",
      permission: "Private use",
      customerLoad: "Reuse only",
    },
    hasSourceMaterial: true,
    updateFlag: false,
    primaryOutput: "expansion-note",
    primaryOutputCopy:
      "Use this when a CS or account leader needs to support an expansion conversation. The proof shows how shared account visibility helped teams identify renewal risk and expansion opportunities earlier.",
    claimReview: CLAIM_REVIEW,
    reuseCount: 1,
  },
  {
    id: "enterprise-ai",
    category: "Enterprise AI platform",
    shortLabel: "Enterprise AI",
    vertical: "Enterprise AI / Customer operations",
    rawNotes: [
      "Enterprise team wants to deploy AI assistants across customer-facing workflows.",
      "Data security and accuracy are major executive concerns.",
      "Existing pilots are promising but scattered across functions.",
      "Buyer needs a platform that can ground AI in approved enterprise data.",
      "Customer wants proof that AI can improve response quality without unmanaged risk.",
      "Customer said governance mattered as much as model performance.",
    ],
    customerContext:
      "Enterprise organization deploying AI assistants across customer-facing workflows.",
    proofPriority:
      "Show that enterprise AI can be deployed in customer-facing workflows with governance, approved data, and human oversight.",
    buyerProblem:
      "AI pilots were fragmented, and leadership was concerned about trust, accuracy, and operational risk.",
    approvedProof:
      "Customer used a governed AI platform approach to move from scattered pilots toward approved customer-facing workflows.",
    useControls: {
      evidenceStrength: ["Sourced", "Approved"],
      approvalStatus: "Internal review",
      permission: "Public use",
      customerLoad: "Available",
    },
    hasSourceMaterial: true,
    updateFlag: false,
    primaryOutput: "case-study-brief",
    primaryOutputCopy:
      "Case study angle: moving from scattered AI pilots to governed customer-facing workflows. The buyer problem is executive trust. The proof centers on approved data grounding, workflow governance, and readiness for customer-facing deployment.",
    claimReview: CLAIM_REVIEW,
    reuseCount: 1,
  },
];

export const DEFAULT_RECORD_ID = "agentic-commerce";

const DISPLAY_ORDER = [
  "agentic-commerce",
  "enterprise-ai",
  "enterprise-payments",
  "ai-infrastructure",
  "crm-platform",
];

export const PROOF_RECORDS: ProofRecord[] = DISPLAY_ORDER.map(
  (id) => RECORD_DEFINITIONS.find((r) => r.id === id) as ProofRecord,
).filter(Boolean);

export function getRecord(id: string): ProofRecord {
  const found = PROOF_RECORDS.find((r) => r.id === id);
  if (found) return found;
  return PROOF_RECORDS.find((r) => r.id === DEFAULT_RECORD_ID) as ProofRecord;
}

const TOTAL_RECORDS = PROOF_RECORDS.length;

const READY_TO_USE = PROOF_RECORDS.filter(
  (r) =>
    r.hasSourceMaterial &&
    r.useControls.approvalStatus === "Ready to use" &&
    r.useControls.customerLoad !== "Paused" &&
    !r.updateFlag,
).length;

const SOURCED = PROOF_RECORDS.filter((r) => r.hasSourceMaterial).length;

const LOAD_COUNTS = (["Available", "Reuse only", "Paused"] as CustomerLoad[]).map(
  (load) => ({
    load,
    count: PROOF_RECORDS.filter((r) => r.useControls.customerLoad === load).length,
  }),
);

export const METRICS = [
  {
    label: "Ready-to-use proof",
    value: `${READY_TO_USE} of ${TOTAL_RECORDS}`,
    definition:
      "Records with source material, approval, permission, and no update flag.",
  },
  {
    label: "Source coverage",
    value: `${SOURCED} of ${TOTAL_RECORDS}`,
    definition: "Records linked to notes, transcripts, or source material.",
  },
  {
    label: "Proof coverage",
    value: "5 categories",
    definition:
      "Proof available by product, proof priority, buyer problem, vertical, or use case.",
  },
  {
    label: "Reuse count",
    value: "5 outputs generated",
    definition: "Number of outputs generated from a proof record.",
  },
  {
    label: "Customer load",
    value: LOAD_COUNTS.map((l) => `${l.count} ${l.load}`).join(" \u00B7 "),
    definition: "Whether a customer is available, reuse-only, or paused.",
  },
];

export const EXPANSION_ITEMS = [
  "CRM, Gong, call transcript, and case study source integrations",
  "Approval workflow routing",
  "Semantic search across customer proof",
  "Proof gap analysis by product, segment, or buyer objection",
  "Field usage tracking",
  "Revenue influence attribution",
  "Customer fatigue automation",
  "Analyst / PR proof tracking",
  "Launch and sales enablement integrations",
];

export const EXPANSION_CLOSING =
  "V1 turns rough customer material into governed proof records. Future versions could connect that proof to the systems where GTM teams already work.";

export const FILTER_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Proof priority",
    options: [
      "Visibility and reliability",
      "Structured product intelligence",
      "Governed production workflows",
      "Lifecycle visibility",
      "Governed customer-facing AI",
    ],
  },
  {
    label: "Buyer problem",
    options: [
      "Revenue leakage",
      "Fragmented product data",
      "Fragmented experimentation",
      "Fragmented customer data",
      "Executive trust in AI",
    ],
  },
  {
    label: "Vertical or use case",
    options: [
      "Payments / Marketplace",
      "Retail / Commerce",
      "Developer platform / Enterprise IT",
      "B2B revenue operations",
      "Enterprise AI / Customer operations",
    ],
  },
  {
    label: "Approval status",
    options: ["Draft", "Internal review", "External approval", "Ready to use", "Needs update"],
  },
  { label: "Permission type", options: ["Public use", "Private use", "Restricted"] },
  { label: "Customer load", options: ["Available", "Reuse only", "Paused"] },
];

export const RECORD_FILTER_TAGS: Record<string, { priority: string; problem: string }> = {
  "enterprise-payments": {
    priority: "Visibility and reliability",
    problem: "Revenue leakage",
  },
  "agentic-commerce": {
    priority: "Structured product intelligence",
    problem: "Fragmented product data",
  },
  "ai-infrastructure": {
    priority: "Governed production workflows",
    problem: "Fragmented experimentation",
  },
  "crm-platform": {
    priority: "Lifecycle visibility",
    problem: "Fragmented customer data",
  },
  "enterprise-ai": {
    priority: "Governed customer-facing AI",
    problem: "Executive trust in AI",
  },
};