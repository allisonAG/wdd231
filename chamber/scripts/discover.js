import { getAreasData } from "./dataServiceAreas.mjs";
const cards = document.querySelector('#areasCards');

(async () => {
    const areas = await getAreasData();
    displayAreas(areas);
})();



function displayAreas(areas) {
    areas.forEach(area => {
        const card = document.createElement('section');
        const title = document.createElement('h2');
        const picture = document.createElement('picture');
        const image = document.createElement('img');
        const address = document.createElement('address');
        const description = document.createElement('p');
        const btn = document.createElement('button');
        image.classList.add('opac');
        
        title.textContent = area.title;
        address.innerHTML = `<strong>Address</strong>: ${area.address}`;
        description.innerHTML = `<strong>Description</strong>: ${area.description}`;
        btn.innerHTML = `<span>Learn More</span>`;
        image.setAttribute('src', area.image);
        image.setAttribute('alt', area.title);
        image.setAttribute('loading', 'lazy');

        card.appendChild(title);
        card.appendChild(picture);
        picture.appendChild(image);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(btn);

        cards.appendChild(card);
    });
}