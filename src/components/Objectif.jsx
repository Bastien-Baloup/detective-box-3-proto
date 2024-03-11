/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant est très complexe et important : il permet de rendre les objectifs
// EXPLICATION : Il affiche egalement toute la logique de validation des objectifs
// EXPLICATION : Il affiche egalement toute la logique des différents événements de l'application

import PropTypes from 'prop-types'
import { useState, useEffect, useMemo } from 'react'
import Check from '../assets/icons/Icon_Check-green.svg'
import LockClosed from '../assets/icons/Icon_Lock-closed-red.svg'
import LockOpen from '../assets/icons/Icon_Lock-open-black.svg'
import Input from './Input.jsx'
import Cross from '../assets/icons/Icon_Cross-white.svg'
import InterrogatoireInterractif from './mini-jeux/InterrogatoireInterractif.jsx'
import Audio from '../components/Audio'
import Document from './Document.jsx'

import { urlApi } from '../utils/const/urlApi'
import { BoxContext, DataContext, CompteContext } from '../utils/context/fetchContext'
import { useContext } from 'react'
import useApi from '../utils/hooks/useApi.js'
import useEvent from '../utils/hooks/useEvent.js'

const Objectif = ({ data }) => {
	const [modal, setModal] = useState(false)
	const [modalAnswer, setModalAnswer] = useState(false)
	const [doneObjectifModal, setDoneObjectifModal] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [value, setValue] = useState('')
	const [sousObjectif, setSousObjectif] = useState(null)
	const [interrogatoireTim, setInterrogatoireTim] = useState(false)
	const [pharmacie, setPharmacie] = useState(false)

	const { currentBox } = useContext(BoxContext)
	const token = localStorage.getItem('token')
	const {
		actionToggleDataEvent,
		toggleDataEvent,
		actionToggleDataHistory,
		toggleDataHistory,
		actionToggleDataObjectif,
		toggleDataTim
	} = useContext(DataContext)
	const { closeCompte } = useContext(CompteContext)

	const { getEventByBox, getCharactersById, updateEvent, getHistoryByBox, updateHistory, updateObjectives } = useApi()

	const { dispatch } = useEvent()

	const [events, setEvents] = useState(null)
	const [history, sethistory] = useState(null)
	// EXPLICATION : Fonction pour récupérer l'état des événements
	useEffect(() => {
		const getEvents = async () => {
			const events_ = await getEventByBox(token, currentBox)
			setEvents(events_.data)
		}
		getEvents()
	}, [toggleDataEvent])

	useEffect(() => {
		const getEvents = async () => {
			const history = await getHistoryByBox(token, currentBox)
			sethistory(history.data)
		}
		getEvents()
	}, [toggleDataHistory])

	const listSousObjectifs = useMemo(() => {
		const sousObjectifs = data?.sousobjectifs ? data.sousobjectifs : []
		sousObjectifs.forEach((sousObjectif) => {
			sousObjectif.isSousObjectif = true
			const event = events?.find((event) => event.id === sousObjectif.id)
			if (event) {
				sousObjectif.status = event.status
			}
		})
		return sousObjectifs
	}, [data, events])

	const sousObj31 = useMemo(() => listSousObjectifs?.find((sousObj) => sousObj.id === 31), [listSousObjectifs])
	const sousObj32 = useMemo(() => listSousObjectifs?.find((sousObj) => sousObj.id === 32), [listSousObjectifs])

	const box1document8 = useMemo(() => history?.find((document) => document.id === 'box1document8')?.status, [history])

	const box1audio12 = useMemo(() => history?.find((document) => document.id === 'box1audio12'), [history])
	const box1document3 = useMemo(() => history?.find((document) => document.id === 'box1document3'), [history])

	//EXPLICATION : Tim est le personnage "5"
	const [analyseTelephone, setAnalyseTelephone] = useState(false)
	useEffect(() => {
		const getTimData = async () => {
			const result = await getCharactersById(token, 5)
			const thisBox = result.find((element) => element.box_id === currentBox).data
			const demande = thisBox.find((element) => element.ask.includes('telephonevictime'))
			if (demande) {
				setAnalyseTelephone(demande.status)
			}
		}
		getTimData()
	}, [toggleDataTim])

	//TODO traitements spécifiques d'objectifs

	// à l'ouverture du sous objectif 13
	const [popupDebutHacking, setPopupDebutHacking] = useState(false)
	const [popupFinHacking, setPopupFinHacking] = useState(false)
	const handleHacking = () => {
		setPopupDebutHacking(false)
		setPopupFinHacking(true)
	}
	const renderPopupDebutHacking = () => {
		const text = [
			'J’ai récupéré l’accès au système de sécurité via Sophie Palmero, je reconnais bien la méthode de piratage utilisée.',
			'Je ne vous garantis pas que vous allez réussir à mettre la main sur les vraies images des caméras mais vous pouvez toujours essayer.'
		]
		const text2 = [
			'En gros, il faut créer des connexions entre les blocs.',
			'Les connexions ne peuvent pas sur superposer et le système ne reconnait que les connexions verticales et horizontales mais pas de biais.',
			'Le système accepte 0, 1 ou 2 connexions entre chaque bloc, un peu comme du binaire mais un peu plus complexe.',
			'Il y a une logique d’équivalence : le nombre de connexions doit correspondre à la typologie du bloc. Si on est sur un bloc 4, il doit y avoir exactement 4 connexions qui partent du bloc.'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<a href='https://hashi-puzzles.com/levels/easy/1' target='_blank' rel='noreferrer'>
						Lien
					</a>
					{<div>{renderText(text2)}</div>}
					<button type='button' className='modal-objectif__button button--red' onClick={handleHacking}>
						Puzzle résolu
					</button>
				</div>
			</div>
		)
	}
	const renderPopupFinHacking = () => {
		const text = ['Message s’affichant à la résolution du déblocage du système de sécurité : LONEWOOD']
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<button
						type='button'
						className='modal-objectif__button button--red'
						onClick={() => setPopupFinHacking(false)}
					>
						Continuer l’enquête
					</button>
				</div>
			</div>
		)
	}

	const [tipsLauren, setTipsLauren] = useState(false)

	const handleTipLauren = () => {
		setTipsLauren(false)
		setInterrogatoireTim(true)
	}

	const renderTipsLauren = () => {
		return (
			<Document
				title={box1document3?.title}
				srcElement={urlApi.cdn() + box1document3.src}
				handleModalDocument={handleTipLauren}
				buttonText={"Commencer l'interrogatoire de Tim"}
			/>
		)
	}

	// après fin l'interrogatoire de tim
	const onCloseInterrogatoireTim = async (closedByCross = false) => {
		setInterrogatoireTim(false)
		if (closedByCross) {
			setSousObjectif(null)
			return
		}
		await updateObjectives(token, 1, 1, 'done')
		await updateObjectives(token, 1, 2, 'open')
		actionToggleDataObjectif()
		setApresInterrogatoireTim(true)
	}

	const [apresInterrogatoireTim, setApresInterrogatoireTim] = useState(false)
	const renderApresInterrogatoireTim = () => {
		const closeApresInterrogatoireTim = () => {
			setPopupImagesCamera(true)
			setApresInterrogatoireTim(false)
		}
		const text = [
			'Bon agents, la véritable implication de Tim dans cette affaire n’est pas encore tout à fait claire.',
			'En attendant d’en avoir le cœur net, on garde Tim dans l’équipe.',
			'Mon instinct me dit que ce n’est pas lui le méchant dans l’histoire et de toute façon, ça nous permet de garder un œil sur lui au cas où.',
			'',
			'Retournez le voir, je crois qu’il a des infos à vous donner sur notre affaire !'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<button type='button' className='modal-objectif__button button--red' onClick={closeApresInterrogatoireTim}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	// début objectif 2
	const [popupImagesCamera, setPopupImagesCamera] = useState(false)
	const renderPopupImagesCamera = () => {
		console.log(analyseTelephone)
		let onClosePopupImageCamera = async () => {
			await updateHistory(token, currentBox, 'box1document5')
			actionToggleDataHistory()
			setPopupImagesCamera(false)
		}
		const text = [
			'J’ai réussi à récupérer des images des caméras de la ville pour traquer le van des cambrioleurs.',
			'Après le casse, il a quitté la Place du Casino pour se diriger vers le sud-ouest de la ville.',
			'J’ai perdu sa trace à partir du moment où le van a contourné la statue de Juan Manuel Fangio.',
			'À vous de trouver le moyen de retracer leur trajet.'
		]
		if (analyseTelephone) {
			onClosePopupImageCamera = async () => {
				await updateHistory(token, currentBox, 'box1document5')
				await updateHistory(token, currentBox, 'box1audio3')
				actionToggleDataHistory()
				setPopupImagesCamera(false)
			}
			text.push(' ')
			text.push("J'y pense, j'ai pu analyser le téléphone de la victime.")
			text.push('Voilà ce que j’ai récupéré sur son répondeur, j’espère que ça vous aidera')
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<button type='button' className='modal-objectif__button button--red' onClick={onClosePopupImageCamera}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const closeInterrogatoireSimon = async () => {
		await updateHistory(token, 1, 'box1audio12')
		actionToggleDataHistory()
		setInterrogatoireSimon(false)
		setDenoncerTim(true)
	}

	const [interrogatoireSimon, setInterrogatoireSimon] = useState(false)

	const renderInterrogatoireSimon = () => {
		return (
			<Audio
				title={box1audio12?.title}
				srcImg1={box1audio12?.img1}
				srcImg2={box1audio12?.img2}
				srcTranscription={urlApi.cdn() + box1audio12?.srcTranscript}
				handleModalAudio={closeInterrogatoireSimon}
				srcAudio={urlApi.cdn() + box1audio12?.srcAudio}
			/>
		)
	}
	const [denoncerTim, setDenoncerTim] = useState(false)

	const handleDenoncer = () => {
		setDenoncerTim(false)
		setDenoncerTimBis(true)
	}

	const renderDenoncerTim = () => {
		const text = [
			'Raphaëlle : Eh bah... quelle affaire. Un cambriolage haut en couleurs, un butin encore en partie dans la nature, de la vengeance... ça fera un bon polar un jour.',
			'Lauren : Oui, un jour. Ou alors une autobiographie intéressante si Matthieu se décide à l’écrire...',
			'Raphaëlle : Ouais... en tout cas, merci pour votre aide agents, sans vous, nous n’aurions pas été aussi rapides ! Nous vous en sommes reconnaissants... Et Tim aussi !',
			'Lauren : A propos de Tim...',
			'Raphaëlle : Quoi ?',
			'Lauren : Je l’adore, tu le sais... Mais il reste un complice de ce casse. De deux autres cambriolages même, techniquement, puisque la méthode utilisée a été la même. Au fond, il savait que ces informations allaient servir à cambrioler des casinos, même s’il ne pensait pas que ce serait celui de son père.',
			'Raphaëlle : Oui, c’est vrai... On fait quoi ?',
			'Lauren : Bonne question... Vous en pensez quoi agents ? Doit-on dénoncer Tim à la police ou couvrir son implication dans l’affaire ?'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{renderText(text)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={handleDenoncer}>
						Répondre
					</button>
				</div>
			</div>
		)
	}

	const [denoncerTimBis, setDenoncerTimBis] = useState(false)

	const denoncer = async () => {
		await updateEvent(token, 1, 303, 'done')
		actionToggleDataEvent()
		setDenoncerTimBis(false)
		setDenoncerTimOui(true)
	}

	const pasDenoncer = async () => {
		await updateEvent(token, 1, 303, 'open')
		actionToggleDataEvent()
		setDenoncerTimBis(false)
		setDenoncerTimNon(true)
	}

	const renderDenoncerTimBis = () => {
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<h2 className='modal-objectif__title'>Voulez-vous dénoncer Tim ?</h2>
					<button type='button' className='modal-objectif__button button--red' onClick={denoncer}>
						Dénoncer Tim
					</button>
					<button type='button' className='modal-objectif__button button--red' onClick={pasDenoncer}>
						Protéger Tim
					</button>
				</div>
			</div>
		)
	}

	const [denoncerTimOui, setDenoncerTimOui] = useState(false)

	const handleDenoncerOui = () => {
		setDenoncerTimOui(false)
		setReponseEmail(true)
	}

	const renderDenoncerTimOui = () => {
		const text = [
			'Raphaëlle : J’imagine que c’est la bonne chose à faire... Ils auraient fini par comprendre de toute façon. J’espère qu’il n’écopera pas d’une trop lourde peine... Mais avec son casier, je crains que... rah.',
			'Lauren : Tu as essayé Raphaëlle. Tu lui as offert ce job et ça l’a protégé de la prison. Mais certaines choses sont en dehors de ton contrôle.',
			'Raphaëlle : Oui... j’imagine. Merci encore pour votre aide, agents.'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{renderText(text)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={handleDenoncerOui}>
						Terminer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const [denoncerTimNon, setDenoncerTimNon] = useState(false)

	const handleDenoncerNon = () => {
		setDenoncerTimNon(false)
		setReponseEmail(true)
	}

	const renderDenoncerTimNon = () => {
		const text = [
			'Raphaëlle : Ouf, merci agents ! J’avoue que j’aurais eu mal au cœur de devoir le dénoncer. Il nous a aidé à résoudre pas mal d’affaires et puis, il a bon fond ce petit... Peut-être un peu naïf.',
			'Lauren : J’imagine qu’il aura retenu la leçon.',
			'Raphaëlle : Oui. Bon je vais garder un œil sur lui quand même, au cas où. Merci encore de votre aide agents!'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{renderText(text)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={handleDenoncerNon}>
						Terminer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const [reponseEmail, setReponseEmail] = useState(false)

	const handleReponseEmail = async () => {
		await updateObjectives(token, 1, 3, 'done')
		actionToggleDataObjectif()
		setReponseEmail(false)
	}

	const renderReponseEmail = () => {
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>
						Bonjour, Agents. Mes clients souhaiteraient obtenir l’identité de la personne qui a tué leur Chef des
						opérations, Cédric Romero. Si vous acceptez de nous transmettre cette information, vous aurez accès à une
						belle récompense...
					</div>
					<select name='' id=''>
						<option value=''>Donner le nom du meurtrier</option>
						<option value=''>Ne pas donner le nom du meurtrier</option>
					</select>
					<button type='button' className='modal-objectif__button button--red' onClick={handleReponseEmail}>
						Envoyer
					</button>
				</div>
			</div>
		)
	}

	// -- GENERIQUE -- //

	const openModal = (objectif) => {
		closeCompte()
		if (objectif?.isSousObjectif) {
			if (objectif.id === 13) {
				const event130 = events.find((event) => event.id === 130)
				const interrogatoireInterractif = event130?.status === 'done'
				if (interrogatoireInterractif) {
					setModal(false)
					setInterrogatoireTim(true)
				}
			}
			setSousObjectif(objectif)
			setErrorMessage('')
			setValue('')
		} else {
			setModal(true)
			setErrorMessage('')
			setValue('')
		}
	}

	const closeModal = () => {
		setModal(false)
		setSousObjectif(null)
		setErrorMessage('')
		setValue('')
	}

	const slugify = (input) => {
		const inputSlugified = input
			.replace(/\s/g, '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]/g, '')
		return inputSlugified
	}

	const renderText = (data) => {
		if (!data) {
			return
		}
		const text = data.map((el, i) => {
			return (
				<p className='modal-objectif__subtitle' key={i}>
					{el}
				</p>
			)
		})
		return text
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (sousObjectif) {
			if (
				sousObjectif?.id === 21 &&
				['pharmacie', 'pharmaciefontvieille', 'pharmaciedefontvieille'].includes(slugify(value))
			) {
				setErrorMessage('')
				setValue('')
				setSousObjectif(null)
				setModal(false)
				setPharmacie(true)
			}
			if (sousObjectif?.id === 22) {
				setErrorMessage('')
				setValue('')
				setSousObjectif(null)
				setModal(false)
				return
			}
			if (sousObjectif?.id === 31) {
				if (sousObjectif?.answer.length === braqueurValues.length) {
					let allGood = true
					for (let indice = 0; indice < braqueurValues.length; indice++) {
						const goodAnswer = sousObjectif?.answer[indice]
						const answer = braqueurValues[indice]
						if (goodAnswer !== slugify(answer)) {
							allGood = false
							break
						}
					}
					if (allGood) {
						setErrorMessage('')
						setValue('')
						setModal(false)
						setModalAnswer(true)
						return
					}
					setErrorMessage(sousObjectif.errorMessage)
					return
				}
			}
			if (sousObjectif?.id === 32) {
				if (!box1document8) {
					setErrorMessage("Ce n'est pas un peu tôt pour accuser quelqu'un ?")
					setValue('')
					return
				}
				if (sousObjectif.answer.includes(slugify(value)) && sousObjectif.answer.includes(slugify(selectedChoice))) {
					setErrorMessage('')
					setValue('')
					setModal(false)
					setModalAnswer(true)
					return
				}
			}
			if (sousObjectif.answer.includes(slugify(value))) {
				//TODO Gestion spécifique bonnes réponses

				setErrorMessage('')
				setValue('')
				setModal(false)
				setModalAnswer(true)
				return
			}
			//TODO Gestion spécifique réponses fausses

			setErrorMessage(sousObjectif.errorMessage)
			setValue('')
		} else {
			if (data.answer.includes(slugify(value))) {
				//TODO Gestion spécifique bonnes réponses

				setErrorMessage('')
				setValue('')
				setModal(false)
				setModalAnswer(true)
				return
			}
			//TODO Gestion spécifique réponses fausses

			setErrorMessage(data.errorMessage)
			setValue('')
		}
	}

	const handleModalAnswer = async () => {
		setModalAnswer(false)
		if (sousObjectif?.id === 11) {
			if (listSousObjectifs.find((sousObjectif_) => sousObjectif_.id === 12)?.status === 'done') {
				await updateEvent(token, 1, 13, 'open')
				setPopupDebutHacking(true)
			}
			await updateEvent(token, 1, 11, 'done')
			actionToggleDataEvent()
			setSousObjectif(null)
			return
		}
		if (sousObjectif?.id === 12) {
			await updateEvent(token, 1, 12, 'done')
			if (listSousObjectifs.find((sousObjectif_) => sousObjectif_.id === 11)?.status === 'done') {
				await updateEvent(token, 1, 13, 'open')
				setPopupDebutHacking(true)
			}
			actionToggleDataEvent()
			setSousObjectif(null)
			return
		}
		if (sousObjectif?.id === 13) {
			console.log('test box1document3')
			await updateEvent(token, 1, 130, 'done')
			actionToggleDataEvent()
			await updateHistory(token, currentBox, 'box1document3')
			actionToggleDataHistory()
			setTipsLauren(true)
			setSousObjectif(null)
			return
		}
		if (sousObjectif?.id === 21) {
			setSousObjectif(null)
			return
		}
		if (sousObjectif?.id === 31) {
			await updateEvent(token, 1, 31, 'done')
			actionToggleDataEvent()
			if (sousObj32?.status !== 'done') {
				setManqueSousObj32(true)
			}
		}
		if (sousObjectif?.id === 32) {
			await updateEvent(token, 1, 32, 'done')
			actionToggleDataEvent()
			setInterrogatoireSimon(true)
			if (sousObj31?.status !== 'done') {
				setManqueSousObj31(true)
			}
		}
	}

	const [manqueSousObj31, setManqueSousObj31] = useState(false)
	const renderManqueSousObj31 = () => {
		const text = [
			'Bravo agents !',
			'Maintenant qu’on a mis la main sur le meurtrier de Cédric Romero, je vous laisse boucler votre dossier sur le casse du Casino.',
			"La police (et le père de Tim) seront plus que ravis d'avoir le fin mot de l’histoire et qui sait... peut-être retrouver l’argent volé."
		]
		const handleClick = () => {
			setManqueSousObj31(false)
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

	const [manqueSousObj32, setManqueSousObj32] = useState(false)
	const renderManqueSousObj32 = () => {
		const text = [
			'On va pouvoir revenir à un sujet plus qu’important : qui a tué Cédric Romero ?',
			'Je pense qu’on peut déjà revenir sur ce que Sacha Leza nous a dit à propos d’un bracelet métallique. Je vous laisse regarder ça !'
		]
		const handleClick = () => {
			setManqueSousObj32(false)
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

	const renderListeSousObjectif = () => {
		if (!listSousObjectifs) {
			return ''
		}
		let sousObjectifContainer = null
		if (data.id === 2) {
			if (listSousObjectifs[0]?.status === 'open') {
				sousObjectifContainer = <div>{renderObjectif(listSousObjectifs[0])}</div>
			} else {
				sousObjectifContainer = <div>{renderObjectif(listSousObjectifs[1])}</div>
			}
		} else {
			sousObjectifContainer = listSousObjectifs.map((sousObjectif_) => (
				<div key={sousObjectif_?.id}>{renderObjectif(sousObjectif_)}</div>
			))
		}

		return <div className='modal-objectif__list-sous-objectif'>{sousObjectifContainer}</div>
	}

	const renderSousObjectif = () => {
		let answerForm
		// console.log(sousObjectif)
		if (sousObjectif.id === 11) {
			// console.log('tests')
			answerForm = (
				<form className='modal-objectif__form' onSubmit={handleSubmit}>
					<Input
						type='texte'
						label={sousObjectif?.label}
						name='objectif'
						placeholder='Ce champ est vide'
						value={value}
						setValue={setValue}
					/>
					<button type='submit' className='modal-objectif__button button--red'>
						Envoyer
					</button>
				</form>
			)
		}
		if (sousObjectif.id === 12) {
			answerForm = (
				<form className='modal-objectif__form' onSubmit={handleSubmit}>
					<Input
						type='texte'
						label={sousObjectif.label}
						name='objectif'
						placeholder='Ce champ est vide'
						value={value}
						setValue={setValue}
					/>
					<button type='submit' className='modal-objectif__button button--red'>
						Valider
					</button>
				</form>
			)
		}
		if (sousObjectif.id === 13) {
			answerForm = (
				<form className='modal-objectif__form' onSubmit={handleSubmit}>
					<Input
						type='texte'
						label={data.label}
						name='objectif'
						placeholder='Ce champ est vide'
						value={value}
						setValue={setValue}
					/>
					<button type='submit' className='modal-objectif__button button--red'>
						Valider
					</button>
				</form>
			)
		}
		if (sousObjectif.id === 21) {
			answerForm = (
				<form className='modal-objectif__form' onSubmit={handleSubmit}>
					<Input
						type='texte'
						label={sousObjectif.label}
						name='objectif'
						placeholder='Ce champ est vide'
						value={value}
						setValue={setValue}
					/>
					<button type='submit' className='modal-objectif__button button--red'>
						Valider
					</button>
				</form>
			)
		}
		if (sousObjectif.id === 22) {
			answerForm = (
				<form className='modal-objectif__form' onSubmit={handleSubmit}>
					<button type='submit' className='modal-objectif__button button--red'>
						Valider
					</button>
				</form>
			)
		}
		if (sousObjectif.id === 31) {
			answerForm = (
				<form className='modal-objectif__form' onSubmit={handleSubmit}>
					{renderListeBraqueurs()}
					<button type='submit' className='modal-objectif__button button--red'>
						Valider
					</button>
				</form>
			)
		}
		return (
			<>
				<h3 className='modal-objectif__title'>
					Sous-Objectif : <br /> {sousObjectif.title}
				</h3>
				{sousObjectif?.subtitle && <div>{sousObjectif?.subtitle}</div>}
				<div className='modal-objectif__errorMessage'>{errorMessage}</div>
				{answerForm}
			</>
		)
	}

	const renderListeBraqueurs = () => sousObjectif?.images?.map((src, indice) => renderBraqueur(src, indice))

	const [braqueurValues, setBraqueurValues] = useState([
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	])
	const updateBraqueurValues = (indice, value) => {
		const temp = [...braqueurValues]
		temp[indice] = value
		setBraqueurValues(temp)
	}
	const renderBraqueur = (src, indice) => {
		return (
			<div className='modal-objectif__braqueur'>
				<div className='modal-objectif__braqueur--photo'>
					<img src={urlApi.cdn() + src} alt='' />
				</div>
				<div className='modal-objectif__braqueur--input'>
					<div className='input-wrapper-text'>
						<label className='input-wrapper__label' htmlFor='nom'>
							Nom
						</label>
						<input
							className='input-texte'
							id='nom'
							name='nom'
							maxLength='60'
							onChange={(e) => updateBraqueurValues(indice * 4 + 0, e.target.value)}
						/>
					</div>
					<div className='input-wrapper-text'>
						<label className='input-wrapper__label' htmlFor='prenom'>
							Prénom
						</label>
						<input
							className='input-texte'
							id='prenom'
							name='prenom'
							maxLength='60'
							onChange={(e) => updateBraqueurValues(indice * 4 + 1, e.target.value)}
						/>
					</div>
					<div className='input-wrapper-text'>
						<label className='input-wrapper__label' htmlFor='animal'>
							Animal
						</label>
						<input
							className='input-texte'
							id='animal'
							name='animal'
							maxLength='60'
							onChange={(e) => updateBraqueurValues(indice * 4 + 2, e.target.value)}
						/>
					</div>
					<div className='input-wrapper-select'>
						<label className='input-wrapper__label' htmlFor={`choix-${indice}`}>
							Animal
						</label>
					</div>
					<select
						name={`choix-${indice}`}
						id={`choix-${indice}`}
						onChange={(e) => updateBraqueurValues(indice * 4 + 3, e.target.value)}
					>
						{sousObjectif?.choices.map((choice, index) => (
							<option key={indice * 4 + index} value={choice}>
								{choice}
							</option>
						))}
					</select>
				</div>
			</div>
		)
	}

	const [selectedChoice, setSelectedChoice] = useState('none')

	const handleChange = (event) => {
		setSelectedChoice(event.target.value)
	}

	const renderModal = () => {
		closeCompte()
		//TODO gestion des forulaires de réponses spécifiques
		if (sousObjectif) {
			return (
				<div className='modal-objectif__background'>
					<div className='modal-objectif__box'>
						<button type='button' className='modal-objectif__icon--container'>
							<img className='modal-objectif__icon' src={Cross} onClick={closeModal} alt='' />
						</button>
						<h2 className='modal-objectif__title'>
							Objectif : <br /> {data.title}
						</h2>
						{renderSousObjectif()}
					</div>
				</div>
			)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<button type='button' className='modal-objectif__icon--container'>
						<img className='modal-objectif__icon' src={Cross} onClick={closeModal} alt='' />
					</button>
					<h2 className='modal-objectif__title'>
						Objectif : <br /> {data.title}
					</h2>
					<div className='modal-objectif__errorMessage'>{errorMessage}</div>
					{data?.detail && <div>{renderText(data?.detail)}</div>}
					{renderListeSousObjectif()}
					{data?.answer && (
						<form className='modal-objectif__form' onSubmit={handleSubmit}>
							<Input
								type='texte'
								label={data.label}
								name='objectif'
								placeholder='Ce champ est vide'
								value={value}
								setValue={setValue}
							/>
							{data.id === 3 && (
								<select id='mobileChoice' value={selectedChoice} onChange={handleChange}>
									{data?.choices.map((choice, index) => (
										<option key={index} value={choice}>
											{choice}
										</option>
									))}
								</select>
							)}
							<button type='submit' className='modal-objectif__button button--red'>
								Valider
							</button>
						</form>
					)}
				</div>
			</div>
		)
	}

	const renderPharmacie = () => {
		const text = [
			"Je ne pense pas que les voleurs soient là... Mais ils ont l'air de s'être arrêtés dans cette pharmacie. Allons interroger le gérant."
		]
		const handleClick = () => {
			dispatch({
				type: 'setEvent',
				id: 'box1audio2'
			})
			setPharmacie(false)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{renderText(text)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={handleClick}>
						Interroger le pharmacien
					</button>
				</div>
			</div>
		)
	}

	const renderModalAnswer = () => {
		closeCompte()
		if (sousObjectif) {
			return (
				<div className='modal-objectif__background'>
					<div className='modal-objectif__box'>
						<h2 className='modal-objectif__title'>
							Objectif : <br /> {data.title}
						</h2>
						<h3 className='modal-objectif__title'>
							Sous-Objectif : <br /> {sousObjectif.title}
						</h3>
						{sousObjectif.answersrc && (
							<audio autoPlay>
								<source src={urlApi.cdn() + sousObjectif.answersrc} type='audio/mpeg' />
								Votre navigateur ne prend pas en charge ce format
							</audio>
						)}
						<div>{renderText(sousObjectif.answertext)}</div>
						<button type='button' className='modal-objectif__button button--red' onClick={handleModalAnswer}>
							Continuer l&apos;enquête
						</button>
					</div>
				</div>
			)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<h2 className='modal-objectif__title'>
						Objectif : <br /> {data.title}
					</h2>
					{data.answersrc && (
						<audio autoPlay>
							<source src={urlApi.cdn() + data.answersrc} type='audio/mpeg' />
							Votre navigateur ne prend pas en charge ce format
						</audio>
					)}
					<div>{renderText(data?.answertext)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={handleModalAnswer}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const openDoneObjectifModal = (objectif) => {
		closeCompte()
		if (objectif?.isSousObjectif) {
			setSousObjectif(objectif)
		}
		setDoneObjectifModal(true)
	}

	const closeDoneObjectifModal = () => {
		setDoneObjectifModal(false)
		setSousObjectif(null)
	}

	const renderDoneObjectifModal = () => {
		closeCompte()
		if (sousObjectif) {
			if (sousObjectif?.id === 12) {
				const event121 = events.find((event) => event.id === 121)
				const firstPartIsDone = event121?.status === 'done'
				if (firstPartIsDone) {
					// second part
					return (
						<div className='modal-objectif__background'>
							<div className='modal-objectif__box'>
								<h2 className='modal-objectif__title'>
									Objectif : <br /> {data.title}
								</h2>
								<h3 className='modal-objectif__title'>
									Sous-Objectif : <br /> {sousObjectif.title}
								</h3>
								<div>{renderText(sousObjectif?.answertext2)}</div>
								<button type='button' className='modal-objectif__button button--red' onClick={closeDoneObjectifModal}>
									Valider
								</button>
							</div>
						</div>
					)
				}
			}
			return (
				<div className='modal-objectif__background'>
					<div className='modal-objectif__box'>
						<h2 className='modal-objectif__title'>
							Objectif : <br /> {data.title}
						</h2>
						<h3 className='modal-objectif__title'>
							Sous-Objectif : <br /> {sousObjectif.title}
						</h3>
						<div>{renderText(sousObjectif?.donetext || sousObjectif?.answertext)}</div>
						<button type='button' className='modal-objectif__button button--red' onClick={closeDoneObjectifModal}>
							Valider
						</button>
					</div>
				</div>
			)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<h2 className='modal-objectif__title'>
						Objectif : <br /> {data.title}
					</h2>
					<div>{renderText(data?.donetext || data?.answertext)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={closeDoneObjectifModal}>
						Valider
					</button>
				</div>
			</div>
		)
	}

	// -- RENDER DES BOUTONS OBJECTIFS -- //

	const renderObjectif = (objectif) => {
		if (objectif.status === 'done') {
			return (
				<>
					<button type='button' className='objectif objectif--done' onClick={() => openDoneObjectifModal(objectif)}>
						<div className='objectif__mainInfo'>
							<div className='objectif__icon-wrapper'>
								<img src={Check} className='objectif__icon' alt='objectif terminé' />
							</div>
							<h3 className='objectif__title'>{objectif.title}</h3>
						</div>
						{!data?.isSousObjectif && (
							<div className='objectif__subInfo'>
								<p className='objectif__subtitle'>{objectif.subtitle}</p>
							</div>
						)}
					</button>
				</>
			)
		}
		if (objectif.status === 'open') {
			return (
				<>
					<button type='button' className='objectif objectif--open' onClick={() => openModal(objectif)}>
						<div className='objectif__mainInfo'>
							<div className='objectif__icon-wrapper'>
								<img src={LockOpen} className='objectif__icon' alt='objectif ouvert' />
							</div>
							<h3 className='objectif__title'>{objectif.title}</h3>
						</div>
						{!objectif?.isSousObjectif && (
							<div className='objectif__subInfo'>
								<p className='objectif__subtitle'>{objectif.subtitle}</p>
							</div>
						)}
					</button>
				</>
			)
		}
		if (objectif.status === 'closed') {
			return (
				<>
					<button type='button' className='objectif objectif--closed'>
						<div className='objectif__icon-wrapper--closed'>
							<img src={LockClosed} className='objectif__icon' alt='objectif bloqué' />
						</div>
						<h3 className='objectif__title--closed'>Cet objectif est bloqué pour le moment</h3>
					</button>
				</>
			)
		}
	}

	return (
		<>
			{renderObjectif(data)}
			{modal && renderModal()}
			{modalAnswer && renderModalAnswer()}
			{doneObjectifModal && renderDoneObjectifModal()}
			{popupDebutHacking && renderPopupDebutHacking()}
			{popupFinHacking && renderPopupFinHacking()}
			{tipsLauren && renderTipsLauren()}
			{interrogatoireTim && <InterrogatoireInterractif onClose={onCloseInterrogatoireTim} />}
			{apresInterrogatoireTim && renderApresInterrogatoireTim()}
			{popupImagesCamera && renderPopupImagesCamera()}
			{pharmacie && renderPharmacie()}
			{manqueSousObj31 && renderManqueSousObj31()}
			{manqueSousObj32 && renderManqueSousObj32()}
			{interrogatoireSimon && renderInterrogatoireSimon()}
			{denoncerTim && renderDenoncerTim()}
			{denoncerTimBis && renderDenoncerTimBis()}
			{denoncerTimOui && renderDenoncerTimOui()}
			{denoncerTimNon && renderDenoncerTimNon()}
			{reponseEmail && renderReponseEmail()}
		</>
	)
}

Objectif.propTypes = {
	data: PropTypes.object
}

export default Objectif
