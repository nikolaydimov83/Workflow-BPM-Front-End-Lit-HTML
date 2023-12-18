import { useNavigate, useParams } from 'react-router';
import { useService } from '../../hooks/useService';
import styles from './Auth.module.css'
import { loadFormData } from '../../utils/handleFormData';
import { useForm } from '../../hooks/useForm';
import { authServiceFactory } from '../../api/services/authServiceFactory';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Link } from 'react-router-dom';
export default function ResetPassTokenSubmit(){
    const {onChangeUserForm, onSubmitUserForm,formData} = useForm({password:'',"re-password":'',resetCode:''},onSubmitChngPassTokenHandler);

    const authService=useService(authServiceFactory);
    const ctx=useContext(GlobalContext);
    const navigate=useNavigate();
    const {id}=useParams();

    useEffect(()=>{
        return()=>{
            ctx.clearFieldStatuses();
        }
    },[]);

    function onSubmitChngPassTokenHandler(){
        try {
            const checkedData=loadFormData(formData);
            if (checkedData.password!==checkedData["re-password"]){
                throw new Error('Passwords do not match!');
            }
            authService.sendToken(id, checkedData).then((data)=>{
                navigate('/dashboard');
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
            <h2>Напишете новата си парола тук</h2>
            <form onSubmit={onSubmitUserForm}  class="login-form">
                
                <input 
                    type="text" 
                    name="password" 
                    id="password" 
                    placeholder="password" 
                    onChange={onChangeUserForm}
                    value={formData.password}
                    />
                
                <input 
                    type="text"
                    name="re-password" 
                    id="password" 
                    placeholder="Repeat password" 
                    onChange={onChangeUserForm}
                    value={formData['re-password']}
                    />

                <input 
                    type="text" 
                    name="resetCode" 
                    placeholder="Type your reset code here"
                    onChange={onChangeUserForm}
                    value={formData.resetCode}
                    />
                
                <button type="submit" id="resetPassBtn">Изпрати</button>
                <p>
                Не сте регистриран? <Link to="/register">Регистрация</Link>
                </p>
                <p>Вече сте регистриран? <Link to="/login">Вход</Link></p>
            </form>
            </div>
        </section>
    )
}