// EXPLICATION : Ce composant retourne les cartes de choix des boxs.
// EXPLICATION : Ce composant est utilise dans la page Choice
// EXPLICATION : Si la box est fermé, pas de clic possible.
// EXPLICATION : Si la box est ouverte, on récupére le numéro de la box pour le mettre dans le context
// EXPLICATION : Si la box est terminée, une modale s'ouvre proposant aux joueurs de continuer l'aventure ou de se rendre sur le site pour d'autres enquêtes

import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Check from "../assets/icons/Icon_Check-black.svg";
import Lockopen from "../assets/icons/Icon_Lock-open-black.svg";
import Lockclosed from "../assets/icons/Icon_Lock-closed-red.svg";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import Saison1 from "../assets/img/Facing-episode1.jpg";
import Saison2 from "../assets/img/Facing-episode2.jpg";
import Saison3 from "../assets/img/Facing-episode3.jpg";
import { BoxContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";

const BoxChoice = ({ data }) => {
	const { setCurrentBox } = useContext(BoxContext);

	const [modal, setModal] = useState(false);

	const handleModal = () => {
		setModal(!modal);
	};

	// EXPLICATION : Cette fonction permet d'ouvrir le site dans un nouvel onglet
	const openWebsite = () => {
		window.open("https://detectivebox.fr/", "_blank");
	};

	// EXPLICATION : Cette fonction permet d'afficher la modale qui invite les joueurs à se rendre sur le site s'ils ont finit la box
	const renderModal = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<button className="modal-boxdone__icon--container">
						<img className="modal-boxdone__icon" src={Cross} onClick={handleModal} alt='' />
					</button>
					{data.id == 3 ? (
						<p className="modal-boxdone__text">
							Vous avez résolu le mystère du Tueur au Tarot et clos le dossier. <br></br>
							Rendez-vous sur notre site pour découvrir nos autres enquêtes.
						</p>
					) : (
						<p className="modal-boxdone__text">
							Vous avez déjà terminé cette partie de l&apos;enquête. <br></br>
							Passez à la box suivante pour continuer et démasquer le tueur ou rendez-vous sur notre site pour découvrir nos
							autres enquêtes
						</p>
					)}
					<button className="modal-boxdone__button button--red" onClick={openWebsite}>
						Se rendre sur le site
					</button>
				</div>
			</div>
		);
	};

	//EXPLICATION : Cette fonction permet d'afficher les bonnes affiches de cartes en fonction du numéro de la box
	const renderCover = () => {
		if (data.id == 1) {
			return Saison1;
		}
		if (data.id == 2) {
			return Saison2;
		}
		if (data.id == 3) {
			return Saison3;
		}
	};

	// EXPLICATION : Cette fonction permet d'afficher la carte en fonction de son status (done, closed, open)
	// EXPLICATION : box <4 pour ne pas afficher la box "Generic"
	const renderBox = () => {
		if (data.id < 4) {
			if (data.status == "done") {
				return (
					<>
						<article className="boxchoice boxchoice--done" onClick={handleModal}>
							<div className="boxchoice__picture-wrapper">
								<img src={renderCover()} className="boxchoice__picture" alt='' />
							</div>
							<div className="boxchoice__info">
								<h2 className="boxchoice__info__title">Box {data.id}</h2>
								<div className="boxchoice__info__icon-wrapper">
									<img src={Check} className="boxchoice__info__icon" alt='boite terminée'/>
								</div>
							</div>
						</article>
					</>
				);
			}
			if (data.status == "open") {
				return (
					<article className="boxchoice boxchoice--open" onClick={() => setCurrentBox(data.id)}>
						<Link to={"/"} className="boxchoice__link"></Link>
						<div className="boxchoice__picture-wrapper">
							<img src={renderCover()} className="boxchoice__picture" alt=''/>
						</div>
						<div className="boxchoice__info">
							<h2 className="boxchoice__info__title">Box {data.id}</h2>
							<div className="boxchoice__info__icon-wrapper">
								<img src={Lockopen} className="boxchoice__info__icon" alt='boite ouverte'/>
							</div>
						</div>
					</article>
				);
			}
			if (data.status == "closed") {
				return (
					<>
						<article className="boxchoice boxchoice--closed">
							<div className="boxchoice__picture-wrapper">
								<img src={renderCover()} className="boxchoice__picture" alt=''/>
							</div>
							<div className="boxchoice__info">
								<h2 className="boxchoice__info__title">Box {data.id}</h2>
								<div className="boxchoice__info__icon-wrapper">
									<img src={Lockclosed} className="boxchoice__info__icon" alt='boite fermée'/>
								</div>
							</div>
							<div className="boxchoice__greyFilter"></div>
						</article>
					</>
				);
			}
		}
	};

	return (
		<>
			{renderBox()}
			{modal ? renderModal() : ""}
		</>
	);
};

BoxChoice.propTypes = {
	data: PropTypes.object,
};

export default BoxChoice;
