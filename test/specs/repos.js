(function() {

  'use strict';

var assert = chai.assert;
var fixtureHTML = $('#fixtures').html();

suite('repos', function(){

  setup(function() {
              $('#fixtures').html(fixtureHTML);
          });

  test('ensure renderRepos function appends data', function() {
    assert.strictEqual(window.gitTracker.isEven(2), 2);
    assert.strictEqual($('#repoTable').length, 0, 'table is empty before loop');
    // 
    // window.gitTracker.renderRepos(data);
    //
    //     assert.ok( $('#repoTable').length > 0, 'appended');

  // # assert that after repoNameItem function is called,the html includes appended elements


  });


});


})();
