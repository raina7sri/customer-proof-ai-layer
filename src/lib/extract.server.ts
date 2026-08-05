import {
  type ApprovalStatus,
  type CustomerLoad,
  type Permission,
  type ProofRecord,
} from "@/data/proof-records";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/responses";
const MODEL = "openai/gpt-5.6-sol";

export type ExtractedClaim = { claim: string; reason: string };

type RawExtraction = {
  category: string;
  vertical: string;
  customerContext: string;
  proofPriority: string;
  buyerProblem: string;
  approvedProof: string;
  evidenceStrength: string[];
  customerLoad: string;
  publicUseRequested: boolean;
  claimExtracted: string;
  claimScoped: string;
  excludedClaims: ExtractedClaim[];
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    category: { type: "string" },
    vertical: { type: "string" },
    customerContext: { type: "string" },
    proofPriority: { type: "string" },
    buyerProblem: { type: "string" },
    approvedProof: { type: "string" },
    evidenceStrength: { type: "array", items: { type: "string" } },
    customerLoad: { type: "string", enum: ["Available", "Reuse only", "Paused"] },
    publicUseRequested: { type: "boolean" },
    claimExtracted: { type: "string" },
    claimScoped: { type: "string" },
    excludedClaims: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          claim: { type: "string" },
          reason: { type: "string" },
        },
        required: ["claim", "reason"],
      },
    },
  },
  required: [
    "category",
    "vertical",
    "customerContext",
    "proofPriority",
    "buyerProblem",
    "approvedProof",
    "evidenceStrength",
    "customerLoad",
    "publicUseRequested",
    "claimExtracted",
    "claimScoped",
    "excludedClaims",
  ],
} as const;

const SYSTEM_PROMPT = `You are the extraction layer of a governed Customer Proof system used by B2B GTM teams.

Read rough customer material (interview notes, call transcript excerpts, QBR notes, case study drafts) and structure it into a Customer Proof Record. You do not invent, upgrade, or quantify claims. You only structure what the material states.

Field rules:
- category: a short neutral product/platform category label for the customer's use case, 2-6 words. No customer name.
- vertical: a short vertical or use-case label, 2-5 words.
- customerContext: one or two sentences on who the customer is and the scope of the deployment (pilot size, duration, teams involved) if stated.
- proofPriority: what this proof is best used to demonstrate, as one sentence starting with "Show that".
- buyerProblem: the pre-purchase problem in one sentence, past tense.
- approvedProof: the conservative, defensible outcome statement. Operational and qualitative unless the material explicitly states an approved quantified business outcome. Never include revenue lift, ROI, or percentage business outcomes that the material does not explicitly approve.
- evidenceStrength: short tags describing how strong the evidence is, e.g. "Sourced", "Qualitative", "Quoted", "Pilot scope", "Not yet quantified". Do not include "Approved".
- customerLoad: "Available" unless the material says the customer is fatigued, reuse-only, or paused.
- publicUseRequested: true only if the material explicitly states the customer has approved public/external/website use with no further review required. Legal review pending means false.
- claimExtracted: the boldest claim a careless reader might pull out of this material, stated plainly, even if it overreaches.
- claimScoped: the human-safe rewrite of that claim, with scope, duration, and limits made explicit, and an explicit statement of what it is not.
- excludedClaims: every claim that must be kept out of external output, each with the governance reason. Include any quantified business outcome the customer has not approved, and any public-use language when public use is not granted.

Write in plain executive prose. No marketing adjectives. No customer names or identifying details.`;

function pickLoad(value: string): CustomerLoad {
  if (value === "Reuse only" || value === "Paused") return value;
  return "Available";
}

const QUANTIFIED = /(\d+(\.\d+)?\s?%|\bROI\b|revenue lift|revenue increase|\d+x\b)/i;

export function normalizeExtraction(raw: RawExtraction, notes: string): ProofRecord {
  // Conservative governance defaults are enforced in code, not trusted to the model.
  const permission: Permission = "Private use";
  const approvalStatus: ApprovalStatus = "Internal review";

  const excluded: ExtractedClaim[] = [...(raw.excludedClaims ?? [])];

  let approvedProof = raw.approvedProof.trim();
  if (QUANTIFIED.test(approvedProof)) {
    excluded.unshift({
      claim: approvedProof,
      reason:
        "Quantified business outcome removed from approved proof. New records are not approved for quantified claims until a human confirms the customer signed off on the number.",
    });
    approvedProof = raw.claimScoped.trim();
  }

  if (raw.publicUseRequested) {
    excluded.push({
      claim: "External or website use of this proof",
      reason:
        "The notes suggest external interest, but new records start at internal use until a human confirms permission and approval.",
    });
  }

  const evidenceStrength = Array.from(
    new Set([
      ...(raw.evidenceStrength ?? []).filter((e) => !/approved/i.test(e)).slice(0, 3),
      "Not yet approved",
    ]),
  );

  return {
    id: "custom-notes",
    category: raw.category.trim() || "Customer proof from your notes",
    shortLabel: "Your notes",
    vertical: raw.vertical.trim() || "Unclassified",
    rawNotes: notes
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 12),
    customerContext: raw.customerContext.trim(),
    proofPriority: raw.proofPriority.trim(),
    buyerProblem: raw.buyerProblem.trim(),
    approvedProof,
    useControls: {
      evidenceStrength,
      approvalStatus,
      permission,
      customerLoad: pickLoad(raw.customerLoad),
    },
    hasSourceMaterial: notes.trim().length > 0,
    updateFlag: false,
    primaryOutput: "sales-outreach",
    primaryOutputCopy: approvedProof,
    claimReview: { ai: raw.claimExtracted.trim(), approved: raw.claimScoped.trim() },
    reuseCount: 0,
    source: "notes",
    excludedClaims: excluded,
  };
}

function sseText(body: string): string {
  let text = "";
  for (const line of body.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const event = JSON.parse(payload) as {
        type?: string;
        delta?: string;
        response?: { output_text?: string };
      };
      if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
        text += event.delta;
      } else if (event.type === "response.completed" && event.response?.output_text) {
        if (!text) text = event.response.output_text;
      }
    } catch {
      // ignore non-JSON keepalive lines
    }
  }
  return text;
}

export async function extractRecordFromNotes(notes: string): Promise<ProofRecord> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured for this project.");

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      instructions: SYSTEM_PROMPT,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Structure the following rough customer material into a Customer Proof Record.\n\n---\n${notes.slice(0, 20000)}\n---`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "customer_proof_record",
          strict: true,
          schema: SCHEMA,
        },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    if (res.status === 429) throw new Error("AI is rate limited right now. Try again shortly.");
    if (res.status === 402)
      throw new Error("AI credits are exhausted for this workspace.");
    throw new Error(`Extraction failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const raw = sseText(await res.text());
  if (!raw.trim()) throw new Error("The model returned no structured output. Try again.");

  let parsed: RawExtraction;
  try {
    parsed = JSON.parse(raw) as RawExtraction;
  } catch {
    throw new Error("The model returned output that could not be read as a record.");
  }

  return normalizeExtraction(parsed, notes);
}