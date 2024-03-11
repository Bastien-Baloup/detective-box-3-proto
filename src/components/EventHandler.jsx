/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, useContext, useMemo } from 'react'
import useEvent from '../utils/hooks/useEvent'
import useApi from '../utils/hooks/useApi'
import { urlApi } from '../utils/const/urlApi.js'
import { CompteContext, DataContext, AmbianceContext, BoxContext } from '../utils/context/fetchContext'
import Audio from './Audio'
import PortraitRobot from './mini-jeux/PortraitRobot.jsx'
import EnqueteQuartier from './mini-jeux/EnqueteQuartier.jsx'
import Document from './Document.jsx'

const EventHandler = () => {
	const { state, dispatch } = useEvent()
	const { getHistoryByBox, updateHistory, getEventByBox, updateEvent } = useApi()
	const { toggleDataHistory, actionToggleDataHistory, toggleDataEvent, actionToggleDataEvent } = useContext(DataContext)
	const { pauseNappe } = useContext(AmbianceContext)
	const { closeCompte } = useContext(CompteContext)
	const { currentBox } = useContext(BoxContext)
	const [interrogatoirePharmacien, setInterrogatoirePharmacien] = useState(false)
	const [portraitRobot, setPortraitRobot] = useState(false)
	const [portraitRobotValid, setPortraitRobotValid] = useState(false)
	const [tries, setTries] = useState(0)
	const [modalEnqueteQuartier, setModalEnqueteQuartier] = useState(false)
	const [enqueteQuartier, setEnqueteQuartier] = useState(false)
	const [appelConcierge, setAppelConcierge] = useState(false)
	const [interrogatoiresCasseurs, setInterrogatoiresCasseurs] = useState(false)
	const [modalMedia, setModalMedia] = useState(false)
	const [message, setMessage] = useState()
	const [dataHistory, setDataHistory] = useState()
	const [dataEvent, setDataEvent] = useState()

	const token = localStorage.getItem('token')

	useEffect(() => {
		const fetchData = async () => {
			const documents = await getHistoryByBox(token, currentBox)
			setDataHistory(documents.data)
		}
		fetchData()
	}, [toggleDataHistory])

	const box1audio2 = useMemo(() => dataHistory?.find((document) => document.id === 'box1audio2'), [dataHistory])
	const box1audio4 = useMemo(() => dataHistory?.find((document) => document.id === 'box1audio4'), [dataHistory])
	const box1audio5 = useMemo(() => dataHistory?.find((document) => document.id === 'box1audio5'), [dataHistory])
	const box1audio6 = useMemo(() => dataHistory?.find((document) => document.id === 'box1audio6'), [dataHistory])
	const box1audio7 = useMemo(() => dataHistory?.find((document) => document.id === 'box1audio7'), [dataHistory])
	const box1audio8 = useMemo(() => dataHistory?.find((document) => document.id === 'box1audio8'), [dataHistory])

	useEffect(() => {
		const fetchData = async () => {
			const events_ = await getEventByBox(token, currentBox)
			setDataEvent(events_.data)
		}
		fetchData()
	}, [toggleDataEvent])

	const event131 = useMemo(() => dataEvent?.find((event) => event.id === 131)?.status, [dataEvent])
	const event132 = useMemo(() => dataEvent?.find((event) => event.id === 132)?.status, [dataEvent])

	const reset = useCallback(() => dispatch({ type: 'resetEvent' }), [dispatch])

	useEffect(() => {
		console.log(`Event triggered: ${state.id}`)

		if (state.id === 'box1audio2') {
			setInterrogatoirePharmacien(true)
		}

		if (state.id === 'obj3') {
			setInterrogatoiresCasseurs(true)
		}

		if (state.id === 'portraitRobo') {
			setPortraitRobot(true)
		}

		if (state.id === 'enqueteQuartier') {
			setModalEnqueteQuartier(true)
		}

		return () => {
			console.log('cleanup')
			reset()
		}
	}, [state.toogleEvent])

	const renderInterrogatoirePharmacien = () => {
		closeCompte()
		return (
			<Audio
				title={box1audio2.title}
				srcImg1={urlApi.cdn() + box1audio2.img1}
				srcImg2={urlApi.cdn() + box1audio2.img2}
				srcTranscription={urlApi.cdn() + box1audio2.srcTranscript}
				srcAudio={urlApi.cdn() + box1audio2.srcAudio}
				handleModalAudio={() => closeInterrogatoirePharmacien(box1audio2.id)}
			/>
		)
	}

	const closeInterrogatoirePharmacien = async (answerId) => {
		await updateHistory(token, currentBox, answerId)
		actionToggleDataHistory()
		await updateEvent(token, 1, 241, 'open')
		actionToggleDataEvent()
		setInterrogatoirePharmacien(false)
		setPortraitRobot(true)
	}

	const renderModalPortraitRobot = () => {
		const onValid = (tries_ = 0) => {
			setTries(tries_)
			setPortraitRobot(false)
			setPortraitRobotValid(true)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<h2 className='modal-objectif__title'>Portrait Robot</h2>
					<div>
						On a une description assez précise. C&apos;est l&apos;heure de reprendre les bonnes vieilles méthodes : le
						portrait-robot.
					</div>
					<PortraitRobot onValid={onValid} />
				</div>
			</div>
		)
	}

	const handlePortraitRobotValid = async () => {
		setPortraitRobotValid(false)
		setModalEnqueteQuartier(true)
		await updateEvent(token, 1, 241, 'done')
		await updateEvent(token, 1, 242, 'open')
		actionToggleDataEvent()
	}

	const renderModalPortraitRobotValid = () => {
		return (
			<Document
				title={
					tries === 0
						? "Oui ça lui ressemble bien, à quelques détails près c'est la femme que vous recherchez !"
						: "C'est beaucoup plus ressemblant, à quelques détails près c'est la femme que vous recherchez !"
				}
				srcElement={`${urlApi.cdn()}proto3/assets/photos-personnages/hannah-evans-lynx.png`}
				handleModalDocument={handlePortraitRobotValid}
			/>
		)
	}

	const renderModalEnqueteQuartier = () => {
		const onClick = () => {
			setModalEnqueteQuartier(false)
			setEnqueteQuartier(true)
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>
						Raphaëlle : Bon bah, on n’a plus qu’à retourner aux bases, on prend le portrait et on va le présenter aux
						habitants du quartier, c’est parti !
					</div>
					<button type='button' className='modal-objectif__button button--red' onClick={onClick}>
						Démarrer
					</button>
				</div>
			</div>
		)
	}

	const handleValidEnqueteQuartier = () => {
		setEnqueteQuartier(false)
		setAppelConcierge(true)
	}

	const renderAppelConcierge = () => {
		const onClick = async () => {
			setAppelConcierge(false)
			await updateEvent(token, 1, 242, 'done')
			actionToggleDataEvent()
		}
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>
						&quot;Bonjour, vous êtes bien à la conciergerie de la résidence du port, au 4 Quai Jean-Charles Rey. Je suis
						absent pour le moment, rappelez plus tard ou passez directement à la résidence.&quot;
					</div>
					<button type='button' className='modal-objectif__button button--red' onClick={onClick}>
						Démarrer
					</button>
				</div>
			</div>
		)
	}

	const openMedia = () => {
		pauseNappe()
		setMessage(null)
		setModalMedia(true)
	}

	const [answer, setAnswer] = useState()

	const renderModalMedia = (name) => {
		closeCompte()
		return (
			<Audio
				title={`Interrogatoire de ${name}`}
				srcImg1={urlApi.cdn() + answer.img1}
				srcImg2={urlApi.cdn() + answer.img2}
				srcTranscription={urlApi.cdn() + answer.srcTranscript}
				srcAudio={urlApi.cdn() + answer.srcAudio}
				handleModalAudio={() => closeModalMedia(answer.id)}
			/>
		)
	}

	const closeModalMedia = async (answerId) => {
		await updateHistory(token, currentBox, answerId)
		actionToggleDataHistory()
		setAnswer(null)
		setModalMedia(false)
		setInterrogatoiresCasseurs(true)
	}

	const clickHannah = () => {
		setAnswer(box1audio6)
		setMessage('Tenez agents, voici l’enregistrement !')
		setInterrogatoiresCasseurs(false)
	}

	const clickHenri = () => {
		setAnswer(box1audio8)
		setMessage('Un sacré numéro celui-là ! Ecoutez plutôt...')
		setInterrogatoiresCasseurs(false)
	}

	const clickSacha = () => {
		setAnswer(box1audio7)
		setMessage('Tenez agents, je vous laisse vous faire votre propre avis')
		setInterrogatoiresCasseurs(false)
	}

	const clickEllie = () => {
		setMessage('C’est bon, j’ai pu lui parler, je vous envoie ce que ça a donné...')
		if (event131 === 'done') {
			setAnswer(box1audio4)
		}
		if (event132 === 'done') {
			setAnswer(box1audio5)
		}
		setInterrogatoiresCasseurs(false)
	}

	const renderMessage = () => {
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{message}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={openMedia}>
						Voir l&apos;élément
					</button>
				</div>
			</div>
		)
	}

	const allDone =
		(box1audio4?.status || box1audio5?.status) && box1audio6?.status && box1audio7?.status && box1audio8?.status

	const closeInterrogatoireCasseurs = async () => {
		await updateEvent(token, 1, 31, 'done')
		actionToggleDataEvent()
		setInterrogatoiresCasseurs(false)
	}
	const renderInterrogatoiresCasseurs = () => {
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>On a retrouvé les casseurs, on va maintenant les interroger pour savoir qui a tué Cédric. </div>
					<div>Par qui voulez-vous commencer ?</div>
					{!box1audio6?.status && (
						<button type='button' className='modal-objectif__button button--red' onClick={clickHannah}>
							Hannah Evans
						</button>
					)}
					{!box1audio8?.status && (
						<button type='button' className='modal-objectif__button button--red' onClick={clickHenri}>
							Henri Leveaux
						</button>
					)}
					{!box1audio7?.status && (
						<button type='button' className='modal-objectif__button button--red' onClick={clickSacha}>
							Sacha Leza
						</button>
					)}
					{!(box1audio4?.status || box1audio5?.status) && (
						<button type='button' className='modal-objectif__button button--red' onClick={clickEllie}>
							Ellie Levyn
						</button>
					)}
					{allDone && (
						<button type='button' className='modal-objectif__button button--red' onClick={closeInterrogatoireCasseurs}>
							Continuer l&apos;enquête
						</button>
					)}
				</div>
			</div>
		)
	}

	return (
		<>
			{interrogatoirePharmacien && renderInterrogatoirePharmacien()}
			{portraitRobot && renderModalPortraitRobot()}
			{portraitRobotValid && renderModalPortraitRobotValid()}
			{modalEnqueteQuartier && renderModalEnqueteQuartier()}
			{enqueteQuartier && <EnqueteQuartier onValid={handleValidEnqueteQuartier} />}
			{appelConcierge && renderAppelConcierge()}
			{interrogatoiresCasseurs && renderInterrogatoiresCasseurs()}
			{modalMedia && renderModalMedia()}
			{message && renderMessage()}
		</>
	)
}

export default EventHandler
