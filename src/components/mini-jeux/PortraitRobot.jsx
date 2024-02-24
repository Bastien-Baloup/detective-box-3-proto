/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import PropTypes from 'prop-types'

const PortraitRobot = ({ onValid }) => {
	const initialSelectedValues = {
		'La tête': 'Indéterminée',
		'La mâchoire': 'Indéterminée',
		'Longueur des cheveux': 'Chauve',
		'Couleur des cheveux': 'Bruns',
		'Les sourcils': 'Inexistants',
		'Forme des yeux': 'Indéterminée',
		'Couleur des yeux': 'Indéterminée',
		'Le nez': 'Asymétrique',
		'La bouche': 'Très fine',
		'Le menton': 'Lisse'
	}

	const validAnswer = {
		'La tête': 'Fine',
		'La mâchoire': 'Carrée',
		'Longueur des cheveux': 'Mi-longs',
		'Couleur des cheveux': 'Roux',
		'Les sourcils': 'Taillés',
		'Forme des yeux': 'En amandes',
		'Couleur des yeux': 'Verts',
		'Le nez': 'Long',
		'La bouche': 'Pulpeuse',
		'Le menton': 'Lisse'
	}

	const [selectedValues, setSelectedValues] = useState(initialSelectedValues)
	const [errorMessage, setErrorMessage] = useState('')

	// Labels and values for each select
	const data = [
		{ label: 'La tête', values: ['Indéterminée', 'Fine', 'Arrondie', 'Ovale'] },
		{
			label: 'La mâchoire',
			values: ['Indéterminée', 'Arrondie', 'Carrée', 'Décalée']
		},
		{
			label: 'Longueur des cheveux',
			values: ['Chauve', 'Courts', 'Mi-longs', 'Longs']
		},
		{
			label: 'Couleur des cheveux',
			values: ['Bruns', 'Blonds', 'Châtains', 'Roux']
		},
		{
			label: 'Les sourcils',
			values: ['Inexistants', 'Taillés', 'Broussailleux', 'Monosourcil']
		},
		{
			label: 'Forme des yeux',
			values: ['Indéterminée', 'En amandes', 'Ronds', 'Mono-paupière']
		},
		{
			label: 'Couleur des yeux',
			values: ['Indéterminée', 'Bleus', 'Verts', 'Marrons']
		},
		{ label: 'Le nez', values: ['Asymétrique', 'Cassé', 'Court', 'Long'] },
		{
			label: 'La bouche',
			values: ['Très fine', 'Fine', 'Moyenne', 'Pulpeuse']
		},
		{ label: 'Le menton', values: ['Lisse', 'Fausseté', 'Fuyant', 'En avant'] }
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
			setErrorMessage('Ça ne lui ressemble pas, il doit y avoir des erreurs quelque part.')
		} else {
			setErrorMessage('')
			onValid()
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
				<button type='submit' className='modal-objectif__button button--red'>Valider</button>
			</form>
		</>
	)
}

PortraitRobot.propTypes = {
	onValid: PropTypes.func
}

export default PortraitRobot
