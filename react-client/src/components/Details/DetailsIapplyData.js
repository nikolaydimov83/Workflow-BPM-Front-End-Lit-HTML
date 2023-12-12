import styles from './DetailsIapplyData.module.css'
export default function({request}){
    return (
        <div className={styles["inlineDivDetails"]}>
        <h3>Информация за клиента</h3>
        <p class="details-property-info">
            <span>ФЦ/Рефериращ ФЦ</span>:  
            {request.finCenter}/{request.refferingFinCenter?request.refferingFinCenter
            :`Няма рефериращ`}
        </p>
        <p class="details-property-info"><span>Номер I-Apply</span>:  {request.iApplyId}</p>
        <p class="details-property-info"><span>ЕГН/Булстат</span>:   {request.clientEGFN}</p>
        <p class="details-property-info"><span>Клиент</span>:   {request.clientName}</p>
        <p class="details-property-info"><span>Продукт</span>:    {request.product}</p>
        <p class="details-property-info"><span>Сума</span>:  {request.ccy} {request.amount}</p>
    </div>
    )
}