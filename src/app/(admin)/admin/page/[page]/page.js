import APIMovie from "@/app/(admin)/(views)/(APIMovie)/APIMovie";
import AddMovie from "@/app/(admin)/(views)/(AddMovie)/AddMovie";
import Dashboard from "@/app/(admin)/(views)/(Dashboard)/Dashboard";

function Page({params}) {
    const page = params.page;
    return (
        <>
            {page == "api" && <APIMovie />}
            {page == "dashboard" && <Dashboard />}
            {page == "add-movie" && <AddMovie />}
        </>
    );
}

export default Page;