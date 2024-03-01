if(window.location.hash) scroll(0,0);
setTimeout(function(){
  scroll(0,0);
},1);


// --------------------------------------
// FUNCTION MENU UPDATE RESPONSIVE
// --------------------------------------
function menuUpdate(){
   var viewportWidth = $(window).outerWidth();
   var target = $('.navbar_language, .navbar_socialmedia');
   var $navbarSocial = $('.navbar_socials');
   if(viewportWidth <= 767){
      target.appendTo('.navbar_popmenu');
      $navbarSocial.appendTo('.navbar_popmenu')
      setTimeout(function(){
         target.show();
         $navbarSocial.show();
      },50);
   }else{
      target.insertAfter('.navbar_navicon');
      $navbarSocial.insertAfter('.navbar_brand');
   }
}

// --------------------------------------
// FUNCTION EQUAL HEIGHT
// --------------------------------------
function equalHeight(){
   if($('.section_row').length !== 0){
       $('.section_row').each(function(index){
         var maxHeight = 0;
         var vw = $(window).width();
         if (vw > 991){
            $(this).children().each(function(index){
              $(this).height('auto');
              if($(this).height() > maxHeight)
                maxHeight = $(this).height();
            });
            $(this).children().height(maxHeight);
         }else{
            $(this).children().height('auto');
         }
       });
   }
}

// --------------------------------------
// FUNCTION COLLAPSIBLE CONTENT
// --------------------------------------
function collapseContent(elem){
   var contentHeight = elem[0].scrollHeight;

   requestAnimationFrame(function(){
      elem.css('height', contentHeight + 'px');

      requestAnimationFrame(function(){
        elem.prop('style').height = 0 +'px';
      });
   });

   elem.attr('data-collapsed', 'true');
}

function expandContent(elem){
   var contentHeight = elem[0].scrollHeight;
   elem.css('height', contentHeight + 'px');
   elem.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
      // elem.off('transitionend', arguments.callee); <-- deprecated
      elem.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', expandContent(elem));
      elem.css('height', 'auto');
   });

   elem.attr('data-collapsed', 'false');
}

$('.toggle-content').on('click',function(){
   var contentExcerpt = $(this).closest('.section_content').children('.section_excerpt');
   var contentFull = $(this).closest('.section_content').children('.section_full');
   var isCollapsed = contentExcerpt.attr('data-collapsed') === 'true';
   var parentPositionTop = $(this).closest('.section_content').offset().top;

   if(isCollapsed){
      expandContent(contentExcerpt);
      collapseContent(contentFull);
      contentExcerpt.attr('data-collapsed', 'false');
      $(this).text('More Info');
      // setTimeout(function(){
      //    $('html, body').animate({'scrollTop': parentPositionTop}, 500);
      // },500);

   }else{
      collapseContent(contentExcerpt);
      expandContent(contentFull);
      $(this).text('Less Info');
   }
});

//PRELOADER HANDLE
$(window).on('load', function(){
   $('.preloader_wrapper').fadeOut();
   equalHeight();
});

$(window).on('resize', function(){
  equalHeight();
})

