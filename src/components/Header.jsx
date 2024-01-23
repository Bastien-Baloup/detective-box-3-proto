/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant permet de rendre le header de l'application.
// EXPLICATION : Le header comprend le logo / le composant Progression / le composant Compte / le composant Nav
// EXPLICATION : Il contient aussi le timer de fin de 30 minutes
// EXPLICATION : Il contient aussi les modales Tutoriel / Quizz / Nappe d'ambiance

import Logo from "../assets/img/DB-Logo-DetectiveBox_AgenceDBBlanc.png";
import Progression from "../components/Progression.jsx";
import Compte from "../components/Compte.jsx";
import Nav from "../components/Nav.jsx";
import Nappe from "../components/Nappe.jsx";
// import Quizz from "../components/Quizz.jsx";
import Video from "../components/Video.jsx";
import { Link } from "react-router-dom";
import { urlApi } from "../utils/const/urlApi";
import { AmbianceContext, BoxContext, DataContext } from "../utils/context/fetchContext.jsx";
import { useEffect, useState, useRef, useContext } from "react";
import useApi from '../utils/hooks/useApi.js';
import useEvent from '../utils/hooks/useEvent.js';


const Header = () => {
	const { setNappeIsMute, nappeIsMute } = useContext(AmbianceContext);
	const { currentBox } = useContext(BoxContext);
	const token = localStorage.getItem("token");
	const { toggleDataEvent, toggleDataHistory, actionToggleDataHistory } = useContext(DataContext);
	const {
		getEventByBox,
		// updateHistory,
		// getHistoryByBox,
	} = useApi()
	const { dispatch } = useEvent()


	const [tutorialModalIsActive, setTutorialModalIsActive] = useState(true);
	const [tutorialIsActive, setTutorialIsActive] = useState(false);
	const [nappeModalIsActive, setNappeModalIsActive] = useState(false);
	const [modaleVideo, setModaleVideo] = useState(false);

	const audioElem = useRef();

	// EXPLICATION : Cette fonction récupère l'état de la musique d'ambiance avec Context. Si nappeIsMute, alors la musique d'ambiance est en pause, sinon elle se joue.
	useEffect(() => {
		if (nappeIsMute) {
			audioElem.current.pause();
		} else {
			audioElem.current.play();
		}
	}, [nappeIsMute]);

  const [event241, setEvent241] = useState('')
  const [event242, setEvent242] = useState('')
  const [event31, setEvent31] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEventByBox(token, currentBox)
      const event31Data = events.data.find(event => event.id == 31)
      setEvent31(event31Data?.status)
      const event241Data = events.data.find(event => event.id == 241)
      setEvent241(event241Data?.status)
      const event242Data = events.data.find(event => event.id == 242)
      setEvent242(event242Data?.status)
    }
    fetchData()
  }, [toggleDataEvent])

	// EXPLICATION : Cette fonction récupère l'état des vidéos de brief dans l'historique (il ne se joue qu'une fois par box)
	useEffect(() => {
		const fetchData = async () => {
			//TODO Récupération data de l'historique
			// const clues = await getHistoryByBox(token, currentBox);
			// const box1video1Data = clues.data.find((event) => event.id == "box1video1");
			// setBox1Video1(box1video1Data.status);
		};
		fetchData();
	}, [toggleDataHistory]);

	// EXPLICATION : Le joueur choisi d'activer la musique d'ambiance > son état se met à jour dans le context > ferme la modale.
	const activateNappe = () => {
		setNappeIsMute(false);
		setNappeModalIsActive(false);
	};

	// EXPLICATION : Le joueur choisi de désactiver la musique d'ambiance > son état se met à jour dans le context > ferme la modale.
	const desactivateNappe = () => {
		setNappeIsMute(true);
		setNappeModalIsActive(false);
	};

	const handleModalVideoBrief = async () => {
		//TODO Gestion validation Briefing
		// await updateHistory(token, 1, "box1video1");
		// dispatch({
    //   type: 'setEvent',
    //   id: 'box1video1'
    // })
		actionToggleDataHistory()
		setModaleVideo(false);
		setNappeModalIsActive(true);
	};

	const displayBrief = () => {
		return (
			<Video
				title="Briefing"
				srcVideo={urlApi.cdn() + "videos/db-s02-101-def.mp4"}
				handleModalVideo={handleModalVideoBrief}
			/>
		);
	};

	// EXPLICATION : On affiche une modale qui propose aux joueurs d'afficher le tutoriel ou non
	const displayTutorial = () => {
		return (
			<div className="tutorial__background">
				<div className="tutorial">
					<p className="tutorial__text">Voulez vous voir le tutoriel ?</p>
					<div className="tutorial__buttons">
						<button className="tutorial__button button--red" onClick={handleOpenTutorial}>
							Oui
						</button>
						<button className="tutorial__button button--white" onClick={handleCloseModalTutorial}>
							Non
						</button>
					</div>
				</div>
			</div>
		);
	};

	const handleEventEnCours = () => {
		if (event241 == 'open') {
			dispatch({
				type: 'setEvent',
				id: 'portraitRobo'
			})
			return
		}
		if (event242 == 'open') {
			dispatch({
				type: 'setEvent',
				id: 'enqueteQuartier'
			})
			return
		}
		if (event31 == 'open') {
			dispatch({
				type: 'setEvent',
				id: 'obj3'
			})
			return
		}
	}

	// EXPLICATION : On affiche le tutorial en video et on ferme la modale de choix d'affichage du tutorial
	const handleOpenTutorial = () => {
		setTutorialIsActive(true);
		setTutorialModalIsActive(false);
	};

	// EXPLICATION : On ferme la modale de choix d'affichage du tutorial
	const handleCloseModalTutorial = () => {
		setTutorialModalIsActive(false);
		handleEventEnCours()
	};

	// EXPLICATION : On ferme la video du tutorial
	const handleCloseTutorial = () => {
		setTutorialIsActive(false);
		handleEventEnCours()
	};

	// EXPLICATION : Audio pour les nappes d'ambiance en fonction de la box (une box = une musique d'ambiance)
	const displayAudio = () => {
		if (currentBox == 1) {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.cdn() + "sounds/musiques-db-s2-nappe-1.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
		if (currentBox == 2) {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.cdn() + "sounds/musiques-db-s2-nappe-2.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
		if (currentBox == 3) {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.cdn() + "sounds/musiques-db-s2-nappe-3.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
	};

	// EXPLICATION : Dans l'ordre : Modale Tutoriel > Si oui > affichage tutoriel video / si non > fermeture modale tutoriel
	// EXPLICATION : PUIS affichage de la video de brief si l'event correspondant est initialement "closed".
	// EXPLICATION : PUIS affichage de la modale de choix de l'activation de la musique d'ambiance
	return (
		<header>
			{tutorialModalIsActive && displayTutorial()}
			{tutorialIsActive && (
				<Video
					title="Vidéo du tutoriel"
					srcVideo={urlApi.cdn() + "videos/tutoriel.mp4"}
					handleModalVideo={handleCloseTutorial}
				/>
			)}
			{modaleVideo && displayBrief()}
			{nappeModalIsActive && <Nappe activateNappe={activateNappe} desactivateNappe={desactivateNappe}/>}
			{displayAudio()}
			<div className="header__topSection">
				<Link className="header__logo--container" to="/">
					<img className="header__logo" src={Logo} alt='' />
				</Link>
				<Progression />
				<Compte />
			</div>
			<div className="header__bottomSection">
				<Nav />
			</div>
		</header>
	);
};
export default Header;
