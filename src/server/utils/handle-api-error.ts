import { NextResponse } from "next/server";
import { AppError } from "../errors/app-error";

export function handleApiError(error: unknown) {
    if (error instanceof AppError) {
        return NextResponse.json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
            },
        },
            { status: error.statusCode });
    }

    console.error("Unexpeted API Error:", error);

    return NextResponse.json(
        {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            },
        },
        { status: 500 }
    );
}