// --------------------------------------
// DOCUMENT READY
// --------------------------------------
$(document).ready(function(){

   // Ajax Form Dummy
   // For Development Purpose
   // Please Delete it for Backend Development
   // ----------------------------------------------
   var helpdeskForm = $('#helpdeskForm');
   helpdeskForm.on('submit', function(e){
      e.preventDefault();

      $(this).find('.form-control').each(function(){
         $(this).val("");
      });

      $(this).find('.form-control').first().focus();

      $('#formResult').addClass('is-reveal');
   });

   $('#modalSupport').on('hidden.bs.modal', function(){
      $('#formResult').removeClass('is-reveal');
   });

   var contactForm = $('#contactForm');
   contactForm.on('submit', function(e){
      e.preventDefault();

      $(this).find('.form-control').each(function(){
         $(this).val("");
      });

      $(this).find('.form-control').first().focus();
      $('#notifContactForm').addClass('is--visible');
   });

   $('.close-notification').on('click', function(){
      if($('#notifContactForm').hasClass('is--visible')){
         $(this).parent().removeClass('is--visible');
      }
   });

   // ---------------------------------------------

   //if iframe found on Single
   if($('.single iframe').length > 0){
      $('.single').find('iframe').each(function(){
         $(this).wrap('<div class="iframe-wrapper"></div>');
      });
   }

    //floating-button
    var floatBtn = $('.quicksupport');
    var windowHeight = $(window).height();

    $(window).on('scroll', function(){
      if ($(window).scrollTop() > 300){
        floatBtn.addClass('is-visible');
      }else{
        floatBtn.removeClass('is-visible');
      }
    });

   //Animate Anchor
   $('body').on('click','.navbar_submenu a', function(){
      var checkHash = $(this).attr('href').indexOf('#');

      $('.navbar_popmenu').removeClass('displayed');
      $('.navbar_navicon').find('span').removeClass('ti-close').addClass('ti-menu');
      $('.navbar_popmenu').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
         $(this).removeClass('display-block');
         $('body').css({'position':'relative', 'overflow-y':'visible'});
      });

      if(checkHash > 0){
         var target = $(this).attr('href').split('#')[1];
         var targetOffset = $('#'+ target).offset().top;

         $("html, body").animate({
            'scrollTop':  targetOffset
         },1000,function(){
            window.location.hash = '#' + target;

            var buttonToggle = $('#' + target).find('.toggle-content');

            // if(buttonToggle.length > 0){
            //    buttonToggle.trigger('click');
            // }
         });

      }

   });

   if(window.location.hash){
      var locationID = $(window.location.hash);
      var button = locationID.find('.toggle-content');

      $('html, body').animate({
         scrollTop: locationID.offset().top + 'px'
      },1000);

      //Check if location Hash have .toggle-content then trigger click
      if(button.length > 0){
         button.trigger('click');
      }
   }

   // DROPDOWN LANGUAGES
  //  var activeLang = function(){
  //     var activeLang = $('.dropdown_item.active>a').html();
  //     $('.dropdown_text').html(activeLang);
  //  };

  //  activeLang();
   menuUpdate();
   $(window).on('resize',menuUpdate);

  //  $('body').on('click', '.dropdown' , function(e){
  //     e.stopPropagation();
  //     $(this).toggleClass('active');

  //     var menu = $('.dropdown_menu');
  //     if(menu.hasClass('visible')){
  //        menu.removeClass('visible');
  //        menu.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
  //           menu.css('display','none');
  //        });
  //     }else{
  //        menu.css('display','block');
  //        setTimeout(function(){
  //           menu.addClass('visible');
  //        }, 20);
  //     }
  //  });

  //  $('body').on('click', '.dropdown_item', function(){
  //     if(!$(this).hasClass('active')){
  //        $('.dropdown_item').removeClass('active');
  //        $(this).addClass('active');
  //        activeLang();
  //     }
  //  });

   //Menu on Mobile
   if($('.navbar_navicon').length !== 0){
      //height of popmenu
      var winHeight = $(window).height();
      var headerHeight = $('.header').innerHeight();
      $('.navbar_popmenu').height(winHeight - headerHeight);
      $(window).resize(function(){
         var winHeight = $(window).height();
         var headerHeight = $('.header').innerHeight();
         $('.navbar_popmenu').height(winHeight - headerHeight);
      });

      $('body').on('click', '.navbar_dismissed', function(){
         $('.navbar_popmenu').removeClass('displayed');
         $('.navbar_popmenu').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
            $(this).removeClass('display-block');
            $('body').css('overflow-y','visible');
         });
      });

      $('body').on('click', '.navbar_navicon', function(){
         //reset to scroll xy === 0
         setTimeout(function(){
           scroll(0,0);
         },1);

         if($('.navbar_popmenu').hasClass('displayed')){
            $('.navbar_popmenu').removeClass('displayed');
            $('.navbar_popmenu').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
               $(this).removeClass('display-block');
               $('body').css({'overflow-y':'visible', 'position':'relative'});
            });
            $(this).find('span').removeClass('ti-close').addClass('ti-menu');
         }else{
            $('.navbar_popmenu').addClass('display-block');
            $('body').css({'overflow-y':'hidden', 'position': 'fixed'});
            setTimeout(function(){
              $('.navbar_popmenu').addClass('displayed');
            },20);
            $(this).find('span').addClass('ti-close').removeClass('ti-menu');
         }

      });
   }

  //Navbar submenu
  var menuTarget = $('.navbar_list');

   menuTarget.each(function(){
       if($(this).children('ul').length > 0){
         $("<span class='navbar_arrow ti-angle-down'></div>").appendTo($(this).children('a'));
       }
   });

   menuTarget.on('click','a',function(e){
    var $this = $(this);

    if($this.siblings('ul').length !== 0){
      e.preventDefault();
    }

    if(!$this.parent().hasClass('active')){

      //make default state
      $('.navbar_list').removeClass('active');
      $('.navbar_submenu').css('display','none');
      $('.navbar_list span').removeClass('flipped');

      $this.siblings('ul').css('display','block');
      $this.find('span').addClass('flipped');

      //make opacity to 1 and do animation after display block in 20ms after
      setTimeout(function(){
         $this.parent().addClass('active');

      },20);

      }else{

         $this.parent().removeClass('active');
         $this.siblings('ul').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){

           $this.siblings('ul').css('display','none');

         });
         $this.find('span').removeClass('flipped');
      }
   });

   //CATEGORY MENU
   if($('.category_menu').length != 0){

      $('.category_menu').on('click','a', function(e){
        e.preventDefault();

        var hash = $(this).attr('href');
        $('body,html').animate({
          scrollTop: $(hash).offset().top
        },500, function(){
            window.location.hash = hash;
        });
     });

     $(window).on('scroll', function(){
        // console.log($(window).scrollTop());
        if( $(window).scrollTop() >=  $('#cat04').offset().top){
          $('.category_menu').removeClass('fixed');
          $('.category_menu').css('top', $('#cat04').position().top + 50);
        }else if ($(window).scrollTop() > $('#cat01').offset().top){
          $('.category_menu').addClass('fixed');
          $('.category_menu').css('top', $(window).scrollTop() - $('#cat01').offset().top + 50);
        } else{
          $('.category_menu').removeClass('fixed');
          $('.category_menu').css('top', 50 );
        }
     });

   }


   //OWL-CAROUSEL
   if( $('.owl-carousel').length != 0 ){
      $('#testimonialCarousel, #activitiesCarousel').owlCarousel({
        items: 1,
        // autoplay: true,
        loop: true
      });

      $('#milestoneCarousel').owlCarousel({
         autoplay: true,
         margin: 0,
         center: true,
         responsive: {
            0: {
               items: 2,
               dots: false
            },
            600: {
               items: 3
            },
            992: {
               items: 5,
               margin: 0,
               nav: true,
               navText: ['<span class="ti-angle-left"></span>','<span class="ti-angle-right"></span>'],
            }
         },
         onInitialized: function(e){
            //set max item height
            // var arrayHeight = $('.c_milestone_content').map(function(){
            //       return $(this).height();
            // }).get();
            // var maxHeight = Math.max.apply(Math, arrayHeight);
            // var total = arrayHeight.length;
            // $('.c_milestone_content').height(maxHeight);

            //set stagger view
            // $('.c_milestone_content').each(function(i){
            //    $(this).parent().find('.c_milestone_label').css('margin-top', (e.item.count - i) * 10);
            // });
         },
         onResize: function(e){
            //console.log(e.target.id);
            $('#'+e.target.id).trigger('refresh.owl.carousel');
         }
      });

      $('#milestoneCarouselAlt').owlCarousel({
         autoplay: true,
         margin: 0,
         center: true,
         responsive: {
            0: {
               items: 1,
               dots: false,
               center: false
            },
            600: {
               items: 3,
               dots: false
            },
            992: {
               items: 3,
               margin: 0,
               nav: true,
               dots: false,
               navText: ['<span class="ti-angle-left"></span>','<span class="ti-angle-right"></span>'],
            }
         },
         onResize: function(e){
            //console.log(e.target.id);
            $('#'+e.target.id).trigger('refresh.owl.carousel');
         }
      });

   }

   //VIDEO
   if($('#videoPrimacom').length > 0){
    $('#videoPrimacom').on('shown.bs.modal', function(){
      $('#videoPlayer')[0].play();
    });
    $('#videoPrimacom').on('hidden.bs.modal', function(){
      $('#videoPlayer')[0].load();
    });
   }

   //Revo Slider
   if( $("#rev_slider_28_1").length !== 0 ){
      if($("#rev_slider_28_1").revolution == undefined){
         revslider_showDoubleJqueryError("#rev_slider_28_1");
      }else{
         revapi28 = $("#rev_slider_28_1").show().revolution({
            sliderType:"standard",
            jsFileLocation:"revolution/js/",
            //sliderLayout:"fullscreen",
            dottedOverlay:"none",
            delay: 2000,
            navigation: {
               keyboardNavigation:"on",
               keyboard_direction: "horizontal",
               mouseScrollNavigation:"off",
               mouseScrollReverse:"default",
               onHoverStop:"off",
               arrows: {
                  style:"uranus",
                  enable:true,
                  hide_onmobile:false,
                  hide_onleave: true,
                  tmp:'',
                  left: {
                     h_align:"left",
                     v_align:"center",
                     h_offset:20,
                     v_offset:0
                  },
                  right: {
                     h_align:"right",
                     v_align:"center",
                     h_offset:20,
                     v_offset:0
                  }
               },
               bullets: {
                  enable:true,
                  hide_onmobile:false,
                  style:"hermes",
                  hide_onleave:false,
                  direction:"horizontal",
                  h_align:"center",
                  v_align:"bottom",
                  h_offset:0,
                  v_offset:0,
                  space:8,
                  tmp:''
               },
               touch: {
                 touchenabled: 'on',
                 swipe_threshold: 75,
                 swipe_min_touches: 1,
                 swipe_direction: 'horizontal',
                 drag_block_vertical: true
               }
            },
            responsiveLevels:[1240,1024,778,480],
            visibilityLevels:[1240,1024,778,480],
            gridwidth:[1240,1024,778,480],
            //gridheight:[868,768,960,720],
            gridheight:[700,550,550,550],
            lazyType:"none",
            shadow:0,
            spinner:"off",
            stopLoop:"off",
            stopAfterLoops:-1,
            stopAtSlide:-1,
            shuffle:"off",
            autoHeight:"off",
            fullScreenAutoWidth:"off",
            fullScreenAlignForce:"off",
            fullScreenOffsetContainer: ".header",
            fullScreenOffset: "0",
            hideThumbsOnMobile:"off",
            hideSliderAtLimit:0,
            hideCaptionAtLimit:0,
            hideAllCaptionAtLilmit:0,
            debugMode:false,
            fallbacks: {
               simplifyAll:"off",
               nextSlideOnWindowFocus:"off",
               disableFocusListener:false,
            }
         });
      }
      // if(revapi28) revapi28.revSliderSlicey();
   }
});



