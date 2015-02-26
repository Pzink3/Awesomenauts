<!DOCTYPE HTML>
<html>
	<head>
            <style>
              body {

              }
              @font-face { font-family: Incredibles; src: url('incredibles.ttf'); } 
              sub {
              font-family: Incredibles;
              }
    </style>
		<title>AWESOMENAUTS</title>
		<link rel="stylesheet" type="text/css" media="screen" href="index.css"> <!-- calls the css index file -->
		<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="apple-touch-icon" href="icons/touch-icon-iphone-60x60.png">
        <link rel="apple-touch-icon" sizes="76x76" href="icons/touch-icon-ipad-76x76.png">
        <link rel="apple-touch-icon" sizes="120x120" href="icons/touch-icon-iphone-retina-120x120.png">
        <link rel="apple-touch-icon" sizes="152x152" href="icons/touch-icon-ipad-retina-152x152.png">
	</head>
	<body>
		<!-- Canvas placeholder -->
		<div id="screen"></div>

		<!-- melonJS Library -->
		<!-- build:js js/app.min.js -->
		<script type="text/javascript" src="lib/melonJS-1.1.0-min.js"></script> <!-- installs melonJS -->

		<!-- Plugin(s) -->
		<script type="text/javascript" src="lib/plugins/debugPanel.js"></script>
		
		<!-- Game Scripts -->
		<script type="text/javascript" src="js/game.js"></script> <!-- calls the game js file -->
		<script type="text/javascript" src="js/resources.js"></script> <!-- calls all of the js resources -->
                <script type="text/javascript" src="js/entities/entities.js"></script> <!-- calls the js entities file -->
		<script type="text/javascript" src="js/entities/HUD.js"></script> <!-- calls the HUD js file -->

		<script type="text/javascript" src="js/screens/title.js"></script> <!-- calls the js title file -->
		<script type="text/javascript" src="js/screens/play.js"></script>
		<!-- /build -->
		<!-- Bootstrap & Mobile optimization tricks -->
		<script type="text/javascript">
			window.onReady(function onReady() {
				game.onload();

				// Mobile browser hacks
				if (me.device.isMobile && !navigator.isCocoonJS) {
					// Prevent the webview from moving on a swipe
					window.document.addEventListener("touchmove", function (e) {
						e.preventDefault();
						window.scroll(0, 0);
						return false;
					}, false);

					// Scroll away mobile GUI
					(function () {
						window.scrollTo(0, 1);
						me.video.onresize(null);
					}).defer();

					me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
						window.scrollTo(0, 1);
					});
				}
			});
		</script>
        <center>
            <sub><font color='white'>&copy 2015 Parker Zink Productions&trade;. All Rights Reserved.</font></sub>
        </center>
	</body>
</html>
