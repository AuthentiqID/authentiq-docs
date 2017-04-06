
$( document ).ready(function() {
  /* code highlight */
  hljs.initHighlightingOnLoad();

  // add styling for tables
  $('table').addClass('table table-striped table-hover');

  // add tooltip support for abbreviations
  $('abbr').tooltip({
    placement: 'auto',
    delay: { show: 1000 },
    // trigger: 'click',
  });
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function(event) {
  event.preventDefault();
});
