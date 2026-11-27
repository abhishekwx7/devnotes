import { NextResponse } from "next/server";
import { Prisma } from "@/src/generated/prisma/client";
import { prisma } from "../../../../src/lib/prisma"

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;

        const note = await prisma.note.findUnique({
            where: { id },
        })

        if (!note) {
            return NextResponse.json(
                { error: "Not not found" },
                { status: 400 }
            );
        }

        return NextResponse.json(note, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch note." },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, content } = body;

        if (
            title !== undefined &&
            (typeof title !== "string" || !title.trim())
        ) {
            return NextResponse.json(
                { error: "Invalid title" },
                { status: 400 }
            );
        }

        if (content !== undefined && typeof content !== "string") {
            return NextResponse.json(
                { error: "Invalid content" },
                { status: 400 }
            );
        }

        if (title === undefined && content === undefined) {
            return NextResponse.json(
                { error: "No fields to update" },
                { status: 400 }
            );
        }

        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                ...(title !== undefined && { title: title.trim() }),
                ...(content !== undefined && { content }),
            },
        });

        return NextResponse.json(updatedNote, { status: 200 });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        console.error(error);

        return NextResponse.json(
            { error: "Failed to update note" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        await prisma.note.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Note deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        console.error(error);

        return NextResponse.json(
            { error: "Failed to delete note" },
            { status: 500 }
        );
    }
}