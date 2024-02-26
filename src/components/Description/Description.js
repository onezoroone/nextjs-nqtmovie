"use client"
import { useState } from "react";
import styles from "./description.module.css";
import { Rating } from 'primereact/rating';
import Link from "next/link";
function Description({movie, episodes, history}) {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(3);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <div className={styles.description}>
                <div className="mb-3 d-flex align-items-center gap-3">
                    <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} />
                    <span className="fs-5">3/5</span>
                    <div className="d-flex gap-1">
                        <i className="bi bi-eye-fill"></i>
                        <span>{movie.views} lượt xem</span>
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center gap-2">
                    {movie.year}
                    <span className={styles.dots}></span>
                    {movie.type}
                    <span className={styles.dots}></span>
                    {movie.time}
                    <span className={styles.dots}></span>
                    {movie.quality}
                </div>
                <div className="mb-3 d-flex gap-2 align-items-center">
                    {movie.status}
                    <span className={styles.dots}></span>
                    <div className={styles.bgepisode}>
                        {movie.episode}
                    </div>
                </div>
                {(movie.des.length > 400 && !expanded) ? (
                    <>
                    <div dangerouslySetInnerHTML={{ __html: `${movie.des.substring(0, 400)}....` }} />
                    <button className={styles.btn} onClick={toggleExpand}>Xem thêm...</button>
                    </>
                ):(
                    <>
                    <div dangerouslySetInnerHTML={{ __html: movie.des}} />
                    {movie.des.length > 400 && <button className={styles.btn} onClick={toggleExpand}>Ẩn bớt</button>}
                    </>
                )}
                <div className={styles.casts}>
                    Diễn viên: <span className="text-white">{movie.casts}</span>
                </div>
                <div className="d-flex">
                    <div className="row p-0 m-0">
                        <div className={`${styles.groupBtn} col-md-6 d-flex gap-3 p-0`}>
                            {episodes.length > 0 && <Link href={`/${movie.slug}/${episodes[episodes.length - 1].slug}`} className={styles.btnWatch}><i className="bi bi-play-circle"></i>Xem Ngay</Link>}
                            {history && <Link href={`/${movie.slug}/${history.slug}`} className={styles.btnContinue}><i className="bi bi-play-circle"></i>Xem Tiếp</Link>}
                        </div>
                        <div className={`${styles.groupBtn} col-md-6 d-flex gap-3`}>
                            <Link href="/" className={styles.btnTrailer}><i className="bi bi-play-circle"></i>Trailer</Link>
                            <Link href="/" className={styles.btnWatchList}><i className="bi bi-plus"></i>Xem sau</Link>
                        </div>
                    </div>
                </div>
                <div className="d-flex mt-3 flex-column">
                    {episodes.length > 0 && (
                        <>
                        <h4 className="text-white">Tập mới nhất</h4>
                        <div className="d-flex gap-3">
                            {episodes.slice(0,5).map((item, index)=>(
                                <Link key={index} href={`/${movie.slug}/${item.slug}`}>
                                <div className={styles.episode}>
                                    {item.ep_number}
                                </div>
                                </Link>
                            ))}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Description;