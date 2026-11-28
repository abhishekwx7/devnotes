"use server";

import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof title !== "string" || typeof content !== "string" || !title.trim() || !content.trim()) {
        throw new Error("Title and Content are required!")
    }

    await prisma.note.create({
        data: {
            title: title.trim(),
            content: content.trim(),
        },
    });

    revalidatePath("/notes");

    redirect("/notes");
}