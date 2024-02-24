// EXPLICATION : Ce composant permet d'afficher le timer qui est utilisé dans le Header pour le jeu de fin + dans les questions du quizz

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const Timer = ({ initialMinute, initialSecond, timerEndedFunction }) => {
	const [minutes, setMinutes] = useState(initialMinute)
	const [seconds, setSeconds] = useState(initialSecond)

	// EXPLICATION : UseEffect et interval qui gère le décompte du timer
	useEffect(() => {
		const myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1)
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval)
				} else {
					setMinutes(minutes - 1)
					setSeconds(59)
				}
			}
		}, 1000)
		return () => {
			clearInterval(myInterval)
		}
	})

	// EXPLICATION : Si le timer est terminé, alors on affiche 00:00 et on appelle une fonction
	const timerEnded = () => {
		timerEndedFunction()
		return <div className='timer timer--red'>00:00</div>
	}

	return (
		<div className='timer--container'>
			{minutes === 0 && seconds === 0 ? (
				timerEnded()
			) : (
				<div className={`timer${minutes === 0 && seconds <= 10 ? ' timer--red' : ''}`}>
					{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</div>
			)}
		</div>
	)
}

Timer.propTypes = {
	initialMinute: PropTypes.number,
	initialSecond: PropTypes.number,
	timerEndedFunction: PropTypes.func
}

export default Timer
