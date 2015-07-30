
/* Highlight */
$( document ).ready(function() {
  hljs.initHighlightingOnLoad();
  $('table').addClass('table table-striped table-hover');
});

$('body').scrollspy({
  target: '.bs-sidebar',
});

// handle links for pages where angular is loaded
$('[data-angular="1"]').on('click', 'a', function(event){
  // apply only on links starting with `#`
  if ($(this).attr('href')[0] === '#' && 

    // skip links inside the angular app and links that has data-angular-link set
    ($(this).parents('[ng-app="AQProviderConsole"]').length === 0 && !$(this).is('[data-angular-link]'))) 
  {
    event.preventDefault();

    // prepend a `#/` for angular
    window.location.hash = '#/' + $(this).attr('href');
  }
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function(event) {
  event.preventDefault();
});
