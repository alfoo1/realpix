import { check_file } from './src/api.js';
document.addEventListener('DOMContentLoaded', async function() {
    // Obtiene el parámetro 'url' de la URL
    const params = new URLSearchParams(window.location.search);
    const url = params.get('url');

    if (url) {
        const authors = await check_file(url);
        console.log('Authors:', authors);
        
        for (let i = 0; i < authors.length; i++) {

            document.getElementById('URL').innerHTML = '<a href="">'+url+'</a>';
            document.getElementById('autor').innerHTML = authors[i].name;
            let action = '';
            for (let j = 0; j < authors[i].actions.length; j++) {
                action += authors[i].actions[j] + ', ';
            }
            document.getElementById('acciones').innerHTML = ''; 
        }

    }
});