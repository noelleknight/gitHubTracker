(function(ns) {
  'use strict';

  ns.gitToken = '';

  // event handler for login + Ajax call to retrieve profile data

  $('#loginForm').on('submit', function (event){
    event.preventDefault();
    ns.gitToken = $('#loginInput').val();
  

    // $.ajax({
    //   type: 'GET',
    //   url: 'https://api.github.com/user',
    //   dataype: 'json',
    //
    // });

  });
  window.gitTracker = ns;

})(window.gitTracker || {});
