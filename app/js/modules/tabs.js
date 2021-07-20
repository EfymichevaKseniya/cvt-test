// Tabs

function tabs() {

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
}

export default tabs;