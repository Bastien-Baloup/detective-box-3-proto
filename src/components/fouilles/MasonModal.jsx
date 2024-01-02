import MarzipanoInit from '../../utils/const/marzipanoInit'
import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import '../../assets/fouilles/mason/style.css'
import data from '../../assets/fouilles/mason/data'

function MasonModal({ onClose }) {
  const panoRef = useRef(null)
  const viewerRef = useRef(null)
  const arrivalMason = useRef(sessionStorage.getItem('arrival_mason'))

  const songStarter = () => {
    if (!arrivalMason.current) {
      setTimeout(() => document.getElementById('arrival').play(), 1500)
    }
  }

  const masonInit = () => {
    document.querySelectorAll('.close-img').forEach((element) => {
      element.addEventListener('click', () => {
        document.querySelectorAll('.img').forEach((imgElement) => {
          imgElement.style.display = 'none'
        })
      })
    })

    document.querySelectorAll('.watch').forEach((element) => {
      element.addEventListener('click', () => {
        document.querySelectorAll('.img').forEach((imgElement) => {
          imgElement.style.display = 'none'
        })
        const id = element.getAttribute('id')
        document.getElementById('img-' + id).style.display = 'block'
      })
    })

    sessionStorage.setItem('arrival_mason', '1')
  }

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, 'mason'), [])
  useEffect(songStarter, [])
  useEffect(masonInit, [])

  return (
    <div
      id='modal-mason'
      style={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      <div id='fouille' className='multiple-scenes'>
        <div id='pano' ref={panoRef}></div>

        <div id='sceneList'>
          <ul className='scenes'>
            <a href='#' className='scene' data-id='0-avancer'>
              <li className='text'>Avancer</li>
            </a>

            <a href='#' className='scene' data-id='1-avancer'>
              <li className='text'>Avancer</li>
            </a>
          </ul>
        </div>

        <audio id='arrival' controls style={{ display: 'none' }}>
          <source src={`${import.meta.env.BASE_URL}fouilles/mason/assets/arrival.mp3`}  type='audio/mpeg' />
          Your browser does not support the audio element.
        </audio>

        <div className='img' id='img-see1' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/mason/assets/tableau-3.jpg`} className='img-see' />
        </div>

        <div className='img' id='img-see2' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/mason/assets/tableau-2.jpg`} className='img-see' />
        </div>

        <div className='img' id='img-see3' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/mason/assets/tableau-1.jpg`} className='img-see' />
        </div>

        <div className='img' id='img-see4' style={{ display: 'none', height: '100dvh', maxWidth: '100%', width: 'fit-content !important' }}>
          <span className='close-img'>X</span>
          <img 
            src={`${import.meta.env.BASE_URL}fouilles/mason/assets/lettre.jpg`} 
            style={{ maxHeight: '80dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className='img-see' 
          />

          <div
            style={{
              textAlign: 'center',
              backgroundColor: 'black',
              padding: '0.5em',
            }}
          >
            <div className='btn btn-red'>
              <span className='watch' id='see6'>
                Voir de plus près
              </span>
            </div>
          </div>
        </div>

        <div
          className='img img-vertical'
          id='img-see6'
          style={{ display: 'none' }}
        >
          <span className='close-img'>X</span>
          <img 
            src={`${import.meta.env.BASE_URL}fouilles/mason/assets/lettre-2.jpg`}
            style={{ maxHeight: '80dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className='img-see' 
           />
        </div>

        <div className='img' id='img-see5' style={{ display: 'none' }}>
          <div id='point-1' className='blink_me'></div>
          <span className='watch' id='webcam'></span>
          <span className='close-img'>X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/mason/assets/webcam-1.jpg`} className='img-see' />
        </div>

        <div className='img' id='img-webcam' style={{ display: 'none' }}>
          <div id='point-2' className='blink_me'></div>
          <span className='close-img'>X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/mason/assets/webcam-2.jpg`} className='img-see' />
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

MasonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default MasonModal

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
