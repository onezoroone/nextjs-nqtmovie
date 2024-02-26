"use server"
import { cookies } from "next/headers";

export async function checkAuth(){
    const cookiesStore = cookies();
    const jwt = cookiesStore.get('jwt');
    if(jwt){
        return true;
    }else{
        return false;
    }
}