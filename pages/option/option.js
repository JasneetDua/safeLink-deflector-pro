import { createElement } from 'lwc';
import Option from 'c/option';

const elm = createElement('c-option', { is: Option });
document.body.appendChild(elm);