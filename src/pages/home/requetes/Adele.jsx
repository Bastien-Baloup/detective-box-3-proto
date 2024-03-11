/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Adèle
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from '../../../components/Input.jsx'
import Document from '../../../components/Document.jsx'
import Cross from '../../../assets/icons/Icon_Cross-white.svg'
import PropTypes from 'prop-types'
import { urlApi } from '../../../utils/const/urlApi.js'
import { BoxContext, DataContext, CompteContext } from '../../../utils/context/fetchContext.jsx'
import { useContext, useState, useEffect, useMemo } from 'react'
import useApi from '../../../utils/hooks/useApi.js'
import useEvent from '../../../utils/hooks/useEvent.js'
import Empreintes from '../../../components/mini-jeux/Empreintes.jsx'

const Adele = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext)
	const token = localStorage.getItem('token')
	const { actionToggleDataAdele, toggleDataAdele, toggleDataEvent, actionToggleDataEvent, toggleDataObjectif, toggleDataHistory } =
		useContext(DataContext)
	const { updateCharactersById, getHistoryByBox, updateHistory, getCharactersById, getEventByBox, updateEvent, getObjectivesByBox } =
		useApi()
	const { dispatch } = useEvent()
	const { closeCompte } = useContext(CompteContext)

	//EXPLICATION : Adele est le personnage "1"
	const [dataAdele, setDataAdele] = useState(null)
	useEffect(() => {
		const fetchData = async () => {
			const result = await getCharactersById(token, 1)
			setDataAdele(result)
		}
		fetchData()
	}, [toggleDataAdele])

	const [dataHistory, setDataHistory] = useState(null)
	useEffect(() => {
		const fetchData = async () => {
			const result = await getHistoryByBox(token, 1)
			setDataHistory(result?.data)
		}
		fetchData()
	}, [toggleDataHistory])

	const box1audio1 = useMemo(() => dataHistory?.find((document) => document?.id === 'box1audio1'), [dataHistory])

	const [dataObjectif, setDataObjectif] = useState(null)
	useEffect(() => {
		const fetchData = async () => {
			const result = await getObjectivesByBox(token, currentBox)
			setDataObjectif(result.data)
		}
		fetchData()
	}, [toggleDataObjectif, currentBox, token])
	let maxDoneObjectif = 0
	if (dataObjectif) {
		for (const objectif of dataObjectif) {
			if (objectif?.status === 'done' && objectif.id > maxDoneObjectif) {
				maxDoneObjectif = objectif.id
			}
		}
	}

	const currentObjectif = Math.min(maxDoneObjectif + 1, 3)

	const [value, setValue] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [modal, setModal] = useState(false)
	const [modalMedia, setModalMedia] = useState(false)
	const [answer, setAnswer] = useState('')
	const [empreintes, setEmpreintes] = useState(false)
	const [toggleReset, setToggleReset] = useState(false)
	const [events, setEvents] = useState(null)

	useEffect(() => {
		const getEvents = async () => {
			const events_ = await getEventByBox(token, currentBox)
			setEvents(events_.data)
		}
		getEvents()
	}, [toggleDataEvent])

	const event301 = events?.find((event) => event.id === 301)

	const resetEmpreintes = () => {
		setToggleReset(!toggleReset)
	}

	// EXPLICATION : Fonction pour slugifier l'input des joueurs
	const slugify = (input) => {
		const inputSlugified = input
			.replace(/\s/g, '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]/g, '')
		return inputSlugified
	}

	// EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
	// EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
	// EXPLICATION : Pour rappel, Adèle n'apparait pas en box 1
	const handleSubmit = (e) => {
		e.preventDefault()

		const thisBox = dataAdele.find((element) => element.box_id === currentBox).data
		const answerInThisBox = thisBox.find((element) => {
			const inAsk = element.ask.includes(slugify(value))
			let inObjectifs
			if (element?.objectifs) {
				inObjectifs = element.objectifs.includes(currentObjectif)
			} else {
				inObjectifs = true
			}
			return inAsk && inObjectifs
		})
		const previouslyAnsweredInThisBox = answerInThisBox?.status

		if (answerInThisBox?.id === 'tatouageSimon' && event301?.status === 'done') {
			setValue('')
			setErrorMessage("Je n'ai pas pu analyser ce que vous m'avez demandé.")
			return
		}

		if (value === '') {
			setErrorMessage('Je dois bien analyser quelque chose !')
			setValue('')
			return
		}
		if (previouslyAnsweredInThisBox) {
			setValue('')
			setErrorMessage(
				"Vous m'avez dejà demandé d'analyser cet élément. Il est désormais disponible dans votre Historique.”"
			)
			return
		}
		if (answerInThisBox) {
			setAnswer(answerInThisBox)
			setModal(true)
			setValue('')
			setErrorMessage('')
			return
		}

		setValue('')
		setErrorMessage("Je n'ai pas pu analyser ce que vous m'avez demandé.")
	}

	const openEmpreinte = () => {
		setModal(false)
		setEmpreintes(true)
		resetEmpreintes()
	}

	const renderButton = () => {
		if (answer.id === 'empreintes') {
			return (
				<button type='button' className='modal-objectif__button button--red' onClick={openEmpreinte}>
					Faire les correspondances
				</button>
			)
		}
		if (answer?.id) {
			if (answer.id !== 'tatouageSimon') {
				return (
					<button type='button' className='modal-objectif__button button--red' onClick={openMedia}>
						Voir l&apos;élément
					</button>
				)
			}
			return (
				<button type='button' className='modal-objectif__button button--red' onClick={validateModal}>
					Fermer
				</button>
			)
		}
		return (
			<button type='button' className='modal-objectif__button button--red' onClick={validateModal}>
				Nouvelle requête
			</button>
		)
	}

	const renderModal = () => {
		closeCompte()
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{answer.srcComment ? (
						<audio autoPlay>
							<source src={urlApi.cdn() + answer.srcComment} type='audio/mpeg' />
							Votre navigateur ne prend pas en charge ce format
						</audio>
					) : (
						''
					)}
					<div>{renderText()}</div>
					{renderButton()}
				</div>
			</div>
		)
	}

	const renderText = () => {
		const text = answer.text.map((el, i) => {
			return (
				<p className='modal-objectif__subtitle' key={i}>
					{el}
				</p>
			)
		})
		return text
	}

	const validateModal = () => {
		setModal(false)
		if (answer?.id === 'tatouageSimon') {
			updateEvent(token, currentBox, 301, 'done')
			actionToggleDataEvent()
		}
	}

	const openMedia = () => {
		validateModal()
		setModalMedia(true)
	}

	const handleModaleDocument = async () => {
		await closeModalMedia(answer.id, answer.ask)
		if (answer?.id === 'box1document6' && box1audio1?.status !== 'done') {
			setManqueAudio1(true)
		}
	}

	const [manqueAudio1, setManqueAudio1] = useState(false)
	const renderManqueAudio1 = () => {
		const text = [
			"Les alibis des membres de la Horde ont l’air solides, il faut peut-être élargir les recherches.",
			"Avez-vous interrogé les proches de Cédric ?"
		]
		const handleClick = () => {
			setManqueAudio1(false)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{renderText(text)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={handleClick}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const renderModalMedia = () => {
		closeCompte()
		return (
			<Document
				title={answer.title}
				srcElement={urlApi.cdn() + answer.src}
				handleModalDocument={handleModaleDocument}
			/>
		)
	}

	const closeModalMedia = async (answerId, asnwerAsk) => {
		await updateCharactersById(token, 1, currentBox, asnwerAsk)
		await updateHistory(token, currentBox, answerId)
		dispatch({
			type: 'setEvent',
			id: answerId
		})
		actionToggleDataAdele()
		setModalMedia(false)
	}

	const catchphrase = [
		'sounds/405-repliques-adele-1.mp3',
		'sounds/405-repliques-adele-2.mp3',
		'sounds/405-repliques-adele-3.mp3',
		'sounds/405-repliques-adele-4.mp3',
		'sounds/405-repliques-adele-5.mp3',
		'sounds/405-repliques-adele-6.mp3',
		'sounds/405-repliques-adele-7.mp3'
	]

	const randomNumber = Math.floor(Math.random() * catchphrase.length)

	return (
		<>
			{modal && renderModal()}
			{modalMedia && renderModalMedia()}
			{manqueAudio1 && renderManqueAudio1()}
			{empreintes && <Empreintes toggleReset={toggleReset} />}
			<audio autoPlay>
				<source src={urlApi.cdn() + catchphrase[randomNumber]} type='audio/mpeg' />
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className='agent'>
				<div className='agent__portrait--container'>
					<img className='agent__portrait' src={`${urlApi.cdn()}assets/photos-personnages/adele.jpg`} alt='' />
				</div>
				<div className='agent__main'>
					<div className='agent__title--container'>
						<p className='agent__title'>Que souhaitez-vous analyser ?</p>
					</div>
					<div className='agent__errorMessage'>{errorMessage}</div>
					<form className='agent__form' onSubmit={handleSubmit}>
						<Input
							type='texte'
							label='Elément à analyser'
							name='adele'
							placeholder='Ce champ est vide'
							value={value}
							setValue={setValue}
						/>
						<button type='submit' className='agent__form__button button--red'>
							Valider
						</button>
					</form>
				</div>
				<button type='button' className='agent__closeButton--container' onClick={closeAgentPage}>
					<img src={Cross} className='agent__closeButton' alt='fermer' />
				</button>
			</div>
		</>
	)
}

Adele.propTypes = {
	closeAgentPage: PropTypes.func
}

export default Adele
