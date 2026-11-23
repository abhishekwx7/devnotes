import { NextResponse } from "next/server";

const notes = [
    {
        id: 1,
        title: "Learn Next.js",
        content: "Understanding App Router",
    },
    {
        id: 2,
        title: "Learn APIs",
        content: "Understanding Route Handlers",
    },
];

export async function GET() {
    const notes = [
        { id: 1, title: 'Learn Next.js' },
        { id: 2, title: 'Learn Route Handlers' },
    ];

    return NextResponse.json({
        success: true,
        data: notes,
    })
}

export async function POST(request: Request) {
    const body = await request.json();

    const { title, content } = body;

    if (typeof title !== "string" || !title.trim() || typeof content !== "string" || !content.trim()) {
        return NextResponse.json(
            { error: "Title and content are required!" },
            { status: 400 }
        );
    }

    const newNote = {
        id: notes.length + 1,
        title: title.trim(),
        content: content.trim(),
    }

    notes.push(newNote);

    return NextResponse.json({
        sucess: true,
        data: newNote,
    }, {
        status: 201
    });
}