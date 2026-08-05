import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { extractRecordFromNotes } from "./extract.server";

export const extractProofRecord = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ notes: z.string().min(40, "Add more customer material first.") }).parse(input),
  )
  .handler(async ({ data }) => extractRecordFromNotes(data.notes));