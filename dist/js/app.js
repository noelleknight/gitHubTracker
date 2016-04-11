(function(ns) {
  'use strict';

  ns.gitToken = null;
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

    getUserData( $('#loginInput').val(), function loginCallback(){
        window.location.hash = '#profile';
        $('nav').show();
    } );

  });
  window.gitTracker = ns;

})(window.gitTracker || {});
;(function(ns) {
    'use strict';


    window.addEventListener('hashchange', function hashNav() {
        doNav();
    });

    function doNav() {
        $('.view').hide();
        $( window.location.hash ).show();

        $('nav li').removeClass('active');

        $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

        if (!ns.gitToken) {
            // if they try to load a bad view, default to profile!
            window.location.hash = '#login';
        } else {
            // do stuff the view needs
            var viewName = window.location.hash.substr(1).split(/-(.*)?/);
            console.log(viewName);
            if (ns[viewName[0]] && ns[viewName[0]].load) {
                // ns['view-1'].load();
                ns[ viewName[0] ].load(viewName[1]);
            }
        }
    }
    // navigate to a view when the page loads
    ns.init = function() {
        doNav();
    };

    window.gitTracker = ns;
  })(window.gitTracker || {});
;(function(ns) {
  'use strict';
  ns.profile = {};

  ns.profile.load = function load (){
    console.log(ns.userInfo);
    $('#liRDs').hide();
    
  $('#profileList')
      .empty()
      .append($('<img>').attr('src', ns.userInfo.avatar) )
      .append( $('<li>').text('Username: ')
        .append($('<a>').attr({href:'url', target:'blank_'}).text(ns.userInfo.username) ) )
      .append( $('<li>').text('Name: ' + ns.userInfo.name) )
      .append( $('<li>').text('Repos: ' + ns.userInfo.repos) )
      .append( $('<li>').text('Followers: ' + ns.userInfo.followers) )
      .append( $('<li>').text('Created: ' + ns.userInfo.created) );

      console.log("i'm loading this profile view");
    };

    window.gitTracker = ns;
  })(window.gitTracker || {});
;(function(ns) {
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
;(function(ns) {
  'use strict';
  ns.repoIssues = {};




ns.repoIssues.load = function load (repoName){

       console.log("Loading Repo Issues");

       $.ajax({
         type: 'GET',
         url: 'https://api.github.com/repos/' + ns.userInfo.username + '/' + repoName + '/' + 'issues',
         dataType: 'json',
         headers: {
           Authorization: 'token ' + ns.gitToken
         },
         success: function showIssues(data) {
           console.log(data);
           console.log(typeof data);
           displayIssues(data);

         },
         error: function onErrors(xhr) {
           console.log( xhr );
         },
       });
       function displayIssues (issues){

         $('#repoIssues').css('display', 'block');
         $('.nav')
           .append($('<li>').attr('id', 'liIDs')
               .append($('<a>').attr({href: issues.url }).text('Repo Issues') ) );

         $('#issueTable')
          //  .empty()
           .append($('<h2>')
                .append($('<a>').attr({href: 'https://github.com/repos/' + ns.userInfo.username + '/' + repoName + '/' + 'issues', target: '_blank'}).text(repoName)))
           .append($('<tr>')
               .append($('<th>').text("Issue title") )
               .append($('<th>').text("Submitter") )
               .append($('<th>').text("Close?") ) );

          $(issues).each(function(issueItem) {
            $('#issueTable')
              .append($('<tr>')
                  .append($('<td>').text(issueItem.title)))
              .append($('<td>').text(issueItem.login));

        });
}
};
  window.gitTracker = ns;
})(window.gitTracker || {});
;(function(ns) {
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

//# sourceMappingURL=app.js.map