import { z } from "zod";

export const createNoteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),

    content: z
        .string()
        .trim()
        .min(1, "Content is required"),
});

export const updateNoteSchema = createNoteSchema
    .partial()
    .refine(
        (data) =>
            data.title !== undefined ||
            data.content !== undefined,
        {
            message: "Provide at least one field to update",
        }
    );

export const noteIdSchema = z
    .string()
    .regex(/^[1-9]\d*$/, "Invalid note ID")
    .transform(Number)
    .refine(Number.isSafeInteger, "Invalid note ID");

export type UpdateNoteInput =
    z.infer<typeof updateNoteSchema>;