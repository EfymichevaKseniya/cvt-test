import {userName, truncName, showUser, btnLogin}  from  './user';


function modalModule() {
    const   modalOverlay = document.querySelector('.modal'),
            modalBtn = document.querySelector('.modal__btn'),
            modalInput = document.querySelector('.input--login');

            

    const showModal = () => {
        modalOverlay.classList.add('open');
        modalOverlay.classList.remove('close');
    };
    const hideModal = () => {
        modalOverlay.classList.add('close');
        modalOverlay.classList.remove('open');
    };


    function openModal() {
        
        btnLogin.addEventListener('click', e => {
            e.preventDefault();
            showModal();


            modalBtn.addEventListener('click', () => {
                let name =  modalInput.value.trim();
            
                if (name === '' || name === null) {
                    modalInput.focus();
                    // alert('Некорректное имя пользователя');
                    
                } else {
                    userName.textContent = name;
                    sessionStorage.setItem('login', name);
                    truncName();
                    hideModal();
                    showUser();
                }       
            });
        });
        
        window.addEventListener('click', e => {
            if (e.target === modalOverlay) {
                hideModal();
            }
        });
    }

    openModal();

    window.onload = () =>  modalInput.value = '';


}


export default modalModule;