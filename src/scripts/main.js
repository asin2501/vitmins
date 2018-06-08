$(document).ready(function () {

    initPromoRibbon();
    initMobileMenu();
    initSubscribeForm();
    initAccordion();
    scrollToAchor($('.js-anchor-link'));
    initToggler();
    filterSlideToggle();
    initAccountPopup();
    initInnovationFilter();
    initProductSlider();
    hideAdresses();


    function initPromoRibbon() {
        var promoRibbon = $('#promo-ribbon');
        promoRibbon.find('.promo-ribbon__cross').click(function () {
            promoRibbon.slideUp();
        });
    }

    function initMobileMenu() {
        var $mainNav = $('.js-main-nav');
        var $menuButton = $('.js-menu-button');
        var $menuCloseButton = $('.js-close-menu');
        var $body = $('.global-wrapper');

        $menuButton.click(function () {
            openMenu();
            $body.addClass('scroll-no menu-opened');
        });

        $menuCloseButton.click(function () {
            closeMenu();
            $body.removeClass('scroll-no menu-opened');
        });

        $(window).resize(function () {

        });

        function openMenu() {
            $mainNav.fadeIn();
        }

        function closeMenu() {
            $mainNav.fadeOut();
        }
    }

    function initAccordion() {
        var $accordion = $('.js-accordion');


        if ($accordion.length > 0) {
            $accordion.each(function () {
                var $accordionTitle = $(this).find('.js-accordion-title');
                var $accordionBody = $(this).find('.js-accordion-body')
                $accordionTitle.click(function () {
                    $(this).toggleClass('faq-accordion__title--open');
                    $accordionBody.stop().slideToggle();
                });
            });
        }
    }

    function filterSlideToggle() {
        var $navPanel = $('.js-navpanel');
        var $navLabel = $('.js-navpanel-label');
        var $navMenu = $('.js-navpanel-menu');
        var $navLink = $navMenu.find('.navigation-panel__link');

        if ($navPanel.length > 0) {
            $navLabel.click(function () {
                $navMenu.stop().slideToggle();
                $(this).toggleClass('navigation-panel__label--open')
            });

            $navLink.click(function() {
               if ($navLabel.hasClass('navigation-panel__label--open')) {
                   $navMenu.slideUp();
                   $navLabel.removeClass('navigation-panel__label--open');
               }
            });

            $(document).click(function(event) {
                if(!$(event.target).closest($navLabel.add($navPanel)).length) {
                    if ($navLabel.hasClass('navigation-panel__label--open')) {
                        $navMenu.slideUp();
                        $navLabel.removeClass('navigation-panel__label--open');
                    }
                }
            });

            $(document).on('mousedown touchstart', function(event){
                if(!$(event.target).closest($navLabel.add($navPanel)).length) {
                    if ($navLabel.hasClass('navigation-panel__label--open')) {
                        $navMenu.slideUp();
                        $navLabel.removeClass('navigation-panel__label--open');
                    }
                }

            });

            $(window).resize(function () {
                if (window.innerWidth > 767) {
                    $navMenu.attr('style', '');
                    $navLabel.removeClass('navigation-panel__label--open');
                }
            });
        }

    }

    function initSubscribeForm() {
        $('#subscribe-form').formchimp();
    }

    function scrollToAchor($link) {
        $link.click(function (e) {
            var $linkedSection = $("" + $(this).attr('href'));
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $linkedSection.offset().top
            }, 400);

        });
    }

    function initAccountPopup() {
        var $header = $('#header');
        var $loginLink = $header.find('.js-login-link');
        var $loginPopup = $('.js-login-popup');

        var $mainNav = $('.js-main-nav');
        var $body = $('.global-wrapper');

        if ($loginPopup.length > 0) {
            var $closeBtn = $loginPopup.find('.js-close-popup-account');
            var $backLink = $loginPopup.find('.js-back-popup');

            $loginLink.click(function (e) {
                e.preventDefault();
                openAccountPopup();
            });

            $closeBtn.click(fadeOutAccountPopup);

            $backLink.click(function (e) {
                e.preventDefault();
                closeMobilePopup();
            });

            function openAccountPopup() {
                $body.addClass('scroll-no');


                if (window.innerWidth < 768) {
                    $loginPopup.addClass('popup--open');
                } else {
                    $loginPopup.fadeIn();
                }
            }

            function fadeOutAccountPopup() {
                if ($body.hasClass('menu-opened')) {
                    $mainNav.hide();
                    $body.removeClass('menu-opened');
                }

                $loginPopup.fadeOut();
                if (window.innerWidth < 768) {
                    setTimeout(function () {
                        $loginPopup.removeClass('popup--open');
                        $loginPopup.css('display', '');
                    }, 600);
                } else {
                    setTimeout(function () {
                        $loginPopup.css('display', '');
                    }, 600);
                }
                $body.removeClass('scroll-no');
            }

            function closeMobilePopup() {
                $loginPopup.removeClass('popup--open');
            }
        }


    }

    function initToggler() {
        $('.js-toggle-btn').click(function () {
            $(this).parents('.js-toggle-parent').find('.js-toggle-content').stop().slideToggle();
            $(this).toggleClass('active');
        });
    }

    function initInnovationFilter() {
        var filterMenu = $('#innovation-filters');
        if (filterMenu.length) {
            var vitamines = $('.js-vitamine');
            filterMenu.find('.js-vitamine-filter').click(function () {
                var category = $(this).data('category').trim();
                if (category === 'All') {
                    vitamines.slideDown().removeClass('vitamine--bg-beige').each(function(i){
                        if(i % 2) {
                            $(this).addClass('vitamine--bg-beige');
                        }
                    });
                } else {
                    category = new RegExp(category, 'i');

                    var listVisiable = $();
                    var listInvisiable = $();

                    vitamines.each(function () {
                        if (category.test($(this).data('category'))) {
                            listVisiable = listVisiable.add($(this));
                        } else {
                            listInvisiable = listInvisiable.add($(this));
                        }
                    });

                    listVisiable.removeClass('vitamine--bg-beige').slideDown().each(function(i){
                        if(i % 2) {
                            $(this).addClass('vitamine--bg-beige');
                        }
                    });
                    listInvisiable.slideUp();
                }
            });
        }
    }

    function initProductSlider(){
        var $productsSlider = $('.js-products-slider');
        if  ($productsSlider.length > 0) {
            $productsSlider.slick({
                rows: 0,
                arrows: false,
                appendArrows: $('.collection-slider__wrapper'),
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 850,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 601,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
        }
    }

    function hideAdresses() {
        var $adresses = $('.addresses');
        if ($adresses.length) {
            var $editButton = $('.address-edit-toggle');
            $editButton.on('click', function (e) {
                var $addressBlock = $(e.target).parents('.address-block');
                $addressBlock.addClass('is-edit');

                $('.address-block').each(function (i ,el) {
                   if(!$(el).hasClass('is-edit')){
                       $(el).toggleClass('hide');
                   }
                });

                $addressBlock.removeClass('is-edit');
            });
        }
    }
});