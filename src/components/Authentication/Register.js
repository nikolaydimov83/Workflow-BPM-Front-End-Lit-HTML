import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import { loadFormData } from "../../utils/handleFormData";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { authServiceFactory } from "../../api/services/authServiceFactory";
import { useService } from "../../hooks/useService";
import styles from "./Auth.module.css"

export default function Register(){
    const {onChangeUserForm,onSubmitUserForm,formData}=useForm({
        email:'',
        password:'',
        "re-password":''
    },onRegisterSubmitHandler);

    const authService=useService(authServiceFactory);
    const ctx=useContext(GlobalContext);
    const navigate=useNavigate();
    useEffect(()=>{
        return ()=>{
            ctx.clearFieldStatuses();
        }
    },[])

    function onRegisterSubmitHandler(){
        try {
            const checkedData=loadFormData(formData);
            if (checkedData.password!==checkedData["re-password"]){
                throw new Error('Passwords do not match!');
            }
            authService.register(checkedData).then((data)=>{
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
        <section id="register">
            <div className={styles.form}>
            <h2>Регистрация на потребител</h2>
            <form onSubmit={onSubmitUserForm} className="login-form">
                <input
                className={ctx.fieldStatuses?.email?styles.error:''}
                onChange={onChangeUserForm}
                value={formData.email}
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
                />
                <input
                className={ctx.fieldStatuses?.password?styles.error:''}
                onChange={onChangeUserForm}
                value={formData.password}
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
                />
                <input
                
                onChange={onChangeUserForm}
                className={ctx.fieldStatuses?.["re-password"]?styles.error:''}
                value={formData["re-password"]}
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
                />
                <button type="submit">Регистрация</button>
                <p className="message">Вече сте регистриран? <Link to="/login">Вход</Link></p>
                <p className="message">
                Забравена парола? <Link to="/resetPass">Натиснете тук, за да възстановите паролата си</Link>
                </p>
            </form>
            </div>
        </section>
    )
}