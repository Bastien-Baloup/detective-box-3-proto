/* eslint-disable react-hooks/exhaustive-deps */
import MarzipanoInit from '../../utils/const/marzipanoInit'
import { useEffect, useRef, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import '../../assets/fouilles/terrain/style.css'
import data from '../../assets/fouilles/terrain/data'
import { DataContext } from "../../utils/context/fetchContext";
import useApi from '../../utils/hooks/useApi.js'
import useEvent from '../../utils/hooks/useEvent.js';


function TerrainModal({ onClose }) {
  const panoRef = useRef(null)
  const viewerRef = useRef(null)
  const [commentPlayed, setCommentPlayed] = useState(false)
  const arrivalTerrain = useRef(sessionStorage.getItem('arrival_terrain'))
  const { actionToggleDataHistory } = useContext(DataContext);
  const { updateHistory } = useApi()
	const { dispatch } = useEvent()


  const songStarter = () => {
    if (!arrivalTerrain.current) {
      setTimeout(() => document.getElementById('arrival').play(), 1500)
    }
  }

  const openDoor = async () => {
    const fouilleElement = document.getElementById('fouille')
    const videoContainerElement = document.getElementById('video-container')
    const videoElement = document.getElementById('video')

    const commentAudio = document.getElementById('comment')
    if (commentAudio) {
      commentAudio.pause()
    }
    const arrivalAudio = document.getElementById('arrival')
    if (arrivalAudio) {
      arrivalAudio.pause()
    }

    fouilleElement.style.display = 'none'
    videoContainerElement.style.display = 'block'
    videoElement.play()

    let token = localStorage.getItem('token')
    if (!token || token === 'null') {
        alert("Erreur de communication avec l'app détectivebox : Token vide")
        return
    }
    await updateHistory(token, 1, 'box1video2')
    dispatch({
      type: 'setEvent',
      id: 'box1video2'
    })
    await updateHistory(token, 1, 'box1document2')
    dispatch({
      type: 'setEvent',
      id: 'box1document2'
    })
    await updateHistory(token, 1, 'box1document7')
    dispatch({
      type: 'setEvent',
      id: 'box1document7'
    })
    actionToggleDataHistory();
  }

  const terrainInit = () => {
    const closeImgElements = document.querySelectorAll('.close-img')
    closeImgElements.forEach((element) => {
      element.onclick = () => {
        const imgElements = document.querySelectorAll('.img')
        imgElements.forEach((imgElement) => {
          imgElement.style.display = 'none'
        })
      }
    })

    document.querySelectorAll('.watch').forEach((element) => {
      element.addEventListener('click', () => {
        document.querySelectorAll('.img').forEach((imgElement) => {
          imgElement.style.display = 'none'
        })
        const id = element.getAttribute('id')
        if (id == 'door') {
          openDoor() 
        } else {
          document.getElementById('img-' + id).style.display = 'block'
          if (id == 'see2') {
            document.getElementById('arrival').volume = 0
            if (!commentPlayed) {
              document.getElementById('comment').play()
              setCommentPlayed(true)
            }
          }
        }
      })
    })

    sessionStorage.setItem('arrival_terrain', '1')
  }

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, 'terrain'), [])
  useEffect(songStarter, [])
  useEffect(terrainInit, [])

  return (
    <div
      id='modal-terrain'
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
            <a href='#' className='scene' data-id='0-102_terrain_1'>
              <li className='text'>102_Terrain_1</li>
            </a>

            <a href='#' className='scene' data-id='1-102_terrain_2'>
              <li className='text'>102_Terrain_2</li>
            </a>

            <a href='#' className='scene' data-id='2-102_terrain_3'>
              <li className='text'>102_Terrain_3</li>
            </a>

            <a href='#' className='scene' data-id='3-102_terrain_4'>
              <li className='text'>102_Terrain_4</li>
            </a>
          </ul>
        </div>
        <div className='img' id='img-see1' style={{ display: 'none', height: '100dvh', maxWidth: '100%', width: 'fit-content' }}>
          <span className='close-img'>X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/terrain/assets/bal.jpg`}
            style={{ maxHeight: '80dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className='img-see'
          />
        </div>
        <div
          className='img img-horizontal'
          id='img-see2'
          style={{ display: 'none' }}
        >
          <span className='close-img'>X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/terrain/assets/carte.jpg`}
            className='img-see'
          />
        </div>

        <audio id='comment' controls style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/terrain/assets/comment.mp3`}
            type='audio/mpeg'
          />
          Your browser does not support the audio element.
        </audio>
        <audio id='arrival' controls style={{ display: 'none' }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/terrain/assets/arrival.mp3`}
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
      <div id='video-container' style={{ display: 'none', width: '100%', height: '100%', backgroundColor: 'black', position: 'fixed' }}>
        <video id='video' controls style={{ width: '100%', position: 'relative', top: 0, maxHeight: 'calc(100% - 6rem)' }}>
          <source
            src='https://db2cdn.fra1.cdn.digitaloceanspaces.com/videos/db-s02-102-def.mp4'
            type='video/mp4'
          />
        </video>
        <button
          className='modal-objectif__button button--red'
          onClick={onClose}
        >
          fermer
        </button>
      </div>
    </div>
  )
}

TerrainModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default TerrainModal

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
