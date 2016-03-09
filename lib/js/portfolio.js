$(document).ready(function(){
    
    /* Pretty photo */ 
    if(jQuery().prettyPhoto) {
        piPrettyphoto(); 
    }
    
    function piPrettyphoto(){
        $("a[data-gal^='prettyPhoto']").prettyPhoto();
    }    
    	
    // get the action filter option item on page load
    var $filterType = $('#portfolio-filter li.active a').attr('class');

    // get and assign the holder element to the
    // $holder varible for use later
    var $holder = $('ul#filter-item');

    // clone all items within the pre-assigned $holder element
    var $data = $holder.clone();
    
    // portfolio multiple filter    
    $('#category-filter li a, #client-filter li a').click(function(e){
        
        // get all filters
        var $filterAlpha = $('.portfolio-filters #category-filter');
        var $filterBeta = $('.portfolio-filters #client-filter');
        
        // remove active class on all elements
        $(this).closest('li').siblings('li').removeClass('active');
        // add active class to currently selected filter and parent UL container
        $(this).parent().addClass('active');
        //        $(this).closest('ul').addClass('active');
        // get currently selected first filter
        var activeAlpha = $filterAlpha.find('.active a').attr('class');
        // get currently selected second filter
        var activeBeta = $filterBeta.find('.active a').attr('class');
        
        // IE7 fix - Selectivizr brakes quicksand animation
        activeAlpha = activeAlpha.replace(/slvzr-hover|slvzr-focus/gi, '');
        activeAlpha = activeAlpha.replace(/^\s+|\s+/g, '');       
        activeBeta = activeBeta.replace(/slvzr-hover|slvzr-focus/gi, '');
        activeBeta = activeBeta.replace(/^\s+|\s+/g, '');
                
        // get values for both filters
        if (activeAlpha == 'all'){            
            if (activeBeta == 'all'){
                // 0-0
                var $filteredData = $data.children('li');
            } else {
                // 0-1
                var $filteredData = $data.find('li[data-beta=' + activeBeta + ']' );
            }
        } else {
            if (activeBeta == 'all'){
                // 1-0
                var $filteredData = $data.find('li[data-alpha=' + activeAlpha + ']' );
            } else {
                // 1-1
                var $filteredData = $data.find('li[data-alpha=' + activeAlpha + ']' + 'li[data-beta=' + activeBeta + ']');
            }
        }
        
        // call quicksand and assign transition parameters
        $holder.quicksand($filteredData, {
            duration: 800,
            easing: 'swing'
        },function() {
            // reload other plugins
            piPrettyphoto();
            portfolioHoverAnimation();
            portfolioHoverPosition();
        });
        return false;
    });    
    
    // portfolio single filter
    $('#portfolio-filter li a').click(function(e) {
        // reset the active class on all the buttons
        $('#portfolio-filter li').removeClass('active');

        // assign the class of the clicked filter option
        // element to our $filterType variable
        var $filterType = $(this).attr('class');
        // IE7 fix - Selectivizr brakes quicksand animation
        $filterType = $filterType.replace(/slvzr-hover|slvzr-focus/gi, '');
        $filterType = $filterType.replace(/^\s+|\s+/g, '');
        $(this).parent().addClass('active');
        if ($filterType == 'all') {            
            // assign all li items to the $filteredData var when
            // the 'All' filter option is clicked                       
            var $filteredData = $data.children('li');
        }
        else {            
            // find all li elements that have our required $filterType
            // values for the data-type element            
            var $filteredData = $data.find('li[data-alpha*=' + $filterType + ']');
        }

        // call quicksand and assign transition parameters
        $holder.quicksand($filteredData, {
            duration: 800,
            easing: 'swing'
        },function() {
            // reload other plugins
            piPrettyphoto();
            portfolioHoverAnimation();
            portfolioHoverPosition();
        });
        return false;
    });
        
    // set portfolio hover initial position
    portfolioHoverPosition();
    function portfolioHoverPosition(){
        $('.caption-hover').css({
            'top': '100%'
        });
    }    
    
    portfolioHoverAnimation();
    function portfolioHoverAnimation(){
        // animate portfolio on hover
        $('.portfolio').hover(
            function(){
                var captionTitle = $(this).find('.caption-title').outerHeight();
                var parentHeight = $(this).find('.caption-title').parent().outerHeight();
                var captionHover = $(this).find('.caption-hover').parent().outerHeight();

                $(this).find('.caption-title').animate(
                {
                    'margin-top' : -captionTitle
                }, '200', 'linear');
                $(this).find('.caption-hover').animate(
                {
                    'top' : 0
                }, '200', 'linear');
            }, 
            function(){
                $(this).find('.caption-title').animate(
                {
                    'margin-top' : '0'
                }, '200', 'linear');
                $(this).find('.caption-hover').animate(
                {
                    'top' : '100%'
                }, '200', 'linear');
            });
    }
    
             
});
