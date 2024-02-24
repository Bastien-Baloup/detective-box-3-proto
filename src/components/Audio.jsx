// EXPLICATION : Ce composant retourne la modale Audio.
// EXPLICATION : Utilisation de wavesurfer pour avoir un style particulier sur l'audio.

import PropTypes from 'prop-types'
// import Play from "../assets/icons/Icon_Play.svg";
// import Pause from "../assets/icons/Icon_Pause.svg";
//import WaveSurfer from "wavesurfer.js";
import { AmbianceContext } from '../utils/context/fetchContext.jsx'
//import { useEffect, useState, useRef, useContext } from "react";
// import { useState, useRef, useContext } from "react";
import { useContext } from 'react'

const Audio = ({ title, srcImg1, srcImg2, srcTranscription, handleModalAudio, srcAudio }) => {
	//	const containerRef = useRef(undefined);
	//	const waveSurferRef = useRef(false);
	//	const [isPlaying, setIsPlaying] = useState(true);
	//	const [isLoading, setIsLoading] = useState(true);
	const { resumeNappe } = useContext(AmbianceContext)

	// EXPLICATION : Cette fonction est utilisée pour faire fonctioner la librairie waveSurfer
	/*	useEffect(() => {
		// if (!containerRef.current) return;
		const waveSurfer = WaveSurfer.create({
			container: containerRef.current,
			responsive: true,
			waveColor: "#ffff",
			progressColor: "#e30613",
			cursorColor: "transparent",
			barWidth: 1,
			barRadius: 1,
			barGap: 5,
			barMinHeight: 50,
			cursorWidth: 1,
			dragToSeek: true,
			autoplay: true,
		});
		waveSurfer.load(srcAudio);
		waveSurfer.on("ready", () => {
			waveSurferRef.current = waveSurfer;
			setIsLoading(false);
		});
		return () => {
			waveSurfer.destroy();
		};
	}, [srcAudio]);
*/
	// EXPLICATION : Cette fonction permet d'ouvrir le document de transcription de l'audio dans un nouvel onglet
	const openInNewTab = () => {
		window.open(srcTranscription, '_blank')
	}

	const handleEndAudioModal = () => {
		handleModalAudio()
		resumeNappe()
	}

	return (
		<div className='modal-audio__background'>
			<div className='modal-audio__box'>
				<p className='modal-audio__title'>{title}</p>
				<div className='modal-audio__portraits'>
					<div className='modal-audio__portrait-container'>
						<img className='modal-audio__portrait' src={srcImg1} alt='' />
					</div>
					{srcImg2 == null ? (
						''
					) : (
						<div className='modal-audio__portrait-container'>
							<img className='modal-audio__portrait' src={srcImg2} alt='' />
						</div>
					)}
				</div>
				<div className='modal-audio__player'>
					<div className='modal-audio__player__waveform-container'>
						<audio controls style={{ width: '60%' }}>
							<source src={srcAudio} type='audio/mpeg' />
						</audio>
					</div>
				</div>
				<div className='modal-audio__buttons'>
					<button type='button' className='modal-audio__button--resume button--red' onClick={handleEndAudioModal}>
						Continuer l&apos;enquête
					</button>
					<button type='button' className='modal-audio__button--display button--white' onClick={openInNewTab}>
						Transcription
					</button>
				</div>
			</div>
		</div>
	)
}

Audio.propTypes = {
	title: PropTypes.string,
	srcImg1: PropTypes.string,
	srcImg2: PropTypes.string,
	srcTranscription: PropTypes.string,
	handleModalAudio: PropTypes.func,
	srcAudio: PropTypes.string
}

export default Audio
