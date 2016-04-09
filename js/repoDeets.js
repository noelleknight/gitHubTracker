(function(ns) {
  'use strict';
  ns.repoDetails = {};

  ns.repoDetails.load = function load (repoName){

    // url: 'https://api.github.com/repos/' + ns.userInfo.username + '/' + repoName,  url to get repo details
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/repos/' + ns.userInfo.username + '/' + repoName,
      dataype: 'json',
      headers: {
        authorization: 'token ' + ns.gitToken
      },      success: function getDetails (){
                  detailsNav();
            }

    });
    function detailsNav(){

      $('.nav')
        .append($('<li>')
            .append($('<a>').attr('href','#repoDetails').text('Repo Details') ) );
          }

  };
  window.gitTracker = ns;
})(window.gitTracker || {});
