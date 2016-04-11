(function(ns) {
  'use strict';
  ns.repoDetails = {};
  // ns.repoData = {};

  ns.repoDetails.load = function load (repoName){

    // url: 'https://api.github.com/repos/' + ns.userInfo.username + '/' + repoName,  url to get repo details
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/repos/' + ns.userInfo.username + '/' + repoName,
      dataype: 'json',
      headers: {
        authorization: 'token ' + ns.gitToken
      },
      success: function getDetails (data){
        detailsNav(data);
      }

    });

    function detailsNav (repoData){

      $('#repoDetails').css('display', 'block');
      $('.nav')
        .append($('<li>').attr('id', 'liRDs')
            .append($('<a>').attr({href: repoData.url }).text('Repo Details') ) );

              $('#detailList')
                  .empty()
                  .append($('<li>')
                        .append($('<a>').attr({href: repoData.html_url, target: '_blank'} ).text(repoData.name)))
                  .append($ ('<li>').text(repoData.description) )
                  .append($('<li>')
                        .append($('<a>').attr({href: '#repoIssues-' + repoData.name}).text('Issues: ' + repoData.open_issues_count)))
                  .append( $('<li>').text('Owner: ' + ns.userInfo.username) )
                  .append( $('<li>').text('Stars: ' + repoData.stargazers_count) )
                  .append( $('<li>').text('Forks: ' + repoData.forks_count) )
                  .append( $('<li>').text('Created on: ' + repoData.created_at.substr(0, 10)));

}
};
  window.gitTracker = ns;
})(window.gitTracker || {});
