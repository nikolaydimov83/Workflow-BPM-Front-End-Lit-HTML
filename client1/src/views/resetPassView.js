import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let resetPassTemplate=()=>html`<section id="login">
<div class="form">
  <h2>Fill in your mail to reset password</h2>
  <form @submit=${submitForm} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <button type="submit">Reset Pass</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`

let outerCtx=null;
export async function showResetPass(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(resetPassTemplate());
    }catch(error){
        errorHandler(error);
    }

}

async function submitForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await post('/users/resetPass',data);
        outerCtx.page.redirect('/resetPass/'+serverResponseData._id)
    } catch (error) {
        errorHandler(error);
    }


}