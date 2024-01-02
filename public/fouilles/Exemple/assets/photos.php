<?php
session_start();
?>

<!DOCTYPE html>
<html>

<head>
	<title>Lieu de fouille</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width" />
	<style>
		@-ms-viewport {
			width: device-width;
		}

		body {
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			cursor: grab;
		}

		img {
			-webkit-user-drag: none;
			-khtml-user-drag: none;
			-moz-user-drag: none;
			-o-user-drag: none;
			user-drag: none;
		}

		.see-all {
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			display: block;
		}

		.w-50 {
			width: 40%;
		}

		.w-100 {
			width: 100%;
		}

		.w-25 {
			width: 25%;
		}

		.w-75 {

			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 50%;
			z-index: 10;
		}

		.m-3 {
			margin: 1em;
		}

		.shadow {
			-webkit-box-shadow: 2px 2px 2px 2px #9A9A9A;
			box-shadow: 2px 2px 2px 2px #9A9A9A;
		}

		.mx-auto {
			margin-left: auto;
			margin-right: auto;
			display: block;
			width: 80%;
		}

		.w-60 {
			width: 60%;
		}

	</style>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
</head>

<body style="overflow:scroll; background-image:url('bg.png'); background-size:cover;">
	<img src="duchamp.jpg" class="w-50 mt-5  ml-5 shadow m-3" style="transform: rotate(15deg);">


	<img src="message-1.png" class="w-25 shadow m-3" style="  transform: rotate(-10deg);">
	<img src="message-2.png" class="w-25 shadow m-3" style="  transform: rotate(15deg);">
	<img src="message-3.png" class="w-50 mb-5 shadow m-3" style="  transform: rotate(5deg);">


	<img src="3.jpg" class="w-25 shadow m-3" style="position:absolute; top:50%;  transform: rotate(-10deg);">
	<img src="1.jpg" class="w-25 ml-5 shadow m-3" style="  transform: rotate(5deg);">

	<div style="width:100%;text-align:center;">

		<img src="4.jpg" class="w-25   ml-5shadow m-3" style="  transform: rotate(10deg);">
		<img src="2.jpg" class="w-25 mt-5  ml-5 shadow m-3" style="  transform: rotate(5deg);">
	</div>


	<img id="texto" src="texto-sanchez.png" style="display:none; position:fixed; top: 10px; right:10px; height:90vh">


	<audio id="photos" controls style="display:none">
		<source src="photo.mp3" type="audio/mpeg">
		Your browser does not support the audio element.
	</audio>

	<audio id="ding" controls style="display:none">
		<source src="ding.mp3" type="audio/mpeg">
		Your browser does not support the audio element.
	</audio>


	<script>
		const clicHandle = async () => {
			const token = localStorage.getItem('token');
			if(!token) {
				alert("Erreur de communication avec l'app détectivebox : Token vide")
				return;
			}
			const response = await fetch('https://api2.detectivebox.fr/history/2?id=box2document6', {
					method: 'PUT',
					headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
						},
						body: JSON.stringify({status: true})
			})
			console.table(response);
			if(!response.ok) {
				alert('Erreur de comunication avec le serveur: ' + response.status + (response.statusText !== '' ? ' - '+response.statusText : ''));
			} else {
				alert('Rendez-vous sur l\'application pour la suite de l\'enquête');
			}
		};
		
		$(document).ready(function() {

			<?php  if(!isset($_SESSION['detective_box_photo'])) { ?>

			$("body").on("click", function(event) {

				$('#photos').get(0).play();

				$(this).off(event);

				$('#photos').on('ended', function() {

					$('#ding').get(0).play();
					$('#texto').show();

					setTimeout(function() {

						$('#texto').hide();

					}, 15000);

				});

				clicHandle()
				/*
				fetch('https://api2.detectivebox.fr/history/2?id=box2document6', {
				    method: 'PUT',
				    headers: {
				        'Content-Type': 'application/json',
				        'Authorization': `Bearer ${localStorage.getItem('token')}`
				    },
				    body: JSON.stringify({status: true})
				})
				.then(res => res.data)
				.then(d => {
				   console.log('Rendez-vous sur l\'application pour la suite de l\'enquête');
				})
				*/


			});

			<?php  } ?>

			$(".w-50").on("click", function(event) {
				$('.w-75').hide();
				$(this).next().fadeIn(500);
			});

			$(".w-75").on("click", function(event) {
				$('.w-75').hide();
			});
		});


		var clicked = false,
			clickY;
		$(document).on({
			'mousemove': function(e) {
				clicked && updateScrollPos(e);
			},
			'mousedown': function(e) {
				clicked = true;
				clickY = e.pageY;
			},
			'mouseup': function() {
				clicked = false;
				$('html').css('cursor', 'auto');
			}
		});

		var updateScrollPos = function(e) {
			$('html').css('cursor', 'row-resize');
			$(window).scrollTop($(window).scrollTop() + (clickY - e.pageY));
		}

	</script>
	<?php 
	// Avoid to repeat arrival sound eachtime arrive on the page
	$_SESSION['detective_box_photo'] = '1';
?>
</body>

</html>
