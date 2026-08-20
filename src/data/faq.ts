export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: "What is a Customer Proof AI Layer?",
    answer:
      "It is a governance layer for customer proof to rebuild Customer Advocacy & Marketing to be AI-native. Rough customer material such as transcripts, call notes, QBR notes, existing case studies are structured into a Customer Proof Record that cross-functional GTM teams can search, adapt, and reuse.",
  },
  {
    question: "What is a Customer Proof Record?",
    answer:
      "A Customer Proof Record is the governed unit of proof. It carries five fields: customer context, proof priority, buyer problem, approved proof, and use controls. Everything downstream is generated from the approved proof only, and never from ungoverned raw notes.",
  },
  {
    question: "What does \u201CAI structures, humans approve\u201D mean in practice?",
    answer:
      "AI extracts and adapts the material into record fields and role-specific outputs. A human decides the claim scope: what is true, current, commercially useful, and safe to use. AI can surface evidence; humans decide how far a claim may go.",
  },
  {
    question: "Who owns the proof record, and who uses it?",
    answer:
      "Customer Advocacy & Marketing / Product Marketing owns the proof record. Sales, CS, Marketing, Website, AR/PR, and Events use it. One approved record serves every team instead of each team rewriting its own version of the customer story.",
  },
  {
    question: "How is proof reuse governed?",
    answer:
      "Every record carries evidence strength, approval status, permission type, and customer load. Outputs are checked against those controls before generation: source attached, permission checked, approval checked, claim scope preserved. Anything held out of the output is listed with a reason.",
  },
  {
    question: "What does AI-native Customer Advocacy & Marketing mean here?",
    answer:
      "AI-native GTM means redesigning the workflow itself. Here, AI structures customer proof so teams can govern, retrieve, and reuse it, which rebuilds Customer Advocacy & Marketing to be AI-native.",
  },
];
