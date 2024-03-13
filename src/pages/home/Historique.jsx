/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page Historique qui permet d'afficher toutes les preuves + les filtres de tri pour trier ces mêmes preuves en fonction de leur type et des boxs.

import { useState } from 'react'
import Filter from '../../components/Filter.jsx'
import Preuve from '../../components/Preuve.jsx'
import Document from '../../components/Document.jsx'
import Audio from '../../components/Audio.jsx'
import Video from '../../components/Video.jsx'
import { urlApi } from '../../utils/const/urlApi.js'
import Cross from '../../assets/icons/Icon_Cross-white.svg'
import { BoxContext, DataContext, AmbianceContext, CompteContext } from '../../utils/context/fetchContext.jsx'
import { useContext, useEffect } from 'react'
import useApi from '../../utils/hooks/useApi.js'
import useLieu from '../../utils/hooks/useLieu.jsx'
import useEvent from '../../utils/hooks/useEvent.js'

function Historique () {
	const filtersType = ['Document', 'Vidéo', 'Audio', 'Lieu', 'Archive']
	const token = localStorage.getItem('token')
	const { currentBox } = useContext(BoxContext)
	const { pauseNappe } = useContext(AmbianceContext)
	const { toggleDataHistory, toggleDataEvent, toggleDataObjectif } = useContext(DataContext)
	const { renderLieu, setLieu, setLieuOpen } = useLieu()
	const { getHistoryByBox, getEventByBox, getObjectivesByBox } = useApi()
	const { dispatch } = useEvent()
	const { closeCompte } = useContext(CompteContext)

	const [event232, setEvent232] = useState('')
	const [objectif2, setObjectif2] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const events = await getEventByBox(token, currentBox)
			const event232Data = events.data.find((event) => event.id === 232)
			setEvent232(event232Data?.status)
		}
		fetchData()
	}, [toggleDataEvent])

	useEffect(() => {
		const fetchData = async () => {
			const objectifs = await getObjectivesByBox(token, currentBox)
			const objectif2Data = objectifs.data.find((event) => event.id === 2)
			setObjectif2(objectif2Data.status)
		}
		fetchData()
	}, [toggleDataObjectif])

	const openLieu = (lieu) => {
		setLieu(lieu)
		setLieuOpen(true)
		setModal(false)
	}

	useEffect(() => {
		const fetchData = async () => {
			if (currentBox === 1) {
				const result = await getHistoryByBox(token, currentBox)
				if (result) {
					setDataHistory1(result.data)
				} else {
					setDataHistory1([])
				}
			}
		}
		fetchData()
	}, [toggleDataHistory])

	const [dataHistory1, setDataHistory1] = useState(null)
	const [selectedCategory, setSelectedCategory] = useState([])

	const [modal, setModal] = useState(false)
	const [selectedClue, setSelectedClue] = useState('')

	// EXPLICATION : cette fonction va créer un nouvel array avec l'ensemble des filtres de catégorie
	const handleFilterCategory = (selectedFilter_) => {
		let selectedFilter = selectedFilter_
		if (selectedFilter === 'Vidéo') {
			selectedFilter = 'Video'
		}
		console.log(selectedFilter)
		if (selectedCategory.includes(selectedFilter)) {
			const filters = selectedCategory.filter((element) => element !== selectedFilter)
			setSelectedCategory(filters)
		} else {
			setSelectedCategory([...selectedCategory, selectedFilter])
		}
	}

	// EXPLICATION : cette fonction va filtrer les data en fonction des arrays filtres créés plus haut
	const filterClues = (data) => {
		if (data.length > 0) {
			let filteredData = []
			if (selectedCategory.length === 0) {
				filteredData = data
			} else {
				filteredData = data.filter((clue) => selectedCategory.includes(clue.category))
			}
			return filteredData.map((clue, index) => (
				<Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />
			))
		}
	}

	// EXPLICATION : cette fonction indique quelle data utiliser en fonction de la current box PUIS elle appelle la fonction filter pour display les bonnes preuves
	// Les preuves des boxs précédentes sont toujours toutes affichées. En revanche, seulement celles dont status = true de la current box sont affichées
	const displayClue = () => {
		if (currentBox === 1) {
			const cluesCurrentBoxTrue = dataHistory1?.filter((clue) => clue.status === true)
			const allClues = [cluesCurrentBoxTrue].flat()
			if (!dataHistory1) {
				//actionToggleDataHistory()
				return []
			}
			//console.log(filterClues(allClues))
			return filterClues(allClues)
		}
		return []
	}

	const openModal = (clue) => {
		if (clue.category === 'Audio' || clue.category === 'vidéo') {
			pauseNappe()
		}
		setModal(true)
		setSelectedClue(clue)
	}

	const closeModaleAudio = () => {
		setModal(false)
	}

	// EXPLICATION : cette fonction indique quelle modale afficher au clic d'une preuve en fonction de sa catégorie
	const displayCorrespondingModal = (clue) => {
		closeCompte()
		//console.log(clue)
		if (clue.category === 'Archive') {
			return (
				<Document title={clue.title} srcElement={urlApi.cdn() + clue.src} handleModalDocument={() => setModal(false)} />
			)
		}
		if (clue.category === 'Document') {
			return (
				<Document title={clue.title} srcElement={urlApi.cdn() + clue.src} handleModalDocument={() => setModal(false)} />
			)
		}
		if (clue.category === 'Audio') {
			return (
				<Audio
					title={clue.title}
					srcImg1={urlApi.cdn() + clue.img1}
					srcImg2={urlApi.cdn() + clue.img2}
					srcTranscription={urlApi.cdn() + clue.srcTranscript}
					srcAudio={urlApi.cdn() + clue.srcAudio}
					handleModalAudio={closeModaleAudio}
				/>
			)
		}
		if (clue.category === 'Lieu') {
			return (
				<div className='modal-objectif__background'>
					<div className='modal-objectif__box'>
						<button type='button' className='modal-objectif__icon--container'>
							<img className='modal-objectif__icon' src={Cross} onClick={() => setModal(false)} alt='fermer la popup' />
						</button>
						<p className='modal-objectif__title'>Vous êtes sur de vouloir retourner sur le lieu {clue.title} ?</p>
						<button type='button' className='modal-objectif__button button--red' onClick={() => openLieu(clue.id)}>
							Explorer de nouveau
						</button>
					</div>
				</div>
			)
		}
		if (clue.category === 'Video') {
			return <Video title={clue.title} srcVideo={urlApi.cdn() + clue.src} handleModalVideo={() => setModal(false)} scrTranscript={clue?.srcTranscript && (urlApi.cdn() + clue.srcTranscript)} />
		}
	}

	const displayFilterType = () => {
		return filtersType.map((category, index) => (
			<Filter
				category={category}
				key={`filterType-${index}`}
				handleSearch={() => handleFilterCategory(category)}
				activebyDefault={false}
			/>
		))
	}

	const renderText = (text_) => {
		const text = text_.map((el, i) => {
			return (
				<p className='modal-objectif__subtitle' key={i}>
					{el}
				</p>
			)
		})
		return text
	}

	const [retourCoffreModal, setRetourCoffreModal] = useState(false)

	const handleLieuClose = async () => {
		if (event232 === 'done' && objectif2 === 'open') {
			setRetourCoffreModal(true)
			return
		}
		if (objectif2 === 'done') {
			dispatch({
				type: 'setEvent',
				id: 'obj3'
			})
		}
	}

	const [isNight, setIsNight] = useState(false)
	const handleLieuChange = () => {
		setLieuOpen(false)
		if (!isNight) {
			setLieu('box1lieu1-nuit')
			setIsNight(true)
		} else {
			setLieu('box1lieu1')
			setIsNight(false)
		}
		setLieuOpen(true)
	}

	const handleRetourCoffre = () => {
		setRetourCoffreModal(false)
		setLieu('box1lieu1')
		setLieuOpen(true)
	}

	const renderRetourCoffreModal = () => {
		const text = ["Ouvrons d'abord le coffre avant d'explorer les nouvelles pistes"]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<div className='modal-objectif__buttons'>
						<button type='button' className='modal-objectif__button button--red' onClick={handleRetourCoffre}>
							Retourner dans la planque
						</button>
						<button
							type='button'
							className='modal-objectif__button button--white'
							onClick={() => setRetourCoffreModal(false)}
						>
							Continuer l&apos;enquête
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<main className='main__history'>
			{renderLieu(handleLieuClose, handleLieuChange)}
			{retourCoffreModal && renderRetourCoffreModal()}
			{modal ? displayCorrespondingModal(selectedClue) : null}
			<div className='filter__wrapper'>
				<div className='filter--type__container'>{displayFilterType()}</div>
			</div>
			<div className='clue__wrapper'>{displayClue()}</div>
		</main>
	)
}
export default Historique
