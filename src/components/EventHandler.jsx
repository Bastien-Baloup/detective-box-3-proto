/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, useContext, useMemo } from 'react'
import useEvent from '../utils/hooks/useEvent'
import useApi from '../utils/hooks/useApi'
import useLieu from '../utils/hooks/useLieu.jsx'
import { urlApi } from '../utils/const/urlApi.js'
import { CompteContext, DataContext, AmbianceContext, BoxContext } from '../utils/context/fetchContext'
import Audio from './Audio'
import PortraitRobot from './mini-jeux/PortraitRobot.jsx'
import EnqueteQuartier from './mini-jeux/EnqueteQuartier.jsx'
import Document from './Document.jsx'
import Input from './Input.jsx'

const EventHandler = () => {
	const { state, dispatch } = useEvent()
	const { renderLieu, setLieu, setLieuOpen } = useLieu()
	const { getHistoryByBox, updateHistory, getEventByBox, updateEvent, getObjectivesByBox, updateHelp, getHelpByBox } =
		useApi()
	const {
		toggleDataHistory,
		actionToggleDataHistory,
		toggleDataEvent,
		actionToggleDataEvent,
		toggleDataObjectif,
		actionToggleDataHelp,
		toggleDataHelp
	} = useContext(DataContext)
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
	const [conciergeModal, setConciergeModal] = useState(false)
	const [conciergeModalBis, setConciergeModalBis] = useState(false)
	const [conciergeModalTer, setConciergeModalTer] = useState(false)
	const [conciergeModalQuad, setConciergeModalQuad] = useState(false)
	const [retourCoffreModal, setRetourCoffreModal] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [value, setValue] = useState('')
	const [dataObjectif, setDataObjectif] = useState()
	const [dataHelp, setDataHelp] = useState()
	const [toggleOpen, setToggleOpen] = useState(false)

	const toggle = () => setToggleOpen(!toggleOpen)

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
	const portraitRobotData = useMemo(() => dataHistory?.find((document) => document.id === 'portraitRobot'), [dataHistory])

	useEffect(() => {
		const fetchData = async () => {
			const events_ = await getEventByBox(token, currentBox)
			setDataEvent(events_.data)
		}
		fetchData()
	}, [toggleDataEvent])

	const event131 = useMemo(() => dataEvent?.find((event) => event.id === 131)?.status, [dataEvent])
	const event132 = useMemo(() => dataEvent?.find((event) => event.id === 132)?.status, [dataEvent])
	const event231 = useMemo(() => dataEvent?.find((event) => event.id === 231)?.status, [dataEvent])
	const event232 = useMemo(() => dataEvent?.find((event) => event.id === 232)?.status, [dataEvent])

	useEffect(() => {
		const fetchData = async () => {
			const objectifs_ = await getObjectivesByBox(token, currentBox)
			setDataObjectif(objectifs_.data)
		}
		fetchData()
	}, [toggleDataObjectif])

	const objectif2 = useMemo(() => dataObjectif?.find((objective) => objective.id === 2)?.status, [dataObjectif])

	useEffect(() => {
		const fetchData = async () => {
			const help_ = await getHelpByBox(token, currentBox)
			setDataHelp(help_.data)
		}
		fetchData()
	}, [toggleDataHelp])

	const box1help24 = useMemo(() => dataHelp?.find((help) => help.id === 'box1help24')?.status, [dataHelp])

	const reset = useCallback(() => dispatch({ type: 'resetEvent' }), [dispatch])

	useEffect(() => {
		console.log(`EventHandler - Event triggered: ${state.id}`)

		if (state.id === 'box1audio2') {
			setInterrogatoirePharmacien(true)
		}

		if (state.id === 'obj3') {
			setInterrogatoiresCasseurs(true)
		}

		if (state.id === 'portraitRobot') {

			if (portraitRobotData?.status === false) {
				updateHistory(token, 1, portraitRobotData.id)
				actionToggleDataHistory()
			}
			setPortraitRobot(true)
			toggle()
		}

		if (state.id === 'enqueteQuartier') {
			setModalEnqueteQuartier(true)
		}

		if (state.id === 'concierge') {
			setConciergeModal(true)
		}

		return () => {
			console.log('EventHandler - Event cleanup')
			reset()
		}
	}, [state.toogleEvent])

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

	const slugify = (input) => {
		const inputSlugified = input
			.replace(/\s/g, '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]/g, '')
		return inputSlugified
	}

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
		await updateHelp(token, 1, 'box1help22', 'open')
		actionToggleDataHelp()
		setInterrogatoirePharmacien(false)
		dispatch({
			type: 'setEvent',
			id: 'portraitRobot'
		})
	}

	const renderModalPortraitRobot = () => {
		const onValid = async (tries_ = 0) => {
			await updateHistory(token, 1, portraitRobotData, false)
			actionToggleDataHistory()
			setTries(tries_)
			setPortraitRobot(false)
			setPortraitRobotValid(true)
		}
		const onClose = (tries_ = 0) => {
			setTries(tries_)
			setPortraitRobot(false)
		}
		return (
			<PortraitRobot onValid={onValid} onClose={onClose} tries={tries} toggleOpen={toggleOpen} />
		)
	}

	const handlePortraitRobotValid = async () => {
		setPortraitRobotValid(false)
		setModalEnqueteQuartier(true)
		await updateEvent(token, 1, 241, 'done')
		await updateEvent(token, 1, 242, 'open')
		actionToggleDataEvent()
		await updateHelp(token, 1, 'box1help23', 'open')
		actionToggleDataHelp()
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
				title={answer?.title}
				srcImg1={urlApi.cdn() + answer.img1}
				srcImg2={urlApi.cdn() + answer.img2}
				srcTranscription={urlApi.cdn() + answer.srcTranscript}
				srcAudio={urlApi.cdn() + answer.srcAudio}
				handleModalAudio={async () => await closeModalMedia(answer.id)}
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
		await updateEvent(token, 1, 302, 'done')
		actionToggleDataEvent()
		setInterrogatoiresCasseurs(false)
	}
	const renderInterrogatoiresCasseurs = () => {
		if (allDone) {
			closeInterrogatoireCasseurs()
			return
		}
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
				</div>
			</div>
		)
	}

	const handleSubmitConcierge = async (e) => {
		e.preventDefault()

		if (slugify(value) === 'sachaleza') {
			await updateEvent(token, 1, 231, 'done')
			actionToggleDataEvent()
			setErrorMessage('')
			setValue('')
			setConciergeModal(false)
			setConciergeModalBis(true)
		} else {
			setErrorMessage('Je ne pense pas que ce soit cela.')
			setValue('')
		}
	}

	const openHelp24 = async () => {
		await updateHelp(token, 1, 'box1help24', 'open')
		actionToggleDataHelp()
	}

	const renderConciergeModal = () => {
		if (event231 === 'done') {
			setConciergeModal(false)
			setConciergeModalBis(true)
			return
		}
		if (box1help24 === 'closed') {
			openHelp24()
		}

		const text = [
			'Raphaëlle : “Bon, ça a l’air d’être une résidence un peu huppée, il y a une porte sécurisée... tiens il y a quelqu’un qui rentre, viens Lauren on en profite !”',
			'Gardien : “Hop, hop, hop, qu’est-ce vous faites ?”',
			'Raphaëlle : “Bonjour, on a besoin d’accéder à l’immeuble, c’est urgent.”',
			'Gardien : “Personne n’entre sans passer d’abord par moi. C’est une résidence sécurisée Madame et les habitants paient pour ne pas être dérangés. Vous venez voir qui ?”',
			'Raphaëlle : “Euh un groupe d’amis, ils sont 4”',
			'Gardien : “Mmmh, oui je vois. Si ce sont vos amis, vous devez pouvoir connaître le nom du monsieur qui loue l’appartement. Enfin, de la madame je veux dire. Enfin, vous m’avez compris.”',
			'Raphaëlle : “Agents, un petit coup de main ? J’ai une mémoire de poisson rouge”'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>{renderText(text)}</div>
					<div className='modal-objectif__errorMessage'>{errorMessage}</div>
					<form className='modal-objectif__form' onSubmit={handleSubmitConcierge}>
						<Input
							type='texte'
							label={''}
							name='reponse'
							placeholder='Ce champ est vide'
							value={value}
							setValue={setValue}
						/>
						<button type='submit' className='modal-objectif__button button--red'>
							Valider
						</button>
					</form>
				</div>
			</div>
		)
	}

	const handleSubmitConciergeBis = async (e) => {
		e.preventDefault()
		const validAnswers = ['22fevrier1990', '22fevrier90', '22021990', '220290']
		if (validAnswers?.includes(slugify(value))) {
			await updateEvent(token, 1, 232, 'done')
			actionToggleDataEvent()
			await updateHelp(token, 1, 'box1help26', 'open')
			actionToggleDataHelp()
			setValue('')
			setErrorMessage('')
			setConciergeModalBis(false)
			setConciergeModalTer(true)
		} else {
			setErrorMessage('Je ne pense pas que ce soit cela.')
			setValue('')
		}
	}

	const renderConciergeModalBis = () => {
		const text = [
			'Gardien : “Ouais... quel est l’objet de votre visite ? Que je les prévienne...”',
			'Raphaëlle : “Non, non ne les prévenez pas, c’est pour une surprise. Ça fait des années qu’on ne s’est pas vu, iel ne sait pas qu’on est dans le coin...”',
			'Gardien : “Ah ouais ? Si vous les connaissez si bien, c’est quoi sa date de naissance ?”',
			'Raphaëlle : “... Agents ?”'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<div className='modal-objectif__errorMessage'>{errorMessage}</div>
					<form className='modal-objectif__form' onSubmit={handleSubmitConciergeBis}>
						<Input
							type='texte'
							label={''}
							name='reponse'
							placeholder='Ce champ est vide'
							value={value}
							setValue={setValue}
						/>
						<button type='submit' className='modal-objectif__button button--red'>
							Valider
						</button>
					</form>
				</div>
			</div>
		)
	}

	const handleConciergeTer = async () => {
		setConciergeModalTer(false)
		setConciergeModalQuad(true)
	}

	const renderConciergeModalTer = () => {
		const text = [
			'Gardien : “... ok, allez-y, mais ne faites pas de bruit, sinon vous entendrez parler de moi. Appartement 13.”',
			'Raphaëlle : “Yes, parfait. Appartement 13, c’est parti !”'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<button type='button' className='modal-objectif__button button--red' onClick={handleConciergeTer}>
						Entrer dans la planque
					</button>
				</div>
			</div>
		)
	}
	const handleConciergeQuad = async () => {
		setConciergeModalQuad(false)
		openLieu('box1lieu1')
	}

	const renderConciergeModalQuad = () => {
		const text = [
			'Raphaëlle : “Ok, on y est... T’entends ça ?',
			'Lauren : Ouais, on dirait bien qu’il y a du monde là-dedans... Et ça s’agite. C’est l’heure de faire valoir ton ancienne carrière de flic !',
			'Raphaëlle : Alors on y va ! TOUS À TERRE, ONE NE BOUGE PLUS !!!',
			'*cris de surprise des casseurs* *Hannah tente de se défendre*',
			'Raphaëlle : *braque son arme sur elle* N’y pense même pas !',
			'Henri : D’accord, d’accord, on se rend ! Ne tirez pas ! ...  ',
			'Ellie : Et merde... Cédric n’est jamais là quand on en a besoin !',
			'Lauren : Cédric... Romero ?',
			'Sacha : Pas la peine de nous questionner sur lui, on sait pas où il est !',
			'Henri : Il a dû s’enfuir avec sa part du butin...',
			'*Lauren et Raphaëlle échangent un regard gêné*',
			'Hannah : Quoi ? Il s’est fait attraper, c’est ça ?!',
			'*Lauren et Raphaëlle semblent surprises de leur réaction*',
			'Lauren : Je suis désolée de vous l’apprendre mais... Il est mort. *Chocs des membres de La Horde*',
			"Henri : Non, c'est pas possible ?! *regards suspicieux des autres membres de La Horde vers Henri*",
			'Raphaëlle : C’est la vérité. On a retrouvé son corps dans le coffre-fort.',
			'Ellie : Mais... Qu’est-ce qu’il s’est passé ? Qui aurait bien pu lui faire ça ?',
			'Raphaëlle : C’est ce qu’on va découvrir. Nous vous interrogerons à tour de rôle, une fois qu’on aura fouillé tout ça.”'
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					{<div>{renderText(text)}</div>}
					<button type='button' className='modal-objectif__button button--red' onClick={handleConciergeQuad}>
						Fouiller la planque
					</button>
				</div>
			</div>
		)
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

	const openLieu = async (answerId) => {
		await updateHistory(token, currentBox, answerId)
		setLieu(answerId)
		setLieuOpen(true)
		actionToggleDataHistory()
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
			{conciergeModal && renderConciergeModal()}
			{conciergeModalBis && renderConciergeModalBis()}
			{conciergeModalTer && renderConciergeModalTer()}
			{conciergeModalQuad && renderConciergeModalQuad()}
			{retourCoffreModal && renderRetourCoffreModal()}
			{renderLieu(handleLieuClose, handleLieuChange)}
		</>
	)
}

export default EventHandler
