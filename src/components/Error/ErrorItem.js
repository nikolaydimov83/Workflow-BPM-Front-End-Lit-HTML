import styles from "./ErrorItem.module.css"

export default function ErrorItem({message}){

        return (
            <div className={styles.notification}><span>{message}</span></div>
        )
}