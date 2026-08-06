import type { OutputDefinition, ProofRecord } from "@/data/proof-records";

export type GovernanceVerdict = {
  level: "allow" | "warn" | "block";
  reasons: string[];
};

export function evaluateReuse(
  record: ProofRecord,
  output: OutputDefinition,
  claimChanged = false,
): GovernanceVerdict {
  const blocks: string[] = [];
  const warns: string[] = [];

  if (!record.hasSourceMaterial) {
    blocks.push("No source material attached to this record.");
  }
  if (record.useControls.customerLoad === "Paused") {
    blocks.push("Customer is paused. Reuse is not permitted.");
  }
  if (output.requiresPublic && record.useControls.permission !== "Public use") {
    blocks.push(
      `Permission is ${record.useControls.permission.toLowerCase()}; this output is external-facing.`,
    );
  }
  if (claimChanged) {
    blocks.push("Generated claim changed from the approved record.");
  }

  if (record.useControls.approvalStatus === "Needs update") {
    warns.push("Record is flagged as needing an update.");
  }
  if (record.useControls.approvalStatus !== "Ready to use") {
    warns.push(
      `Approval status is ${record.useControls.approvalStatus.toLowerCase()}, not ready to use.`,
    );
  }
  if (output.requiresPublic && record.useControls.approvalStatus === "Internal review") {
    warns.push("External approval is required before publishing this output.");
  }
  if (record.useControls.customerLoad === "Reuse only") {
    warns.push("Customer is reuse-only. Do not request new customer time.");
  }
  if (record.updateFlag) {
    warns.push("An update trigger is active on this record.");
  }

  if (blocks.length > 0) return { level: "block", reasons: blocks };
  if (warns.length > 0) return { level: "warn", reasons: warns };
  return { level: "allow", reasons: [] };
}

export function isPublicUseReady(record: ProofRecord): boolean {
  return (
    record.useControls.permission === "Public use" &&
    record.useControls.approvalStatus === "Ready to use" &&
    record.useControls.evidenceStrength.includes("Approved") &&
    record.useControls.evidenceStrength.includes("Sourced") &&
    !record.updateFlag
  );
}

export function readinessLabel(record: ProofRecord): string {
  if (isPublicUseReady(record)) return "Public use ready";
  if (record.useControls.permission !== "Public use") {
    return `${record.useControls.permission} only`;
  }
  if (record.useControls.approvalStatus !== "Ready to use") {
    return "Public use requested";
  }
  return "Public use pending review";
}

export function readinessReason(record: ProofRecord): string {
  const { permission, approvalStatus } = record.useControls;
  if (permission !== "Public use") {
    return `Permission is ${permission.toLowerCase()}, so this proof can be reused internally but not published externally.`;
  }
  if (approvalStatus !== "Ready to use") {
    return `Permission allows public use, but approval status is ${approvalStatus.toLowerCase()}. External approval is the remaining step before publishing.`;
  }
  if (record.updateFlag) {
    return "An update trigger is active, so external reuse is paused until the record is refreshed.";
  }
  return "Evidence strength is not yet sourced and approved.";
}

export const UPDATE_TRIGGERS = [
  "Product or message changed",
  "Claim changed from approved record",
  "Customer context changed",
];

export function generateOutput(record: ProofRecord, output: OutputDefinition): string {
  switch (output.id) {
    case "sales-outreach":
      return `Use this when a buyer raises this concern: ${record.buyerProblem} Approved proof to reference: ${record.approvedProof} Position this as evidence of direction, not as validated enterprise ROI.`;
    case "expansion-note":
      return `Account context: ${record.customerContext} Expansion angle: ${record.proofPriority} Approved evidence: ${record.approvedProof}`;
    case "case-study-brief":
      return `Angle: ${record.proofPriority} Buyer problem to open with: ${record.buyerProblem} Proof section: ${record.approvedProof} Claim scope: early commercial signal only.`;
    case "website-block":
      return `Headline idea: ${record.proofPriority.replace(/^Show that /, "").replace(/\.$/, "")}. Body: ${record.approvedProof}`;
    case "external-note":
      return `Approved external statement: ${record.approvedProof} Framing: ${record.proofPriority} No unapproved metric or ROI language included.`;
    default:
      return record.approvedProof;
  }
}