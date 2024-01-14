import './ui.css'
import { directions } from './directions';

function main() {

    const msg = document.getElementById('msg')!;

    const exp = document.getElementById('experiment')!;
    const expmsg = document.getElementById('experimentMsg')!;

    onmessage = (event) => {
        if (event.data.pluginMessage == 'SELECT_LAYER') {
            msg.innerHTML = "Choose one layer."
        }
    }

    Object.keys(directions).forEach(type => {
        const btn = document.getElementById(type)!;
        btn.addEventListener('mouseover', () => {
            msg.innerHTML = type;
        });
        btn.addEventListener('mouseout', () => {
            msg.innerHTML = '';
        });
        btn.addEventListener('click', () => {
            parent.postMessage({ pluginMessage: { type } }, '*')
        });
    });

    exp.addEventListener('click', () => {
        if (expmsg.style.display === "block") {
            expmsg.style.display = "none";
        } else {
            expmsg.style.display = "block";
        }
    });

    expmsg.addEventListener('click', () => {
        expmsg.style.display = "none";
    });
}



window.addEventListener('load', main);



