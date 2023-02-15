import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`<section id="dashboard">
<h2>Collectibles</h2>
${data.length>0?html`<ul class="card-wrapper">
  <!-- Display a li with information about every post (if any)-->
  ${repeat(data,(shoePair)=>shoePair._id,(shoePair)=>html`<li class="card">
    <img src=${shoePair.imageUrl} alt="travis" />
    <p>
      <strong>Brand: </strong><span class="brand">${shoePair.brand}</span>
    </p>
    <p>
      <strong>Model: </strong
      ><span class="model">${shoePair.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoePair.value}</span>$</p>
    <a class="details-btn" href="/dashboard/${shoePair._id}">Details</a>
  </li>`)}

</ul>`:html`<h2>There are no items added yet.</h2>`}

<!-- Display an h2 if there are no posts -->

</section>`

export async function showCatalog(ctx){
    try{
        let data=await get('/data/shoes');
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}