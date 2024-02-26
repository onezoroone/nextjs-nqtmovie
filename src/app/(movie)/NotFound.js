function NotFound({message}) {
    return (  
        <div style={{height:'50vh'}}>
            <div className="w-100 d-flex justify-content-center align-items-center text-white h-100">
                <h3>404 <span>|</span> {message}</h3>
            </div>
        </div>
    );
}

export default NotFound;