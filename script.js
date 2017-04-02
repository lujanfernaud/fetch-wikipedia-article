window.onload = function() {
  var toggleButton = document.getElementById('toggle-button');
  toggleButton.addEventListener('click', toggleSidebar);

  var button = document.getElementById('fetch');
  button.addEventListener('click', fetchArticle);
};

function toggleSidebar() {
  var page = document.getElementById('page-container');

  if (page.classList.contains('page-visible')) {
    page.className = 'page-hidden';
  } else {
    page.className = 'page-visible';
  }
};

function fetchArticle() {
  var http = 'https://'
  var language = document.getElementById('language').value;
  var apiUrl = '.wikipedia.org/api/rest_v1/page/mobile-sections/';
  var title = document.getElementById('title').value;
  var url = http + language + apiUrl + title;

  var json;
  var sections;
  var article;

  var xmlhttp = new XMLHttpRequest(), json;

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

      json = JSON.parse(xmlhttp.responseText);
      sections = json.lead.sections;
      article = document.getElementById('article')
      article.innerHTML = sections[0].text;

    } else if (xmlhttp.status === 404) {
      console.log('Page not found.');
    }
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
};
