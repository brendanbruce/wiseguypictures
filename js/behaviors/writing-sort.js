$(document).ready(function() {
  var $container = $('#isotope');
  $container.isotope({
    itemSelector: '.writing'
  });

  $('.comics').click(function() {
    $container.isotope({
      filter: '.comic',
    });
  });
});
