// EXPLICATION : Ce composant permet de rendre les cartes personnages.
// EXPLICATION : Ce composant est utilise dans la page Home

import PropTypes from 'prop-types'

const Card = ({ srcImg, srcIcon, name, contentButton, actionButton, state }) => {
	return (
		<div className='card'>
			<div className={`card__contentImg${state === 'unavailable' ? '--unavailable' : ''}`}>
				<img className='card__portrait' src={srcImg} alt='' />
			</div>
			<div className='card__contentText'>
				<div className='card__icon--container'>
					<img className='card__icon' src={srcIcon} alt='' />
				</div>
				<p className='card__name'>{name}</p>
				<button type='button' className='card__button button--red' onClick={actionButton} tabIndex='-1'>
					{contentButton}
				</button>
			</div>
		</div>
	)
}

Card.propTypes = {
	srcImg: PropTypes.string,
	srcIcon: PropTypes.string,
	name: PropTypes.string,
	contentButton: PropTypes.string,
	actionButton: PropTypes.func,
	state: PropTypes.string
}

export default Card
