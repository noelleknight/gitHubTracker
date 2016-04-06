(function(ns) {
  'use strict';
  ns.profile = {};



  ns.profile.load = function load (){
    console.log(ns.userInfo);

  $('#profileList')
      .empty()
      .append($('<img>').attr('src', ns.userInfo.avatar) )
      .append( $('<li>').text('Username: ' + ns.userInfo.Username) )
      .append( $('<li>').text(ns.userInfo.Name) )
      .append( $('<li>').text(ns.userInfo.Repos) )
      .append( $('<li>').text(ns.userInfo.Followers) )
      .append( $('<li>').text(ns.userInfo.Created) );


      console.log("i'm loading this profile view");
      console.log(ns.userInfo);

    };




    window.gitTracker = ns;
  })(window.gitTracker || {});
