"use client"
import Link from "next/link";
import styles from "./login.module.css";
import { useEffect, useRef, useState } from "react";
import { nameWeb } from "@/libs/baseurl";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { useRouter } from "next/navigation";

function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const router = useRouter();
    useEffect(()=>{
        document.title = "Đăng Nhập - "+nameWeb;
    },[])
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    const onSubmit = async (ev) =>{
        ev.preventDefault();
        if(email == "" || password == ""){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Vui lòng điền đầy đủ thông tin.', life: 3000});
        }else if(!isValidEmail(email)){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Email không hợp lệ.', life: 3000});
        }else{
            setLoading(true);
            try{
                await fetch("/api/user/login",{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({
                        email, password, remember: check
                    })
                })
                .then( async response => {
                    if (!response.ok) {
                        const errorMessage = await response.text();
                        const jsonError = JSON.parse(errorMessage);
                        toast.current.show({severity:'error', summary: 'Lỗi', detail: jsonError.message, life: 3000});
                    }else{
                        router.push("/");
                    }
                })
            }catch (error) {
                console.error(error.message)
            } finally{
                setLoading(false);
            } 
        }
    }
    return (  
        <div className="w-100 rounded-2" style={{background: 'var(--bg-main)', paddingBottom:'20px'}}>
            <Toast ref={toast} />
            <form className="d-flex flex-column p-4 gap-3" onSubmit={onSubmit}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="username" className={styles.input} type="text" placeholder="Email" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.input} type="password" autoComplete="current-password" placeholder="Nhập Mật Khẩu" />
                <div className="text-secondary d-flex align-items-center gap-2">
                    <Checkbox onChange={e => setCheck(e.checked)} checked={check}></Checkbox><span className="text-white">Nhớ Tôi</span>
                </div>
                <Button loading={loading} className="btn btn-primary" type="submit">Đăng Nhập</Button>
            </form>
            <div className={styles.loginFooter}>
                <div>
                    <span className="text-secondary">Bạn chưa có tài khoản?</span><Link href="/user/register">Đăng ký ngay</Link>
                </div>
                <Link className="mt-2" href="/user/forgot-password">Quên mật khẩu</Link>
            </div>
        </div>
    );
}

export default Page;