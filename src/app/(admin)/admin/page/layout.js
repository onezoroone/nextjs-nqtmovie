/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./layout.module.css";
import { getUser } from "@/libs/data";
import { notFound } from "next/navigation";
async function Layout({children}) {
    const response = await getUser();
    if(response.status == "Thất bại"){
        notFound();
    }else{
        if(response.user.role != "admin"){
            notFound();
        }
    }
    const sidebar = [
        {
            name: 'Dashboard',
            link: 'dashboard'
        },
        {
            name: 'Api',
            link: 'api'
        }
    ]
    return (  
        <div>
            <nav className={styles.sidebar}>
                <div className={styles.containerlogo}>
                    <img src="/logo.png" width="70px" height="70px" alt="NQTMovie" />
                    <h3 className={styles.titleLogo}>NQT Movie</h3>
                </div>
                <div className={styles.customer}>
                    <i className="bi bi-person-circle"></i>
                    <div className="d-flex flex-column gap-2">
                        <div>
                            Welcome <span className="text-danger">Nghiêm Quang Thắng</span>
                        </div>
                        <div className="text-secondary">
                            Admin
                        </div>
                    </div>
                </div>
                <ul className={styles.listsidebar}>
                    {sidebar.map((item,index) => (
                        <li key={index}><Link href={item.link}>{item.name}</Link></li>
                    ))}
                </ul>
            </nav>
            <header className={styles.header}>Header</header>
            <main className={styles.maincontent}>
                {children}
            </main>
        </div>
    );
}

export default Layout;