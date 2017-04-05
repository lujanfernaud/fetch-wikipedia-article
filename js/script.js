window.onload = function() {
  var toggleButton = document.getElementById('button-toggle');
  toggleButton.addEventListener('click', toggleSidebar);

  var fetchButton = document.getElementById('button-fetch');
  fetchButton.addEventListener('click', fetchArticle);

  var inputTitle = document.getElementById('input-title');
  inputTitle.focus();
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
  var title;
  var leadHatnotes;
  var sections;
  var remainingSections;
  var articleTitle;
  var articleHatnotes;
  var article;
  var fetchingText = document.getElementById('fetching-message');
  var warningMessage;
  var page;

  var xmlhttp = new XMLHttpRequest(), json;

  xmlhttp.onprogress = function() {
    articleTitle.innerHTML = '';
    articleHatnotes.innerHTML = '';
    fetchingText.className = 'fetching-visible';
    article.innerHTML = '';
  };

  xmlhttp.onreadystatechange = function() {
    fetchingText.className = 'fetching-hidden';

    articleTitle = document.getElementById('article-title');
    articleHatnotes = document.getElementById('article-hatnotes');
    article = document.getElementById('article');
    warningMessage = document.getElementById('warning-message');
    page = document.getElementById('page-container');

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

      json = JSON.parse(xmlhttp.responseText);
      title = json.lead.displaytitle;
      leadHatnotes = json.lead.hatnotes;
      sections = json.lead.sections;
      remainingSections = json.remaining.sections;

      articleTitle.innerHTML = title;

      if (leadHatnotes.length === 0) {
        articleHatnotes.innerHTML = '';
      } else if (leadHatnotes.length === 1) {
        articleHatnotes.innerHTML = '<li>' + leadHatnotes + '</li>';
      } else if (leadHatnotes.length > 1) {
        articleHatnotes.innerHTML = '';
        for (i = 0; i < leadHatnotes.length; i++) {
          articleHatnotes.innerHTML += '<li>' + leadHatnotes[i] + '</li>';
        }
      }

      article.innerHTML = sections[0].text;
      warningMessage.className = 'warning-hidden';

      for (i = 0; i < remainingSections.length; i++) {
        switch (remainingSections[i].toclevel) {
          case 1:
            article.innerHTML += '<h2>' + remainingSections[i].line + '</h2>';
            break;
          case 2:
            article.innerHTML += '<h3>' + remainingSections[i].line + '</h3>';
            break;
          case 3:
            article.innerHTML += '<h4>' + remainingSections[i].line + '</h4>';
            break;
          case 4:
            article.innerHTML += '<h5>' + remainingSections[i].line + '</h5>';
            break;
          case 5:
            article.innerHTML += '<h6>' + remainingSections[i].line + '</h6>';
            break;
          case 6:
            article.innerHTML += '<h6>' + remainingSections[i].line + '</h6>';
            break;
        }
        article.innerHTML += remainingSections[i].text;
      }

    } else if (xmlhttp.status === 404 || xmlhttp.readyState === 4 && xmlhttp.status === 0) {

      articleTitle.innerHTML = '';
      articleHatnotes.innerHTML = '';
      article.innerHTML = '';
      warningMessage.className = 'warning-visible';
    }

    showPage(page);
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}
