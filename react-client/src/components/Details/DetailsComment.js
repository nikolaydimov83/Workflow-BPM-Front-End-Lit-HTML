import styles from './DetailsComment.module.css';
export default function DetailsComment({comment}){
    return (
       
            <div class={styles['comments-history']}>
                <div ><span>{comment?.commentOwner?.email} : {comment?.commentDate} </span>
                </div><p class='comment-body-history'><br/>{comment?.body}</p>
            </div>
        

    )
}