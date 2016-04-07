(function(ns) {
  'use strict';
  ns.profile = {};

  ns.profile.load = function load (){
    console.log(ns.userInfo);

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
