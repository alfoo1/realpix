import { check_file } from './src/api.js';
document.addEventListener('DOMContentLoaded', async function() {
<<<<<<< HEAD
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
=======
  // Obtiene el parámetro 'url' de la URL
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');

  if (url) {
    document.getElementById('URL').innerHTML = '<a href="">'+url+'</a>';
    const response = await check_file(url)
    alert(response[0].name)
  }
});
>>>>>>> 6bbb9e95be96db0bc09ed625ca05b3406f86ee74
