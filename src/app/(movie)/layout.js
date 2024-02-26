/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./layout.module.css";
import { getDataLayout } from "@/libs/data";
import Header from "@/components/Header/Header";

async function Layout({children}) {
    const data = await getDataLayout();
    return (  
        <div>
            <Header />
            <main className={styles.maincontent}>
                {children}
            </main>
            <footer className={`${styles.footer} d-flex flex-column align-items-center`}>
                <div className={`${styles.container}`}>
                    <div className={styles.titlefooter}>
                        <div className="d-flex">
                            <img src="/logo.png" width="80px" alt="logo" />
                            <div className="flex-1 d-flex justify-content-end align-items-center gap-3">
                                <div>
                                    <a href="https://www.facebook.com/quangthangno1"><i className="bi bi-facebook"></i> Facebook</a>
                                </div>
                                <div>
                                    <a href="#"><i className="bi bi-twitter"></i> Twitter</a>
                                </div>
                                <div>
                                    <a href="#"><i className="bi bi-google"></i> Google</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentfooter}>
                        <div className={styles.contentfootercontainer}>
                            <div className={styles.categoryhot}>
                                <h5>Thể Loại Phim Hot</h5>
                                <div className="d-flex">
                                    <ul className={styles.listfooter}>
                                        {data.categories.map((item, index) =>(
                                            <li key={index}><Link href="">{item.name}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.categoryhot}>
                                <h5>Phim Hot</h5>
                                <div className="d-flex">
                                    <ul className={styles.listfooter}>
                                        {data.movies.map((item) => (
                                            <li key={item.id}><Link href={`/${item.slug}`}>{item.name}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.support}>
                                <h5>Hỗ Trợ</h5>
                                <div className="d-flex">
                                    <ul className={styles.listsupport}>
                                        <li><Link href="">Tài Khoản Của Tôi</Link></li>
                                        <li><Link href="">FAQ</Link></li>
                                        <li><Link href="">Trung Tâm Hỗ Trợ</Link></li>
                                        <li><Link href="">Liên Hệ</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <div className={`${styles.container} d-flex`}>
                        <div className={styles.rights}>
                            Copyright © 2024, NQTMovie. All Rights Reserved
                        </div>
                        <div className={`${styles.policy} text-secondary`}>
                            Chính Sách Bảo Mật
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;