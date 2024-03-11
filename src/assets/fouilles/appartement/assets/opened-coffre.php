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

	</style>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<link rel="stylesheet" href="../vendor/reset.min.css">
	<link rel="stylesheet" href="../style.css">
</head>

<body style="overflow:scroll">
	<input id="input" type="text" style="display:none">
	<div style="position:relative">
		<img id="malle" src="opened-malle.jpg" style="width:100%;">
	</div>
	<a id="labo" class="btn-red" style="display:none; font-size:1.5em; position:fixed;  top:10px; right:10px;" href="#chloe" onclick="alert('Êtes-vous sûr de vouloir quitter ce lieu ?')">Retourner à l'app</a>


	<div style="display:none">
		<audio id="malle-opened" src="opened-malle.mp3" type="audio/mpeg"></audio>
	</div>

	<script>
		var audio = document.getElementById("malle-opened");
		$("body").on("click", function(event) {
			$('#malle-opened').get(0).play();
			$(this).off(event);
		});
		audio.addEventListener('ended', function() {
			$('#labo').fadeIn();
		});

	</script>
</body>

</html>
