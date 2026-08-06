export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: "What is a Customer Proof AI Layer?",
    answer:
      "It is a governance layer for customer proof, not an AI writing tool. Rough customer material — transcripts, call notes, QBR notes, existing case studies — is structured into a Customer Proof Record that GTM teams can search, approve, measure, and reuse.",
  },
  {
    question: "What is a Customer Proof Record?",
    answer:
      "A Customer Proof Record is the governed unit of proof. It carries five fields: customer context, proof priority, buyer problem, approved proof, and use controls. Everything downstream is generated from the approved proof only, never from raw notes.",
  },
  {
    question: "What does \u201CAI structures, humans approve\u201D mean in practice?",
    answer:
      "AI extracts and adapts the material into record fields and role-specific outputs. A human decides the claim scope: what is true, current, commercially useful, and safe to use. AI can surface evidence; humans decide how far a claim may go.",
  },
  {
    question: "Who owns the proof record, and who uses it?",
    answer:
      "Customer Marketing / PMM owns the proof record. Sales, CS, Marketing, Website, AR/PR, and Events use it. One approved record serves every team instead of each team rewriting its own version of the customer story.",
  },
  {
    question: "How is proof reuse governed?",
    answer:
      "Every record carries evidence strength, approval status, permission type, and customer load. Outputs are checked against those controls before generation: source attached, permission checked, approval checked, claim scope preserved. Anything held out of the output is listed with a reason.",
  },
  {
    question: "What does AI-native customer marketing mean here?",
    answer:
      "AI-native GTM means redesigning the workflow, not producing more content. In this example AI structures customer proof so teams can govern, retrieve, and reuse it, which is what makes customer marketing AI-native rather than simply faster.",
  },
];
