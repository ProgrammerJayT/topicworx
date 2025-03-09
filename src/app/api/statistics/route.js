import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "dummy", "index.json");

    const data = await fs.readFile(filePath, "utf8");

    return new Response(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching the data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
