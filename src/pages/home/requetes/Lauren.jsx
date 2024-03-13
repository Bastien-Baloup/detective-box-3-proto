/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Lauren
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from '../../../components/Input.jsx'
import Audio from '../../../components/Audio.jsx'
import Document from '../../../components/Document.jsx'
import Cross from '../../../assets/icons/Icon_Cross-white.svg'
import PropTypes from 'prop-types'
import { urlApi } from '../../../utils/const/urlApi.js'
import { BoxContext, DataContext, AmbianceContext, CompteContext } from '../../../utils/context/fetchContext.jsx'
import { useContext, useState, useEffect, useMemo } from 'react'
// import { dataLauren } from "../utils/const/dataLauren";
import useApi from '../../../utils/hooks/useApi.js'
import useEvent from '../../../utils/hooks/useEvent.js'

const Lauren = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext)
	const { pauseNappe } = useContext(AmbianceContext)
	const token = localStorage.getItem('token')
	const { actionToggleDataLauren, toggleDataLauren, actionToggleDataHistory, toggleDataObjectif, toggleDataHistory } =
		useContext(DataContext)
	const { updateCharactersById, updateHistory, getCharactersById, getObjectivesByBox, getHistoryByBox } = useApi()
	const { dispatch } = useEvent()
	const { closeCompte } = useContext(CompteContext)

	//EXPLICATION : Lauren est le personnage "2"

	useEffect(() => {
		const fetchData = async () => {
			const result = await getCharactersById(token, 2)
			setDataLauren(result)
		}
		fetchData()
	}, [toggleDataLauren])

	const [dataObjectif, setDataObjectif] = useState()

	useEffect(() => {
		const fetchData = async () => {
			const objectifs = await getObjectivesByBox(token, currentBox)
			setDataObjectif(objectifs.data)
		}
		fetchData()
	}, [toggleDataObjectif])

	const obj3 = useMemo(() => dataObjectif?.find((document) => document.id === 3)?.status, [dataObjectif])

	let maxDoneObjectif = 0
	if (dataObjectif) {
		for (const objectif of dataObjectif) {
			if (objectif?.status === 'done' && objectif.id > maxDoneObjectif) {
				maxDoneObjectif = objectif.id
			}
		}
	}

	const currentObjectif = Math.min(maxDoneObjectif + 1, 3)

	const [dataHistory, setDataHistory] = useState()

	useEffect(() => {
		const fetchData = async () => {
			const documents = await getHistoryByBox(token, currentBox)
			setDataHistory(documents.data)
		}
		fetchData()
	}, [toggleDataHistory])

	const box1audio1 = useMemo(() => dataHistory?.find((document) => document?.id === 'box1audio1'), [dataHistory])

	const box1audio9 = useMemo(() => dataHistory?.find((document) => document.id === 'box1audio9')?.status, [dataHistory])
	const box1audio10 = useMemo(
		() => dataHistory?.find((document) => document.id === 'box1audio10')?.status,
		[dataHistory]
	)
	const box1document7 = useMemo(() => dataHistory?.find((document) => document.id === 'box1document7'), [dataHistory])

	const [dataLauren, setDataLauren] = useState(null)

	const [value, setValue] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [modal, setModal] = useState(false)
	const [modalMedia, setModalMedia] = useState(false)
	const [answer, setAnswer] = useState('')
	const [pharmacie, setPharmacie] = useState(false)
	const [autopsie, setAutopsie] = useState(false)
	const [documentAutopsie, setDocumentAutopsie] = useState(false)

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
	// EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (générique, box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
	// EXPLICATION : Celine et Lauren sont les seules à avoir des boxs génériques
	const handleSubmit = (e) => {
		e.preventDefault()
		const thisBox = dataLauren.find((element) => element.box_id === currentBox).data
		//const generic = dataLauren.find(element => element.box_id == 4).data
		console.log(slugify(value))
		const answerInThisBox = thisBox.find(
			(element) =>
				element.ask.includes(slugify(value)) && (!element?.objectifs || element.objectifs.includes(currentObjectif))
		)
		const previouslyAnsweredInThisBox = answerInThisBox?.status
		//const answerInFailedInterview = generic.find(element => element.ask.includes(slugify(value)))
		if (value === '') {
			setErrorMessage("Il me faut l'identité de la personne à interroger")
			setValue('')
			return
		}
		if (previouslyAnsweredInThisBox) {
			setValue('')
			setErrorMessage(
				"Vous m'avez dejà demandé d'interroger cette personne. Rendez-vous dans l'Historique pour réécouter l'interview."
			)
			return
		}
		if (answerInThisBox) {
			setAnswer(answerInThisBox)
			setValue('')
			setErrorMessage('')

			if (answerInThisBox.id === 'box1audio2') {
				setPharmacie(true)
				return
			}
			if (obj3 === 'closed') {
				if (['box1audio9', 'box1audio10', 'box1audio11'].includes(answerInThisBox.id)) {
					setAnswer({
						text: ['Ils n’ont rien eu de plus à me dire que ce qu’ils ont déjà déclaré à la police']
					})
				}
			}

			setModal(true)
			return
		}
		// if (answerInFailedInterview) {
		//   setAnswer(answerInFailedInterview)
		//   setModal(true)
		//   setValue('')
		//   setErrorMessage('')
		//   return
		// }
		setValue('')
		setErrorMessage("Je n'ai pas pu joindre la personne dont vous me parlez.")
	}

	const renderPharmacie = () => {
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
					<div>{renderText(answer?.text)}</div>
					<button type='button' className='modal-objectif__button button--red' onClick={handleClick}>
						Interroger le pharmacien
					</button>
				</div>
			</div>
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
					<div>{renderText(answer?.text)}</div>
					{answer.id ? (
						<button type='button' className='modal-objectif__button button--red' onClick={openMedia}>
							Voir l&apos;élément
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

	const renderText = (text_) => {
		const text = text_?.map((el, i) => {
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

	const openMedia = () => {
		pauseNappe()
		validateModal()
		setModalMedia(true)
	}

	const renderModalMedia = () => {
		closeCompte()
		return (
			<Audio
				title={answer.title}
				srcImg1={urlApi.cdn() + answer.img1}
				srcImg2={urlApi.cdn() + answer.img2}
				srcTranscription={urlApi.cdn() + answer.srcTranscript}
				srcAudio={urlApi.cdn() + answer.srcAudio}
				handleModalAudio={() => closeModalMedia(answer.id, answer.ask)}
			/>
		)
	}

	const closeModalMedia = async (answerId, asnwerAsk) => {
		await updateCharactersById(token, 2, currentBox, asnwerAsk)
		await updateHistory(token, currentBox, answerId)
		actionToggleDataLauren()
		actionToggleDataHistory()
		if ((answerId === 'box1audio9' && box1audio10) || (answerId === 'box1audio10' && box1audio9)) {
			setMensonge(true)
		}
		if (answerId === 'box1audio11') {
			setAutopsie(true)
		}
		setModalMedia(false)
	}

	const catchphraseLauren = [
		'sounds/402-repliques-lauren-1.mp3',
		'sounds/402-repliques-lauren-2.mp3',
		'sounds/402-repliques-lauren-3.mp3',
		'sounds/402-repliques-lauren-4.mp3',
		'sounds/402-repliques-lauren-5.mp3',
		'sounds/402-repliques-lauren-6.mp3',
		'sounds/402-repliques-lauren-7.mp3'
	]

	const randomNumberLauren = Math.floor(Math.random() * catchphraseLauren.length)

	const closeAutopsie = async () => {
		await updateAutopsie()
		aprèsAutopsie()
	}

	const updateAutopsie = async () => {
		await updateHistory(token, 1, 'box1document7')
		actionToggleDataHistory()
		setAutopsie(false)
	}

	const renderAutopsie = () => {
		closeCompte()
		const text = [
			"J'ai enfin fini l'autopsie, je vous partage mes conclusions dans votre historique.",
			'',
			"J’ai analysé les tatouages de la victime avec Google Lens, je n'ai rien trouvé de plus que ce qui est mentionné sur le rapport de police.",
			"Le tatouage était trop emdommagé par le coup de couteau pour que je puisse l'identifier.",
			"C'est pourtant sacrément efficace comme outil, ce truc - là!"
		]
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>
						{text.map((el, i) => {
							return (
								<p className='modal-objectif__subtitle' key={i}>
									{el}
								</p>
							)
						})}
					</div>
					<div className='modal-objectif__buttons'>
						<button type='button' className='modal-objectif__button button--red' onClick={closeAutopsie}>
							Continuer l&apos;enquête
						</button>
						<button type='button' className='modal-objectif__button button--red' onClick={openDocumentAutopsie}>
							Lire l&apos;autopsie
						</button>
					</div>
				</div>
			</div>
		)
	}

	const openDocumentAutopsie = async () => {
		await updateAutopsie()
		setDocumentAutopsie(true)
	}

	const renderDocumentAutopsie = () => {
		return (
			<Document
				title={box1document7.title}
				srcElement={box1document7.src}
				handleModalDocument={aprèsAutopsie}
			/>
		)
	}

	const aprèsAutopsie = () => {
		if (box1audio1?.status !== 'done') {
			setManqueAudio1(true)
		}
		setAutopsie(false)
		setDocumentAutopsie(false)
	}

	const [manqueAudio1, setManqueAudio1] = useState(false)
	const renderManqueAudio1 = () => {
		console.log('test')
		const text = [
			'Les alibis des membres de la Horde ont l’air solides, il faut peut-être élargir les recherches.',
			'Avez-vous interrogé les proches de Cédric ?'
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

	const [mensonge, setMensonge] = useState(false)

	const clickPhilippe = () => {
		setMensonge(false)
		setPhilippe(true)
	}

	const clickSimon = () => {
		setMensonge(false)
		setSimon(true)
	}

	const renderMensonge = () => {
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>Lauren : "À votre avis, y en a-t-il un des deux qui a menti ?"</div>
					<button type='button' className='modal-objectif__button button--red' onClick={clickPhilippe}>
						Philippe
					</button>
					<button type='button' className='modal-objectif__button button--red' onClick={clickSimon}>
						Simon
					</button>
				</div>
			</div>
		)
	}

	const [philippe, setPhilippe] = useState(false)

	const renderPhilippe = () => {
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>
						Son alibi a été corroboré par les autres membres du personnel. Par contre Simon a l'air louche, voyez avec
						Tim s'il peut nous trouver des choses sur lui.
					</div>
					<button type='button' className='modal-objectif__button button--red' onClick={() => setPhilippe(false)}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const [simon, setSimon] = useState(false)

	const closeSimon = async () => {
		await updateHistory(token, 1, 'box1document8')
		actionToggleDataHistory()
		setSimon(false)
	}

	const renderSimon = () => {
		return (
			<div className='modal-objectif__background'>
				<div className='modal-objectif__box'>
					<div>
						Oui, j’ai aussi noté qu’il a menti à plusieurs reprises. Allez demander à Tim, je suis sûre qu'il peut vous
						trouver des infos sur lui.
					</div>
					<button type='button' className='modal-objectif__button button--red' onClick={closeSimon}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	return (
		<>
			{modal && renderModal()}
			{modalMedia && renderModalMedia()}
			{pharmacie && renderPharmacie()}
			{autopsie && renderAutopsie()}
			{documentAutopsie && renderDocumentAutopsie()}
			{manqueAudio1 && renderManqueAudio1()}
			{mensonge && renderMensonge()}
			{philippe && renderPhilippe()}
			{simon && renderSimon()}
			<audio autoPlay>
				<source src={urlApi.cdn() + catchphraseLauren[randomNumberLauren]} type='audio/mpeg' />
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className='agent'>
				<div className='agent__portrait--container'>
					<img className='agent__portrait' src={`${urlApi.cdn()}assets/photos-personnages/lauren.jpg`} alt='' />
				</div>
				<div className='agent__main'>
					<div className='agent__title--container'>
						<p className='agent__title'>Qui souhaitez-vous interroger ?</p>
					</div>
					<div className='agent__errorMessage'>{errorMessage}</div>
					<form className='agent__form' onSubmit={handleSubmit}>
						<Input
							type='texte'
							label='Prénom et Nom'
							name='lauren'
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

Lauren.propTypes = {
	closeAgentPage: PropTypes.func
}

export default Lauren
