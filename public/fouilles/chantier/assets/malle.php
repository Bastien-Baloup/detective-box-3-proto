
<?php session_start();
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

		.item {
			transition: all 0.3s ease-in;
			position: absolute;
			z-index: 10;
			cursor: pointer;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 25px;
		}

		.item:hover {
			background-color: rgba(2, 2, 2, 0.3);
		}


		.see-all {
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			display: block;
		}

		#labo {

			background-color: darkred;
			position: absolute;
			bottom: 10px;
			right: 10px;
			padding: 2em;
			font-size: 1.3em;
			border-radius: 10px;
			transition: all 0.3s ease-in;
			cursor: pointer;
		}

		#labo:hover {
			background-color: red;

		}

	</style>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<link rel="stylesheet" href="../vendor/reset.min.css">
	<link rel="stylesheet" href="../style.css">
</head>

<body>
	<input id="input" type="text" style="display:none">
	<div style="position:relative">
		<img id="malle" src="malle-2.jpg" style="width:80%; margin-left:auto; margin-right:auto;display:block">
		<div id="right" class="item" style="
			top: 75%;
			left: 53%;
			width: 3%;
			height: 6%;
			">
		</div>
		<div id="left" class="item" style="
			top: 75%;
			left: 44%;
			width: 3%;
			height: 6%;
			">
		</div>

		<div id="up" class="item" style="
			top: 67%;
			left: 48.5%;
			width: 3%;
			height: 6%;
			">
		</div>

		<div id="down" class="item" style="
			top: 82%;
			left: 48.5%;
			width: 3%;
			height: 6%;
			">
		</div>

		<div id="reset" class="item" style="
			top: 75%;
			left: 48.5%;
			width: 3%;
			height: 6%;">
		</div>
	</div>


	<div style="display:none">
		<audio id="click" src="click.wav" type="audio/wav"></audio>
		<audio id="reset-sound" src="reset.wav" type="audio/wav"></audio>
		<audio id="malle-opened" src="comment-2.mp3" type="audio/mpeg"></audio>
		<audio id="malle-mp3" src="comment-1.mp3" type="audio/mpeg"></audio>
		<audio id="open-malle" src="open-malle.mp3" type="audio/mpeg"></audio>
	</div>
	<a id="labo" style="display:none" href="#chloe">Voir les résultats du labo</a>
	<script>


	    $('#labo').on('click', function(){
	        alert('Rendez-vous sur l\'application pour la suite de l\'enquête');
	    });

		var audio = document.getElementById("malle-opened");

		$("body").on("click", function(event) {

			$('#malle-mp3').get(0).play();
			$(this).off(event);
		});


		$(".item").click(function() {

			$('audio').each(function() {
				this.pause(); // Stop playing
				this.currentTime = 0; // Reset time
			});
			$(this).css('backgroundColor', 'darkred').slideUp(100).slideDown(100, function() {
				$(this).css("backgroundColor", "rgba(0,0,0,0.5)");
			});

			if ($(this).attr('id') == 'reset') {

				$('#input').val('');
				$('#reset-sound').get(0).play();

			} else {


				$('#click').get(0).play();
				$('#input').val($('#input').val() + $(this).attr('id'));

				if ($('#input').val() == 'uprightdownrightdown' || $('#input').val() == 'upupupuprightrightdowndownrightrightrightdowndown') {

					$('#open-malle').get(0).play();
					$('#open-malle').on('ended', function() {
						$('.item').fadeOut(500);
						$("#malle").fadeTo(1000, 0.30, function() {

							window.location.replace("opened-malle.php");

						}).fadeTo(500, 1);
						return false;
					});
				}
			}
		});


		audio.addEventListener('ended', function() {
			$('#labo').fadeIn();
		});

	</script>
</body>

</html>
