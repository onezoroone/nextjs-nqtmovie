import { cookies } from "next/headers";

const baseurl = "http://nqtmovie.helioho.st/"

export async function getData() {
    const res = await fetch(baseurl + 'api/movie/fetchData', {
        cache: 'no-store'
    })
    return res.json();
}

export async function getDataLayout() {
    const res = await fetch(baseurl + 'api/movie/fetchDataLayout')
    return res.json();
}

export async function getDetailsMovie(slug) {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt');
    const res = await fetch(baseurl + 'api/movie/getMovie/'+ slug, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
            'Cookie': `${jwt && `jwt=${jwt.value};`}`
        },
    });
    return res.json();
}

export async function getEpisodeMovie(slug, episode) {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt');
    const res = await fetch(baseurl + 'api/movie/getEpisodeByMovie/'+ slug+"/" + episode, {
        next: { revalidate: 3600 },
        credentials: 'include',
        headers: {
            'Cookie': `${jwt && `jwt=${jwt.value};`}`
        },
    });
    return res.json();
}

export async function getUser (){
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt');
    const res = await fetch(baseurl + 'api/user', {
        next: { revalidate: 10 },
        credentials: 'include',
        headers: {
            'Cookie': `${jwt && `jwt=${jwt.value};`}`
        },
    })
    return res.json();
}