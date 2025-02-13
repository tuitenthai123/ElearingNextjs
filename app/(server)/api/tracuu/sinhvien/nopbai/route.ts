import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const res = await request.json();
        const { maso,makhoahoc,machuong } = res;
        const datakhoahoc = await db.submission.findMany({
            where:{
                userId:maso,
                chapterId:machuong,
                khoahocId:makhoahoc
            }
        })
        return new Response(JSON.stringify(datakhoahoc), { status: 200 });
    } catch (error) {
        console.error('Error fetching timetable:', error);
        return new Response(JSON.stringify({ error: 'Error fetching timetable' }), { status: 500 });
    }
}