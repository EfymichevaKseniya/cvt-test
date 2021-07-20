// "use strict";

import tabs  from './modules/tabs';
import userModule  from  './modules/user';
import modalModule  from  './modules/modal';
import SimpleBar from 'simplebar';


tabs();
modalModule();
userModule();

new SimpleBar(document.querySelector('.channels'));
