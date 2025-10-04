import { check_file } from './src/api.js';
document.addEventListener('DOMContentLoaded', async function() {
  // Obtiene el parámetro 'url' de la URL
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');

  if (url) {
    document.getElementById('URL').innerHTML = '<a href="">'+url+'</a>';
    const response = await check_file(url)
    alert(response[0].name)
  }
});
