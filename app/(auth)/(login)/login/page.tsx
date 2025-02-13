"use client";
import { Logo } from '@/app/(dashboard)/_components/logo';
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; 

const page = () => {
    const [masv, setmasv] = useState("");
    const [password, setpassword] = useState("");
    const router = useRouter();

    const handlelogin = async () => {
        try {
            const statuslogin = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                masv: masv.trim(),
                password: password.trim()
            });

            if (statuslogin.data.status === "true") {
                Cookies.set("login", "true");
                Cookies.set("id", statuslogin.data.info[0].id);
                Cookies.set("mssv", statuslogin.data.info[0].masv);
                Cookies.set("name", statuslogin.data.info[0].name);
                Cookies.set("role", statuslogin.data.info[0].role);

                switch (statuslogin.data.info[0].role) {
                    case "sv":
                        router.push("/sinhvien/tkbsinhvien");
                        break;
                    case "gv":
                        router.push("/giangvien/tkbgv");
                        break;
                    case "admin":
                        router.push("/admin/quanly");
                        break;
                    default:
                        break;
                }
            } else {
                toast.error("Lỗi thông tin đăng nhập, vui lòng thử lại sau!", {
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                });
                Cookies.set("login", "false");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            toast.error("Có lỗi xảy ra khi đăng nhập, vui lòng thử lại!", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        }
    };

    return (
        <section className="bg-gray-100 dark:bg-gray-900">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white gap-5">
                    <Logo />
                    ELEARNING VLUTE
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold flex items-center justify-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            ĐĂNG NHẬP TÀI KHOẢN
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã số sinh viên</label>
                                <input type="text" onChange={(e) => setmasv(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="21004001" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input type="password" name="password" id="password" onChange={(e) => setpassword(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter") {handlelogin()} }} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500 dark:text-gray-300">Ghi nhớ đăng nhập</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-600">Quên mật khẩu?</a>
                            </div>
                            <div onClick={handlelogin} className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page