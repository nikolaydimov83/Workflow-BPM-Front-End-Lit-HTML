import { useParams } from "react-router";
import dashboardServiceFactory from "../../api/services/dashboardServiceFactory";
import { useService } from "../../hooks/useService";
import {useContext} from "react";
import { DetailsContext } from "../../contexts/DetailsContext";
import { stringifyDates } from "../../utils/handleDates";
import styles from './HistoryButton.module.css'


export default function HistoryButton(){
    const detailsCtx=useContext(DetailsContext);
    const dashAPI =useService(dashboardServiceFactory);
    async function handleOnClickHistoryBtn(e){
        const history=await dashAPI.getHistory(detailsCtx.id)
        const processedHistory=stringifyDates(history)        
        await detailsCtx.setHistoryArray(processedHistory)
        await detailsCtx.setHistoryActive(true);

        console.log(history);
    }
    return (
    <>
        <button onClick={handleOnClickHistoryBtn} name="showHistory" className={styles['btn']}>Покажи история</button>
       
    </>
    
    )
}