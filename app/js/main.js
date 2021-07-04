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
        modalBtn = document.querySelector('.modal__btn'),
        modalInput = document.querySelector('.modal__body-input-text--login'),
        user = document.querySelector('.user');

const   userNameLast = document.querySelector('.user__name-span'),
        userNameInput = document.querySelector('.user__name-input'),
        userNameWrapper = document.querySelector('.user__name-wrapper');

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
const userNameLogOut = () => {
    userNameWrapper.style.display = 'none';
    userNameLast.style.display = 'block';
};

function openModal() {
    btnLogin.addEventListener('click', e => {
        e.preventDefault();
        showModal();
    
        modalInput.addEventListener('change', () => {
            let name = modalInput.value;
            modalBtn.addEventListener('click', () => {
                hideModal();
                showUser();
                if (name === '') {
                    userNameLast.textContent = 'user';
                } else {
                    userNameLast.textContent = name;
                    sessionStorage.setItem('login', name);
                }
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

        userNameInput.addEventListener('blur', () => {
            let current =  userNameInput.value;
            if (userNameInput.value === '') {
                userNameLast.textContent = 'user';
            } else {
                userNameLast.textContent = current;
                sessionStorage.setItem('login', current);
            }
            userNameLogOut();
            
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