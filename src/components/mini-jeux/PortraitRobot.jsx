/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Cross from '../../assets/icons/Icon_Cross-white.svg'

const PortraitRobot = ({ onValid, onClose, tries_ = 0, toggleOpen = false }) => {
	const initialSelectedValues = {
		'Couleur de la peau': 'Pâle',
		'Forme du visage': 'Rond',
		'Couleur des cheveux': 'Bruns',
		'Longueur des cheveux': 'Chauve',
		'Couleur des yeux': 'Indéterminée',
		'Forme des yeux': 'Tombants',
		'Forme des sourcils': 'Tombants',
		'Forme du nez': 'Droit',
		'Forme de la bouche': 'Très fine'
	}

	const validAnswer = {
		'Couleur de la peau': 'Pâle',
		'Forme du visage': 'Carré',
		'Couleur des cheveux': 'Roux',
		'Longueur des cheveux': 'Mi-longs',
		'Couleur des yeux': 'Verts',
		'Forme des yeux': 'En amandes',
		'Forme des sourcils': 'Arrondis',
		'Forme du nez': 'Retroussé',
		'Forme de la bouche': 'Pulpeuse'
	}

	const [selectedValues, setSelectedValues] = useState(initialSelectedValues)
	const [errorMessage, setErrorMessage] = useState('')
	const [tries, setTries] = useState(tries_)

	const close = () => {
		localStorage.setItem('PortraitRobot', JSON.stringify(selectedValues))
		onClose(tries)
	}

	const valid = () => {
		localStorage.setItem('PortraitRobot', '')
		onValid(tries)
	}

	useEffect(() => {
		const storedValue = localStorage.getItem('PortraitRobot')
		if (storedValue) {
			setSelectedValues(JSON.parse(storedValue))
		}
	}, [toggleOpen])

	// Labels and values for each select
	const data = [
		{
			label: 'Couleur de la peau',
			values: ['Pâle', 'Claire', 'Mâte', 'Foncée', 'Très foncée']
		},
		{ label: 'Forme du visage', values: ['Rond', 'Carré', 'Coeur', 'Triangle', 'Ovale'] },
		{
			label: 'Couleur des cheveux',
			values: ['Bruns', 'Blonds', 'Châtains', 'Gris', 'Roux']
		},
		{
			label: 'Longueur des cheveux',
			values: ['Chauve', 'Courts', 'Mi-longs', 'Longs']
		},
		{
			label: 'Couleur des yeux',
			values: ['Indéterminée', 'Bleus', 'Verts', 'Marrons', 'Gris']
		},
		{
			label: 'Forme des yeux',
			values: ['Tombants', 'En amandes', 'Ronds', 'Mono-paupière']
		},
		{
			label: 'Forme des sourcils',
			values: ['Tombants', 'Droits', 'Arrondis', 'Arqués', 'Monosourcils']
		},
		{ label: 'Forme du nez', values: ['Droit', 'Epaté', 'Tombant', 'Aquilin', 'Retroussé'] },
		{
			label: 'Forme de la bouche',
			values: ['Très fine', 'Fine', 'Moyenne', 'Pulpeuse']
		}
	]

	// Event handler for select changes
	const handleSelectChange = (label, value) => {
		const temp = { ...selectedValues }
		temp[label] = value
		setSelectedValues(temp)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let errorCount = 0
		for (const partie of data) {
			if (selectedValues[partie.label] !== validAnswer[partie.label]) {
				errorCount += 1
			}
		}
		if (errorCount > 2) {
			setTries(tries + 1)
			setErrorMessage('Je suis désolé mais ça ne lui ressemble pas vraiment…')
		} else {
			setErrorMessage('')
			valid(tries)
		}
	}

	return (
		<div className='modal-objectif__background'>
			<div className='modal-objectif__box'>
				<button type='button' className='modal-objectif__icon--container'>
					<img className='modal-objectif__icon' src={Cross} onClick={close} alt='' />
				</button>
				<h2 className='modal-objectif__title'>Portrait Robot</h2>
				<div>
					On a une description assez précise. C&apos;est l&apos;heure de reprendre les bonnes vieilles méthodes : le
					portrait-robot.
				</div>

				<div className='modal-objectif__errorMessage'>{errorMessage}</div>
				<form className='modal-objectif__form modal-objectif__portrait-robot' onSubmit={handleSubmit}>
					{data.map((champs, index) => (
						<div className='modal-objectif__select-container' key={index}>
							<label>{champs.label}</label>
							<select onChange={(e) => handleSelectChange(champs.label, e.target.value)} value={selectedValues[champs.label]}>
								{champs.values.map((option, optionIndex) => (
									<option key={optionIndex} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					))}
					<button type='submit' className='modal-objectif__button button--red'>
						Valider
					</button>
				</form>
			</div>
		</div>
	)
}

PortraitRobot.propTypes = {
	onValid: PropTypes.func
}

export default PortraitRobot
