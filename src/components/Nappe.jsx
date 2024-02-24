// EXPLICATION : Ce composant retourne la modale Nappe (choix d'activer la musique d'ambiance ou non) qui est affichée dans le Header

import PropTypes from 'prop-types'

const Nappe = ({ activateNappe, desactivateNappe }) => {
	return (
		<div className='modal-nappe__background'>
			<div className='modal-nappe__box'>
				<p className='modal-nappe__text'>
					Voulez-vous lancer la musique d&apos;ambiance pour rendre votre jeu plus immersif ?
				</p>
				<p className='modal-nappe__text'>
					Vous pourrez la désactiver ou l&apos;activer de nouveau depuis le menu Profil.
				</p>
				<div className='modal-nappe__buttons'>
					<button type='button' className='modal-nappe__button button--red' onClick={activateNappe}>
						Oui
					</button>
					<button type='button' className='modal-nappe__button button--white' onClick={desactivateNappe}>
						Non
					</button>
				</div>
			</div>
		</div>
	)
}

Nappe.propTypes = {
	activateNappe: PropTypes.func,
	desactivateNappe: PropTypes.func
}

export default Nappe
