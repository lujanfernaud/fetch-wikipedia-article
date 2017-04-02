window.onload = function() {
  var toggleButton = document.getElementById('button-toggle');
  toggleButton.addEventListener('click', toggleSidebar);

  var fetchButton = document.getElementById('button-fetch');
  fetchButton.addEventListener('click', fetchArticle);
};

function toggleSidebar() {
  var page = document.getElementById('page-container');

  if (page.classList.contains('page-visible')) {
    hidePage(page);
  } else {
    showPage(page);
  }
};

function hidePage(page) { page.className = 'page-hidden'; }
function showPage(page) { page.className = 'page-visible'; }

function fetchArticle() {
  var http = 'https://'
  var language = document.getElementById('input-language').value;
  var apiUrl = '.wikipedia.org/api/rest_v1/page/mobile-sections/';
  var title = document.getElementById('input-title').value;
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

      var page = document.getElementById('page-container');
      showPage(page);

    } else if (xmlhttp.status === 404) {
      console.log('Page not found.');
    }
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
};
