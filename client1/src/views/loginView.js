import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let loginTemplate=()=>html`<section id="login">
<div class="form">
  <h2>Вход на потребител</h2>
  <form @submit=${submitLoginForm} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">Вписване</button>
    <p class="message">
      Не сте регистриран? <a href="/register">Създайте потребител</a>
    </p>

    <p class="message">
      Забравена парола? <a href="/resetPass">Натиснете тук, за да възстановите паролата си</a>
    </p>
  </form>
</div>
</section>`

let outerCtx=null;
export async function showLogin(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(loginTemplate());
    }catch(error){
        errorHandler(error);
    }

}

async function submitLoginForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await post('/users/login',data);
        setUserData(serverResponseData);
        ev.target.reset();
        outerCtx.renderNav();
        outerCtx.page.redirect('/')
    } catch (error) {
        errorHandler(error);
    }


}