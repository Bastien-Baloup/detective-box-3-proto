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
	<a id="labo" class="btn-red" style="display:none; font-size:1.5em; position:fixed;  top:10px; right:10px;" href="#chloe" onclick="clicHandle()">Continuer l’enquête sur l’interface</a>

	<div style="display:none">
		<iframe src="comment-2.mp3" allow="autoplay" id="audio"></iframe>
	</div>
	<audio id="malle-opened" src="comment-2.mp3" type="audio/mpeg" autoplay></audio>


	<script>
		const audio = document.getElementById("malle-opened");
		$("body").on("click", (event) => {

			$('#malle-opened').get(0).play();
			$(this).off(event);
		});
		audio.addEventListener('ended', () => {
			$('#labo').fadeIn();
		});

		const clicHandle = async () => {
			const token = localStorage.getItem('token');
			if(!token) {
				alert("Erreur de communication avec l'app détectivebox : Token vide")
				return;
			}
			const response = await fetch('https://api2.detectivebox.fr/history/1?id=box1document1', {
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
			/*fetch('https://api2.detectivebox.fr/history/1?id=box1document1', {
					method: 'PUT',
					headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
						},
						body: JSON.stringify({status: true})
			})
			.then(res => res.data)
			.then(d => {
					alert('Rendez-vous sur l\'application pour la suite de l\'enquête');
			})*/

		

		
	</script>
</body>

</html>
