import styles from "@/styles/hourGlass.module.css"

export default function HourGlass(){
    return (
        <div className={`place-items-center ${styles.wraperdiv} w-[100vw] h-[100vh] dark:`}>
            <div className={styles.hourglass}></div>
        </div>
    );
}


