(function(ns) {
  'use strict';
  ns.repos = {};

  ns.repos.load = function load (){

    // function getRepoInfo (){
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user/repos',
      dataype: 'json',
      headers: {
        authorization: 'token ' + ns.gitToken
      },
      success: function repoData (data){
        renderRepos(data);
        $('#liRDs').hide();
      }
    });
  };

  ns.isEven = function isEven (number) {
    return number;
  };

  function renderRepos (repos){

    $('#repoTable')
      .empty()
      .append($('<tr>')
          .append($('<th>').text("Name") )
          .append($('<th>').text("Stars") )
          .append($('<th>').text("Open Issues") ) );

// loop through repos and append some of that data to table
    repos.forEach( function repoNameItem(dataItem) {
      $('#repoTable')
        .append($('<tr>')
            .append($('<td>')
                .append($('<a>').attr({href: '#repoDetails-' + dataItem.name}).text(dataItem.name)))
        .append($ ('<td>').text(dataItem.stargazers_count) )
        .append($ ('<td>').text(dataItem.open_issues_count) )

      );
  });
}
  window.gitTracker = ns;
})(window.gitTracker || {});
