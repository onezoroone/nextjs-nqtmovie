/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useRef, useState } from "react";
import styles from "./addmovie.module.css";
import { notFound, useSearchParams } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Editor } from "primereact/editor";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { nameWeb } from "@/libs/baseurl";
import { Toast } from "primereact/toast";
import SlugName from "@/libs/SlugName";
function AddMovie() {
    const searchParams = useSearchParams();
    const toast = useRef(null);
    const [name, setName] = useState("");
    const [othername, setOthername] = useState("");
    const [quality, setQuality] = useState("");
    const [year, setYear] = useState("");
    const [episode, setEpisode] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");
    const [trailer, setTrailer] = useState("");
    const [casts, setCasts] = useState("");
    const [security, setSecurity] = useState(false);
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");
    const [country, setCountry] = useState("");
    const [keyword, setKeyword] = useState("");
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [loading, setLoading] = useState(false);
    const [episodes, setEpisodes] = useState(null);
    const [nameServer, setNameServer] = useState("");
    useEffect(() => {
        const source = searchParams.get('api');
        if(source){
            if(source == "NGUONC"){
                const data = JSON.parse(sessionStorage.getItem('apimovie'));
                if(!data){
                    notFound();
                }
                const movie = data.movie;
                setName(movie.name)
                setOthername(movie.original_name);
                setQuality(movie.quality);
                setEpisode(movie.current_episode);
                setCasts(movie.casts);
                setTime(movie.time);
                setDescription(movie.description);
                const { id, ...objectWithoutId } = movie.category["1"].list[0];
                setType(objectWithoutId);
                setStatus(movie.category["1"].list[1] ? movie.category["1"].list[1].name : "");
                setCountry(movie.category["4"] ? movie.category["4"].list[0].name : "");
                setYear(movie.category["3"] ? movie.category["3"].list[0].name : "");
                setImage(movie.thumb_url);
                setPoster(movie.poster_url);
                setSelectedCategories(movie.category["2"].list);
                setSecurity(true);
                setKeyword("xem phim " + movie.name+" vietsub, xem phim" + movie.original_name+" vietsub, xem phim "+ movie.name+" full hd, xem phim "+ movie.original_name+" hd");
                setEpisodes(movie.episodes[0].items);
                setNameServer("NGUONC");
            }else if(source == "OPHIM"){
                const data = JSON.parse(sessionStorage.getItem('apimovie'));
                if(!data){
                    notFound();
                }
                const movie = data.movie;
                setName(movie.name);
                setOthername(movie.origin_name);
                setQuality(movie.quality);
                setEpisode(movie.episode_current);
                const listcasts = movie.actor.join(', ');
                setCasts(listcasts);
                setTime(movie.time);
                setDescription(movie.content);
                setStatus(movie.status);
                setCountry(movie.country[0].name);
                setYear(movie.year);
                setImage(movie.thumb_url);
                setPoster(movie.poster_url);
                setSelectedCategories(movie.category);
                setSecurity(true);
                setKeyword("xem phim " + movie.name+" vietsub, xem phim" + movie.origin_name+" vietsub, xem phim "+ movie.name+" full hd, xem phim "+ movie.origin_name+" hd");
                setEpisodes(data.episodes[0].server_data);
                setNameServer("OPHIM");
            }
        }
        document.title = "Thêm Phim Mới - " + nameWeb;
    },[searchParams])
    const categories = [
        { name: 'New York', id: 'NY' },
        { name: 'Rome', id: 'RM' },
        { name: 'London', id: 'LDN' },
        { name: 'Istanbul', id: 'IST' },
        { name: 'Paris', id: 'PRS' }
    ];
    const typeMovie = [
        {name: 'Phim bộ'},
        {name: 'Phim lẻ'}
    ]
    console.log('====================================');
    console.log(casts);
    console.log('====================================');
    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(name == "" || !selectedCategories || !type){
            toast.current.show({severity:'warn', summary: 'Cảnh Báo', detail:'Không được để trống tên và thể loại phim.', life: 3000});
        }else{
            setLoading(true);
            await fetch("/api/movie/addMovie",{
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name, othername, slug: SlugName(name),quality, year, episode,time,status,image,trailer,casts, poster,security,type,description,country,keyword, selectedCategories, episodes, nameServer
                })
            })
            .then( async response => {
                if (!response.ok) {
                    const errorMessage = await response.text();
                    const jsonError = JSON.parse(errorMessage);
                    jsonError.errors.map((item) => (
                        toast.current.show({severity:'error', summary: 'Lỗi', detail: item, life: 3000})
                    ))
                }else{
                    const res = await response.json();
                    toast.current.show({severity:'success', summary: 'Thành Công', detail: res, life: 3000});
                }
            })
            setLoading(false);
        }
    }
    return (  
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h2>Thêm Phim Mới</h2>
            </div>
            <Toast ref={toast} />
            <div className={styles.background} style={{backgroundImage: `url(${poster})`}}>
                <form className="row" onSubmit={onSubmit}>
                    <div className="col-lg-9 d-flex flex-column gap-3">
                        <InputText value={name} placeholder="Tên Phim" onChange={(e) => setName(e.target.value)} />
                        <InputText value={othername} placeholder="Tên Khác" onChange={(e) => setOthername(e.target.value)} />
                        {description != "" && <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '300px' }} />}
                        {description == "" && <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '300px' }} />}
                        <MultiSelect value={selectedCategories} onChange={(e) => setSelectedCategories(e.value)} options={categories} optionLabel="name" display="chip" 
                            placeholder="Thể Loại Phim" />
                        <div className="d-flex gap-2">
                            <InputText value={year} placeholder="Năm" onChange={(e) => setYear(e.target.value)} />
                            <Dropdown value={type} onChange={(e) => setType(e.value)} options={typeMovie} optionLabel="name" 
                                placeholder="Loại Phim" className="w-100" />
                            <InputText value={status} placeholder="Trạng Thái" onChange={(e) => setStatus(e.target.value)} />
                            <InputText value={time} placeholder="Thời Lượng" onChange={(e) => setTime(e.target.value)} />
                            <InputText value={episode} placeholder="Tập Phim" onChange={(e) => setEpisode(e.target.value)} />
                        </div>
                        <div className="d-flex gap-2">
                            <InputText value={country} placeholder="Quốc Gia" onChange={(e) => setCountry(e.target.value)} />
                            <InputText value={trailer} placeholder="Trailer" onChange={(e) => setTrailer(e.target.value)} />
                            <InputText value={casts} placeholder="Diễn viên" onChange={(e) => setCasts(e.target.value)} className="w-100" />
                        </div>
                        <div className="d-flex gap-2">
                            <InputText value={quality} placeholder="Chất Lượng" onChange={(e) => setQuality(e.target.value)} />
                            <InputText value={keyword} placeholder="Từ Khóa" onChange={(e) => setKeyword(e.target.value)} className="w-100" />
                        </div>
                    </div>
                    <div className="col-lg-3 d-flex flex-column">
                        <div className="mb-3">
                            <h5 className="text-white">Bảo Mật:</h5>
                            <InputSwitch checked={security} onChange={(e) => setSecurity(e.value)} />
                        </div>
                        <div className={styles.imageBackground} style={{backgroundImage: `url(${image})`}}></div>
                        <div className="mt-3 d-flex flex-column gap-2">
                            <InputText className="w-100" value={image} placeholder="Url Ảnh" onChange={(e) => setImage(e.target.value)} />
                            <InputText className="w-100" value={poster} placeholder="Url Poster" onChange={(e) => setPoster(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <Button icon="bi bi-check" loading={loading} className="text-white" label="Thêm Phim" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMovie;