import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  const result = await db.insert(STUDENTS).values({
    name: data?.name,
    grade: data?.grade,
    address: data?.address,
    contact: data?.contact,
  });
  return NextResponse.json(result);
}

export async function GET(res) {
   
  console.log("test1");
  const result = await db.select().from(STUDENTS);
  console.log(result,"res");

  return NextResponse.json(result);
}

export async function DELETE(req) {
   console.log("test");
   

  const searchParam = req.nextUrl.searchParam;
  const id = searchParam.get("id");

  const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, id));

  return NextResponse.json(result);
}

