/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page Historique qui permet d'afficher toutes les preuves + les filtres de tri pour trier ces mêmes preuves en fonction de leur type et des boxs.

import { useState } from "react";
import Filter from "../components/Filter";
import Preuve from "../components/Preuve";
import Document from "../components/Document";
import Audio from "../components/Audio";
import Video from "../components/Video";
import { urlApi } from "../utils/const/urlApi";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import { BoxContext, DataContext, AmbianceContext, CompteContext } from "../utils/context/fetchContext";
import { useContext, useEffect } from "react";
import useApi from "../utils/hooks/useApi";
import useLieu from '../utils/hooks/useLieu.jsx'

function Historique() {
	const filtersType = ["Document", "Vidéo", "Audio", "Lieu", "Archive"];
	const filterBox = ["Box 1", "Box 2", "Box 3"];
	const token = localStorage.getItem("token");
	const { currentBox } = useContext(BoxContext);
	const { fetchPreviousStateNappe } = useContext(AmbianceContext);
	const { toggleDataHistory, actionToggleDataHistory } = useContext(DataContext);
  const { renderLieu, setLieu, setLieuModalOpen } = useLieu()
	const { getHistoryByBox } = useApi()
	const { closeCompte } = useContext(CompteContext);

	const openLieu = (lieu) => {
		setLieu(lieu)
		setLieuModalOpen(true)
		setModal(false)
	}

	useEffect(() => {
		const fetchData = async () => {
			if (currentBox === 1) {
				const result = await getHistoryByBox(token, currentBox);
				if (result) {
					setDataHistory1(result.data);
				} else {
					setDataHistory1([])
				}
			}
			if (currentBox === 2) {
				const result = await getHistoryByBox(token, currentBox);
				if (result) {
					setDataHistory2(result.data);
				} else {
					setDataHistory2([])
				}
				const resultbox1 = await getHistoryByBox(token, 1);
				if (resultbox1) {
					setDataHistory1(resultbox1.data);
				} else {
					setDataHistory1([])
				}
			}
			if (currentBox === 3) {
				const result = await getHistoryByBox(token, currentBox);
				if (result) {
					setDataHistory3(result.data);
				} else {
					setDataHistory3([])
				}
				const resultbox1 = await getHistoryByBox(token, 1);
				setDataHistory1(resultbox1.data);
				if (resultbox1) {
					setDataHistory1(resultbox1.data);
				} else {
					setDataHistory1([])
				}
				const resultbox2 = await getHistoryByBox(token, 2);
				if (resultbox2) {
					setDataHistory2(resultbox2.data);
				} else {
					setDataHistory2([])
				}
			}
		};
		fetchData();
	}, [toggleDataHistory]);

	const initialFilterBox = () => {
		if (currentBox == 1) {
			return ["Box 1"];
		}
		if (currentBox == 2) {
			return ["Box 2"];
		}
		if (currentBox == 3) {
			return ["Box 3"];
		} else {
			return [];
		}
	};

	const [dataHistory1, setDataHistory1] = useState(null);
	const [dataHistory2, setDataHistory2] = useState(null);
	const [dataHistory3, setDataHistory3] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedBox, setselectedBox] = useState(() => initialFilterBox());

	const [modal, setModal] = useState(false);
	const [selectedClue, setSelectedClue] = useState("");

	// EXPLICATION : cette fonction va créer un nouvel array avec l'ensemble des filtres de catégorie
	const handleFilterCategory = (selectedFilter) => {
		if (selectedFilter === 'Vidéo'){ selectedFilter = 'Video'}
		console.log(selectedFilter)
		if (selectedCategory.includes(selectedFilter)) {
			let filters = selectedCategory.filter((element) => element !== selectedFilter);
			setSelectedCategory(filters);
		} else {
			setSelectedCategory([...selectedCategory, selectedFilter]);
		}
	};

	// EXPLICATION : cette fonction va créer un nouvel array avec l'ensemble des filtres de box
	const handleFilterBox = (selectedFilter) => {
		if (selectedBox.includes(selectedFilter)) {
			let filters = selectedBox.filter((element) => element !== selectedFilter);
			setselectedBox(filters);
		} else {
			setselectedBox([...selectedBox, selectedFilter]);
		}
	};

	// EXPLICATION : cette fonction va filtrer les data en fonction des arrays filtres créés plus haut
	const filterClues = (data) => {
		if (data.length > 0) {
			if (selectedCategory.length == 0 && selectedBox.length == 0) {
				return data.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
			}
			if (selectedCategory.length == 0 && selectedBox.length != 0) {
				return data
					.filter((clue) => selectedBox.includes(clue.box))
					.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
			}
			if (selectedBox.length == 0 && selectedCategory.length != 0) {
				return data
					.filter((clue) => selectedCategory.includes(clue.category))
					.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
			}
			return data
				.filter((clue) => selectedCategory.includes(clue.category))
				.filter((clue) => selectedBox.includes(clue.box))
				.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
		}
	};

	// EXPLICATION : cette fonction indique quelle data utiliser en fonction de la current box PUIS elle appelle la fonction filter pour display les bonnes preuves
	// Les preuves des boxs précédentes sont toujours toutes affichées. En revanche, seulement celles dont status = true de la current box sont affichées
	const displayClue = () => {
		if (currentBox == 1) {
			let cluesCurrentBoxTrue = dataHistory1?.filter((clue) => clue.status == true);
			let allClues = [cluesCurrentBoxTrue].flat();
			if (!dataHistory1) {
				//actionToggleDataHistory()
				return []
			} else {
				//console.log(filterClues(allClues))
				return filterClues(allClues);
			}
		}
		if (currentBox == 2 && dataHistory1) {
			let cluesCurrentBoxTrue = dataHistory2?.filter((clue) => clue.status == true);
			let allClues = [cluesCurrentBoxTrue, dataHistory1].flat();
			return filterClues(allClues);
		}
		if (currentBox == 3 && dataHistory1 && dataHistory2) {
			let cluesCurrentBoxTrue = dataHistory3?.filter((clue) => clue.status == true);
			let allClues = [cluesCurrentBoxTrue, dataHistory2, dataHistory1].flat();
			return filterClues(allClues);
		}
	};

	const openModal = (clue) => {
		if (clue.category == "Audio" || clue.category == "vidéo") {
			fetchPreviousStateNappe();
		}
		setModal(true);
		setSelectedClue(clue);
	};

	const closeModaleAudio = () => {
		setModal(false);
	};

	// EXPLICATION : cette fonction indique quelle modale afficher au clic d'une preuve en fonction de sa catégorie
	const displayCorrespondingModal = (clue) => {
		closeCompte()
		//console.log(clue)
		if (clue.category == "Archive") {
			return (
				<Document title={clue.title} srcElement={urlApi.cdn() + clue.src} handleModalDocument={() => setModal(false)} />
			);
		}
		if (clue.category == "Document") {
			return (
				<Document title={clue.title} srcElement={urlApi.cdn() + clue.src} handleModalDocument={() => setModal(false)} />
			);
		}
		if (clue.category == "Audio") {
			return (
				<Audio
					title={clue.title}
					srcImg1={urlApi.cdn() + clue.img1}
					srcImg2={urlApi.cdn() + clue.img2}
					srcTranscription={urlApi.cdn() + clue.srcTranscript}
					srcAudio={urlApi.cdn() + clue.srcAudio}
					handleModalAudio={closeModaleAudio}
				/>
			);
		}
		if (clue.category == "Lieu") {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={() => setModal(false)} />
						</button>
						<p className="modal-objectif__title">Vous êtes sur de vouloir retourner sur le lieu {clue.title} ?</p>
						<button
							className="modal-objectif__button button--red"
							onClick={() => openLieu(clue.id)}
						>
							Explorer de nouveau
						</button>
					</div>
				</div>
			);
		}
		if (clue.category == "Video") {
			return (
				<Video
					title={clue.title}
					srcVideo={urlApi.cdn() + clue.src}
					handleModalVideo={() => setModal(false)}
				/>
			);
		}
	};

	const displayFilterBox = () => {
		if (currentBox == 1) {
			return filterBox.map((category, index) => (
				<Filter
					category={category}
					key={`filterBox-${index}`}
					handleSearch={() => handleFilterBox(category)}
					activebyDefault={category == "Box 1" ? true : false}
				/>
			));
		}
		if (currentBox == 2) {
			return filterBox.map((category, index) => (
				<Filter
					category={category}
					key={`filterBox-${index}`}
					handleSearch={() => handleFilterBox(category)}
					activebyDefault={category == "Box 2" ? true : false}
				/>
			));
		}
		if (currentBox == 3) {
			return filterBox.map((category, index) => (
				<Filter
					category={category}
					key={`filterBox-${index}`}
					handleSearch={() => handleFilterBox(category)}
					activebyDefault={category == "Box 3" ? true : false}
				/>
			));
		}
	};

	const displayFilterType = () => {
		return filtersType.map((category, index) => (
			<Filter
				category={category}
				key={`filterType-${index}`}
				handleSearch={() => handleFilterCategory(category)}
				activebyDefault={false}
			/>
		));
	};

	return (
		<main className="main__history">
			{modal ? displayCorrespondingModal(selectedClue) : null}
			{renderLieu()}
			<div className="filter__wrapper">
				<div className="filter--type__container">{displayFilterType()}</div>
				<div className="filter--box__container">{displayFilterBox()}</div>
			</div>
			<div className="clue__wrapper">{displayClue()}</div>
		</main>
	);
}
export default Historique;
