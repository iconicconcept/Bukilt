import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const supabase = await createClient();

  const formData = await request.formData();

  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      {
        error: "No file",
      },
      {
        status: 400,
      },
    );
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("service-images")
    .upload(fileName, buffer, {
      contentType: file.type,
    });

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }

  const { data } = supabase.storage
    .from("service-images")
    .getPublicUrl(fileName);

  return NextResponse.json({
    url: data.publicUrl,
  });
}
