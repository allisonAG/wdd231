const memberships = document.querySelectorAll('.card-container button');
const membershipDetails = document.querySelectorAll('dialog');

memberships.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        document.getElementById(modalId).showModal();
    })
});

document.querySelectorAll('dialog .close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();
    })
    
});