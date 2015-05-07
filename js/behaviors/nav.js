$(function() {
  var navExpand = $("i[data-js='nav-expand']");
  var mainNav = $(".navigation-bar__nav ul");

  $(navExpand).click(
    function() {
      mainNav.toggleClass("expanded");
    });
});
