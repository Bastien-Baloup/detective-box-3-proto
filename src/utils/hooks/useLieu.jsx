import { useState } from 'react'
import PropTypes from 'prop-types'

// import LieuExemple from '../../components/fouilles/LieuExemple'
import Cross from '../../assets/icons/Icon_Cross-white.svg'
import LieuAppartementJour from '../../components/fouilles/AppartementJour'
import LieuAppartementNuit from '../../components/fouilles/AppartementNuit'

const Proto__AucunLieu = ({ onClose }) => {
	return (
		<div className='modal-objectif__background'>
			<div className='modal-objectif__box'>
				<button type='button' className='modal-objectif__icon--container'>
					<img className='modal-objectif__icon' src={Cross} onClick={onClose} alt='' />
				</button>
				<h2 className='modal-objectif__title'>Lieu de fouille</h2>
				<div>
					<p className='modal-objectif__subtitle'>Le lieu de fouille n&apos;est pas disponible dans cette version.</p>
				</div>
				<button type='button' className='modal-objectif__button button--red' onClick={onClose}>
					Retour
				</button>
			</div>
		</div>
	)
}

Proto__AucunLieu.propTypes = {
	onClose: PropTypes.func.isRequired
}

const useLieu = () => {
	const [lieuOpen, setLieuOpen] = useState(false)
	const [lieu, setLieu] = useState('')

	const renderLieu = (onClose = () => null, onChange = () => null) => {
		const handleClose = () => {
			onClose()
			setLieuOpen(false)
		}

		switch (lieu) {
			case 'box1lieu1':
				return lieuOpen && <LieuAppartementJour onClose={handleClose} onChange={onChange} />
			case 'box1lieu1-nuit':
				return lieuOpen && <LieuAppartementNuit onClose={handleClose} onChange={onChange} />
			default:
				return lieuOpen && <Proto__AucunLieu onClose={handleClose} />
		}
	}

	return { renderLieu, setLieu, setLieuOpen }
}

export default useLieu
