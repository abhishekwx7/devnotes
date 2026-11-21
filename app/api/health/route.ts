export async function GET() {
    return Response.json({
        message: "Dev notes API is running.",
        status: "success",
    });
}