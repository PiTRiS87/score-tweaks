// enable/disable actions
var enableMeanMenu = true; // enable MeanMenu - hamburger menu for mobile
var enableEasySend = true; // enable sending by ctrl+enter
var enableLightbox = true; // enable lightbox
var enableAutoRefresh = true; // enable room autorefresh
    var autoRefreshTime = 5; // auto refresh time (in minutes)
var autoRefreshShowTime = true; // show last refresh time in footer
var enableTinyMce = false; // not working at the moment
var enableThemeColor = true; // change theme color for android chrome
var enableMessageHighlight = true; // highlight new messages

$(document).ready(function () {
    var room = false;
    if(window.location.href.indexOf("room") > -1) {
        room = true;
    }

    if (enableMeanMenu) {
        $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='https://dl.dropbox.com/s/5r6wywyne5y99ay/meanmenu.min.css' type='text/css' media='screen'>");
        $.getScript("https://dl.dropbox.com/s/dsat4nkwsnuohc2/jquery.meanmenu.min.js").done(function(){
            $('.top-menu').meanmenu({
                meanScreenWidth: "640",
                meanRevealPosition: "left",
                meanRevealColour: "#869c95"
            });
        });
    }

    if (enableEasySend) {
        $('.message-form').first().keydown(function (e) {
            if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
                $('.message-form').first().submit();
            }
        });
    }
    if (enableThemeColor) {
        $("meta[name='theme-color']").attr('content', '#94ada5');
    }

    if (enableLightbox) {
        $('a[href$=".jpg"], a[href$=".gif"], a[href$=".png"]').each(function () {
            $(this).attr('data-lightbox', 'lightbox');
        });

        $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='https://dl.dropbox.com/s/p64inxg3y7k13gf/lightbox.min.css' type='text/css' media='screen'>");

        var script   = document.createElement("script");
        script.type  = "text/javascript";
        script.src   = "https://dl.dropbox.com/s/tkwzya6trnd07uw/lightbox.min.js";
        $('body').append(script)
    }

    if (enableTinyMce && room) {
        $.getScript("//cdn.tinymce.com/4/tinymce.min.js").done(function(){
            tinymce.init({
                selector:'textarea#id_text'
            });
        });
    }

    if (enableAutoRefresh && !room) {
        var time = autoRefreshTime*1000*60;
        setTimeout('window.location.reload();', time);
        if (autoRefreshShowTime) {
            var item = new Date();
            timeNow = item.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
            $('#content').append('<span style="float: right;">last refresh: <b>' + timeNow + '</b></span>');
        }
    }
    if (enableMessageHighlight) {
        if ($('span.inbox-new-messages').first().text() != '0') {
            $('span.inbox-new-messages').addClass('new');
        }
    }
});
