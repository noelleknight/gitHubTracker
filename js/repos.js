(function(ns) {
  'use strict';
  ns.repos = {};

  ns.repos.load = function load (){
    console.log("hi");

    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user/repos',
      dataype: 'json',
      headers: {
        authorization: 'token ' + ns.gitToken
      },
        success: function repoData (data){
          ns.repoArr = data;
          console.log(ns.repoArr);
        },
    });

  };
  window.gitTracker = ns;
})(window.gitTracker || {});
