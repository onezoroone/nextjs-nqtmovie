import styles from "./loading.module.css";
function Loading() {
    return (  
        <div className="d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
            <div class={styles.loader}></div>
        </div>
    );
}

export default Loading;