import styles from "./main.module.css"


const AnimatedCat = ()=>{
    return(
        <>
            <link rel="stylesheet" href="" />
            <div className={styles.container}>
                <div className={styles.shadow}></div>
                <div className={styles.cat}>
                    <div className={styles.ear}></div>
                    <div className={styles.eye}></div>
                    <div className={styles.mouth}></div>
                    <div className={styles.nose}></div>
                    <div className={styles.tail}></div>
                    <div className={styles.body}></div>
                    <div className={styles.bubble}></div>
                </div>
            </div>
        </>
    )
}

export default AnimatedCat;