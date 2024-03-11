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

		.see-all {
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			display: block;
		}

		.btn:hover {
			background-color: red;
		}

		.btn {
			background-color: darkred;
			padding: 1em;
			border-radius: 10px;
			transition: all 0.3s ease-in;
			cursor: pointer;
			margin-top: 30px;
		}

	</style>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<link rel="stylesheet" href="../vendor/reset.min.css">
	<link rel="stylesheet" href="../style.css">
</head>

<body>
	<input id="input" type="text" style="display:none">
	<div style="position:relative">
		<img id="malle" src="coffre.png" style="width:80%; margin-left:auto; margin-right:auto;display:block">
		<div style="background-color:rgba(0,0,0,0.5); 
					padding:30px;
					position:absolute; 
					left: 33%;
					bottom:10vh;color:white; text-align:center; display:block; width:30% ">
			Entrer votre combinaison<br /><br />
			<input id="combinaison" type="text" style=""><br />
			<button type="button" class="btn" style="color:white;" name="Essayer" id="btn">Essayer</button>
		</div>
	</div>


	<div style="display:none">
		<audio id="click" src="click.mp3" type="audio/mpeg"></audio>
		<audio id="wrong" src="reset.wav" type="audio/wav"></audio>
		<audio id="malle-mp3" src="comment-1.mp3" type="audio/mpeg"></audio>
	</div>

	<script>
		var audio = document.getElementById("malle-opened");

		$("body").on("click", function(event) {

			$('#malle-mp3').get(0).play();
			$(this).off(event);
		});

		$(".btn").click(function() {

			$('audio').each(function() {
				this.pause(); // Stop playing
				this.currentTime = 0; // Reset time
			});

			if ($("#combinaison").val() == '24162') {

				$('#click').get(0).play();


				$('#click').on('ended', function() {

					$("#malle").fadeTo(1000, 0.30, function() {

						window.location.replace("opened-coffre.php");

					}).fadeTo(500, 1);
					return false;
				});
			} else {

				$('#wrong').get(0).play();
				$("#combinaison").val('');
			}
		});


		audio.addEventListener('ended', function() {
			$('#labo').fadeIn();
		});

	</script>
</body>

</html>
