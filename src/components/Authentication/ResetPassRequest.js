import { useNavigate } from 'react-router';
import { useService } from '../../hooks/useService';
import styles from './Auth.module.css'
import { loadFormData } from '../../utils/handleFormData';
import { useForm } from '../../hooks/useForm';
import { authServiceFactory } from '../../api/services/authServiceFactory';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Link } from 'react-router-dom';
export default function ResetPassRequest(){
    const {onChangeUserForm, onSubmitUserForm,formData} = useForm({email:''},onSubmitChngPassReqHandler);

    const authService=useService(authServiceFactory);
    const ctx=useContext(GlobalContext);
    const navigate=useNavigate()

    useEffect(()=>{
        return()=>{
            ctx.clearFieldStatuses();
        }
    },[]);

    function onSubmitChngPassReqHandler(){
        try {
            const checkedData=loadFormData(formData);
            authService.changePassTokenReq(checkedData).then((data)=>{
                navigate('/resetPass/'+data._id);
            }).catch((err)=>{
                ctx.handleError(err);
            })

        } catch (error) {
            ctx.handleError(error)
        }

    }
    return (
        <section id="login">
            <div className={styles["form"]}>
            <h2>Въведете e-mail</h2>
            <form onSubmit={onSubmitUserForm}>
                <input onChange={onChangeUserForm} type="text" name="email" id="email" placeholder="email" />
                <button type="submit">Изпрати</button>
                <p>
                Не сте регистриран? <Link href="/register">Регистрирайте се тук</Link>
                </p>
                <p>Вече сте регистриран? <Link href="/login">Вход</Link></p>
            </form>
            </div>
        </section>
    )
}