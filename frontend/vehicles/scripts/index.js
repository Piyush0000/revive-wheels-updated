import {carSellData} from '../data/carsData.js';

document.addEventListener('DOMContentLoaded',()=>{
    const card = document.getElementById('sell-buy');

    carSellData.map(t=> renderCard(t));

    function renderCard(data)
    {
        const cardHTML =        
    `     
            <img src="${data.image}" class="card-img-top" alt="image" id="car-image">
            <div class="card-body">
            <h5 class="card-title">${data.price}</h5>
            <p class="card-text">${data.name_model}</p>
            <span>${data.year_km}</span>
            <p>${data.location}</p>
            </div>  
            <p>${data.date_listed}</p>`;
        const cardComponent = document.createElement('div');
        cardComponent.setAttribute('data-id',Date.now())
        cardComponent.classList.add('card','carStyle');
        cardComponent.innerHTML = cardHTML;
        card.appendChild(cardComponent);
    }
})