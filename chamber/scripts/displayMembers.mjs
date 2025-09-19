export function displayMembers(members, container, options = {}) {
    const { showMembership = false } = options; //not show membership level
    container.innerHTML = "";

    const membershipNames = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };

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
        

        if (showMembership) {
            const level = document.createElement('p');
            level.textContent = `Membership: ${membershipNames[member.membershiplevel]}`;
            card.appendChild(level);
        }

        container.appendChild(card);
    });
}