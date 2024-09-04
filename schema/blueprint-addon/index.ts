import { z } from "zod";

const language = z.union([z.literal("ko"), z.literal("en")]);

const nid = z
  .string()
  .refine((value) => /Q\d+(-\d+)?/.exec(value)[0] === value);

const blueprintAddonSchema = z.object({
  labels: z.object({
    start: z.record(language, z.string()),
    submit: z.record(language, z.string()),
    nextDefault: z.record(language, z.string()),
    next: z.record(nid, z.record(language, z.string())),
  }),
  websurvey: z
    .object({
      theme: z.string().optional(),
      shorttext: z
        .record(
          nid,
          z.object({
            isWysiwyg: z.boolean(),
            line: z.number(),
          })
        )
        .optional(),
    })
    .optional(),
});

export default blueprintAddonSchema;
