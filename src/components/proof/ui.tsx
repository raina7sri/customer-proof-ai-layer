import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import {
  EXCLUSION_NOTE,
  GOVERNANCE_CHECKS,
  SAMPLE_DISCLAIMER_GLOBAL,
  type ProofRecord,
} from "@/data/proof-records";
import type { GovernanceVerdict } from "@/lib/governance";

export function MicroLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-hairline bg-card", className)}>{children}</div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <MicroLabel className="mb-3 text-violet">{eyebrow}</MicroLabel> : null}
      <h1 className="text-2xl font-semibold text-plum sm:text-3xl">{title}</h1>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

type BadgeTone = "neutral" | "violet" | "approve" | "signal" | "muted";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "border-hairline text-plum",
  violet: "border-violet/40 text-violet",
  approve: "border-approve/40 text-approve",
  signal: "border-signal bg-signal/20 text-plum",
  muted: "border-hairline text-muted-foreground",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-[3px] text-[0.68rem] font-medium tracking-wide",
        badgeTones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function approvalTone(status: string): BadgeTone {
  if (status === "Ready to use" || status === "External approval") return "approve";
  if (status === "Needs update") return "signal";
  return "muted";
}

export function permissionTone(permission: string): BadgeTone {
  if (permission === "Public use") return "approve";
  if (permission === "Restricted") return "signal";
  return "violet";
}

export function loadTone(load: string): BadgeTone {
  if (load === "Available") return "approve";
  if (load === "Paused") return "signal";
  return "muted";
}

export function UseControls({ record }: { record: ProofRecord }) {
  const { evidenceStrength, approvalStatus, permission, customerLoad } = record.useControls;
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <MicroLabel className="mb-2">Evidence strength</MicroLabel>
        <div className="flex flex-wrap gap-1.5">
          {evidenceStrength.map((e) => (
            <Badge key={e} tone="signal">
              {e}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <MicroLabel className="mb-2">Approval status</MicroLabel>
        <Badge tone={approvalTone(approvalStatus)}>{approvalStatus}</Badge>
      </div>
      <div>
        <MicroLabel className="mb-2">Permission</MicroLabel>
        <Badge tone={permissionTone(permission)}>{permission}</Badge>
      </div>
      <div>
        <MicroLabel className="mb-2">Customer load</MicroLabel>
        <Badge tone={loadTone(customerLoad)}>{customerLoad}</Badge>
      </div>
    </div>
  );
}

export function GovernanceCheck() {
  return (
    <div>
      <MicroLabel className="mb-2">Governance check</MicroLabel>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {GOVERNANCE_CHECKS.map((c) => (
          <li key={c} className="flex items-center gap-2 text-xs text-plum">
            <CheckMark />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CheckMark() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="h-3 w-3 shrink-0 text-approve"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M1.5 6.5 4.5 9.5 10.5 2.5" />
    </svg>
  );
}

export function ExclusionNote({ record }: { record?: ProofRecord }) {
  const custom = record?.excludedClaims ?? [];
  if (record?.source === "notes") {
    return (
      <div className="border-l-2 border-signal pl-3">
        <MicroLabel className="mb-1">Excluded from output</MicroLabel>
        {custom.length === 0 ? (
          <p className="text-xs leading-relaxed text-plum">
            No claim needed removal, but this record is not human-approved, so external use
            stays blocked until permission and approval are confirmed.
          </p>
        ) : (
          <ul className="space-y-2">
            {custom.map((c) => (
              <li key={c.claim} className="text-xs leading-relaxed text-plum">
                <span className="font-medium">{c.claim}</span>
                <span className="block text-muted-foreground">{c.reason}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  return (
    <div className="border-l-2 border-signal pl-3">
      <MicroLabel className="mb-1">Excluded from output</MicroLabel>
      <p className="text-xs leading-relaxed text-plum">{EXCLUSION_NOTE}</p>
    </div>
  );
}

export function VerdictNote({ verdict }: { verdict: GovernanceVerdict }) {
  if (verdict.level === "allow") return null;
  return (
    <div
      className={cn(
        "border-l-2 pl-3",
        verdict.level === "block" ? "border-destructive" : "border-signal",
      )}
    >
      <MicroLabel className="mb-1">
        {verdict.level === "block" ? "Reuse blocked" : "Permission warning"}
      </MicroLabel>
      <ul className="space-y-1 text-xs leading-relaxed text-plum">
        {verdict.reasons.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export function SampleDisclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-[0.7rem] tracking-wide text-muted-foreground", className)}>
      {SAMPLE_DISCLAIMER_GLOBAL}
    </p>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-hairline", className)} />;
}