/*		
	date : 2018-12-24
	author :  Somi Park
	modify :  Somi Park
	site : projectQ
*/

var ie = /MSIE/.test(navigator.userAgent);
ieVer = ie ? parseInt(navigator.userAgent.split('MSIE')[1].split(';')[0]) : false;


if (jQuery) (function ($) {
    //Width Control
    $.extend($.fn, {

        adjustWidth: function () {
            var init = function (menu) {
                if ($(menu)[0].tagName == "UL") { menu = $(menu); }
                else { menu = $(menu).find('>ul'); }
                menu.find('>li').css({ width: 100 / menu.find('>li').length + '%' });
            }

            $(this).each(function () {
                init(this);
            });

            return $(this);
        }
    });

    $.extend($.fn, {

        count : function (remainTime,totalTime) {

            var init = function () {
                //ī��Ʈ ���� ����

                
                var timeText = remainTime,
                //var timeText = $('.time-txt').text(),
                    count = timeText,
                    countBar = count * 1000;

                //ī��Ʈ�ٿ��Լ�
                var countTime = setInterval(function () {
                    if (count <= 0) {
                        clearInterval(countTime);
                    }
                    else {
                        count--;
                        $('.time-txt').text(count);
                    }
                }, 1000);

				
				var defaultWidth = Math.round(remainTime/totalTime * 100);
				if( defaultWidth < 80 ){
					$('.time-bar').css('width', defaultWidth+'%');
				}
                
                // ī��Ʈ��
                $('.time-bar').animate({
                    width: 0
                }, countBar, function () {
                    $('.time-txt').css({'width': '0'});
                });
            }

            $(this).each(function () {
                init(this);
            });

            return $(this);
        }
    });

    $.extend($.fn, {

        toggleFocus: function () {

            var init = function () {
                $el = $('.answer-texarea, .shortAnswer input');
                if (window.innerHeight < window.innerWidth && window.innerHeight <= 480 || window.innerWidth <= 480) {
                    $el.on('focus blur', focusBlur);

                    function focusBlur(e) {
                        //console.log(e.type);
                        if (e.type == 'focus') {
                            $('body').scrollTop(0);
                            $('.header, .answer-cont').addClass('active-input');
                        }
                        else if (e.type == 'blur') {
                            $('.header, .answer-cont').removeClass('active-input');
                        }
                    }
                }
            }

            $(this).each(function () {
                init(this);
            });

            return $(this);
        }
    });


})(jQuery);

$(document).ready(function () {
    //jquery-ui
    $(".tabs").tabs();
    $('select:not(select[multiple]):not(.normal)').selectmenu();
    $("input[type=checkbox], input[type=radio]").checkboxradio();

    //$('.time').count();
    //$('.answer-texarea, .shortAnswer input').toggleFocus();
});

$(window).scroll(function () {
});


$(window).on("orientationchange", function() {
});

$(window).resize(function () {
});
