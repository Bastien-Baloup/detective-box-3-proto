// EXPLICATION : Ce composant retourne la navigation de l'application
// EXPLICATION : Page Home / Historique / Renfort
// EXPLICATION : Ce composant est affiché dans le Header

import Home from '../assets/icons/Icon_Home.svg'
import Help from '../assets/icons/Icon_Help.svg'
import Clue from '../assets/icons/Icon_Clue.svg'
import { NavLink } from 'react-router-dom'

const Nav = () => {
	return (
		<nav className='nav'>
			<NavLink className={'nav__container'} to='/'>
				<div className='nav__icon__container'>
					<img src={Home} className='nav__icon' alt='accueil' />
				</div>
				<div className='nav__title'>Requêtes</div>
			</NavLink>
			<NavLink className={'nav__container'} to='/history'>
				<div className='nav__icon__container'>
					<img src={Clue} className='nav__icon' alt='historique' />
				</div>
				<div className='nav__title'>Historique</div>
			</NavLink>
			<NavLink className={'nav__container'} to='/help'>
				<div className='nav__icon__container'>
					<img src={Help} className='nav__icon' alt='aide' />
				</div>
				<div className='nav__title'>Demander du renfort</div>
			</NavLink>
		</nav>
	)
}

export default Nav
