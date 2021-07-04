// "use strict";

new SimpleBar(document.querySelector('.channels'));

// Tabs

const   tabsBtn = document.querySelectorAll('.tabs__nav-item'),
        tabsItem = document.querySelectorAll('.tabs__item');


tabsBtn.forEach(tabBtn => tabBtn.addEventListener('click',  e => {
    let currenBtn = tabBtn;
    tabsBtn.forEach(tab => tab.classList.remove('active'));
    currenBtn.classList.add('active');

        
    let target = e.target.getAttribute('data-tab');

    for (let i = 0; i < tabsItem.length; i++) {
        if (target == i) {
            setTimeout(() => {
                tabsItem[i].classList.add('tab-on');
            }, 300);
            
        } else {
                tabsItem[i].classList.remove('tab-on');
            
        }
    }

}));

// Modal
const   btnLogin = document.querySelector('.btn--login'),
        modal = document.querySelector('.modal'),
        modalBtn = modal.querySelector('.modal__btn'),
        modalInput = modal.querySelector('.modal__body-input-text--login');
        

const   user = document.querySelector('.user'),
        userNameLast = user.querySelector('.user__name-span'),
        userNameInput = user.querySelector('.user__name-input'),
        userNameWrapper = user.querySelector('.user__name-wrapper');
        

const showModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hidden');
};
const hideModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('show');
};
const showUser = () => {
    user.style.display = 'flex';
    btnLogin.style.display = 'none';
};
const hideUser = () => {
    user.style.display = 'none';
    btnLogin.style.display = 'block';
};
const userNameChange = () => {
    userNameWrapper.style.display = 'block';
    userNameLast.style.display = 'none';
};
const userNameSaveChange = () => {
    userNameWrapper.style.display = 'none';
    userNameLast.style.display = 'block';
};

function openModal() {
    btnLogin.addEventListener('click', e => {
        e.preventDefault();
        showModal();

        modalInput.addEventListener('change', () => {
            let name =  modalInput.value;
                modalBtn.addEventListener('click', () => {
                    userNameLast.textContent = name;
                    sessionStorage.setItem('login', name);
                    hideModal();
                    showUser();
                });
        });
    });
    
    
    window.addEventListener('click', e => {
        if (e.target === modal) {
            hideModal();
        }
    });

    
}

// User Login
function changeUserLogin() {
    
    userNameLast.addEventListener('click', () => {
        userNameChange();

        userNameInput.value = sessionStorage.getItem('login');
        userNameInput.focus();

        userNameInput.addEventListener('focus', () => {
            userNameInput.addEventListener('change', () => {
                let name = userNameInput.value;
                
                if (userNameInput.value === '') {
                    sessionStorage.setItem('login', 'user');
                    userNameLast.textContent = sessionStorage.getItem('login');
                    userNameInput.blur();
                    userNameSaveChange();
                } else {
                    sessionStorage.setItem('login', name);
                    userNameLast.textContent =  sessionStorage.getItem('login');
                    userNameSaveChange();
                }
            });
        });

    });
}



function logOut() {
    const btnOut = document.querySelector('.btn--logout');

        btnOut.addEventListener('click', () => {
        sessionStorage.removeItem('login');
        hideUser();
    });
}

openModal();

changeUserLogin();

logOut();

if (sessionStorage.getItem('login') !== '' && sessionStorage.getItem('login') !== null) {
    window.onload = () => {
        showUser();
        userNameLast.textContent = sessionStorage.getItem('login');
    };
} 