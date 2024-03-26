// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.sl_prev1, .sl_next1').click(function() {

      var $this = $(this),
          curLeft = $('.s1').find('.sl_left1'),
          curLeftPos = $('.s1').children().index(curLeft),
          curCenter = $('.s1').find('.sl_center1'),
          curCenterPos = $('.s1').children().index(curCenter),
          curRight = $('.s1').find('.sl_right1'),
          curRightPos = $('.s1').children().index(curRight),
          totalWorks = $('.s1').children().length,
          $left = $('.sl_left1'),
          $center = $('.sl_center1'),
          $right = $('.sl_right1'),
          $item = $('.sl1');

      $('.s1').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('sl_next1')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('sl_left1').next().addClass('sl_left1');
          $center.removeClass('sl_center1').next().addClass('sl_center1');
          $right.removeClass('sl_right1').next().addClass('sl_right1');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('sl_left1').first().addClass('sl_left1');
            $center.removeClass('sl_center1').next().addClass('sl_center1');
            $right.removeClass('sl_right1').next().addClass('sl_right1');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('sl_left1').next().addClass('sl_left1');
            $item.removeClass('sl_center1').first().addClass('sl_center1');
            $right.removeClass('sl_right1').next().addClass('sl_right1');
          }
          else {
            $left.removeClass('sl_left1').next().addClass('sl_left1');
            $center.removeClass('sl_center1').next().addClass('sl_center1');
            $item.removeClass('sl_right1').first().addClass('sl_right1');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('sl_left1').prev().addClass('sl_left1');
          $center.removeClass('sl_center1').prev().addClass('sl_center1');
          $right.removeClass('sl_right1').prev().addClass('sl_right1');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('sl_left1').last().addClass('sl_left');
            $center.removeClass('sl_center1').prev().addClass('sl_center');
            $right.removeClass('sl_right1').prev().addClass('sl_right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('sl_left1').prev().addClass('sl_left');
            $item.removeClass('sl_center1').last().addClass('sl_center');
            $right.removeClass('sl_right1').prev().addClass('sl_right');
          }
          else {
            $left.removeClass('sl_left1').prev().addClass('sl_left1');
            $center.removeClass('sl_center1').prev().addClass('sl_center1');
            $item.removeClass('sl_right1').last().addClass('sl_right1');
          }
        }
      }

    }, 400);

    $('.s1').animate({ opacity : 1 }, 400);

    });

  }


  function partnerSlider() {

    $('.sl_prev, .sl_next').click(function() {

      var $this = $(this),
          curLeft = $('.s').find('.sl_left'),
          curLeftPos = $('.s').children().index(curLeft),
          curCenter = $('.s').find('.sl_center'),
          curCenterPos = $('.s').children().index(curCenter),
          curRight = $('.s').find('.sl_right'),
          curRightPos = $('.s').children().index(curRight),
          totalWorks = $('.s').children().length,
          $left = $('.sl_left'),
          $center = $('.sl_center'),
          $right = $('.sl_right'),
          $item = $('.sl');

      $('.s').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('sl_next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('sl_left').next().addClass('sl_left');
          $center.removeClass('sl_center').next().addClass('sl_center');
          $right.removeClass('sl_right').next().addClass('sl_right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('sl_left').first().addClass('sl_left');
            $center.removeClass('sl_center').next().addClass('sl_center');
            $right.removeClass('sl_right').next().addClass('sl_right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('sl_left').next().addClass('sl_left');
            $item.removeClass('sl_center').first().addClass('sl_center');
            $right.removeClass('sl_right').next().addClass('sl_right');
          }
          else {
            $left.removeClass('sl_left').next().addClass('sl_left');
            $center.removeClass('sl_center').next().addClass('sl_center');
            $item.removeClass('sl_right').first().addClass('sl_right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('sl_left').prev().addClass('sl_left');
          $center.removeClass('sl_center').prev().addClass('sl_center');
          $right.removeClass('sl_right').prev().addClass('sl_right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('sl_left').last().addClass('sl_left');
            $center.removeClass('sl_center').prev().addClass('sl_center');
            $right.removeClass('sl_right').prev().addClass('sl_right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('sl_left').prev().addClass('sl_left');
            $item.removeClass('sl_center').last().addClass('sl_center');
            $right.removeClass('sl_right').prev().addClass('sl_right');
          }
          else {
            $left.removeClass('sl_left').prev().addClass('sl_left');
            $center.removeClass('sl_center').prev().addClass('sl_center');
            $item.removeClass('sl_right').last().addClass('sl_right');
          }
        }
      }

    }, 400);

    $('.s').animate({ opacity : 1 }, 400);

    });
  }

  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  outerNav();
  workSlider();
  partnerSlider();
  transitionLabels();

});
