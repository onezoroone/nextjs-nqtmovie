import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { baseUrl } from "@/libs/baseurl";
import { getEpisodeMovie } from "@/libs/data";
import styles from "./watchmovie.module.css";
import IframeTemplate from "@/components/IframeTemplate/IframeTemplate";
import CarouselUpdated from "@/components/CarouselUpdated/CarouselUpdated";
import NotFound from "../../NotFound";
export async function generateMetadata({ params }) {
    const data = await getEpisodeMovie(params.slug, params.episode);
    if(data.status == "error"){
        return <NotFound message={data.message} />
    }
    return {
        metadataBase: baseUrl + data.movie.slug + "/" + data.currentEpisode[0].slug,
        title: "Xem Phim " + data.movie.name + " Tập " + data.currentEpisode[0].ep_number + " [HD Vietsub]",
        description: data.movie.des,
        keywords: 'xem phim ' + data.movie.name + "tập " + data.currentEpisode[0].ep_number +", " + data.movie.keyword +", nqtmovie, phimmoi",
        openGraph: {
            image: data.movie.img,
            url: baseUrl + data.movie.slug + "/" + data.currentEpisode[0].slug,
            type: 'article',
            robots: 'index,follow'
        },
    }
}

async function Page({ params }) {
    const data = await getEpisodeMovie(params.slug, params.episode);
    if(data.status == "error"){
        return <NotFound message={data.message} />
    }
    const breadcrumb = data.categories.map(category => ({
        name: category.name,
        link: `/category/${category.idCategory}`
    }));
    breadcrumb.unshift({
        name: 'Trang Chủ',
        link: '/'
    });
    breadcrumb.push({
        name: data.movie.name,
        link: '/'+data.movie.slug
    });
    breadcrumb.push({
        name: `Tập ${data.currentEpisode[0].ep_number}`,
        link: '#'
    });
    return ( 
        <div className="w-100 d-flex flex-column align-items-center ">
            <div className={styles.container}>
                <BreadCrumb data={breadcrumb} />
                <div className="row p-0 m-0">
                    <IframeTemplate data={data} />
                </div>
               <div className={styles.MoreMovie}>
                    <h4 className={styles}>{data.movie.name}</h4>
                    <div>
                        {data.movie.year} <span>|</span> {data.movie.time} <span>|</span> {data.movie.type} <span>|</span> {data.movie.status}
                    </div>
               </div>
            </div>
            <div className="w-100 d-flex justify-content-center mt-4" style={{background: 'var(--bg-main)'}}>
                <div className={styles.container}>
                    <h2 className={styles.suggesttitle}>Có Thể Bạn Sẽ Thích</h2>
                    <div className="mt-3">
                        <CarouselUpdated movie={data.related} title="Có Thể Bạn Sẽ Thích" />
                    </div>
                </div>
            </div>
            <div className={`${styles.container} mt-3`}>
                <div className={styles.titleReviewsContainer}>
                    <h4 className={styles.titleReviews}><span>{data.movie.name}</span> <i>/</i> <b>Đánh Giá</b></h4>
                </div>
                <div className={styles.morereviews}>
                    <span>Để lại bình luận của bạn</span>
                </div>
                <div className={styles.reviewsContainer}>
                    <form className={styles.formReviews}>
                        <textarea placeholder="Viết Đánh giá..." />
                        <div className="d-flex flex-column">
                            <select>
                                <option value="null">Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <div className="flex-1 d-flex align-items-end justify-content-end">
                                <button className={styles.btnSubmitReviews} type="submit">Gửi đánh giá</button>
                            </div>
                        </div>
                    </form>
                    <div className={styles.bodyReviews}>
                        <div className="rounded-2 p-3" style={{background: '#0a0d14'}}>
                            <div className={styles.headbodyReviews}>
                                <i className="fs-1 bi bi-person-circle"></i>
                                <div className="d-flex flex-column">
                                    <b>Nghiêm Quang Thắng</b>
                                    <span>2023-12-01, 12:00:00</span>
                                </div>
                            </div>
                            <div className={styles.contentBodyReviews}>
                                <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2 p-3" style={{background: '#0a0d14'}}>
                            <div className={styles.headbodyReviews}>
                                <i className="fs-1 bi bi-person-circle"></i>
                                <div className="d-flex flex-column">
                                    <b>Nghiêm Quang Thắng</b>
                                    <span>2023-12-01, 12:00:00</span>
                                </div>
                            </div>
                            <div className={styles.contentBodyReviews}>
                                <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there anything embarrassing hidden in the middle of text.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;