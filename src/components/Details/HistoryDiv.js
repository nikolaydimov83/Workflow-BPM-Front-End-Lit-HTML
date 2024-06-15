import { useContext } from "react";
import { DetailsContext } from "../../contexts/DetailsContext";
import styles from "./HistoryDiv.module.css"

export default function HistoryDiv(){
    const ctxDetails=useContext(DetailsContext)
    function closeDetails(){
        ctxDetails.setHistoryActive(false);
    }
    return (
        <>


        <div class={styles["overlay"]} >
            <div class={styles["backdrop"]} ></div>
            <div class={styles["modal"]}>
                <div class={styles["detail-container"]}>
                <header class={styles["headers"]}>
                    <h2>История на заявката</h2>
                    <button onClick={closeDetails} class={styles["btn"]}>
                    Х
                    </button>
                </header>
                <div class={styles["content"]}>
                {ctxDetails.historyArray.map((element)=>
                    <p>
                        <span>Дата: </span>{element.incomingDate}, 
                        <span> Изпращач: </span>{element.statusSender}, 
                        <span> Статус: </span>{element.status.statusName}
                    </p>)}
                </div>
                </div>
            </div>
            </div>
        </>
    )
}