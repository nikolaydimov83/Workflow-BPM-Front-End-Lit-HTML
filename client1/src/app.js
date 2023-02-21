
import { logout } from "./api/users.js";
import { page,render } from "./lib.js";
import { getUserData } from "./utils.js";
import { showCreate } from "./views/createView.js";
import { showCatalog } from "./views/dashboardView.js";
import { showshoesDetails } from "./views/detailsView.js";
import { showMemeEdit } from "./views/editView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showRegister } from "./views/registerView.js";
import { showResetPassChange } from "./views/resetPassChange.js";
import { showResetPass } from "./views/resetPassView.js";
import { showsearch } from "./views/searchView.js";

let main=document.querySelector('main');
let user=document.querySelector('.user');
let guest=document.querySelector('.guest');
let logoutA=user.querySelectorAll('a')[1];
logoutA.addEventListener('click',logoutUser);
//document.getElementById('notifications').style.display='none';
renderNav();

page(decorateCtx);
page('/dashboard',showCatalog);
page('/dashboard/:shoesId',showshoesDetails);
page('/create',showCreate);
/*page('/profile',showMyProfile);*/
page('/login',showLogin);
page('/register',showRegister);
page('/',showHome);
page('/edit/:shoesId',showMemeEdit);
page('/search',showsearch);
page('/resetPass',showResetPass);
page('/resetPass/:id',showResetPassChange)
page.start();

function decorateCtx(ctx,next){
  
    ctx.renderView=renderView;
    ctx.renderNav=renderNav;
    next();
}

function renderView(template){
    render(template,main)
}

function logoutUser(ev){
    logout();
    renderNav();
    page.redirect('/')

}

function renderNav(){

if(getUserData()){
    user.style.display='';
    guest.style.display='none';
    document.getElementById('profile').textContent=`${getUserData().email}`;
}else{
    user.style.display='none';
    guest.style.display=''
}

}