(function(ns) {
  'use strict';

  ns.gitToken = '';
  ns.userInfo = {};

// function to retrieve user data
  function getUserData (token, callback){

    // Ajax call to retrieve profile data, in success data put in object


    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataype: 'json',
      headers: {
        authorization: 'token ' + token
      },
      success: function userData (data){
        ns.gitToken = token;
        ns.userInfo.username = data.login;
        ns.userInfo.name = data.name;
        ns.userInfo.repos = data.public_repos;
        ns.userInfo.followers = data.followers;
        ns.userInfo.created = data.created_at.substr(0,10);
        ns.userInfo.avatar = data.avatar_url;
        ns.userInfo.url = data.html_url;

        callback(ns.userInfo);

      },
      error: function loginError (xhr){
        console.error(xhr);
        callback(null);
      }
    });
  }

  // event handler for login

  $('#loginForm').on('submit', function (event){
    event.preventDefault();

// calling function to get user data with login form input as argument, if works, store token in
    getUserData( $('#loginInput').val(), function loginCallback(){
        window.location.hash = '#profile';
        $('nav').show();
    } );

  });
  window.gitTracker = ns;

})(window.gitTracker || {});
