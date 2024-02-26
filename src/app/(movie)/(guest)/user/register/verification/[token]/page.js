"use client"

import { nameWeb } from "@/libs/baseurl";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function Pgae({params}) {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const token = params.token;
    useEffect(()=>{
        const auth = async () => {
            await axios.post('/api/user/verification/'+ token)
            .then((response) => {
                setMessage(response.data);
            }).catch((err) => {
                setError(err.response.data.message);
            })
        }
        auth();
        document.title = "Xác Thực Tài Khoản - " + nameWeb;
    })
    return (  
        <>
            {message &&  
            <div className="w-100 text-center">
                <div className="alert w-100 text-center" style={{background:'green'}}>
                    {message}
                </div>
                <Link className="btn btn-primary" href="/user/login">Đăng nhập thôi nào</Link>
            </div>
            }
            {error && !message && <div className="alert w-100 text-center" style={{background:'red'}}>
                {error}
            </div>
            }
        </>
    );
}

export default Pgae;