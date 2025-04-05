import { vehicleAccessoriesData } from '../data/vehicleAccessoriesData.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('sell-buy');

    vehicleAccessoriesData.map(a => renderCard(a));

    function renderCard(data) {
        const cardHTML = `
            <img src="${data.image}" class="card-img-top" alt="accessory-image" id="accessory-image">
            <div class="card-body">
                <h5 class="card-title">${data.price}</h5>
                <p class="card-text">${data.name}</p>
                <span>${data.description}</span>
                <p>${data.location}</p>
            </div>  
            <p>${data.date_listed}</p>
        `;
        const cardComponent = document.createElement('div');
        cardComponent.setAttribute('data-id', Date.now());
        cardComponent.classList.add('card', 'carStyle');
        cardComponent.innerHTML = cardHTML;
        container.appendChild(cardComponent);
    }
});
