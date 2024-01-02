/* eslint-disable react-hooks/exhaustive-deps */
import MarzipanoInit from '../../utils/const/marzipanoInit'
import { useEffect, useRef, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import '../../assets/fouilles/planque/style.css'
import data from '../../assets/fouilles/planque/data'
import { DataContext } from "../../utils/context/fetchContext";
import useApi from '../../utils/hooks/useApi.js'
import useEvent from '../../utils/hooks/useEvent.js';

function PlanqueModal({ onClose }) {
  const panoRef = useRef(null)
  const viewerRef = useRef(null)
  const [commentPlayed, setCommentPlayed] = useState(false)
  const arrivalPlanque = useRef(sessionStorage.getItem('arrival_planque'))
  const { actionToggleDataHistory } = useContext(DataContext);
  const { updateHistory } = useApi()
	const { dispatch } = useEvent()

  const songStarter = () => {
    if (!arrivalPlanque.current) {
      setTimeout(() => document.getElementById('arrival').play(), 1500)
    }
    document.getElementById('song').play()
    document.getElementById('song').volume = 0.2
  }

  const clicHandle = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert("Erreur de communication avec l'app détectivebox : Token vide")
      return
    }
    await updateHistory(token, 1, 'box1document6')
    dispatch({
      type: 'setEvent',
      id: 'box1document6'
    })
    actionToggleDataHistory()
  }

  const planqueInit = () => {
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

        if (id == 'see6') {
          document.getElementById('arrival').volume = 0

          if (!commentPlayed) {
            document.getElementById('comment').play()
            setCommentPlayed(true)
          }

          clicHandle()
        }
      })
    })

    sessionStorage.setItem('arrival_planque', '1')
  }

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, 'planque'), [])
  useEffect(planqueInit, [])
  useEffect(songStarter, [])

  return (
    <div
      id='modal-planque'
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
            <a href='#' className='scene' data-id='0-103_planque_grnier_1'>
              <li className='text'>103_planque_grnier_1</li>
            </a>

            <a href='#' className='scene' data-id='1-103_planque_grnier_2'>
              <li className='text'>103_planque_grnier_2</li>
            </a>
          </ul>
        </div>
        <div className='img' id='img-see1' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-5.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see2' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-3.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see3' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-4.jpg`}
            className='img-see'
          />
        </div>

        <div className='img' id='img-see4' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-1.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see5' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/carte-2.jpg`}
            className='img-see'
          />
        </div>
        <div className='img' id='img-see6' style={{ display: 'none' }}>
          <span className='close-img'>X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/planque/assets/mot.jpg`}
            className='img-see'
          />
        </div>

        <audio id='song' loop controls style={{ display: 'none' }}>
          <source
            src={`${import.meta.env.BASE_URL}fouilles/planque/assets/music.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>
        <audio id='comment' controls style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/comment.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>
        <audio id='arrival' controls style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/planque/assets/arrival.mp3`}
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
    </div>
  )
}

PlanqueModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default PlanqueModal

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
