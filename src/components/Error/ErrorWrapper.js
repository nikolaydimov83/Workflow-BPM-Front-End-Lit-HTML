import { useContext } from "react"
import { GlobalContext } from "../../contexts/GlobalContext"
import ErrorItem from "./ErrorItem"
import styles from "./ErrorWrapper.module.css"
export default function ErrorWrapper(){
    const ctx=useContext(GlobalContext)

    return (
        <div className={ctx.errMessages.length>0?styles["notification-wrapper"]:styles["display-none"]}>
            {ctx.errMessages.map((message,index)=>{
                console.log(message)
                return <ErrorItem key={index} message={message}/>
                })}
        </div>
    )
}