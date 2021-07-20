// User Login

const   user = document.querySelector('.user');
const   userName = user.querySelector('.user__name-span');
const   btnLogin = document.querySelector('.btn--login');
const    userNameInput = user.querySelector('.user__name-input'),
        userNameWrapper = user.querySelector('.user__name-wrapper');

const showUser = () => {
    user.classList.add('show-flex');
    user.classList.remove('hide');
    btnLogin.classList.add('hide');
};

const truncName = () => {
    let name = sessionStorage.getItem('login');
    if (name.length > 10) {
        name = name.substr(0, 10) + '...';
        userName.textContent = name;
    }
};

const hideUser = () => {
    user.classList.remove('show-flex');
    user.classList.add('hide');
    btnLogin.classList.remove('hide');
    btnLogin.classList.remove('hide');
};

const userNameChange = () => {
    userNameWrapper.classList.add('show');
    userName.classList.add('hide');
};
const userNameSaveChange = () => {
    userNameWrapper.classList.remove('show');
    userNameWrapper.classList.add('hide');
    userName.classList.remove('hide');
};

function changeUserLogin() {
    
    userName.addEventListener('click', () => {
        userNameChange();

        userNameInput.value = sessionStorage.getItem('login');
        userNameInput.focus();

            userNameInput.addEventListener('change', () => {
                let name = userNameInput.value;
                
                if (userNameInput.value === '') {
                    sessionStorage.setItem('login', 'user');
                    userName.textContent = sessionStorage.getItem('login');
                    userNameInput.blur();
                    userNameSaveChange();
                } else {
                    sessionStorage.setItem('login', name);
                    userName.textContent =  sessionStorage.getItem('login');
                    userNameSaveChange();
                }
                truncName();
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

function userModule() {

    changeUserLogin();
    logOut();

    if (sessionStorage.getItem('login') !== '' && sessionStorage.getItem('login') !== null) {
        window.onload = () => {
            showUser();
            userName.textContent = sessionStorage.getItem('login');
            truncName();
        };
    }  
}

export default userModule;
export {userName, truncName, showUser, btnLogin};