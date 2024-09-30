import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get("date")
    const grade = searchParams.get("grade")

    const result = await db.select({
        day:ATTENDANCE.day,
        presentCount: sql`count(${ATTENDANCE.day})`
    }).from(ATTENDANCE)
    .innerJoin(STUDENTS,eq(ATTENDANCE.studentId,STUDENTS.id))
    .groupBy(ATTENDANCE.day)
    .where(and(eq(ATTENDANCE.date,date),eq(STUDENTS.grade,grade)))
    .orderBy(desc(ATTENDANCE.day))
    .limit(7)

    return NextResponse.json(result)

}