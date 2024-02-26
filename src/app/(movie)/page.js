/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./home.module.css";
import MainCarousel from "@/components/MainCarousel/MainCarousel";
import { getData } from "@/libs/data";
import CarouselUpdated from "@/components/CarouselUpdated/CarouselUpdated";
import RankingLayout from "@/components/Ranking/RankingMovie";
import { baseUrl, nameWeb } from "@/libs/baseurl";
export const metadata = {
    metadataBase: baseUrl,
    title: "Xem Phim Vietsub Onlinet - "+ nameWeb,
    description: "Xem phim vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các bộ phim sớm nhất.",
    keywords: "xem phim, anime, animetv, animehay, phim hay, anime vietsub, phim vietsub, vietsub online, phim vietsub online, xem anime, phim hd, xem phim full hd, phim moi nhat, phim anime, hoat hinh, nqtmovie, nqt movie",
    openGraph : {
        images: "/jack.png",
        title: 'Xem Phim Vietsub Onlinet - '+ nameWeb,
        description: "Xem phim vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các bộ phim sớm nhất.",
        type: "website"
    }
}
async function Page() {
    const data = await getData();
    return (  
        <div>
            <MainCarousel movie={data.banners} />
            <div className="d-flex align-items-center flex-column">
                <div className={styles.container}>
                    <RankingLayout daily={data.daily} monthly={data.monthly} weekly={data.weekly} />
                </div>
                <div className={styles.morecontainer}>
                    <Link href="/" className={styles.btnmore}><i className="bi bi-plus"></i>XEM THÊM</Link>
                </div>
                <section className={styles.sectioncontainer}>
                    <div className={styles.container}>
                        <h2 className="mb-4">
                            Phim mới cập nhật
                        </h2>
                        <CarouselUpdated title="Hãy Đón Xem Những Bộ Phim Mới Nhất!" movie={data.updatedMovies} />
                    </div>
                </section>
                <section className={`${styles.container} mt-4`}>
                    <h2 className="mb-4">Phim Bộ Mới</h2>
                    <div className={styles.listmovie}>
                    {data.seriesmovies.map((item) => (
                        <div key={item.id} className={styles.animation}>
                            <Link href={item.slug}>
                                <img className={styles.imgList} src={item.img} title={item.name} alt={item.name} />
                                <div className={styles.hover}>
                                    <i className="fs-1 bi bi-play-circle"></i>
                                </div>
                            </Link>
                            <div className={`${styles.detailsmovie} p-0`}>
                                <div className={styles.episode}>
                                    {item.episode}
                                </div>
                                <p className="fs-6">{item.year}</p>
                                <Link href={item.slug}><h6>{item.name}</h6></Link>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
                <div className={`${styles.morecontainer} mt-5`}>
                    <Link href="/" className={styles.btnmore}><i className="bi bi-plus"></i>XEM THÊM</Link>
                </div>
                <section className={`${styles.sectioncontainer} mt-5`}>
                    <div className={styles.container}>
                        <h2 className="mb-4">Phim Lẻ Mới</h2>
                        <div className={styles.listmovie}>
                        {data.singlemovies.map((item) => (
                            <div key={item.id} className={styles.animation}>
                                <Link href={item.slug}>
                                    <img className={styles.imgList} src={item.img} title={item.name} alt={item.name} />
                                    <div className={styles.hover}>
                                        <i className="fs-1 bi bi-play-circle"></i>
                                    </div>
                                </Link>
                                <div className={`${styles.detailsmovie} p-0`}>
                                    <div className={styles.episode}>
                                        {item.episode}
                                    </div>
                                    <p className="fs-6">{item.year}</p>
                                    <Link href={item.slug}><h6>{item.name}</h6></Link>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className={`${styles.morecontainer} mt-5`}>
                        <Link href="/" className={styles.btnmore}><i className="bi bi-plus"></i>XEM THÊM</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Page;