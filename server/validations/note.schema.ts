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