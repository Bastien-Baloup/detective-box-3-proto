/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour afficher les cartes de choix des boxs + le bouton reset pour recommencer le jeu depuis 0
// EXPLICATION : Attention, dans la BDD, une box "Generic" a été créé (utilise pour les requêtes personnages qui sont multi-boxs). Ne pas l'afficher ici !

// Récupérer dans la BDD quelle box a son état OUVERTE = TRUE (OUVERTE / FERMEE / RESOLUE)
// Changer le Context avec la box sélectionnée
import Logo from '../assets/img/DB-Logo-DetectiveBox_AgenceDetectiveBlanc.png'
import Boxchoice from '../components/Boxchoice.jsx'
import Loader from '../components/Loader.jsx'
import { AuthContext } from '../utils/context/fetchContext.jsx'
import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { urlApi } from '../utils/const/urlApi.js'
import { useEffect } from 'react'
import useApi from '../utils/hooks/useApi.js'

function Choice() {
	const { loggedIn } = useContext(AuthContext)
	const [modalReset1, setModalReset1] = useState(false)
	const [modalReset2, setModalReset2] = useState(false)
	const [modalDeleted, setModalDeleted] = useState(false)
	const [loader, setLoader] = useState(true)
	const [dataBox, setDataBox] = useState(null)
	const token = localStorage.getItem('token')
	const { getBox, resetAll } = useApi()

	useEffect(() => {
		const fetchData = async () => {
			const result = await getBox(token)
			setDataBox(result)
		}
		fetchData()
	}, [token])

	// EXPLICATION : Display Loader for 4 secondes
	setTimeout(() => {
		setLoader(false)
	}, 4000)

	// EXPLICATION : Si le joueur n'est pas connecté, retour à la page sign in
	if (!loggedIn) {
		return <Navigate to='/sign-in' />
	}

	const displayBoxChoice = () => {
		return (
			<div className='boxchoice__wrapper'>
				{dataBox?.map((box, index) => (
					<Boxchoice data={box} key={`boxChoiceKey-${index}`} />
				))}
			</div>
		)
	}

	const nextStepReset = () => {
		setModalReset2(true)
		setModalReset1(false)
	}

	// EXPLICATION : Modale de vérification pour reste tout l'avancement
	const displayModalReset1 = () => {
		return (
			<div className='modal-boxdone__background'>
				<div className='modal-boxdone__box'>
					<p className='modal-boxdone__text'>
						Voulez-vous recommencer l&apos;aventure depuis le début ? <br />
						Attention, cette action est irreversible et supprimera votre avancement actuel dans l&apos;enquête !
					</p>
					<button type='button' className='modal-boxdone__button button--white' onClick={nextStepReset}>
						Oui, supprimez mon avancement
					</button>
					<button type='button' className='modal-boxdone__button button--red' onClick={() => setModalReset1(false)}>
						Non, retour à l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	// EXPLICATION : Modale de double vérification pour reste tout l'avancement
	const displayModalReset2 = () => {
		return (
			<div className='modal-boxdone__background'>
				<div className='modal-boxdone__box'>
					<p className='modal-boxdone__text'>
						Merci de confirmer la remise à zéro de votre avancement dans l&apos;enquête. <br />
						Vous comprenez que cette action est irreversible et que nous ne serons pas en mesure de retrouver votre
						sauvegarde.
					</p>
					<button type='button' className='modal-boxdone__button button--white' onClick={resetGame}>
						Oui, supprimez !
					</button>
					<button type='button' className='modal-boxdone__button button--red' onClick={() => setModalReset2(false)}>
						Non, retour à l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	// EXPLICATION : Modale de confirmation de la suppression de la sauvegarde
	const displayModalDeleted = () => {
		return (
			<div className='modal-boxdone__background'>
				<div className='modal-boxdone__box'>
					<p className='modal-boxdone__text'>Vous avez supprimé votre partie.</p>
					<button type='button' className='modal-boxdone__button button--red' onClick={handleModalDeleted}>
						Recommencer l&apos;enquête
					</button>
				</div>
			</div>
		)
	}

	const handleModalDeleted = () => {
		setModalDeleted(false)
		location.reload()
	}

	// EXPLICATION : Fonction pour remettre les boxs à zéro
	const resetGame = async () => {
		setTimeout(() => {
			setLoader(false)
		}, 4000)
		await resetAll(token)
		setModalReset2(false)
		setModalDeleted(true)
	}

	return (
		<main className='choice'>
			<audio autoPlay>
				<source src={`${urlApi.cdn()}sounds/musiques-db-s2-theme-tueur.wav`} type='audio/wav' />
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<img className='choice__logo' src={Logo} alt='' />
			<h1 className='choice__title'>Bienvenue Agents</h1>
			<p className='choice__subtitle'>Veuillez sélectionner votre niveau d&apos;avancement</p>
			{displayBoxChoice()}
			<button type='button' className='choice__reset button--red' onClick={() => setModalReset1(true)}>
				Recommencer l&apos;aventure
			</button>
			{loader ? <Loader /> : ''}
			{modalReset1 ? displayModalReset1() : ''}
			{modalReset2 ? displayModalReset2() : ''}
			{modalDeleted ? displayModalDeleted() : ''}
		</main>
	)
}
export default Choice
