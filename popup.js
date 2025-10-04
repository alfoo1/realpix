document.addEventListener('DOMContentLoaded', function() {
  // Obtiene el parámetro 'url' de la URL
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');

  if (url) {
    document.getElementById('URL').innerHTML = '<a href="">'+url+'</a>';
  }

  const helloButton = document.getElementById('helloButton');
  helloButton.addEventListener('click', function() {
    chrome.storage.local.get('lastContextUrl', function(data) {
      if (data.lastContextUrl) {
        document.getElementById('URL').innerHTML = '<a href="">'+data.lastContextUrl+'</a>';
    //     alert('URL seleccionada: ' + data.lastContextUrl);
      } else {
        alert('No hay URL seleccionada aún.');
      }
    });
  });
});