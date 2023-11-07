import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let resetPassTemplate=()=>html`<section id="login">
<div class="form">
  <h2>Напишете новата си парола тук</h2>
  <form @submit=${submitForm} class="login-form">
    
    <input type="text" name="password" id="password" placeholder="password" />
    
    <input type="text" name="re-password" id="password" placeholder="Repeat password" />

    <input type="text" name="resetCode" placeholder="Type your reset code here"/>
    
    <button type="submit" id="resetPassBtn">Изпрати</button>
    <p class="message">
      Не сте регистриран? <a href="/register">Регистрация</a>
    </p>
    <p class="message">Вече сте регистриран? <a href="/login">Вход</a></p>
  </form>
</div>
</section>`

let outerCtx=null;
export async function showResetPassChange(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(resetPassTemplate());
    }catch(error){
        errorHandler(error);
    }

}

async function submitForm(ev){
    ev.preventDefault();
    let id=outerCtx.params.id

    try {
        let data=loadFormData(ev.target);
        if (data.password!=data[`re-password`]){
            throw new Error('Passwords do not match!');
        }
        let serverResponseData=await post(`/users/resetPass/${id}`,data);
        setUserData(serverResponseData);
        ev.target.reset();
        outerCtx.renderNav();
        outerCtx.page.redirect('/');
    } catch (error) {
        errorHandler(error);
    }


}