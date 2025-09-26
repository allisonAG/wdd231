const membershipButtons = document.querySelectorAll('.card-container button');
const membershipDialog = document.querySelectorAll('dialog .close');

membershipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        document.getElementById(modalId).showModal();
    })
});

membershipDialog.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();
    })
    
});


const timestamp = document.querySelector('#timestamp');

const now = new Date();
timestamp.value = now.toLocaleString();