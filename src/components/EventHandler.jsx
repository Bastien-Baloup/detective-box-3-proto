/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, useContext } from 'react'
import useEvent from '../utils/hooks/useEvent'
import useApi from '../utils/hooks/useApi'
import { urlApi } from '../utils/const/urlApi.js'
import { CompteContext, DataContext, BoxContext } from '../utils/context/fetchContext'
import Audio from './Audio'
import PortraitRobot from './mini-jeux/PortraitRobot.jsx'
import EnqueteQuartier from './mini-jeux/EnqueteQuartier.jsx'
import Document from './Document.jsx'

const EventHandler = () => {
  const { state, dispatch } = useEvent()
  const { getHistoryByBox, updateHistory, updateEvent } = useApi()
  const { toggleDataHistory, actionToggleDataHistory, actionToggleDataEvent } = useContext(DataContext)
  const { closeCompte } = useContext(CompteContext)
  const { currentBox } = useContext(BoxContext)
  const [interrogatoirePharmacien, setInterrogatoirePharmacien] = useState(false)
  const [portraitRobot, setPortraitRobot] = useState(false)
  const [portraitRobotValid, setPortraitRobotValid] = useState(false)
  const [modalEnqueteQuartier, setModalEnqueteQuartier] = useState(false)
  const [enqueteQuartier, setEnqueteQuartier] = useState(false)
  const [appelConcierge, setAppelConcierge] = useState(false)
  const [interrogatoiresCasseurs, setInterrogatoiresCasseurs] = useState(false)

  const token = localStorage.getItem('token')

  const [box1audio2, setBox1audio2] = useState()

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData')
      const documents = await getHistoryByBox(token, currentBox)
      const box1audio2Data = documents.data.find(document => document.id == 'box1audio2')
      setBox1audio2(box1audio2Data)
    }
    fetchData()
  }, [toggleDataHistory])

  const reset = useCallback(() => dispatch({ type: 'resetEvent' }), [dispatch])

  useEffect(() => {
    console.log('Event triggered: ' + state.id)

    if (state.id === 'box1audio2') {
      setInterrogatoirePharmacien(true)
    }

    if (state.id === 'obj3') {
      setInterrogatoiresCasseurs(true)
    }

    if (state.id === 'portraitRobo') {
      setPortraitRobot(true)
    }

    if (state.id === 'enqueteQuartier') {
      setModalEnqueteQuartier(true)
    }

    return () => {
      console.log('cleanup')
      reset()
    }
  }, [state.toogleEvent])

  const renderInterrogatoirePharmacien = () => {
    closeCompte()
    return (
      <Audio
        title={box1audio2.title}
        srcImg1={urlApi.cdn() + box1audio2.img1}
        srcImg2={urlApi.cdn() + box1audio2.img2}
        srcTranscription={urlApi.cdn() + box1audio2.srcTranscript}
        srcAudio={urlApi.cdn() + box1audio2.srcAudio}
        handleModalAudio={() => closeInterrogatoirePharmacien(box1audio2.id)}
      />
    )
  }

  const closeInterrogatoirePharmacien = async answerId => {
    await updateHistory(token, currentBox, answerId)
    actionToggleDataHistory()
    await updateEvent(token, 1, 241, 'open')
    actionToggleDataEvent()
    setInterrogatoirePharmacien(false)
    setPortraitRobot(true)
  }

  const renderModalPortraitRobot = () => {
    const onValid = () => {
      setPortraitRobot(false)
      setPortraitRobotValid(true)
    }
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <h2 className='modal-objectif__title'>Portrait Robot</h2>
          <div>
            On a une description. C&apos;est l&apos;heure de reprendre les bonnes vieilles méthodes : le portrait-robot
          </div>
          <PortraitRobot onValid={onValid} />
        </div>
      </div>
    )
  }

  const handlePortraitRobotValid = async () => {
    setPortraitRobotValid(false)
    setModalEnqueteQuartier(true)
    await updateEvent(token, 1, 241, 'done')
    await updateEvent(token, 1, 242, 'open')
    actionToggleDataEvent()
  }

  const renderModalPortraitRobotValid = () => {
    return (
      <Document
        title={'C’est elle, je la reconnais !'}
        srcElement={urlApi.cdn() + 'proto3/assets/photos-personnages/hannah-evans-lynx.png'}
        handleModalDocument={handlePortraitRobotValid}
      />
    )
  }

  const renderModalEnqueteQuartier = () => {
    const onClick = () => {
      setModalEnqueteQuartier(false)
      setEnqueteQuartier(true)
    }
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <div>
            Raphaëlle : Bon bah, on n’a plus qu’à retourner aux bases, on prend le portrait et on va le présenter aux
            habitants du quartier, c’est parti !
          </div>
          <button className='modal-objectif__button button--red' onClick={onClick}>
            Démarrer
          </button>
        </div>
      </div>
    )
  }

  const handleValidEnqueteQuartier = () => {
    setEnqueteQuartier(false)
    setAppelConcierge(true)
  }

  const renderAppelConcierge = () => {
    const onClick = async () => {
      setAppelConcierge(false)
      await updateEvent(token, 1, 242, 'done')
      actionToggleDataEvent()
    }
    return (
    <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <div>
            &quot;Bonjour, vous êtes bien à la conciergerie de la résidence du port, au 4 Quai Jean-Charles Rey. Je suis absent pour le moment, rappelez plus tard ou passez directement à la résidence.&quot;
          </div>
          <button className='modal-objectif__button button--red' onClick={onClick}>
            Démarrer
          </button>
        </div>
      </div>
  )}

  const renderInterrogatoiresCasseurs = () => {
    return <></>
  }

  return (
    <>
      {interrogatoirePharmacien && renderInterrogatoirePharmacien()}
      {portraitRobot && renderModalPortraitRobot()}
      {portraitRobotValid && renderModalPortraitRobotValid()}
      {modalEnqueteQuartier && renderModalEnqueteQuartier()}
      {enqueteQuartier && <EnqueteQuartier onValid={handleValidEnqueteQuartier} />}
      {appelConcierge && renderAppelConcierge()}
      {interrogatoiresCasseurs && renderInterrogatoiresCasseurs()}
    </>
  )
}

export default EventHandler
