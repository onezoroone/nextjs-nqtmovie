/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import styles from "./template.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function IframeTemplate({data}) {
    const router = useRouter();
    const [active, setActive] = useState(false);
    const [watchedEpisodes, setWatchedEpisodes] = useState([]);
    const [server, setServer] = useState(0);
    useEffect(() => {
        const storedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes'));
        if (storedEpisodes) {
            setWatchedEpisodes(storedEpisodes);
        }
    },[])
    const handleChangeEp = (slug, episode, idEp) => {
        if(!watchedEpisodes.includes(idEp)) {
            const newWatchedEpisodes = [...watchedEpisodes, idEp];
            setWatchedEpisodes(newWatchedEpisodes);
            localStorage.setItem('watchedEpisodes', JSON.stringify(newWatchedEpisodes));
        }
        router.push(`/${slug}/${episode}`);
    }
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 4
        },
        tabletmini: {
            breakpoint: { max: 768, min: 500 },
            items: 3
        },
        mobile: {
          breakpoint: { max: 500, min: 0 },
          items: 2
        }
      };
    return (  
        <>
        <div className={`col-lg-9 ${active && styles.active} p-0`}>
            <div className={styles.iframecontainer}>
                <iframe className={styles.iframe} src={data.currentEpisode[server].ep_link} allowFullScreen>
                </iframe>
            </div>
            <div className="d-flex mt-2 position-relative">
                <div className="d-flex flex-column w-100 align-items-center">
                    <h5 className="text-white">Chọn máy chủ</h5>
                    <div className="d-flex gap-3">
                    {data.currentEpisode.map((item, index) => (
                        <div onClick={() => setServer(index)} className={`${styles.server} ${index == server && styles.activeServer}`} key={index}>
                            {item.server}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="position-absolute d-flex justify-content-lg-end gap-2" style={{top:'0', right:'0'}}>
                    {!active ? <button onClick={() => setActive(!active)} className={`${styles.extension} ${styles.btnExpand}`}>Phóng To<i className="bi bi-arrows-fullscreen"></i></button> : <button onClick={() => setActive(!active)} className={styles.extension}>Thu Nhỏ<i className="bi bi-arrows-fullscreen"></i></button> }
                    {data.episodes[0].ep_number != data.currentEpisode[0].ep_number && <Link href={`/${data.movie.slug}/tap-${parseInt(data.currentEpisode[0].ep_number) + 1}`} className={styles.extension}><span>Tập Tiếp</span><i className="bi bi-chevron-double-right"></i></Link>}
                </div>
            </div>
        </div>
        <div className={`col-lg-3 ${active && styles.active} p-0`}>
            <div className={`${styles.boxepisodes} ${active && "d-none"}`}>
                {data.episodes.map((item, index) => (
                <div onClick={() => handleChangeEp(data.movie.slug, item.slug, item.id)} className={`${styles.itemEpisode} ${item.ep_number == data.currentEpisode[0].ep_number && styles.activeEpisode}`} key={index}>
                    <div className={styles.thumbnail}>
                        <img src={data.movie.poster} className={styles.imgepisode} alt={data.movie.name} />
                        <div className={styles.timeThumbnail}>{data.movie.time}</div>
                    </div>
                    <span className={watchedEpisodes.includes(item.id) ? 'text-secondary' : 'text-white'}>Tập {item.ep_number}</span>
                </div>
                ))}
            </div>
            <div className={`${styles.boxepisodesMobile} ${active && "d-block"} mt-5`}>
            <Carousel infinite={true} responsive={responsive}>
                {data.episodes.map((item, index) => (
                    <div onClick={() => handleChangeEp(data.movie.slug, item.slug, item.id)} className={`${styles.boxepisodesMobileItem} ${item.ep_number == data.currentEpisode[0].ep_number && styles.activeEpisodeMobile}`} key={index}>
                        <div className="position-relative">
                            <img className={styles.imgMobile} src={data.movie.poster} alt={data.movie.name} />
                            <span className={`${styles.timeThumbnail} text-white fs-6`}>{data.movie.time}</span>
                        </div>
                        <div className={styles.titleEpisodesBox}>
                            <span className={watchedEpisodes.includes(item.id) ? 'text-secondary' : 'text-white'}>Tập {item.ep_number}</span>
                        </div>
                    </div>
                ))}
            </Carousel>;
            </div>
        </div>
        </>
    );
}

export default IframeTemplate;