import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Context,
  type ReactNode,
} from "react";
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
  customRecord: ProofRecord | null;
  setCustomRecord: (r: ProofRecord | null) => void;
  notes: string;
  setNotes: (v: string) => void;
  usedOwnNotes: boolean;
  setUsedOwnNotes: (v: boolean) => void;
  recordGenerated: boolean;
  setRecordGenerated: (v: boolean) => void;
  selectedOutputId: OutputId | null;
  setSelectedOutputId: (id: OutputId | null) => void;
};

// Keep a single context instance even if this module is evaluated twice
// (route code-splitting / HMR can otherwise create duplicate contexts).
const globalRef = globalThis as unknown as {
  __demoContext?: Context<DemoState | null>;
};
const DemoContext =
  globalRef.__demoContext ?? (globalRef.__demoContext = createContext<DemoState | null>(null));

export function DemoProvider({ children }: { children: ReactNode }) {
  const [selectedRecordId, setSelectedRecordIdRaw] = useState(DEFAULT_RECORD_ID);
  const [notes, setNotes] = useState("");
  const [usedOwnNotes, setUsedOwnNotes] = useState(false);
  const [recordGenerated, setRecordGenerated] = useState(false);
  const [selectedOutputId, setSelectedOutputId] = useState<OutputId | null>(null);
  const [customRecord, setCustomRecord] = useState<ProofRecord | null>(null);

  const value = useMemo<DemoState>(() => {
    const record =
      usedOwnNotes && customRecord ? customRecord : getRecord(selectedRecordId);
    return {
      selectedRecordId,
      setSelectedRecordId: (id: string) => {
        setSelectedRecordIdRaw(id);
        setSelectedOutputId(null);
        setUsedOwnNotes(false);
      },
      record,
      customRecord,
      setCustomRecord,
      notes,
      setNotes,
      usedOwnNotes,
      setUsedOwnNotes,
      recordGenerated,
      setRecordGenerated,
      selectedOutputId,
      setSelectedOutputId,
    };
  }, [selectedRecordId, notes, usedOwnNotes, recordGenerated, selectedOutputId, customRecord]);

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