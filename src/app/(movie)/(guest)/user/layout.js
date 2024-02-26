/* eslint-disable @next/next/no-img-element */
import styles from "./user.module.css";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

async function LayoutGuest({children}) {
    const cookieStore = cookies()
    const hasCookie = cookieStore.has('jwt');
    if(hasCookie){
        redirect("/")
    }
    return (  
        <div className="d-flex justify-content-center">
            <div className={styles.container}>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex gap-3 align-items-center">
                        <img src="/logo.png" alt="NQT Movie" width="70px" height="70px" />
                        <div className="flex-1 d-flex h-100 align-items-center">
                            <h4><span className="text-secondary">Chào mừng đến</span> NQT Movie</h4>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LayoutGuest;