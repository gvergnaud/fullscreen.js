/* ---- FullScreen jQuery Plugn ---- */
// Version: 0.3.0
// Author: Gabriel Vergnaud
// Utilisation: example : $('jQuerySelector').fullscreen(options);
// Parameters: 	noCrop: (facultativ), default value : false. if set to true, pictures wont be cropped.
//				position: set the position css property to the background
jQuery(function($){
	'use strict';
	$.fn.extend({
		goFullScreen: function(options){
	        var $element = $(this),
				$container = $element.parent(),
				windowWidth = $(window).width(),
				windowHeight = $(window).height(),
				pictureWidth,
				pictureHeight;

			if(options.backgroundWidth){
				$container.css({
					width: parseInt(options.backgroundWidth) + 'px'
				});
			}else{
				$container.css({
					width: windowWidth + 'px'
				});
			}

			if(options.backgroundHeight){
				$container.css({
					height: parseInt(options.backgroundHeight) + 'px'
				});
			}else{
				$container.css({
					height: windowHeight + 'px'
				});
			}


			if($element[0].nodeName.toLowerCase() === 'img'){
	            pictureWidth = $element[0].width;
				pictureHeight = $element[0].height;
			}else if($element[0].nodeName.toLowerCase() === 'video'){
				pictureWidth = $element[0].videoWidth;
				pictureHeight = $element[0].videoHeight;
			}

			if(options.noCrop){
				if(windowWidth * pictureHeight >= windowHeight * pictureWidth){
					$element.css({
						width: (windowHeight*pictureWidth)/(pictureHeight) +'px',
						height: windowHeight + 'px'
					});
				}else{
					$element.css({
						width: windowWidth + 'px',
						height: (windowWidth*pictureHeight)/(pictureWidth) +'px'
					});
				}
			}else{
				if(windowWidth * pictureHeight >= windowHeight * pictureWidth){
					$element.css({
						width: windowWidth + 'px',
						height: (windowWidth*pictureHeight)/(pictureWidth) +'px'
					});
				}else{
					$element.css({
						width: (windowHeight*pictureWidth)/(pictureHeight) +'px',
						height: windowHeight + 'px'
					});
				}
			}

			$element.css({
				top: -(parseInt($element.css('height')) - windowHeight)/2 + 'px',
				left: -(parseInt($element.css('width')) - windowWidth)/2 + 'px',
				zIndex: '0'
			});
		},

	    fullscreen: function(options){
	    	if(typeof(options) === 'undefined'){
	    		options = {};
	    	}

	        if(typeof(options.noCrop) === 'undefined'){
				options.noCrop = false;
	        }

	        if(typeof(options.backgroundWidth) === 'undefined'){
				options.backgroundWidth = false;
	        }

	        if(typeof(options.backgroundHeight) === 'undefined'){
				options.backgroundHeight = false;
	        }

	        var $elements = $(this);
	        

	        $elements.each(function (index, value){
	            var $element = $(this),
	                $container = $element.parent();

	            $('body').css({
	                margin: '0',
	                padding: '0',
	                overflowX: 'hidden'
	            });

	            if(typeof(options.position) !== 'undefined'){
	           		$container.css({
	            		position: options.position,
		                top: '0',
		                backgroundColor: '#000',
	            		overflow: 'hidden',
		                zIndex: '-1000'
	            	});
	            }else{
	           		$container.css({
	            		position: 'relative',
		                top: '0',
		                backgroundColor: '#000',
	            		overflow: 'hidden',
		                zIndex: '-1000'
	            	});
	            }

	            $element.css({
	                position: 'absolute'
	            });
			
				if($element['0'].nodeName.toLowerCase() === 'video'){
		            $element.on('loadeddata', function(){
						$element.goFullScreen(options);
		            });
		        }else{
					$element.goFullScreen(options);
		        }

	            $(window).on('resize', function(){
					$element.goFullScreen(options);
			    });
	        }); // Fin boucle each
	    }
	});
});