// EXPLICATION : Ce composant retourne la barre de progression qui se met à jour avec les objectifs.
// EXPLICATION : Ce composant est utilisé dans le Header

import RoundWhite from '../assets/icons/Icon_Round-white.png'
import RoundRed from '../assets/icons/Icon_Round-red.png'
import LineMediumWhite from '../assets/icons/Icon_Line_Medium-white.png'
import LineBigRed from '../assets/icons/Icon_Line_Big-red.png'
import LineMediumRed from '../assets/icons/Icon_Line_Medium-red.png'
import CheckWhite from '../assets/icons/Icon_Check-white.png'
import CrossRed from '../assets/icons/Icon_Cross-red.png'
import Flag from '../assets/icons/Icon_Flag.png'
import { BoxContext, DataContext } from '../utils/context/fetchContext'
import { useContext, useState, useEffect } from 'react'
import useApi from '../utils/hooks/useApi.js'

const Progression = () => {
	const { currentBox } = useContext(BoxContext)
	const token = localStorage.getItem('token')
	const { toggleDataObjectif } = useContext(DataContext)
	const { getObjectivesByBox } = useApi()

	useEffect(() => {
		const fetchData = async () => {
			const result = await getObjectivesByBox(token, currentBox)
			setDataObjectif(result.data)
		}
		fetchData()
	}, [toggleDataObjectif])

	const [dataObjectif, setDataObjectif] = useState(null)
	const currentStep = dataObjectif?.filter((element) => element.status === 'done').length

	const trackBox = (box) => {
		const boxPlayed = box < currentBox
		// EXPLICATION : Si la box a été jouée (box < currentbox), alors on retourne ces icones
		// EXPLICATION : Si la box est en cours, alors on affiche les icones en fonction des étapes de validation des objectifs
		if (boxPlayed) {
			return (
				<>
					<div className='progressBar__box__icon--small--container'>
						<img className='progressBar__box__icon--small' src={RoundWhite} alt='' />
					</div>
					<div className='progressBar__box__icon--small--container'>
						<img className='progressBar__box__icon--small' src={LineMediumWhite} alt='' />
					</div>
					<div className='progressBar__box__icon--small--container'>
						<img className='progressBar__box__icon--small' src={RoundWhite} alt='' />
					</div>
					<div className='progressBar__box__icon--small--container'>
						<img className='progressBar__box__icon--small' src={LineMediumWhite} alt='' />
					</div>
					<div className='progressBar__box__icon--small--container'>
						<img className='progressBar__box__icon--small' src={RoundWhite} alt='' />
					</div>
					<div className='progressBar__box__icon--small--container'>
						<img className='progressBar__box__icon--small' src={LineMediumWhite} alt='' />
					</div>
					<div className='progressBar__box__icon--small--container'>
						<img className='progressBar__box__icon--small' src={RoundWhite} alt='' />
					</div>
				</>
			)
		}
		return (
			<>
				<div className='progressBar__box__icon--small--container'>
					<img className='progressBar__box__icon--small' src={currentStep < 1 ? RoundRed : RoundWhite} alt='' />
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img
						className='progressBar__box__icon--small'
						src={currentStep < 2 ? LineMediumRed : LineMediumWhite}
						alt=''
					/>
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img className='progressBar__box__icon--small' src={currentStep < 2 ? RoundRed : RoundWhite} alt='' />
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img
						className='progressBar__box__icon--small'
						src={currentStep < 3 ? LineMediumRed : LineMediumWhite}
						alt=''
					/>
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img className='progressBar__box__icon--small' src={currentStep < 3 ? RoundRed : RoundWhite} alt='' />
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img
						className='progressBar__box__icon--small'
						src={currentStep < 4 ? LineMediumRed : LineMediumWhite}
						alt=''
					/>
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img className='progressBar__box__icon--small' src={currentStep < 4 ? RoundRed : RoundWhite} alt='' />
				</div>
			</>
		)
	}

	// EXPLICATION : Si la box n'est pas encore jouée, afficher ces icones
	const noTrackBox = () => {
		return (
			<>
				<div className='progressBar__box__icon--small--container'>
					<img className='progressBar__box__icon--small' src={RoundRed} alt='' />
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img className='progressBar__box__icon--small' src={LineBigRed} alt='' />
				</div>
				<div className='progressBar__box__icon--small--container'>
					<img className='progressBar__box__icon--small' src={RoundRed} alt='' />
				</div>
			</>
		)
	}

	return (
		<>
			<div className='progressBar'>
				<div className='progressBar__box'>
					<div className='progressBar__box__icon--main--container'>
						<img className='progressBar__box__icon--main' src={CheckWhite} alt='' />
					</div>
					<div className='progressBar__box__steps'>
						<div className='progressBar__box__title--played'>Box 1</div>
						<div className='progressBar__box__icons'>{trackBox(1)}</div>
					</div>
				</div>
				<div className='progressBar__box'>
					<div className='progressBar__box__icon--main--container'>
						<img className='progressBar__box__icon--main' src={currentBox !== 1 ? CheckWhite : CrossRed} alt='' />
					</div>
					<div className='progressBar__box__steps'>
						<div className={`progressBar__box__title${currentBox !== 1 ? '--played' : ''}`}>Box 2</div>
						<div className='progressBar__box__icons'>{currentBox !== 1 ? trackBox(2) : noTrackBox()}</div>
					</div>
				</div>
				<div className='progressBar__box'>
					<div className='progressBar__box__icon--main--container'>
						<img className='progressBar__box__icon--main' src={currentBox === 3 ? CheckWhite : CrossRed} alt='' />
					</div>
					<div className='progressBar__box__steps'>
						<div className={`progressBar__box__title${currentBox === 3 ? '--played' : ''}`}>Box 3</div>
						<div className='progressBar__box__icons'>{currentBox === 3 ? trackBox(3) : noTrackBox()}</div>
					</div>
				</div>
				<div className='progressBar__box'>
					<div className='progressBar__box__icon--main--container'>
						<img className='progressBar__box__icon--main' src={Flag} alt='' />
					</div>
				</div>
			</div>
		</>
	)
}

export default Progression
