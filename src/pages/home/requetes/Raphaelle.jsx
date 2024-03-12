/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Raphaelle
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from '../../../components/Input.jsx'
import Cross from '../../../assets/icons/Icon_Cross-white.svg'
import PropTypes from 'prop-types'
import { urlApi } from '../../../utils/const/urlApi.js'
import { BoxContext, DataContext, CompteContext } from '../../../utils/context/fetchContext.jsx'
import { useContext, useState, useEffect } from 'react'
import useApi from '../../../utils/hooks/useApi.js'
import useLieu from '../../../utils/hooks/useLieu.jsx'
import useEvent from '../../../utils/hooks/useEvent.js'

const Raphaelle = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext)
	const { closeCompte } = useContext(CompteContext)
	const token = localStorage.getItem('token')
	const {
		actionToggleDataRaphaelle,
		actionToggleDataHistory,
		toggleDataRaphaelle,
		toggleDataObjectif,
		actionToggleDataEvent,
		toggleDataEvent
		//actionToggleDataHelp,
		// toggleDataHistory,
		//actionToggleDataObjectif,
	} = useContext(DataContext)

	const { updateCharactersById, updateHistory, getCharactersById, getEventByBox, updateEvent, getObjectivesByBox } =
		useApi()

	//EXPLICATION : Raphaelle est le personnage '4'

	useEffect(() => {
		const fetchData = async () => {
			const result = await getCharactersById(token, 4)
			setDataRaphaelle(result)
		}
		fetchData()
	}, [toggleDataRaphaelle])

	useEffect(() => {
		const fetchData = async () => {
			const objectifs = await getObjectivesByBox(token, currentBox)
			const objectif2Data = objectifs.data.find((event) => event.id === 2)
			setObjectif2(objectif2Data.status)
		}
		fetchData()
	}, [toggleDataObjectif])

	useEffect(() => {
		const fetchData = async () => {
			const events = await getEventByBox(token, currentBox)
			const event231Data = events.data.find((event) => event.id === 231)
			setEvent231(event231Data?.status)
			const event232Data = events.data.find((event) => event.id === 232)
			setEvent232(event232Data?.status)
		}
		fetchData()
	}, [toggleDataEvent])

	const [valueAdresse, setValueAdresse] = useState('')
	const [valueLatitude, setValueLatitude] = useState('')
	const [valueLongitude, setValueLongitude] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [modal, setModal] = useState(false)
	const [answer, setAnswer] = useState('')
	const [dataRaphaelle, setDataRaphaelle] = useState(null)
	const [retourCoffreModal, setRetourCoffreModal] = useState(false)
	const [event231, setEvent231] = useState('')
	const [event232, setEvent232] = useState('')
	const [objectif2, setObjectif2] = useState('')
	const { renderLieu, setLieu, setLieuOpen } = useLieu()
	const { dispatch } = useEvent()

	// EXPLICATION : Fonction pour slugifier l'input Adresse des joueurs (lettre et chiffres ok)
	const slugifyAdresse = (input) => {
		const inputSlugified = input
			.replace(/\s/g, '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]/g, '')
		return inputSlugified
	}

	// EXPLICATION : Fonction pour slugifier l'input GPS des joueurs (seulement )
	const slugifyGPS = (input) => {
		const inputSlugified = input
			.replace(/\s/g, '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^0-9]/g, '')
		return inputSlugified
	}

	const handleLieuClose = async () => {
		if (answer.id === 'box1lieu1') {
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
		const text = [
			"Pensez à ouvrir le coffre avant d'explorer de nouvelles pistes.",
			"Vous pouvez retourner dans la planque depuis l'historique."
		]
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

	// EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
	// EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
	// EXPLICATION : Pour rappel, Raphaëlle est le seul personnage qui a deux champs (adresse et GPS(latitude et longitude))
	const handleSubmit = async (e) => {
		e.preventDefault()

		const thisBox = dataRaphaelle.find((element) => element.box_id === currentBox).data
		const answerInThisBox = (value) => {
			return thisBox.find((element) => element.ask.includes(value))
		}
		const previouslyAnsweredInThisBox = (value) => {
			return answerInThisBox(value)?.status
		}

		// EXPLICATION : si les deux champs sont remplis, message d'erreur
		if (valueAdresse !== '' && (valueLatitude !== '' || valueLongitude !== '')) {
			setErrorMessage('Il faut me donner une adresse ou une localisation GPS, pas les deux en même temps !')
			setValueAdresse('')
			setValueLatitude('')
			setValueLongitude('')
			return
		}

		// EXPLICATION : si aucun des champs n'est rempli, message d'erreur
		if (valueAdresse === '' && valueLatitude === '' && valueLongitude === '') {
			setErrorMessage(`On n'a pas le temps d'être indécis. Dîtes moi où aller.`)
			setValueAdresse('')
			setValueLongitude('')
			setValueLatitude('')
			return
		}
		// EXPLICATION : si uniquement le champ adresse est rempli
		if (valueAdresse !== '' && valueLatitude === '' && valueLongitude === '') {
			const slugifiedAdresse = slugifyAdresse(valueAdresse)
			// EXPLICATION : Verifie que l'adresse contient au moins une lettre, sinon les joueurs peuvent rentrer les coordonnées GPS dans le champ adresse
			const regex = /[a-zA-Z]/
			const doesItHaveLetters = regex.test(slugifiedAdresse)
			if (doesItHaveLetters === false) {
				setErrorMessage(`Ce n'est pas une adresse valide.`)
				setValueAdresse('')
				setValueLongitude('')
				setValueLatitude('')
				return
			}
			if (previouslyAnsweredInThisBox(slugifiedAdresse)) {
				setValueAdresse('')
				setValueLongitude('')
				setValueLatitude('')
				setErrorMessage(`Vous m'avez dejà demandé d'explorer ce lieu.`)
				return
			}
			// EXPLICATION : certains lieux ne sont visitables que si certaines conditions ont été remplies
			if (answerInThisBox(slugifiedAdresse)) {
				if (answerInThisBox(slugifiedAdresse)?.id === 'box1lieu1') {
					if (objectif2 === 'closed') {
						setValueAdresse('')
						setValueLongitude('')
						setValueLatitude('')
						setErrorMessage('Hmm, cet endroit ne me semble pas pertinent.')
						return
					}
					if (event232 === 'done') {
						setAnswer(answerInThisBox(slugifiedAdresse))
						setModal(true)
						setValueAdresse('')
						setValueLongitude('')
						setValueLatitude('')
						setErrorMessage('')
						return
					}
					if (event231 === 'closed') {
						await updateEvent(token, 1, 21, 'done') // obj2-subObj1
						await updateEvent(token, 1, 22, 'open') // obj2-subObj2
						await updateEvent(token, 1, 231, 'open') // début obj2-subObj2-concierge
						actionToggleDataEvent()
					}
					closeAgentPage()
					dispatch({
						type: 'setEvent',
						id: 'concierge'
					})
					return
				}

				setAnswer(answerInThisBox(slugifiedAdresse))
				setModal(true)
				setValueAdresse('')
				setValueLongitude('')
				setValueLatitude('')
				setErrorMessage('')
				return
			}
		}
		// EXPLICATION : si uniquement les champs latitude et longitude sont remplis
		if ((valueLatitude !== '' || valueLongitude !== '') && valueAdresse === '') {
			const GPS = valueLatitude.concat(valueLongitude)
			const slugifiedGPS = slugifyGPS(GPS)
			if (previouslyAnsweredInThisBox(slugifiedGPS)) {
				setValueAdresse('')
				setValueLongitude('')
				setValueLatitude('')
				setErrorMessage(`Vous m'avez dejà demandé d'explorer ce lieu.`)
				return
			}
			if (answerInThisBox(slugifiedGPS)) {
				setAnswer(answerInThisBox(slugifiedGPS))
				setModal(true)
				setValueAdresse('')
				setValueLongitude('')
				setValueLatitude('')
				setErrorMessage('')
				return
			}
		}
		setValueAdresse('')
		setValueLongitude('')
		setValueLatitude('')
		setErrorMessage('Hmm, cet endroit ne me semble pas pertinent.')
	}

	const renderModal = () => {
		closeCompte()
		if (answer.id === 'box1audio2') {
			const handleClick = () => {
				dispatch({
					type: 'setEvent',
					id: 'box1audio2'
				})
				validateModal()
			}
			return (
				<div className='modal-objectif__background'>
					<div className='modal-objectif__box'>
						<div>{renderText(answer.text)}</div>
						<button type='button' className='modal-objectif__button button--red' onClick={handleClick}>
							Interroger le pharmacien
						</button>
					</div>
				</div>
			)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{renderText(answer.text)}</div>
					{answer.id ? (
						<button
							type='button'
							className='modal-objectif__button button--red'
							onClick={() => openLieu(answer.id, answer.ask)}
						>
							Explorer le lieu
						</button>
					) : (
						<button type='button' className='modal-objectif__button button--red' onClick={validateModal}>
							Nouvelle requête
						</button>
					)}
				</div>
			</div>
		)
	}

	const openLieu = async (answerId, asnwerAsk) => {
		await updateHistory(token, currentBox, answerId)
		await updateCharactersById(token, 4, currentBox, asnwerAsk)

		// if (answerId == 'box1lieu1') {

		// }

		setLieu(answerId)
		setLieuOpen(true)
		actionToggleDataHistory()
		actionToggleDataRaphaelle()
		validateModal()
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

	const validateModal = () => {
		setModal(false)
	}

	const catchphrase = [
		'sounds/401-repliques-raphaelle-1.mp3',
		'sounds/401-repliques-raphaelle-2.mp3',
		'sounds/401-repliques-raphaelle-3.mp3',
		'sounds/401-repliques-raphaelle-4.mp3',
		'sounds/401-repliques-raphaelle-5.mp3',
		'sounds/401-repliques-raphaelle-6.mp3',
		'sounds/401-repliques-raphaelle-7.mp3'
	]

	const randomNumber = Math.floor(Math.random() * catchphrase.length)

	return (
		<>
			{modal && renderModal()}
			{retourCoffreModal && renderRetourCoffreModal()}
			{renderLieu(handleLieuClose, handleLieuChange)}
			<audio autoPlay>
				<source src={urlApi.cdn() + catchphrase[randomNumber]} type='audio/mpeg' />
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className='agent'>
				<div className='agent__portrait--container'>
					<img className='agent__portrait' src={`${urlApi.cdn()}assets/photos-personnages/raphaelle.jpg`} alt='' />
				</div>
				<div className='agent__main'>
					<div className='agent__title--container'>
						<p className='agent__title'>Où souhaitez-vous aller ?</p>
					</div>
					<div className='agent__errorMessage'>{errorMessage}</div>
					<form className='agent__form' onSubmit={handleSubmit}>
						<Input
							type='texte'
							label='Adresse ou lieu spécifique'
							name='adresse'
							placeholder='Ce champ est vide'
							value={valueAdresse}
							setValue={setValueAdresse}
						/>
						<p className='agent__raphaelle--text'>OU</p>
						<p className='agent__raphaelle--label'>Coordonnées GPS</p>
						<div className='agent__raphaelle--GPSinput'>
							<Input
								type='texte'
								label='Latitude'
								name='gps'
								placeholder='Ce champ est vide'
								value={valueLatitude}
								setValue={setValueLatitude}
							/>
							<Input
								type='texte'
								label='Longitude'
								name='gps'
								placeholder='Ce champ est vide'
								value={valueLongitude}
								setValue={setValueLongitude}
							/>
						</div>
						<button type='submit' className='agent__form__button button--red'>
							Valider
						</button>
					</form>
				</div>
				<div className='agent__closeButton--container' onClick={closeAgentPage}>
					<img src={Cross} className='agent__closeButton' alt='fermer' />
				</div>
			</div>
		</>
	)
}

Raphaelle.propTypes = {
	closeAgentPage: PropTypes.func
}

export default Raphaelle
