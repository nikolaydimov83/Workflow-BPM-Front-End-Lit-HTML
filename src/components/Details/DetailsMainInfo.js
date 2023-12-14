import { splitStringToArrayByLineBreaks } from '../../utils/handleStrings'
import styles from './DetailsMainInfo.module.css'
export default function DetailsMainInfo({request}){
    return (
    <>
                        <div className={styles["details-headline-wrapper"]}>
                        <h1><span>Subject:</span> {request?.subjectId?.subjectName}</h1>
                        <h1><span>Статус:</span> {request?.status?.statusName}</h1>
                        <h1><span>Краен Срок:</span> {request.deadlineDate}</h1>
                        <h1><span>Клиент:</span> {request.clientName}</h1>
                    </div>

                    <div className={styles["details-headline-wrapper"]}>
                        <h1>Последен Коментар:</h1>
                        <p>
                            {request.lastCommnet?
                            <>
                            <span>{request.lastCommnet.commentOwner.email+': '}</span><br/>
                            {splitStringToArrayByLineBreaks(request?.lastCommnet?.body)
                            .map((commentLine)=><>{commentLine}<br/></>)}
                            </>

                            :'Все още няма коментари'}
                        </p>
                    </div>
    </>)
}