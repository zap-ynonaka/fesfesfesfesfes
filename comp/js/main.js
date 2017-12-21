import $ from 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap/transition';
import 'bootstrap-sass/assets/javascripts/bootstrap/collapse';
import 'bootstrap-sass/assets/javascripts/bootstrap/modal';
import 'bootstrap-sass/assets/javascripts/bootstrap/tab';

const $window = $(window);

const smoothscroll = function($that) {
  // スクロールの速度
  var speed = 400; // ミリ秒
  // アンカーの値取得
  var href= $that.attr("href");

  // 移動先を取得
  var target = $(href === "#" || href === "" ? 'html' : href);
  // 移動先を数値で取得
  var position = target.offset().top - 50;
  // スムーススクロール
  $('body,html').animate({scrollTop:position}, speed, 'swing');
  return false;
}

$window.on('load', function() {

  const windowHeight = $window.outerHeight();

  // メニュー
  (function() {
    const $menuBtn = $('#js-menuBtn');
    const $menu = $('#js-menu');
    const $menuScroll = $menu.find('#js-menu-scroll');
    const $menuItem = $menu.find('.js-menuItem');
    const openNaviClassName = 'open-navi';
    const closeNaviClassName = 'close-navi';

    $menuBtn.on('click', function() {
      if ($(this).hasClass(openNaviClassName)) {
        $(this).addClass(closeNaviClassName);
        $(this).removeClass(openNaviClassName);
        $menuItem.off('click');
        return_scroll();
      } else {
        $(this).addClass(openNaviClassName);
        $(this).removeClass(closeNaviClassName);
        no_scroll();
        setTimeout(function() {
          $menuScroll.css({
            height: windowHeight,
          });
          // var iscroll = new IScroll('#js-menu-scroll', {
          //   scrollX: false,
          //   scrollY: true,
          //   click: true,
          //   scrollbars: false,
          //   useTransform: true,
          //   useTransition: true,
          //   disablePointer: true,
          //   disableTouch: false,
          //   disableMouse: false
          // });

          $menuItem.on('click', function() {
            $menuBtn.trigger('click');
            smoothscroll($(this));
          });
        },0);
      }
    });

  }());

  (function() {
    scrollAnimation();
  }());

  (function() {
    // #で始まるアンカーをクリックした場合に処理
    $('.js-scrollLink').on('click', function(){
      smoothscroll($(this));
    });
  }());

  var current_scrollY;

  function no_scroll() {
    current_scrollY = $(window).scrollTop();

    $('#js-bodyWrapper').css({
      position: 'fixed',
      width: '100%',
      top: current_scrollY
    });

    $(window).off('.fixedheader');
  }

  function return_scroll() {
    $('#js-bodyWrapper').attr({style: ''});
    $( 'html, body' ).prop( { scrollTop: current_scrollY } );
    scrollAnimation();
  }

  function scrollAnimation() {
    const $hero = $('#hero');
    if ($hero[0]) {
      const $fixedHeader = $('#js-fixHeader');
      const $btnScrollTop = $('#js-scrollTop');
      const $targetOffset = $hero.offset().top;
      const className = 'show';
      let flug = true;

      $window.on('scroll.fixedheader', function() {
        if(flug){
          flug = false;
          setTimeout(function() {
            if ($window.scrollTop() >= $targetOffset) {
              $fixedHeader.addClass(className);
              $btnScrollTop.addClass(className);
            } else {
              $fixedHeader.removeClass(className);
              $btnScrollTop.removeClass(className);
            }
            flug = true;
            return flug;
          }, 200);
        }
      });
    }
  }

});


$(function(){


  var v = document.getElementsByTagName("video")[0];

  $('.reflectionArea__movie span, .reflectionArea__movie img').on('click',function(){
    v.play();
    v.setAttribute("controls", "controls");
    $('.reflectionArea__movie img').css('display', 'none');
    $(".reflectionArea__movie span").removeClass("reflectionArea__movieIcon");
    v.onended = function(e) {
      v.load();
    }
  });

  $('.videoArea__images ul, .videoArea__images li img').css('height', $('.videoArea__images img').width() * 0.566666 );

  $('.headerBtn').on('click', function(){
    var target = '.headerBtn > div';
    $(target).addClass('js-headerBtn__action');
    $(target).toggleClass('js-headerBtn__active');
    $('header nav').toggleClass('js-menuNav__active');
    $('header nav').css('width', $('.container').width() );
  });
});

$(window).on('resize', function(){
  var navPosition = $('.container').width() - 50;
  $('.headerBtn').css('left', navPosition);
  $('.videoArea__images ul').css('height', $('.videoArea__images img').width() * 0.566666 );
});

function topImageActive(){
  $('.videoArea__images li.active').next().addClass('active');
}
function topImageHidden(){
  $('.videoArea__images li').removeClass('active');
  $('.videoArea__images li:first-child').addClass('active');
}

setInterval(topImageActive, 3000);
setInterval(topImageHidden, 21000);

const menu_open = {
  transform: 'translateY(0)',
},
menu_close = {
  transform: '',
}
$('nav.devicePC > ul > li:nth-of-type(5)').hover(function(){
  $('nav.devicePC li:nth-of-type(5) div.navigation__Contents').css(menu_open);
  console.log("ホバー");
}, function() {
  $('nav.devicePC li:nth-of-type(5) div.navigation__Contents').css(menu_close);
  console.log("ホバーはずれた");
});

$('nav.devicePC > ul > li:nth-of-type(7)').hover(function(){
  $('nav.devicePC li:nth-of-type(7) div.navigation__Contents').css(menu_open);
  console.log("ホバー");
}, function() {
  $('nav.devicePC li:nth-of-type(7) div.navigation__Contents').css(menu_close);
  console.log("ホバーはずれた");
});

$(function() {
  $(window).on('scroll', function(){
    if($(this).scrollTop() > 100) {
      $('.footerRegister').addClass('active');
      $('.sw-Totop').addClass('show');
    } else {
      $('.footerRegister').removeClass('active');
      $('.sw-Totop').removeClass('show');
    }
  });
  $('a[href^="/#"]').on('click', function(){
    $('header .headerBtn__open').removeClass('js-headerBtn__active');
    $('header nav').removeClass('js-menuNav__active');
  });
});


$(function(){
  $('.modal-open').click(function(){
      $('body').append('<div class="modal-overlay"></div>');
      $('.modal-overlay').fadeIn('slow');

      var modal = '#' + $(this).attr('data-target');
      modalResize();
      $(modal).fadeIn('slow');

      $('.modal-overlay, .modal-close').off().click(function(){
          $(modal).fadeOut('slow');
          $('.modal-overlay').fadeOut('slow',function(){
              $('.modal-overlay').remove();
          });
      });

      $(window).on('resize', function(){
          modalResize();
      });

      function modalResize(){
          var w = $(window).width();
          var h = $(window).height();
          var x = (w - $(modal).outerWidth(true)) / 2;
          var y = (h - $(modal).outerHeight(true)) / 9;
          $(modal).css({'left': x + 'px','top': y + 'px'});
      }

  });
});
