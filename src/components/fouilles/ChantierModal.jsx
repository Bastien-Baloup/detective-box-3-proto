/* eslint-disable react-hooks/exhaustive-deps */
import MarzipanoInit from '../../utils/const/marzipanoInit'
import { useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import '../../assets/fouilles/chantier/style.css'
import data from '../../assets/fouilles/chantier/data'
import { DataContext } from "../../utils/context/fetchContext";
import useApi from '../../utils/hooks/useApi.js'
import useEvent from '../../utils/hooks/useEvent.js';

function ChantierModal({ onClose }) {
  const panoRef = useRef(null)
  const viewerRef = useRef(null)
  const lockInput = useRef('')

  const isSongPlaying = useRef(false)
  const isArrivalPlaying = useRef(false)
  const arrivalChantier = useRef(sessionStorage.getItem('arrival_chantier'))

  const { actionToggleDataHistory } = useContext(DataContext);
  const { updateHistory } = useApi()
	const { dispatch } = useEvent()

  const songStarter = () => {
    if (!arrivalChantier.current) {
      if (!isArrivalPlaying.current) {
        setTimeout(() => document.getElementById('arrival').play(), 3000)
        isArrivalPlaying.current = true
      }
    }
    if (!isSongPlaying.current) {
      document.getElementById('song').play()
      document.getElementById('song').volume = 0.1
      isSongPlaying.current = true
    }
  }

  const chantierInit = () => {
    const closeImgs = document.querySelectorAll('.close-img')
    closeImgs.forEach((closeImg) => {
      closeImg.onclick = () => {
        document.querySelectorAll('.img').forEach((img) => {
          img.style.display = 'none'
        })
      }
    })

    const watchElements = document.querySelectorAll('.watch')
    watchElements.forEach((watch) => {
      watch.onclick = () => {
        document.querySelectorAll('.img').forEach((img) => {
          img.style.display = 'none'
        })
        const id = watch.id
        document.getElementById('img-' + id).style.opacity = 1
        document.getElementById('img-' + id).style.visibility = 'visible'
      }
    })

    const updateSongVolume = () => {
      const location = document
        .querySelector('.current')
        .getAttribute('data-id')
      console.log(location)

      const songElement = document.getElementById('song')

      if (location === '0-101---chantier1') {
        songElement.play()
        songElement.volume = 0.1
      } else if (location === '1-101---chantier2') {
        songElement.volume = 0.3
      } else if (location === '3-101---chantier4') {
        songElement.volume = 0.2
      } else if (location === '2-101---chantier3') {
        songElement.volume = 0.8
      }
    }

    const linkHotspots = document.querySelectorAll('.link-hotspot')
    linkHotspots.forEach((linkHotspot) => {
      linkHotspot.addEventListener('click', updateSongVolume)
      console.log(linkHotspot.onclick)
    })

    const lienMalle = document.getElementById('lien-malle')
    lienMalle.onclick = (event) => {
      event.preventDefault()

      document.getElementById('song').volume = 0
      document.getElementById('arrival').pause()
      document.getElementById('fouille').style.display = 'none'
      document.getElementById('malle-container').style.display = 'block'
      document.getElementById('malle-mp3').play()
    }

    const items = document.querySelectorAll('.item')

    const lockAnimation = (targetElement) => {
      document.querySelectorAll('.interupted').forEach((element) => {
        element.pause(); // Stop playing
        element.currentTime = 0; // Reset time
      })

      targetElement.style.backgroundColor = 'darkred'
      setTimeout(() => {
        targetElement.style.backgroundColor = 'rgba(0,0,0,0.5)'
      }, 200)
    }

    const reset = (e) => {
      const targetElement = e.target
      lockAnimation(targetElement)
      lockInput.current = ''
      document.getElementById('reset-sound').play()
    }

    const transition = () => {
      document.getElementById('malle-mp3').volume = 0
      items.forEach((item) => {
        item.style.display = 'none'
      })
      document.getElementById('malle-container').style.display = 'none'
      document.getElementById('open-malle-container').style.display = 'block'
      document.getElementById('malle-opened').play()
      endHandle()
    }

    const input = (e) => {
      const targetElement = e.target
      lockAnimation(targetElement)
      document.getElementById('click').play()

      lockInput.current += targetElement.id
      if (
        lockInput.current === 'uprightdownrightdown' ||
        lockInput.current === 'upuprightrightdowndownrightrightdowndown' ||
        lockInput.current ===
          'upupupuprightrightdowndownrightrightrightdowndown'
      ) {
        document.getElementById('malle-mp3').pause()
        document.getElementById('open-malle').play()
        document.getElementById('open-malle').onended = transition
      }
    }

    items.forEach((item) => {
      console.log(item)
      if (item.id === 'reset') {
        item.onclick = reset
      } else {
        item.onclick = input
      }
    })

    const endHandle = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        alert("Erreur de communication avec l'app détectivebox : Token vide")
        return
      }
      await updateHistory(token, 1, 'box1document1')
      dispatch({
        type: 'setEvent',
        id: 'box1document1'
      })
      actionToggleDataHistory()
    }

    sessionStorage.setItem('arrival_chantier', '1')
  }

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, 'chantier'), [])
  useEffect(chantierInit, [])
  useEffect(songStarter, [])

  return (
    <div
      id='modal-chantier'
      style={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
        zIndex: '1000',
        overflow: 'hidden',
      }}
    >
      <div id='fouille' className='multiple-scenes'>
        <div id='pano' ref={panoRef}></div>
        <div id='sceneList'>
          <ul className='scenes'>
            <a href='#' className='scene' data-id='0-101---chantier1'>
              <li className='text'>101 - Chantier1</li>
            </a>

            <a href='#' className='scene' data-id='1-101---chantier2'>
              <li className='text'>101 - Chantier2</li>
            </a>

            <a href='#' className='scene' data-id='2-101---chantier3'>
              <li className='text'>101 - Chantier3</li>
            </a>

            <a href='#' className='scene' data-id='3-101---chantier4'>
              <li className='text'>101 - Chantier4</li>
            </a>
          </ul>
        </div>

        <div className='img' id='img-see1' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/malle-2.jpg`}
            className='img-see'
          />
        </div>

        <audio id='arrival' controls style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/arrival.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>

        <audio id='song' controls loop style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/music.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>
        <button
          className='modal-objectif__button button--red'
          style={{
            position: 'fixed',
            bottom: '0.5rem',
            left: '0.5rem',
            zIndex: 10000,
          }}
          onClick={onClose}
        >
          fermer
        </button>
      </div>
      <div
        id='malle-container'
        style={{
          display: 'none',
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          position: 'fixed',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            id='malle'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/malle-2.jpg`}
            style={{
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          />
          <div
            id='right'
            className='item'
            style={{
              top: '75%',
              left: '53%',
              width: '3%',
              height: '6%',
            }}
          ></div>
          <div
            id='left'
            className='item'
            style={{
              top: '75%',
              left: '44%',
              width: '3%',
              height: '6%',
            }}
          ></div>

          <div
            id='up'
            className='item'
            style={{
              top: '67%',
              left: '48.5%',
              width: '3%',
              height: '6%',
            }}
          ></div>

          <div
            id='down'
            className='item'
            style={{
              top: '82%',
              left: '48.5%',
              width: '3%',
              height: '6%',
            }}
          ></div>

          <div
            id='reset'
            className='item'
            style={{
              top: '75%',
              left: '48.5%',
              width: '3%',
              height: '6%',
            }}
          ></div>
        </div>
        <button
          className='modal-objectif__button button--red'
          style={{
            position: 'fixed',
            bottom: '0.5rem',
            left: '0.5rem',
            zIndex: 10000,
          }}
          onClick={onClose}
        >
          fermer
        </button>
        <div style={{ display: 'none' }}>
          <audio
            id='click'
            className='interupted'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/click.wav`}
            type='audio/wav'
          ></audio>
          <audio
            id='reset-sound'
            className='interupted'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/reset.wav`}
            type='audio/wav'
          ></audio>
          <audio
            id='malle-opened'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/comment-2.mp3`}
            type='audio/mpeg'
          ></audio>
          <audio
            id='malle-mp3'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/comment-1.mp3`}
            type='audio/mpeg'
          ></audio>
          <audio
            id='open-malle'
            className='interupted'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/open-malle.mp3`}
            type='audio/mpeg'
          ></audio>
        </div>
      </div>
      <div
        id='open-malle-container'
        style={{
          display: 'none',
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          position: 'fixed',
        }}
      >
        <input id='input' type='text' style={{ display: 'none' }} />
        <div style={{ position: 'relative' }}>
          <img
            id='malle'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/opened-malle.jpg`}
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '100dvh' }}
          />
        </div>

        <div style={{ display: 'none' }}>
          <audio
            id='malle-opened'
            src={`${
              import.meta.env.BASE_URL
            }fouilles/chantier/assets/comment-2.mp3`}
            type='audio/mpeg'
          ></audio>
        </div>
        <button
          className='modal-objectif__button button--red'
          style={{
            position: 'fixed',
            bottom: '0.5rem',
            left: '0.5rem',
            zIndex: 10000,
          }}
          onClick={onClose}
        >
          fermer
        </button>
      </div>
    </div>
  )
}

ChantierModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ChantierModal
