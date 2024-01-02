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


		.btn,
		#message {

			font-family: 'din';
			margin-top: 2em;
			box-shadow: inset 0px 1px 0px 0px #cf866c;
			background: linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
			background-color: #d0451b;
			border-radius: 3px;
			border: 1px solid #942911;
			display: block;
			margin-left: auto;
			margin-right: auto;
			cursor: pointer;
			color: #ffffff;

			font-size: 1.5em;
			padding: 6px 24px;
			text-decoration: none;
			text-shadow: 0px 1px 0px #854629;
		}

		.btn:hover {
			background: linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
			background-color: #bc3315;
		}

		.btn:active {
			position: relative;
			top: 1px;
		}

		@font-face {
			font-family: 'din';
			src: url('../fonts/d-din-webfont.woff2') format('woff2'),
				url('../fonts/d-din-webfont.woff') format('woff');
			font-weight: normal;
			font-style: normal;

		}

	</style>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
</head>

<body style="background-color:black">

	<video id="video-file" src='frigo.mp4' style="width:70%; margin-left:auto; margin-right:auto; display:block"></video>
	<div style="width:100%; text-align:center;margin-bottom:3em;">
		<button id="open" class="btn">Ouvrir le frigo
		</button>
		<a id="message" href="" style="display:none">Retour à la pièce</a>

	</div>


	<script>
		$("#open").on("click", function(event) {

			$(this).hide();

			$('#video-file').get(0).play();

			$(this).off(event);
		});

		$("#video-file").on('ended', function() {
			$('#message').fadeIn();
			$("#message").css('display', 'table');

		});

		$('#message').on('click', () =>{
			window.close()
		})

	</script>
</body>

</html>
