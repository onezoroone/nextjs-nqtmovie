/* eslint-disable @next/next/no-img-element */
"use client"
import styles from "./header.module.css";
import Link from "next/link";
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from "react";
import { Sidebar } from 'primereact/sidebar';
import { checkAuth } from "@/libs/auth";
import { usePathname } from "next/navigation";

function Header() {
    const pathname = usePathname();
    const [check, setCheck] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const navbar = [
        {
            name: 'Trang chủ',
            link: '/'
        },
        {
            name: 'Thể loại',
            link: 'category'
        },
        {
            name: 'Quốc gia',
            link: 'category'
        },
        {
            name: 'Phim bộ',
            link: 'category'
        },
        {
            name: 'Phim lẻ',
            link: 'category'
        }
    ];
    useEffect(()=>{
        const checkCookie = async () => {
            const res = await checkAuth();
            setCheck(res);
        }
        checkCookie();
    },[pathname])
    const handleLogOut = async () => {
        await fetch("/api/user/logout",{
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
        setCheck(false);
    }
    return (  
        <div className="d-flex justify-content-center">
            <nav className={styles.navbar}>
                <Link href="/"><img src="/jack.png" className={styles.brand} alt="logo" /></Link>
                <ul className={styles.listnav}>
                    {navbar.map((item, index) => (
                    <li key={index}>
                        <Link href={item.link}>{item.name}</Link>
                    </li>
                    ))}
                </ul>
                <div className="flex-1 d-flex justify-content-end align-items-center gap-3">
                    <form className={styles.formsearch}>
                        <div className={styles.searchcontainer}>
                            <input type="text" className={styles.input} placeholder="Tìm kiếm..." />
                            <i className="bi bi-search"></i>
                        </div>
                    </form>
                    <i className={`${styles.searchIcon} bi bi-search`} onClick={() => setVisible(true)}></i>
                    <Dialog header="Tìm kiếm" visible={visible} onHide={() => setVisible(false)}
                        style={{ width: '50vw' }} breakpoints={{'660px': '95vw'}}>
                        <form>
                            <div className={styles.searchcontainermobile}>
                                <input type="text" className={styles.inputmobile} placeholder="Tìm kiếm..." />
                                <i className="bi bi-search"></i>
                            </div>
                        </form>
                    </Dialog>
                    <i className={`bi bi-list ${styles.menu}`} onClick={() => setVisibleSidebar(true)}></i>
                    <Sidebar visible={visibleSidebar} onHide={() => setVisibleSidebar(false)}>
                        <div className="d-flex align-items-center gap-4">
                            <img src="/logo.png" width="50px" height="50px" alt="logo" />
                            <h2>NQT Movie</h2>
                        </div>
                        <ul className={styles.listnavmobile}>
                            {navbar.map((item, index) => (
                            <li key={index}>
                                <Link href={item.link}>{item.name}</Link>
                            </li>
                            ))}
                        </ul>
                    </Sidebar>
                    <div className="d-flex align-items-center gap-2">
                        {!check ? <Link href="/user/login"><i className={`${styles.user} bi bi-person-circle`}></i></Link>
                        :  <>
                        <div className="dropdown">
                            <button className="btn p-0 btn-transparent d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className={`${styles.user} bi bi-person-circle text-white`}></i>
                                <i className="bi bi-chevron-down text-white"></i>
                            </button>
                            <ul className="dropdown-menu bg-secondary">
                                <li><Link className="dropdown-item" href="/">Tài khoản</Link></li>
                                <li><button onClick={() => handleLogOut()} className="dropdown-item text-white">Đăng Xuất</button></li>
                            </ul>
                        </div>
                        </>}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;