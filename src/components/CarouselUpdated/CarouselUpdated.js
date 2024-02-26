/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import styles from "./caroselupdated.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselUpdated({movie, title}) {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 701 },
          items: 5
        },
        vippro: {
          breakpoint: { max: 700, min: 580 },
          items: 4
        },
        sm: {
          breakpoint: { max: 579, min: 463 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
    return (
        <div className={styles.carouselUpdatedContainer}>
        <div className={styles.updatedcontainer}>
            <Carousel autoPlay={true} autoPlaySpeed={3000} infinite={true} containerClass={styles.carouselcontainer} responsive={responsive}>
            {movie.map((item) => (
                <div key={item.id} className={`${styles.slideitem}`}>
                    <Link href={item.slug}><img className={styles.imgupdated} src={item.img} title={item.name} alt={item.name} /></Link>
                    <div className={styles.detailsmovie}>
                        <p>{item.episode} - {item.type}</p>
                        <Link href={item.slug}><h6>{item.name}</h6></Link>
                    </div>
                </div>
            ))}
            </Carousel>
            <div className={`d-flex h-100 justify-content-center position-relative flex-column ${styles.titleupdatedContent}`}>
                <h2 className={styles.titleUpdated}><span className="position-relative">{title}</span></h2>
                <Link className={styles.viewall} href="/">Xem Tất Cả <i className="bi bi-chevron-right"></i></Link>
            </div>
        </div>
        
        </div>
    );
}

export default CarouselUpdated;