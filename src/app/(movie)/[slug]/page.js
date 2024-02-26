/* eslint-disable @next/next/no-img-element */
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import styles from "./details.module.css";
import { getDetailsMovie } from "@/libs/data";
import Description from "@/components/Description/Description";
import CarouselUpdated from "@/components/CarouselUpdated/CarouselUpdated";
import { baseUrl } from "@/libs/baseurl";
import NotFound from "../NotFound";

export async function generateMetadata({ params }) {
    const data = await getDetailsMovie(params.slug);
    if(data.status == "error"){
        return <NotFound message={data.message} />
    }
    return {
        metadataBase: baseUrl + data.movie.slug,
        title: data.movie.name + " [HD Vietsub] - " + data.movie.othername,
        description: data.movie.des,
        keywords: data.movie.keyword +", nqtmovie, phimmoi",
        openGraph: {
            image: data.movie.img,
            url: baseUrl + data.movie.slug,
            type: 'article',
            robots: 'index,follow'
        },
    }
}

async function Page({params}) {
    const data = await getDetailsMovie(params.slug);
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
    return (  
        <div className="w-100 d-flex flex-column align-items-center">
            <div className={styles.container}>
                <BreadCrumb data={breadcrumb} />
                <div className={styles.background} style={{backgroundImage: `url(${data.movie.poster})`}}>
                </div>
                <div className="row p-0 m-0">
                    <div className="col-lg-3 d-flex justify-content-center">
                        <img className={styles.image} src={data.movie.img} alt={data.movie.name} />
                    </div>
                    <div className="col-lg-9 mt-3">
                        <h1 className={styles.title}>{data.movie.name}</h1>
                        <h3 className={styles.othername}>{data.movie.othername}</h3>
                        <Description history={data.history} movie={data.movie} episodes={data.episodes} />
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <h2 className={styles.suggesttitle}>Có Thể Bạn Sẽ Thích</h2>
                <div className="mt-3">
                    <CarouselUpdated movie={data.related} title="Có Thể Bạn Sẽ Thích" />
                </div>
            </div>
        </div>
    );
}

export default Page;