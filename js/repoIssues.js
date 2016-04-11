(function(ns) {
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
