$(document).ready(function() {
  var $container = $('#isotope');

  $container.isotope({
    layoutMode: 'fitRows',
    itemSelector: '.writing',
  });

  $container.imagesLoaded( function() {
      $container.isotope('layout');
  });

  $('.writing-nav--all').click(function() {
    $container.isotope({
      filter: '*',
    });
  });

  $('.writing-nav--comics').click(function() {
    $container.isotope({
      filter: '.comic',
    });
  });

  $('.writing-nav--articles').click(function() {
    $container.isotope({
      filter: '.article',
    });
  });

  $('.writing-nav--ecards').click(function() {
    $container.isotope({
      filter: '.ecard',
    });
  });
});
