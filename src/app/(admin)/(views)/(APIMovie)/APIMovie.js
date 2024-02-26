"use client"
import { useRef, useState } from "react";
import styles from "./apimovie.module.css";
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { baseNGUONC, baseOPHIM } from "@/libs/baseurl";
function APIMovie() {
    const router = useRouter();
    const toast = useRef(null);
    const [selectedAPI, setSelectedAPI] = useState(null);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const options = [
        {
            name: 'NGUONC'
        },
        {
            name: 'OPHIM'
        }
    ];
    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(!selectedAPI || value == ""){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Vui lòng điền đầy đủ thông tin.', life: 3000});
        }else{
            setLoading(true);
            try{
                if(selectedAPI.name == "NGUONC"){
                    const res = await fetch(baseNGUONC + value)
                    if(res.status == 200){
                        const data = await res.json();
                        sessionStorage.setItem('apimovie', JSON.stringify(data));
                        router.push("/admin/page/add-movie?movie="+data.movie.slug+"&api=" + selectedAPI.name);
                    }else{
                        toast.current.show({severity:'error', summary: 'Lỗi', detail:'Đường dẫn không hợp lệ.', life: 3000});
                    }
                }else if(selectedAPI.name == "OPHIM"){
                    const res = await fetch(baseOPHIM + value)
                    if(res.status == 200){
                        const data = await res.json();
                        sessionStorage.setItem('apimovie', JSON.stringify(data));
                        router.push("/admin/page/add-movie?movie="+data.movie.slug+"&api=" + selectedAPI.name);
                    }else{
                        toast.current.show({severity:'error', summary: 'Lỗi', detail:'Đường dẫn không hợp lệ.', life: 3000});
                    }
                }
                
            }catch{
                toast.current.show({severity:'error', summary: 'Lỗi', detail:'Đường dẫn không hợp lệ.', life: 3000});
            }
            setLoading(false);
        }
    }
    return (  
        <div className={styles.container}>
            <Toast ref={toast} />
            <h2 className="text-white">API Movie</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className="d-flex gap-3">
                <Dropdown value={selectedAPI} onChange={(e) => setSelectedAPI(e.value)} options={options} optionLabel="name" 
                placeholder="Chọn API" />
                    <input value={value} placeholder="Nhập Slug Phim. Ví dụ: mashle-2nd-season" onChange={(e) => setValue(e.target.value)} className={styles.input} type="text" />
                </div>
                <div className="mt-4">
                    <Button loading={loading} className="text-white rounded-4" label="Gửi API" type="submit"></Button>
                </div>
            </form>
        </div>
    );
}

export default APIMovie;