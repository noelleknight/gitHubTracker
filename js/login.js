(function(ns) {
  'use strict';

  ns.gitToken = '';
  ns.userInfo = {};

  // event handler for login

  $('#loginForm').on('submit', function (event){
    event.preventDefault();
    ns.gitToken = $('#loginInput').val();

// Ajax call to retrieve profile data, in success data put in object

    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataype: 'json',
      headers: {
          authorization: 'token ' + ns.gitToken
        },
      success: function userData (data){
      ns.userInfo.Username = data.login;
      ns.userInfo.Name = data.name;
      ns.userInfo.Repos = data.public_repos;
      ns.userInfo.Followers = data.followers;
      ns.userInfo.Created = data.created_at;

      console.log(ns.userInfo);
      // {Username: data.login, Name: data.name, Repos: data.public_repos, Followers: data.followers, Account created: data.created_at};

    }
    });

  });
  window.gitTracker = ns;

})(window.gitTracker || {});
