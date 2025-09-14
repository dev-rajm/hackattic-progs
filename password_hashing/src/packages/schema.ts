import {z} from "zod";

const PBKDF2Schema = z.object({
  rounds: z.number(),
  hash: z.string(),
})

const scryptSchema = z.object({
  N: z.number(),
  r: z.number(),
  p: z.number(),
  buflen: z.number(),
  __control: z.string()
})

const problemSchema = z.object({
  password: z.string(),
  salt: z.string(),
  pbkdf2: PBKDF2Schema,
  scrypt: scryptSchema,
})

export type ProblemSchemaType = z.infer<typeof problemSchema>;
