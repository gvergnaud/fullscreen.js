/**
 * fullscreen.js v 0.1.0
 *
 * @author : Gabriel Vergnaud
 *
 * See on Github : https://github.com/gvergnaud/fullscreen.js
 *
 */
;(function(){
	window.FullFrame = (function(window){

		//PRIVATE

		var removeStyle = function(element, parent){
			element.style.opacity = '';
            element.style.position = '';
            element.style.top = '';
            element.style.left = '';
            element.style.transform = '';
			element.style.width = '';
			element.style.height = '';
			element.style.maxHeight = '';
			element.style.minHeight = '';
			element.style.maxWidth = '';
			element.style.minWidth = '';

            parent.style.overflow = '';
		};

        var style = function(element, parent, options){

            var parentHeight =  parent.offsetHeight,
                parentWidth =  parent.offsetWidth,
                elementHeight =  element.offsetHeight,
                elementWidth =  element.offsetWidth;

            element.style.opacity = 1;
            element.style.position = 'absolute';
            element.style.top = '50%';
            element.style.left = '50%';
            element.style.transform = 'translate(-50%, -50%)';
			element.style.maxHeight = 'none';
			element.style.maxWidth = 'none';
			element.style.minHeight = 'initial';
			element.style.minWidth = 'initial';

            parent.style.overflow = 'hidden';

            if(!options.noCrop){
                if( (parentWidth / parentHeight) > (elementWidth / elementHeight) ){
                    element.style.width = parentWidth + 'px';
                    element.style.height = '';
                }
				else{
                    element.style.height = parentHeight + 'px';
                    element.style.width = '';
                }
            }
			else{
                if( (parentWidth / parentHeight) <= (elementWidth / elementHeight) ){
                    element.style.width = parentWidth + 'px';
                    element.style.height = '';
                }
				else{
                    element.style.height = parentHeight + 'px';
                    element.style.width = '';
                }
            }
        };

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
				var parent = element.parentNode;

                element.style.opacity = 0;

				if(element.nodeName.toLowerCase() === 'video'){
					element.addEventListener('loadeddata', function(){
						style(element, parent, options);
					}, false);
				}
				else{
					if(element.complete){
						style(element, parent, options);

					}
					else{
	                    element.addEventListener('load', function(){
							style(element, parent, options);
	                    }, false);
					}
				}

				window.addEventListener('resize', function(){
					style(element, parent, options);
				}, false);
			});
		};

	})(window);

})();
