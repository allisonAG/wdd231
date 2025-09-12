const url = "./data/members.json";
const cards = document.querySelector("#cards");

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.members);
    displayMembers(data.members);
}

getMemberData();


const displayMembers = (members) => {
    members.forEach(member => {
        const card = document.createElement('section');
        const image = document.createElement('img');
        const name = document.createElement('h3');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        card.classList.add('card');

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.textContent = member.websiteurl;

        image.setAttribute('src', member.imageurl);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', "140");
        image.setAttribute('height', "auto");

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        cards.appendChild(card);

    });
}

// Grid and List View
const gridbtn = document.querySelector('#grid');
const listbtn = document.querySelector('#list');
const display = document.querySelector('#cards');

gridbtn.addEventListener('click', () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbtn.addEventListener('click', showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}