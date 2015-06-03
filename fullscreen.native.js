/**
 * fullscreen.js v 0.1.0
 *
 * Author : Gabriel Vergnaud
 *
 * See on Github : https://github.com/gvergnaud/fullscreen.js
 * 
 */
;(function(){
	window.FullScreen = (function(window){

		//PRIVATE
		var goFullScreen = function(element, options){
			var container = element.parentNode,
			windowWidth = window.innerWidth,
			windowHeight = window.innerHeight,
			pictureWidth,
			pictureHeight;

			if(options.backgroundWidth){
				container.style.width = parseInt(options.backgroundWidth) + 'px';
			}else{
				container.style.width = windowWidth + 'px';
			}

			if(options.backgroundHeight){
				container.style.height = parseInt(options.backgroundHeight) + 'px';
			}else{
				container.style.height = windowHeight + 'px';
			}


			if(element.nodeName.toLowerCase() === 'img'){
				pictureWidth = element.width;
				pictureHeight = element.height;
			}else if(element.nodeName.toLowerCase() === 'video'){
				pictureWidth = element.videoWidth;
				pictureHeight = element.videoHeight;
			}

			if(options.noCrop){
				if(windowWidth * pictureHeight >= windowHeight * pictureWidth){
					element.style.width = (windowHeight*pictureWidth)/(pictureHeight) +'px';
					element.style.height = windowHeight + 'px';
				}else{
					element.style.width = windowWidth + 'px';
					element.style.height = (windowWidth*pictureHeight)/(pictureWidth) +'px';
				}
			}else{
				if(windowWidth * pictureHeight >= windowHeight * pictureWidth){
					element.style.width = windowWidth + 'px';
					element.style.height = (windowWidth*pictureHeight)/(pictureWidth) +'px';
				}else{
					element.style.width = (windowHeight*pictureWidth)/(pictureHeight) +'px';
					element.style.height = windowHeight + 'px';
				}
			}

			element.style.top = -(parseInt(element.style.height) - windowHeight)/2 + 'px';
			element.style.left = -(parseInt(element.style.width) - windowWidth)/2 + 'px';
			element.style.zIndex = '0';
		}

		//PUBLIC
		return function (selector, options) {

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

			var elements = document.querySelectorAll(selector);
			
			[].forEach.call(elements, function (element) {
				var container = element.parentNode;

				document.body.style.margin = '0';
				document.body.style.padding = '0';
				document.body.style.overflowX = 'hidden';

				container.style.position = 'relative';
				container.style.top = '0';
				container.style.backgroundColor = '#000';
				container.style.overflow = 'hidden';
				container.style.zIndex = '-1000';

				if(typeof(options.position) !== 'undefined'){
					container.style.position = options.position;
				}

				element.style.position = 'absolute';

				if(element.nodeName.toLowerCase() === 'video'){
					element.addEventListener('loadeddata', function(){
						goFullScreen(element, options);
					}, false);
				}else{
					goFullScreen(element, options);
				}

				window.addEventListener('resize', function(){
					goFullScreen(element, options);
				}, false);
			}); // Fin boucle each
		};

	})(window);

})();