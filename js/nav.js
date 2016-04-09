(function(ns) {
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
