
/* Highlight */
$( document ).ready(function() {
  hljs.initHighlightingOnLoad();

  // add styling for tables
  $('table').addClass('table table-striped table-hover');

  // add tooltip support for abbreviations
  $('abbr').tooltip();
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function(event) {
  event.preventDefault();
});
