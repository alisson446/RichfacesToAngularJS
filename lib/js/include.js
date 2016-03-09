$(function($){
    /* ================ MAIN NAVIGATION ================ */
	
    function piMainmenu(){
        $(" #nav ul ").css({
            display: "none"
        }); // Opera Fix
        $(" #nav li").hover(function(){
            $(this).find('ul:first').css({
                visibility: "visible",
                display: "none"
            }).slideDown(250);
        },function(){
            $(this).find('ul:first').css({
                visibility: "hidden"
            });
        });
    }
    
    function piSelectMenu(){
        $('#nav-responsive').on('change', function() {
            window.location = $(this).val();
        }); 
    }
    
    /* ================ SEARCH BUTTON ================ */
    
    $('#header').on('click', '#search', function(e){
        e.preventDefault();

    $(this).find('#search-bkg').fadeIn().focus();
    });
    
    $('#search-bkg').focusout(function(e){
        $(e.target).fadeOut();
    });
	
    /* ================ CONTENT TABS ================ */
    
    (function() {
        $('.tabs').each(function(){
            var $tabLis = $(this).find('li');            
            var $tabContent = $(this).next('.tab-content-wrap').find('.tab-content');
            
            $tabContent.hide();
            $tabLis.first().addClass('active').show();
            $tabContent.first().show();
        });
        

        $('.tabs').on('click', 'li', function(e) {
            var $this = $(this);
            var parentUL = $this.parent();
            var tabContent = parentUL.next('.tab-content-wrap');

            parentUL.children().removeClass('active');
            $this.addClass('active');
                
            tabContent.find('.tab-content').hide();
            var showById = $( $this.find('a').attr('href') );
            tabContent.find(showById).fadeIn();            

            e.preventDefault();
        });                  
    })();
    
    /* ================ ACCORDION ================ */
    
    $('.accordion').on('click', '.title', function(event) {
        event.preventDefault();
        $(this).siblings('.accordion .active').next().slideUp('normal');
        $(this).siblings('.accordion .title').removeClass("active");
        
        if($(this).next().is(':hidden') == true) {
            $(this).next().slideDown('normal');
            $(this).addClass("active");
        }
    });
    $('.accordion .content').hide();
    $('.accordion .active').next().slideDown('normal');
    
    /* ================ TOGGLE ================ */
    
    $(".vertical-toggle .content").hide();
    $(".vertical-toggle .title").eq(0).addClass('active').next().slideDown();
    $(".vertical-toggle .title").toggle(function(){
        if($(this).hasClass('active')){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
        
    }, function () {
        if($(this).hasClass('active')){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
        
    });
    $(".vertical-toggle .title").click(function(){
        $(this).next(".vertical-toggle .content").slideToggle();
    });
    
        
    $(document).ready(function(){					
        piMainmenu();
        piSelectMenu();

        /* ================ INSTAGRAM FEED ================ */
        $('.instagram-feed').socialstream({
            socialnetwork: 'flickr',
            limit: 15,
            username: 'Mrky1',
            overlay: true
        })
        
        /* ================ PLACEHOLDER PLUGIN ================ */
        $('input[placeholder], textarea[placeholder]').placeholder();
    });
});


