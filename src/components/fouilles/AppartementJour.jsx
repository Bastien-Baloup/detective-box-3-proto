/* eslint-disable react-hooks/exhaustive-deps */
import MarzipanoInit from "../../utils/const/marzipanoInit.js";
import { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/appartement/style.css";
import data from "../../assets/fouilles/appartement/data.js";
import { DataContext } from "../../utils/context/fetchContext.jsx";
import useApi from "../../utils/hooks/useApi.js";

const LieuAppartementJour = ({ onClose, onChange }) => {
	const panoRef = useRef(null);
	const viewerRef = useRef(null);
	const coffreIntputRef = useRef(null);
	const [animalsPlayed, setAnimalsPlayed] = useState(false);
	const [boardPlayed, setBoardPlayed] = useState(false);
	const [moneyPlayed, setMoneyPlayed] = useState(false);
	const [mallePlayed, setMallePlayed] = useState(false);
	const {
		actionToggleDataHistory,
		actionToggleDataObjectif,
		actionToggleDataEvent,
	} = useContext(DataContext);
	const { updateHistory, updateObjectives, updateEvent } = useApi();

	const closeCoffre = () => {
		document.getElementById("fouille").style.display = "block";
		document.getElementById("coffre").style.display = "none";
		document.getElementById("coffre-ouvert").style.display = "none";
	};

	const appartementJourInit = () => {
		const closeImgs = document.querySelectorAll(".close-img");
		closeImgs.forEach((closeImg) => {
			closeImg.onclick = () => {
				document.querySelectorAll(".img").forEach((img) => {
					img.style.display = "none";
				});
			};
		});

		const endHandle = async () => {
			const token = localStorage.getItem("token");
			await updateHistory(token, 1, "box1document10");
			actionToggleDataHistory();
			await updateObjectives(token, 1, 2, "done");
			await updateObjectives(token, 1, 3, "open");
			actionToggleDataObjectif();
			await updateEvent(token, 1, 22, "done");
			await updateEvent(token, 1, 31, "open");
			actionToggleDataEvent();
		};

		const watchElements = document.querySelectorAll(".watch");
		watchElements.forEach((watch) => {
			watch.onclick = () => {
				document.querySelectorAll(".img").forEach((img) => {
					img.style.display = "none";
				});

				const id = watch.id;

				if (id === "lien-coffre") {
					document.getElementById("fouille").style.display = "none";
					document.getElementById("coffre").style.display = "block";
					document.getElementById("coffre-ouvert").style.display = "none";

					if (!mallePlayed) {
						document.getElementById("malle-mp3").play();
						setMallePlayed(true);
					}
				} else if (id === "lien-nuit") {
					onChange();
				} else if (id === "board") {
					if (!boardPlayed) {
						document.getElementById("board").play();
						setBoardPlayed(true);
					}
				} else {
					document.getElementById(`img-${id}`).style.display = "block";

					const animalsIds = ["see1", "see2", "see3", "see4"];
					if (animalsIds.includes(id)) {
						if (!animalsPlayed) {
							document.getElementById("animals").play();
							setAnimalsPlayed(true);
						}
					}

					if (id === "see5") {
						if (!moneyPlayed) {
							document.getElementById("money").play();
							setMoneyPlayed(true);
						}
					}
				}
			};
		});

		document.getElementById("coffre-click").onended = () => {
			document.getElementById("fouille").style.display = "none";
			document.getElementById("coffre").style.display = "none";
			document.getElementById("coffre-ouvert").style.display = "block";
			document.getElementById("malle-opened").play();
			endHandle();
		};

		const btnCoffreElement = document.getElementById("btn-coffre");
		btnCoffreElement.onclick = () => {
			const audioElements = document.querySelectorAll("audio");
			audioElements.forEach((audio) => {
				audio.pause();
				audio.currentTime = 0;
			});

			if (coffreIntputRef.current?.value.trim() === "8419") {
				document.getElementById("coffre-click").play();
			} else {
				document.getElementById("coffre-wrong").play();
				coffreIntputRef.current.value === "";
			}
		};
	};

	useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "appartement"), []);
	useEffect(appartementJourInit, []);

	return (
		<div
			id="modal-appartement-jour"
			style={{
				position: "fixed",
				height: "100%",
				width: "100%",
				top: "0",
				left: "0",
				zIndex: 1000,
				overflow: "hidden",
			}}
		>
			<div id="fouille" className="single-scenes">
				<div id="pano" ref={panoRef} />
				<div id="sceneList">
					<ul className="scenes">
						<a href="" className="scene" data-id="0-appartement-2">
							<li className="text">appartement 2</li>
						</a>
					</ul>
				</div>

				<div className="img" id="img-see1" style={{ display: "none" }}>
					<span className="close-img">X</span>
					<img
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/masque-1.png`}
						className="img-see"
					/>
				</div>
				<div className="img" id="img-see2" style={{ display: "none" }}>
					<span className="close-img">X</span>
					<img
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/masque-2.png`}
						className="img-see"
					/>
				</div>
				<div className="img" id="img-see3" style={{ display: "none" }}>
					<span className="close-img">X</span>
					<img
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/masque-3.png`}
						className="img-see"
					/>
				</div>
				<div className="img" id="img-see4" style={{ display: "none" }}>
					<span className="close-img">X</span>
					<img
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/masque-4.png`}
						className="img-see"
					/>
				</div>
				<div className="img" id="img-see5" style={{ display: "none" }}>
					<span className="close-img">X</span>
					<img
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/money.png`}
						className="img-see"
					/>
				</div>

				<audio id="board" controls style={{ display: "none" }}>
					<source
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/board.mp3`}
						type="audio/mpeg"
					/>
					Your browser does not support the audio element.
				</audio>

				<audio id="money" controls style={{ display: "none" }}>
					<source
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/money.mp3`}
						type="audio/mpeg"
					/>
					Your browser does not support the audio element.
				</audio>

				<audio id="animals" controls style={{ display: "none" }}>
					<source
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/animals.mp3`}
						type="audio/mpeg"
					/>
					Your browser does not support the audio element.
				</audio>

				<button
					className="modal-objectif__button button--red"
					style={{
						position: "fixed",
						bottom: "0.5rem",
						left: "0.5rem",
						zIndex: 10000,
					}}
					onClick={onClose}
				>
					fermer
				</button>
			</div>
			<div id="coffre" style={{ display: "none" }}>
				<div style={{ position: "relative" }}>
					<img
						id="malle"
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/coffre.png`}
						style={{
							width: "80%",
							marginLeft: "auto",
							marginRight: "auto",
							display: "block",
						}}
					/>
					<div
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							padding: "30px",
							position: "fixed",
							left: "33%",
							bottom: "10vh",
							color: "white",
							textAlign: "center",
							display: "block",
							width: "30%",
						}}
					>
						Entrer votre combinaison
						<br />
						<br />
						<input type="text" ref={coffreIntputRef} />
						<br />
						<button
							type="button"
							className="btn"
							style={{ color: "white" }}
							name="Essayer"
							id="btn-coffre"
						>
							Essayer
						</button>
					</div>
				</div>

				<button
					className="modal-objectif__button button--red"
					style={{
						position: "fixed",
						bottom: "0.5rem",
						left: "0.5rem",
						zIndex: 10000,
					}}
					onClick={closeCoffre}
				>
					retour
				</button>

				<div style={{ display: "none" }}>
					<audio id="coffre-click">
						<source
							src={`${
								import.meta.env.BASE_URL
							}fouilles/appartement/assets/click.mp3`}
							type="audio/mpeg"
						/>
						Your browser does not support the audio element.
					</audio>
					<audio id="coffre-wrong">
						<source
							src={`${
								import.meta.env.BASE_URL
							}fouilles/appartement/assets/reset.wav`}
							type="audio/wav"
						/>
						Your browser does not support the audio element.
					</audio>
					<audio id="malle-mp3">
						<source
							src={`${
								import.meta.env.BASE_URL
							}fouilles/appartement/assets/comment-1.mp3`}
							type="audio/mpeg"
						/>
						Your browser does not support the audio element.
					</audio>
				</div>
			</div>
			<div id="coffre-ouvert" style={{ display: "none" }}>
				<div style={{ position: "relative" }}>
					<img
						id="malle"
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/opened-malle.jpg`}
						style={{ maxWidth: "100%", height: "auto", maxHeight: "100dvh" }}
					/>
				</div>
				<div style={{ display: "none" }}>
					<audio
						id="malle-opened"
						src={`${
							import.meta.env.BASE_URL
						}fouilles/appartement/assets/opened-malle.mp3`}
						type="audio/mpeg"
					/>
				</div>
				<button
					className="modal-objectif__button button--red"
					style={{
						position: "fixed",
						bottom: "0.5rem",
						left: "0.5rem",
						zIndex: 10000,
					}}
					onClick={onClose}
				>
					fermer
				</button>
			</div>
		</div>
	);
};

LieuAppartementJour.propTypes = {
	onClose: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default LieuAppartementJour;
