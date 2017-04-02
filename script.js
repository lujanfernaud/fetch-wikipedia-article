window.onload = function() {
  var toggleButton = document.getElementById('button-toggle');
  toggleButton.addEventListener('click', toggleSidebar);

  var fetchButton = document.getElementById('button-fetch');
  fetchButton.addEventListener('click', fetchArticle);
}

function toggleSidebar() {
  var page = document.getElementById('page-container');

  if (page.classList.contains('page-visible')) {
    hidePage(page);
  } else {
    showPage(page);
  }
}

function hidePage(page) { page.className = 'page-hidden'; }
function showPage(page) { page.className = 'page-visible'; }

function fetchArticle() {
  var http = 'https://'
  var language = document.getElementById('input-language').value;
  var apiUrl = '.wikipedia.org/api/rest_v1/page/mobile-sections/';
  var title = document.getElementById('input-title').value;
  if (title === '') { return false }

  var url = http + language + apiUrl + title;

  var json;
  var sections;
  var article;
  var articleTitle;
  var page;
  var warningMessage;

  var xmlhttp = new XMLHttpRequest(), json;

  xmlhttp.onreadystatechange = function() {
    article = document.getElementById('article');
    articleTitle = document.getElementById('article-title');
    page = document.getElementById('page-container');
    warningMessage = document.getElementById('warning-message');

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

      json = JSON.parse(xmlhttp.responseText);
      title = json.lead.displaytitle;
      sections = json.lead.sections;
      articleTitle.innerHTML = title;
      article.innerHTML = sections[0].text;
      warningMessage.className = 'warning-hidden';

    } else if (xmlhttp.status === 404 || xmlhttp.readyState === 4 && xmlhttp.status === 0) {

      articleTitle.innerHTML = '';
      article.innerHTML = '';
      warningMessage.className = 'warning-visible';
    }

    showPage(page);
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}
