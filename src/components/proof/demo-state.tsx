import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_RECORD_ID,
  getRecord,
  OUTPUTS,
  type OutputId,
  type ProofRecord,
} from "@/data/proof-records";

type DemoState = {
  selectedRecordId: string;
  setSelectedRecordId: (id: string) => void;
  record: ProofRecord;
  notes: string;
  setNotes: (v: string) => void;
  usedOwnNotes: boolean;
  setUsedOwnNotes: (v: boolean) => void;
  recordGenerated: boolean;
  setRecordGenerated: (v: boolean) => void;
  selectedOutputId: OutputId | null;
  setSelectedOutputId: (id: OutputId | null) => void;
};

const DemoContext = createContext<DemoState | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [selectedRecordId, setSelectedRecordIdRaw] = useState(DEFAULT_RECORD_ID);
  const [notes, setNotes] = useState("");
  const [usedOwnNotes, setUsedOwnNotes] = useState(false);
  const [recordGenerated, setRecordGenerated] = useState(false);
  const [selectedOutputId, setSelectedOutputId] = useState<OutputId | null>(null);

  const value = useMemo<DemoState>(() => {
    const record = getRecord(selectedRecordId);
    return {
      selectedRecordId,
      setSelectedRecordId: (id: string) => {
        setSelectedRecordIdRaw(id);
        setSelectedOutputId(null);
      },
      record,
      notes,
      setNotes,
      usedOwnNotes,
      setUsedOwnNotes,
      recordGenerated,
      setRecordGenerated,
      selectedOutputId,
      setSelectedOutputId,
    };
  }, [selectedRecordId, notes, usedOwnNotes, recordGenerated, selectedOutputId]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoState {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}

export function outputById(id: OutputId) {
  return OUTPUTS.find((o) => o.id === id) ?? OUTPUTS[0]!;
}