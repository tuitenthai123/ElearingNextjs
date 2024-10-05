import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const res = await request.json();
        const { masv, password } = res;

        // Tìm kiếm người dùng có mã sinh viên (masv) và mật khẩu (password) phù hợp
        const response = await db.user.findMany({
            where: {
                masv: masv,
                password: password,
            },
        });

        // Kiểm tra nếu không tìm thấy người dùng nào
        let statuslogin;
        if (response.length === 0) {
            statuslogin = "false";
        } else {
            statuslogin = "true";
        }

        // Trả về phản hồi với trạng thái đăng nhập
        return new Response(JSON.stringify({ status: statuslogin }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error checking login:", error);
        return new Response(
            JSON.stringify({ error: "Error checking login" }),
            { status: 500 }
        );
    }
}