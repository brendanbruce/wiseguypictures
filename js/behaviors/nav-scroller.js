var FlexNav;

FlexNav = (function() {
  function FlexNav(element) {
    this.$nav = $(element);
    this._initialize();
  }

  FlexNav.prototype._initialize = function() {
    if ($("[data-js='flex-breakpoint']").length > 0) {
      this.$window = $(window);
      this.firstBreakPoint = this._firstBreakPoint();
      this.secondBreakPoint = this._secondBreakPoint();
      this._style();
      return this._bindEvents();
    } else {
      return this._navDefaultState();
    }
  };

  FlexNav.prototype._bindEvents = function() {
    return this._onScroll();
  };

  FlexNav.prototype._firstBreakPoint = function() {
    return this.$nav.height();
  };

  FlexNav.prototype._onScroll = function() {
    return this.$window.on("scroll", (function(_this) {
      return function() {
        return _this._style();
      };
    })(this));
  };

  FlexNav.prototype._secondBreakPoint = function() {
    return $("[data-js='flex-breakpoint']").offset().top;
  };

  FlexNav.prototype._scrollTop = function() {
    return $(window).scrollTop();
  };

  FlexNav.prototype._style = function() {
    if (this._scrollTop() < this.firstBreakPoint) {
      this._navTransparentState();
    }
    if (this._scrollTop() >= this.firstBreakPoint && this._scrollTop() < this.secondBreakPoint) {
      return this._navNegativeState();
    } else if (this._scrollTop() >= this.secondBreakPoint) {
      return this._navDefaultState();
    }
  };

  FlexNav.prototype._navTransparentState = function() {
    return this.$nav.removeClass("navigation-bar--solid").removeClass("navigation-bar--fixed").removeClass("navigation-bar--negative");
  };

  FlexNav.prototype._navNegativeState = function() {
    return this.$nav.addClass("navigation-bar--negative").removeClass("navigation-bar--solid");
  };

  FlexNav.prototype._navDefaultState = function() {
    return this.$nav.addClass("navigation-bar--fixed").addClass("navigation-bar--solid").removeClass("navigation-bar--negative");
  };

  return FlexNav;

})();

$(function() {
  return new FlexNav("[data-js='flex-nav']");
});
