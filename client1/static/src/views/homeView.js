import { get } from '../api/api.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

let homeTemplate=()=>html`        <section id="home">
<h1>Welcome to Plan B workflow system!</h1>
<img src="./images/logoLargePost1.png" alt="home" />
<h2>A place where you can do your job fast and safe.</h2>
<h3>Manage your requests always on time</h3>
<a href="/changeIApply">Haha</a>
</section>`

export function showHome(ctx){
    if(getUserData()){
        //ctx.page.redirect('/memes')
        ctx.renderView(homeTemplate());
    }else{
        ctx.renderView(homeTemplate());
    }
    
}

export async  function sendIapply(){
    await get('/changeIApply');
}