import { AppError } from "../errors/app-error";

export async function parseJsonBody(request: Request): Promise<unknown> {
    try {
        return await request.json();
    } catch {
        throw new AppError(
            400, "Invalid JSON request body", "INVALID_JSON"
        );
    }
}