import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { loadFormData } from "../../utils/handleFormData";
import { useService } from "../../hooks/useService";
import { authServiceFactory } from "../../api/services/authServiceFactory";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import styles from "./Auth.module.css"
import { useError } from "../../hooks/useError";

export default function Login(){
    //const {handleError,errMessages,fieldStatuses}=useError()
    const {onChangeUserForm, onSubmitUserForm,formData} = useForm({
        email:'',
        password:''
    },onSubmitLoginFormHandler);

    const authService=useService(authServiceFactory);
    const ctx=useContext(GlobalContext);
    const navigate=useNavigate()

    useEffect(()=>{
        ctx.clearFieldStatuses();
    },[]);

    function onSubmitLoginFormHandler(){
        try {
            const checkedData=loadFormData(formData);
            authService.login(checkedData).then((data)=>{
                ctx.loginUser(data);
                navigate('/dashboard');
            }).catch((err)=>{
                ctx.handleError(err);
            })

        } catch (error) {
            ctx.handleError(error)
        }
    }

    return (

    <section  id="login">
        <div className={styles.form}>
        <h2>Вход на потребител</h2>
        <form  onSubmit={onSubmitUserForm} className="login-form">
            <input 
            className={ctx.fieldStatuses?.email?styles.error:''}
            onChange={onChangeUserForm}
            value={formData.email} 
            type="text" 
            name="email" 
            id="email" 
            placeholder="email"
             
            />


            <input
            className={ctx.fieldStatuses?.password?styles.error:''}
            onChange={onChangeUserForm}
            value={formData.password}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            />
            <button type="submit">Вписване</button>
            <p className="message">
            Не сте регистриран? <Link to="/register">Създайте потребител</Link>
            </p>

            <p className="message">
            Забравена парола? <Link to="/resetPass">Натиснете тук, за да възстановите паролата си</Link>
            </p>
        </form>
        </div>
    </section>
    )


}