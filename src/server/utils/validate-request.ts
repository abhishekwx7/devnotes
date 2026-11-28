import { z } from "zod"
import { AppError } from "../errors/app-error"

export function validateRequest<T extends z.ZodType>(schema: T, data: unknown): z.output<T> {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw new AppError(
            400,
            result.error.issues.map((issue) => issue.message).join("; "), "VALIDATION_ERROR"
        );
    }

    return result.data;
}