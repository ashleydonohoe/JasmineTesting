/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has defined and not empty URL', function() {
           for(var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url).toBeTruthy();
           }
         });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has defined and not empty name', function() {
           for(var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name).toBeTruthy();
           }
         });

    });

    describe('The menu', function() {
        /* Ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('has menu-hidden at default', function() {
           expect($("body").hasClass('menu-hidden')).toBe(true);
         });

          // When menu icon gets clicked, menu-hidden class is removed if present (or added if missing)
          // When menu icon gets clicked again, menu-hidden class is added or removed based on previous state

         it('toggles based on click and current state', function() {
          var menuButton = $(".menu-icon-link");
          var originalState = $("body").attr("class");
          var newState;

          if($("body").hasClass('menu-hidden')) {
            newState = "";
          } else {
            newState = "menu-hidden";
          }

          menuButton.click();
          expect($("body").attr("class")).toBe(newState);

          menuButton.click();
          expect($("body").attr("class")).toBe(originalState);
          });
      });

    describe('Initial Entries', function() {
        /* When the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         it('has at least a single .entry element within .feed', function() {
           var entries = $(".feed .entry");
           expect(entries.length).not.toBe(0);
         });

    });

    describe('New Feed Selection', function() {
        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var existingFeedData, newFeedData;

         beforeEach(function(done) {
           existingFeedData = $(".feed").html();
           loadFeed(1, function() {
             done();
           });
         });

         it('loads new content in feed', function(done) {
           newFeedData = $(".feed").html();
           expect(existingFeedData).not.toBe(newFeedData);
           done();
         });
    });
}());
