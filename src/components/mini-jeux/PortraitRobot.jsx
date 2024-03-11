/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import PropTypes from 'prop-types'

const PortraitRobot = ({ onValid }) => {
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
	const [tries, setTries] = useState(0)

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
			onValid(tries)
		}
	}

	return (
		<>
			<div className='modal-objectif__errorMessage'>{errorMessage}</div>
			<form className='modal-objectif__form modal-objectif__portrait-robot' onSubmit={handleSubmit}>
				{data.map((champs, index) => (
					<div className='modal-objectif__select-container' key={index}>
						<label>{champs.label}</label>
						<select onChange={(e) => handleSelectChange(champs.label, e.target.value)}>
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
		</>
	)
}

PortraitRobot.propTypes = {
	onValid: PropTypes.func
}

export default PortraitRobot
