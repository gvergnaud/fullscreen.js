fullscreen.js
=============

native javascript or jquery plugin to set responsive fullscreen size to videos or images

How to use
=========

First place your img or video into a specific container
example :

```html
<div>
  <video id="myVid" src="../video/lolcat.webm" />
</div>
```

## Native :
Add fullscreen.native.js to you project 

```html
<script src="https://raw.githubusercontent.com/gvergnaud/fullscreen.js/master/fullscreen.native.js"></script>
```
then call FullScreen

```js
FullScreen('#myVid', options);
```
## jQuery :
Add fullscreen.jquery.js to you project 

```html
<script src="https://raw.githubusercontent.com/gvergnaud/fullscreen.js/master/fullscreen.jquery.js"></script>
```

then call FullScreen
```js
$('#myVid').fullscreen(options);
```
## Options :

####noCrop
if set too true, your video or image wont be cropped. 

example :
```js
FullScreen('#myVid', {noCrop: true});
```
default value is false.

####position
set the position css property to your image or video.

example :
```js
FullScreen('#myVid', {position: 'absolute'});
```
default value is relative.
