"use client"
import Link from "next/link";
import styles from "./register.module.css";
import { useEffect, useRef, useState } from "react";
import { Toast } from 'primereact/toast';     
import { Button } from 'primereact/button';
import axios from "axios";
import { nameWeb } from "@/libs/baseurl";
        
function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        document.title = "Đăng Ký Tài Khoản - "+ nameWeb;
    })
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(name == "" || email == "" || password == "" || confirmPassword == ""){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Vui lòng điền đầy đủ thông tin.', life: 3000});
        }else if(password != confirmPassword){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Mật khẩu không trùng khớp.', life: 3000});
        }else if(!isValidEmail(email)){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Email không hợp lệ.', life: 3000});
        }
        else{
            setLoading(true);
            try{
                await axios.post("/api/user/register",{name, email, password, password_confirmation: confirmPassword})
                .then((response) => {
                    setName("");
                    setPassword("");
                    setEmail("");
                    setConfirmPassword("");
                    toast.current.show({severity:'success', summary: 'Thành Công', detail:'Tạo tài khoản thành công. Vui lòng kiểm tra email.', life: 10000});
                }).catch((err) => {
                    Object.values(err.response.data.errors).forEach(errorArray => {
                        errorArray.forEach(errorMessage => {
                            toast.current.show({severity:'error', summary: 'Thất bại', detail: errorMessage, life: 5000});
                        });
                    });
                })
            }catch(error){
                console.error('Lỗi khi gửi dữ liệu:', error);
            }
            setLoading(false)
        }
    }
    return (  
        <div className="w-100 rounded-2" style={{background: 'var(--bg-main)', paddingBottom:'20px'}}>
            <Toast ref={toast} />
            <form className="d-flex flex-column p-4 gap-3" onSubmit={onSubmit}>
                <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nhập tên" />
                <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Nhập email" />
                <input className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Nhập mật khẩu" />
                <input className={styles.input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" placeholder="Xác nhận mật khẩu" />
                <Button loading={loading} className="btn btn-primary" type="submit">Đăng Ký</Button>
            </form>
            <div className={styles.loginFooter}>
                <div>
                <span className="text-secondary">Bạn đã có tài khoản?</span><Link href="/user/login">Đăng nhập ngay</Link>
                </div>
            </div>
        </div>
    );
}

export default Page;