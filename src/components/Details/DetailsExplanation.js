import styles from './DetailsIapplyData.module.css'
export default function DetailsExplanation({request}){
    return (
        <div className={styles["inlineDivDetails"]}>
        <h3>Описание по детайли на заявката</h3>
        <p class="details-property-info-description"><span></span>  {request.description}</p>
    </div>
    )
}