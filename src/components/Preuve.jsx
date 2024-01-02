// EXPLICATION : Ce composant retourne les cartes Preuves qui sont affichées dans la page Historique

import PropTypes from "prop-types";
import Archiveicon from "../assets/icons/Icon_mini_Archive.svg";
import Documenticon from "../assets/icons/Icon_mini_Document.svg";
import Interrogationicon from "../assets/icons/Icon_mini_Interrogation.svg";
import Locationicon from "../assets/icons/Icon_mini_Location.svg";
import Videoicon from "../assets/icons/Icon_mini_Video.svg";
import { urlApi } from "../utils/const/urlApi";

const Preuve = ({ data, openModal }) => {
	// EXPLICATION : Fonction pour afficher la bonne icone en fonction du type de preuve
	const findIcon = () => {
		if (data.category == "Archive") {
			return Archiveicon;
		}
		if (data.category == "Document") {
			return Documenticon;
		}
		if (data.category == "Audio") {
			return Interrogationicon;
		}
		if (data.category == "Lieu") {
			return Locationicon;
		}
		if (data.category == "Video") {
			return Videoicon;
		}
	};

	return (
		<article className="clue" onClick={openModal} tabIndex="0">
			<div className="clue__picture-wrapper">
				<img src={urlApi.cdn() + data.poster} className="clue__picture" alt='' />
			</div>
			<div className="clue__info">
				<div className="clue__info--main">
					<h2 className="clue__main__title">{data.title}</h2>
					<div className="clue__main__icon-wrapper">
						<img src={findIcon()} className="clue__main__icon" alt=''/>
					</div>
				</div>
				<div className="clue__info--detail">{data.detail}</div>
			</div>
		</article>
	);
};

Preuve.propTypes = {
	data: PropTypes.object,
	openModal: PropTypes.func,
};

export default Preuve;
