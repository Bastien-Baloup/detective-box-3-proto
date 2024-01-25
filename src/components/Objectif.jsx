/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant est très complexe et important : il permet de rendre les objectifs
// EXPLICATION : Il affiche egalement toute la logique de validation des objectifs
// EXPLICATION : Il affiche egalement toute la logique des différents événements de l'application

import PropTypes from 'prop-types'
import {
  useState,
  useEffect,
  useMemo
} from 'react'
import Check from '../assets/icons/Icon_Check-green.svg'
import LockClosed from '../assets/icons/Icon_Lock-closed-red.svg'
import LockOpen from '../assets/icons/Icon_Lock-open-black.svg'
import Input from './Input.jsx'
import Cross from '../assets/icons/Icon_Cross-white.svg'
import InterrogatoireInterractif from './mini-jeux/InterrogatoireInterractif.jsx'
import Audio from '../components/Audio'

import { urlApi } from '../utils/const/urlApi'
import {
  BoxContext,
  DataContext,
  CompteContext
} from '../utils/context/fetchContext'
import { useContext } from 'react'
import useApi from '../utils/hooks/useApi.js'
import useEvent from '../utils/hooks/useEvent.js'

const Objectif = ({ data }) => {
  const [modal, setModal] = useState(false)
  const [modalAnswer, setModalAnswer] = useState(false)
  const [doneObjectifModal, setDoneObjectifModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [value, setValue] = useState('')
  const [sousObjectif, setSousObjectif] = useState(null)
  const [selectedChoices, setSelectedChoices] = useState([])
  const [interrogatoireTim, setInterrogatoireTim] = useState(false)
  const [pharmacie, setPharmacie] = useState(false)

  const { currentBox } = useContext(BoxContext)
  const token = localStorage.getItem('token')
  const {
    actionToggleDataEvent,
    toggleDataEvent,
    actionToggleDataHistory,
    toggleDataHistory,
    actionToggleDataObjectif,
    toggleDataTim
  } = useContext(DataContext)
  const { closeCompte } = useContext(CompteContext)

  const { getEventByBox, getCharactersById, updateEvent, getHistoryByBox, updateHistory, updateObjectives } = useApi()

  const { dispatch } = useEvent()

  const [events, setEvents] = useState(null)
  const [history, sethistory] = useState(null)
  // EXPLICATION : Fonction pour récupérer l'état des événements
  useEffect(() => {
    const getEvents = async () => {
      const events_ = await getEventByBox(token, currentBox)
      setEvents(events_.data)
    }
    getEvents()
  }, [toggleDataEvent])

  useEffect(() => {
    const getEvents = async () => {
      const history = await getHistoryByBox(token, currentBox)
      sethistory(history.data)
    }
    getEvents()
  }, [toggleDataHistory])

  const listSousObjectifs = useMemo(() => {
    const sousObjectifs = data?.sousobjectifs ? data.sousobjectifs : []
    sousObjectifs.forEach(sousObjectif => {
      sousObjectif.isSousObjectif = true
      const event = events && events.find(event => event.id === sousObjectif.id)
      if (event) {
        sousObjectif.status = event.status
      }
    })
    return sousObjectifs
  }, [data, events])

  const box1document8 = useMemo(
    () => history && history.find(document => document.id === 'box1document8')?.status,
    [history]
  )

  const box1audio12 = useMemo(() => history && history.find(document => document.id === 'box1audio12'))

  //EXPLICATION : Tim est le personnage "5"
  const [analyseTelephone, setAnalyseTelephone] = useState(false)
  useEffect(() => {
    const getTimData = async () => {
      const result = await getCharactersById(token, 5)
      const thisBox = result.find(element => element.box_id == currentBox).data
      const demande = thisBox.find(element => element.ask.includes('telephonevictime'))
      if (demande) {
        setAnalyseTelephone(demande.status)
      }
    }
    getTimData()
  }, [toggleDataTim])

  //TODO traitements spécifiques d'objectifs

  // à l'ouverture du sous objectif 13
  const [popupDebutHacking, setPopupDebutHacking] = useState(false)
  const [popupFinHacking, setPopupFinHacking] = useState(false)
  const handleHacking = () => {
    setPopupDebutHacking(false)
    setPopupFinHacking(true)
  }
  const renderPopupDebutHacking = () => {
    const text = [
      'J’ai récupéré l’accès au système de sécurité via Sophie Palmero,',
      'ça devrait vous aider à obtenir des informations sur le hacking des caméras !'
    ]
    const text2 = [
      'Il nous faut trouver un moyen de débloquer le hacking mis en place par La Horde et peut-être découvrir qui se cache derrière tout ça...',
      'J’ai l’impression que les traits ne peuvent pas se croiser ni être en diagonal. Ah oui et le système accepte 0, 1 ou 2 traits pour relier les points entre eux.'
    ]
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          {<div>{renderText(text)}</div>}
          <a href='https://hashi-puzzles.com/levels/easy/1' target='_blank' rel='noreferrer'>
            Lien
          </a>
          {<div>{renderText(text2)}</div>}
          <button className='modal-objectif__button button--red' onClick={handleHacking}>
            Puzzle résolu
          </button>
        </div>
      </div>
    )
  }
  const renderPopupFinHacking = () => {
    const text = ['Message s’affichant à la résolution du déblocage du système de sécurité : LONEWOOD']
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          {<div>{renderText(text)}</div>}
          <button className='modal-objectif__button button--red' onClick={() => setPopupFinHacking(false)}>
            Continuer l’enquête
          </button>
        </div>
      </div>
    )
  }

  // après fin l'interrogatoire de tim
  const onCloseInterrogatoireTim = async (closedByCross = false) => {
    setInterrogatoireTim(false)
    if (closedByCross) {
      return
    }
    await updateObjectives(token, 1, 1, 'done')
    await updateObjectives(token, 1, 2, 'open')
    actionToggleDataObjectif()
    setPopupImagesCamera(true)
  }

  // début objectif 2
  const [popupImagesCamera, setPopupImagesCamera] = useState(false)
  const renderPopupImagesCamera = () => {
    console.log(analyseTelephone)
    let onClosePopupImageCamera = async () => {
      await updateHistory(token, currentBox, 'box1document5')
      actionToggleDataHistory()
      setPopupImagesCamera(false)
    }
    const text = [
      'J’ai réussi à récupérer des images des caméras de la ville pour traquer le van des cambrioleurs.',
      'Après le casse, il a quitté la Place du Casino pour se diriger vers le sud-ouest de la ville.',
      'J’ai perdu sa trace à partir du moment où le van a contourné la statue de Juan Manuel Fangio.',
      'À vous de trouver le moyen de retracer leur trajet.'
    ]
    if (analyseTelephone) {
      onClosePopupImageCamera = async () => {
        await updateHistory(token, currentBox, 'box1document5')
        await updateHistory(token, currentBox, 'box1audio3')
        actionToggleDataHistory()
        setPopupImagesCamera(false)
      }
      text.push(' ')
      text.push("J'y pense, j'ai pu analyser le téléphone de la victime.")
      text.push('Voilà ce que j’ai récupéré sur son répondeur, j’espère que ça vous aidera')
    }
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          {<div>{renderText(text)}</div>}
          <button className='modal-objectif__button button--red' onClick={onClosePopupImageCamera}>
            Continuer l&apos;enquête
          </button>
        </div>
      </div>
    )
  }

  const closeInterrogatoireSimon = async () => {
    await updateHistory(token, 1, 'box1audio12')
    actionToggleDataHistory()
    setInterrogatoireSimon(false)
    setDenoncerTim(true)
  }

  const [interrogatoireSimon, setInterrogatoireSimon] = useState(false)

  const renderInterrogatoireSimon = () => {
    return (
      <Audio
        title={box1audio12?.title}
        srcImg1={box1audio12?.img1}
        srcImg2={box1audio12?.img2}
        srcTranscription={urlApi.cdn()+box1audio12?.srcTranscript}
        handleModalAudio={closeInterrogatoireSimon}
        srcAudio={urlApi.cdn()+box1audio12?.srcAudio}
      />
    )

  }
  const [denoncerTim, setDenoncerTim] = useState(false)

  const denoncer = async () => {
    await updateEvent(token, 1, 32, 'done')
    actionToggleDataEvent()
    setDenoncerTim(false)
    setReponseEmail(true)
  }

  const pasDenoncer = async () => {
    await updateEvent(token, 1, 32, 'open')
    actionToggleDataEvent()
    setDenoncerTim(false)
    setReponseEmail(true)
  }

  const renderDenoncerTim = () => {
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <h2 className='modal-objectif__title'>Dénoncer Tim ?</h2>
          <button className='modal-objectif__button button--red' onClick={denoncer}>Oui</button>
          <button className='modal-objectif__button button--red' onClick={pasDenoncer}>Non</button>
        </div>
      </div>
    )
  }

  const [reponseEmail, setReponseEmail] = useState(false)

  const handleReponseEmail = async () => {
    await updateObjectives(token, 1, 3, 'done')
    actionToggleDataObjectif()
    setReponseEmail(false)
  }

  const renderReponseEmail = () => {
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <div>Bonjour, Agents. Mes clients souhaiteraient obtenir l’identité de la personne qui a tué leur Chef des opérations, Cédric Romero. Si vous acceptez de nous transmettre cette information, vous aurez accès à une belle récompense...</div>
          <select name="" id="">
            <option value="">Simon</option>
            <option value="">Philippe</option>
          </select>
          <button className='modal-objectif__button button--red' onClick={handleReponseEmail}>Envoyer</button>
        </div>
      </div>
    )
      
  }

  // -- GENERIQUE -- //

  const openModal = objectif => {
    closeCompte()
    if (objectif?.isSousObjectif) {
      if (objectif.id === 13) {
        const event130 = events.find(event => event.id === 130)
        const interrogatoireInterractif = event130?.status === 'done'
        if (interrogatoireInterractif) {
          setModal(false)
          setInterrogatoireTim(true)
        }
      }
      setSousObjectif(objectif)
      setErrorMessage('')
      setValue('')
    } else {
      setModal(true)
      setErrorMessage('')
      setValue('')
    }
  }

  const closeModal = () => {
    setModal(false)
    setSousObjectif(null)
    setErrorMessage('')
    setValue('')
  }

  const slugify = input => {
    let inputSlugified = input
      .replace(/\s/g, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
    return inputSlugified
  }

  const renderText = data => {
    if (!data) {return}
    const text = data.map((el, i) => {
      return (
        <p className='modal-objectif__subtitle' key={i}>
          {el}
        </p>
      )
    })
    return text
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (sousObjectif) {
      let specialCondition = null
      if (sousObjectif?.id === 12) {
        const event121 = events.find(event => event.id === 121)
        const firstPartIsDone = event121?.status === 'done'
        if (!firstPartIsDone) {
          // first part
          specialCondition = sousObjectif?.answer.every((answer, id) => selectedChoices[id] === answer)
        } else {
          // second part
          specialCondition = value === sousObjectif?.answer2
        }
      }
      if (
        sousObjectif?.id === 21 &&
        ['pharmacie', 'pharmaciefontvieille', 'pharmaciedefontvieille'].includes(slugify(value))
      ) {
        setErrorMessage('')
        setValue('')
        setSousObjectif(null)
        setModal(false)
        setPharmacie(true)
      }
      if (sousObjectif?.id === 22) {
        setErrorMessage('')
        setValue('')
        setSousObjectif(null)
        setModal(false)
        return
      }
      if (specialCondition || (specialCondition === null && sousObjectif.answer.includes(slugify(value)))) {
        //TODO Gestion spécifique bonnes réponses

        setErrorMessage('')
        setValue('')
        setModal(false)
        setModalAnswer(true)
        return
      } else {
        //TODO Gestion spécifique réponses fausses

        setErrorMessage(sousObjectif.errorMessage)
        setValue('')
      }
    } else {
      if (data.id === 3) {
        if (!box1document8) {
          setErrorMessage("Ce n'est pas un peu tôt pour accuser quelqu'un ?")
          setValue('')
          return
        } else {
          if (data.answer.includes(slugify(value)) && data.answer.includes(slugify(selectedChoice))) {
            setErrorMessage('')
            setValue('')
            setModal(false)
            setModalAnswer(true)
            return
          } else {
            setErrorMessage(data.errorMessage)
            setValue('')
            return
          }
        }
      } else {
        if (data.answer.includes(slugify(value))) {
          //TODO Gestion spécifique bonnes réponses
  
          setErrorMessage('')
          setValue('')
          setModal(false)
          setModalAnswer(true)
          return
        } else {
          //TODO Gestion spécifique réponses fausses
  
          setErrorMessage(data.errorMessage)
          setValue('')
        }
      }
    }
  }

  const handleModalAnswer = async () => {
    setModalAnswer(false)
    if (sousObjectif?.id === 11) {
      if (listSousObjectifs.find(sousObjectif_ => sousObjectif_.id == 12)?.status === 'done') {
        await updateEvent(token, 1, 13, 'open')
        setPopupDebutHacking(true)
      }
      await updateEvent(token, 1, 11, 'done')
      actionToggleDataEvent()
      setSousObjectif(null)
      return
    }
    if (sousObjectif?.id === 12) {
      const event121 = events.find(event => event.id === 121)
      const firstPartIsDone = event121?.status === 'done'
      if (!firstPartIsDone) {
        // first part
        await updateEvent(token, 1, 121, 'done')
        actionToggleDataEvent()
        await updateHistory(token, currentBox, 'box1document1')
        actionToggleDataHistory()
        setSousObjectif(null)
        return
      } else {
        // second part
        await updateEvent(token, 1, 12, 'done')
        if (listSousObjectifs.find(sousObjectif_ => sousObjectif_.id == 11)?.status === 'done') {
          await updateEvent(token, 1, 13, 'open')
          setPopupDebutHacking(true)
        }
        actionToggleDataEvent()
        await updateHistory(token, currentBox, 'box1document2')
        actionToggleDataHistory()
        setSousObjectif(null)
        return
      }
    }
    if (sousObjectif?.id === 13) {
      console.log('test box1document3')
      await updateEvent(token, 1, 130, 'done')
      actionToggleDataEvent()
      await updateHistory(token, currentBox, 'box1document3')
      actionToggleDataHistory()
      setInterrogatoireTim(true)
      setSousObjectif(null)
      return
    }
    if (sousObjectif?.id === 21) {
      setSousObjectif(null)
      return
    }
    if (data.id === 3) {
      setInterrogatoireSimon(true)
    }
  }

  const renderListeSousObjectif = () => {
    if (!listSousObjectifs) {
      return ''
    }
    let sousObjectifContainer = null
    if (data.id === 2) {
      if (listSousObjectifs[0]?.status === 'open') {
        sousObjectifContainer = <div>{renderObjectif(listSousObjectifs[0])}</div>
      } else {
        sousObjectifContainer = <div>{renderObjectif(listSousObjectifs[1])}</div>
      }
    } else {
      sousObjectifContainer = listSousObjectifs.map(sousObjectif_ => (
        <div key={sousObjectif_?.id}>{renderObjectif(sousObjectif_)}</div>
      ))
    }

    return <div className='modal-objectif__list-sous-objectif'>{sousObjectifContainer}</div>
  }

  const renderSousObjectif = () => {
    let answerForm
    // console.log(sousObjectif)
    if (sousObjectif.id === 11) {
      // console.log('tests')
      answerForm = (
        <form className='modal-objectif__form' onSubmit={handleSubmit}>
          <Input
            type='texte'
            label={sousObjectif?.label}
            name='objectif'
            placeholder='Ce champ est vide'
            value={value}
            setValue={setValue}
          />
          <button className='modal-objectif__button button--red'>Envoyer</button>
        </form>
      )
    }
    if (sousObjectif.id === 12) {
      const event121 = events.find(event => event.id === 121)
      const firstPartIsDone = event121?.status === 'done'
      if (!firstPartIsDone) {
        if (selectedChoices.length === 0) {
          const initialSelectedChoices = sousObjectif?.zones.flatMap(zone => zone.empreintes.map(() => 'inconnu'))
          setSelectedChoices(initialSelectedChoices)
        }

        const handleSelectChange = (zoneId, empreinteId, value) => {
          let index = 0

          for (let i = 0; i < zoneId; i++) {
            index += sousObjectif?.zones[i]?.empreintes.length || 0
          }
          index += empreinteId
          // Update the selected choices array
          const updatedChoices = [...selectedChoices]

          updatedChoices[index] = slugify(value)
          setSelectedChoices(updatedChoices)
          console.log(JSON.stringify(updatedChoices))
        }

        const renderEmpreintes = (empreintes, zoneId) =>
          empreintes.map((empreinte, empreinteId) => (
            <div key={empreinteId} className='modal-objectif__empreinte'>
              <div className='modal-objectif__empreinte--photo'>
                <img src={urlApi.cdn() + empreinte} alt='' />
              </div>
              <div className='modal-objectif__empreinte--input'>
                <select
                  name='choix'
                  id={empreinteId}
                  onChange={e => handleSelectChange(zoneId, empreinteId, e.target.value)}
                >
                  {sousObjectif?.choices.map((choice, index) => (
                    <option key={index} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        const renderZone = (zone, zoneId) => {
          if (!zone) {
            return null
          }
          return (
            <details key={zoneId}>
              <summary>{zone?.nom}</summary>
              <div className='modal-objectif__empreintes_zone'>{renderEmpreintes(zone?.empreintes, zoneId)}</div>
            </details>
          )
        }
        const renderedZones = sousObjectif?.zones.map((zone, index) => renderZone(zone, index))
        // first part: identifier les empreintes par zones
        answerForm = (
          <form className='modal-objectif__form' onSubmit={handleSubmit}>
            {renderedZones}
            <button className='modal-objectif__button button--red'>Envoyer</button>
          </form>
        )
      } else {
        const renderChoixEmpreintes = empreintes =>
          empreintes.map((empreinte, empreinteId) => (
            <div key={empreinteId} className='modal-objectif__empreinte'>
              <div className='modal-objectif__empreinte--photo'>
                <img
                  className={value === empreinteId ? 'modal-objectif__empreinte--selected' : ''}
                  src={urlApi.cdn() + empreinte}
                  alt=''
                  onClick={() => setValue(empreinteId)}
                />
              </div>
            </div>
          ))
        // second part: selectionner parmis 3 empreintes
        answerForm = (
          <>
            {sousObjectif?.detail2 && <div>{renderText(sousObjectif?.detail2)}</div>}
            <form className='modal-objectif__form' onSubmit={handleSubmit}>
              <div className='modal-objectif__empreintes_zone'>{renderChoixEmpreintes(sousObjectif?.empreintes2)}</div>
              <button className='modal-objectif__button button--red'>Envoyer</button>
            </form>
          </>
        )
      }
    }
    if (sousObjectif.id === 13) {
      answerForm = (
        <form className='modal-objectif__form' onSubmit={handleSubmit}>
          <Input
            type='texte'
            label={data.label}
            name='objectif'
            placeholder='Ce champ est vide'
            value={value}
            setValue={setValue}
          />
          <button className='modal-objectif__button button--red'>Valider</button>
        </form>
      )
    }
    if (sousObjectif.id === 21) {
      answerForm = (
        <form className='modal-objectif__form' onSubmit={handleSubmit}>
          <Input
            type='texte'
            label={sousObjectif.label}
            name='objectif'
            placeholder='Ce champ est vide'
            value={value}
            setValue={setValue}
          />
          <button className='modal-objectif__button button--red'>Valider</button>
        </form>
      )
    }
    if (sousObjectif.id === 22) {
      answerForm = (
        <form className='modal-objectif__form' onSubmit={handleSubmit}>
          <button className='modal-objectif__button button--red'>Valider</button>
        </form>
      )
    }
    return (
      <>
        <h3 className='modal-objectif__title'>
          Sous-Objectif : <br /> {sousObjectif.title}
        </h3>
        {sousObjectif?.subtitle && <div>{sousObjectif?.subtitle}</div>}
        <div className='modal-objectif__errorMessage'>{errorMessage}</div>
        {answerForm}
      </>
    )
  }

  const [selectedChoice, setSelectedChoice] = useState('none')

  const handleChange = event => {
    setSelectedChoice(event.target.value)
  }

  const renderModal = () => {
    closeCompte()
    //TODO gestion des forulaires de réponses spécifiques
    if (sousObjectif) {
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <button className='modal-objectif__icon--container'>
              <img className='modal-objectif__icon' src={Cross} onClick={closeModal} alt='' />
            </button>
            <h2 className='modal-objectif__title'>
              Objectif : <br></br> {data.title}
            </h2>
            {renderSousObjectif()}
          </div>
        </div>
      )
    } else {
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <button className='modal-objectif__icon--container'>
              <img className='modal-objectif__icon' src={Cross} onClick={closeModal} alt='' />
            </button>
            <h2 className='modal-objectif__title'>
              Objectif : <br></br> {data.title}
            </h2>
            <div className='modal-objectif__errorMessage'>{errorMessage}</div>
            {data?.detail && <div>{renderText(data?.detail)}</div>}
            {renderListeSousObjectif()}
            {data?.answer && (
              <form className='modal-objectif__form' onSubmit={handleSubmit}>
                <Input
                  type='texte'
                  label={data.label}
                  name='objectif'
                  placeholder='Ce champ est vide'
                  value={value}
                  setValue={setValue}
                />
                {data.id === 3 && (
                  <select id='mobileChoice' value={selectedChoice} onChange={handleChange}>
                    {data?.choices.map((choice, index) => (
                      <option key={index} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                )}
                <button className='modal-objectif__button button--red'>Valider</button>
              </form>
            )}
          </div>
        </div>
      )
    }
  }

  const renderPharmacie = () => {
    const text = [
      "Je ne pense pas que les voleurs soient là... Mais ils ont l'air de s'être arrêtés dans cette pharmacie. Allons interroger le gérant."
    ]
    const handleClick = () => {
      dispatch({
        type: 'setEvent',
        id: 'box1audio2'
      })
      setPharmacie(false)
    }
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <div>{renderText(text)}</div>
          <button className='modal-objectif__button button--red' onClick={handleClick}>
            Interroger le pharmacien
          </button>
        </div>
      </div>
    )
  }

  const renderModalAnswer = () => {
    closeCompte()
    if (sousObjectif) {
      if (sousObjectif?.id === 12) {
        const event121 = events.find(event => event.id === 121)
        const firstPartIsDone = event121?.status === 'done'
        if (firstPartIsDone) {
          // second part
          return (
            <div className='modal-objectif__background'>
              <div className='modal-objectif__box'>
                <h2 className='modal-objectif__title'>
                  Objectif : <br></br> {data.title}
                </h2>
                <h3 className='modal-objectif__title'>
                  Sous-Objectif : <br /> {sousObjectif.title}
                </h3>
                {sousObjectif.answersrc2 && (
                  <audio autoPlay>
                    <source src={urlApi.cdn() + sousObjectif.answersrc2} type='audio/mpeg' />
                    Votre navigateur ne prend pas en charge ce format
                  </audio>
                )}
                <div>{renderText(sousObjectif.answertext2)}</div>
                <button className='modal-objectif__button button--red' onClick={handleModalAnswer}>
                  Continuer l&apos;enquête
                </button>
              </div>
            </div>
          )
        }
      }
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <h2 className='modal-objectif__title'>
              Objectif : <br></br> {data.title}
            </h2>
            <h3 className='modal-objectif__title'>
              Sous-Objectif : <br /> {sousObjectif.title}
            </h3>
            {sousObjectif.answersrc && (
              <audio autoPlay>
                <source src={urlApi.cdn() + sousObjectif.answersrc} type='audio/mpeg' />
                Votre navigateur ne prend pas en charge ce format
              </audio>
            )}
            <div>{renderText(sousObjectif.answertext)}</div>
            <button className='modal-objectif__button button--red' onClick={handleModalAnswer}>
              Continuer l&apos;enquête
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <h2 className='modal-objectif__title'>
              Objectif : <br></br> {data.title}
            </h2>
            {data.answersrc && (
              <audio autoPlay>
                <source src={urlApi.cdn() + data.answersrc} type='audio/mpeg' />
                Votre navigateur ne prend pas en charge ce format
              </audio>
            )}
            <div>{renderText(data?.answertext)}</div>
            <button className='modal-objectif__button button--red' onClick={handleModalAnswer}>
              Continuer l&apos;enquête
            </button>
          </div>
        </div>
      )
    }
  }

  const openDoneObjectifModal = objectif => {
    closeCompte()
    if (objectif?.isSousObjectif) {
      setSousObjectif(objectif)
    }
    setDoneObjectifModal(true)
  }

  const closeDoneObjectifModal = () => {
    setDoneObjectifModal(false)
    setSousObjectif(null)
  }

  const renderDoneObjectifModal = () => {
    closeCompte()
    if (sousObjectif) {
      if (sousObjectif?.id === 12) {
        const event121 = events.find(event => event.id === 121)
        const firstPartIsDone = event121?.status === 'done'
        if (firstPartIsDone) {
          // second part
          return (
            <div className='modal-objectif__background'>
              <div className='modal-objectif__box'>
                <h2 className='modal-objectif__title'>
                  Objectif : <br></br> {data.title}
                </h2>
                <h3 className='modal-objectif__title'>
                  Sous-Objectif : <br /> {sousObjectif.title}
                </h3>
                <div>{renderText(sousObjectif?.answertext2)}</div>
                <button className='modal-objectif__button button--red' onClick={closeDoneObjectifModal}>
                  Valider
                </button>
              </div>
            </div>
          )
        }
      }
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <h2 className='modal-objectif__title'>
              Objectif : <br></br> {data.title}
            </h2>
            <h3 className='modal-objectif__title'>
              Sous-Objectif : <br /> {sousObjectif.title}
            </h3>
            <div>{renderText(sousObjectif?.answertext)}</div>
            <button className='modal-objectif__button button--red' onClick={closeDoneObjectifModal}>
              Valider
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <h2 className='modal-objectif__title'>
              Objectif : <br></br> {data.title}
            </h2>
            <div>{renderText(data.answertext)}</div>
            <button className='modal-objectif__button button--red' onClick={closeDoneObjectifModal}>
              Valider
            </button>
          </div>
        </div>
      )
    }
  }

  // -- RENDER DES BOUTONS OBJECTIFS -- //

  const renderObjectif = objectif => {
    if (objectif.status == 'done') {
      return (
        <>
          <button className='objectif objectif--done' onClick={() => openDoneObjectifModal(objectif)}>
            <div className='objectif__mainInfo'>
              <div className='objectif__icon-wrapper'>
                <img src={Check} className='objectif__icon' alt='objectif terminé' />
              </div>
              <h3 className='objectif__title'>{objectif.title}</h3>
            </div>
            {!data?.isSousObjectif && (
              <div className='objectif__subInfo'>
                <p className='objectif__subtitle'>{objectif.subtitle}</p>
              </div>
            )}
          </button>
        </>
      )
    }
    if (objectif.status == 'open') {
      return (
        <>
          <button className='objectif objectif--open' onClick={() => openModal(objectif)}>
            <div className='objectif__mainInfo'>
              <div className='objectif__icon-wrapper'>
                <img src={LockOpen} className='objectif__icon' alt='objectif ouvert' />
              </div>
              <h3 className='objectif__title'>{objectif.title}</h3>
            </div>
            {!objectif?.isSousObjectif && (
              <div className='objectif__subInfo'>
                <p className='objectif__subtitle'>{objectif.subtitle}</p>
              </div>
            )}
          </button>
        </>
      )
    }
    if (objectif.status == 'closed') {
      return (
        <>
          <button className='objectif objectif--closed'>
            <div className='objectif__icon-wrapper--closed'>
              <img src={LockClosed} className='objectif__icon' alt='objectif bloqué' />
            </div>
            <h3 className='objectif__title--closed'>Cet objectif est bloqué pour le moment</h3>
          </button>
        </>
      )
    }
  }

  return (
    <>
      {renderObjectif(data)}
      {/* {renderLieu()} */}
      {modal && renderModal()}
      {modalAnswer && renderModalAnswer()}
      {doneObjectifModal && renderDoneObjectifModal()}
      {popupDebutHacking && renderPopupDebutHacking()}
      {popupFinHacking && renderPopupFinHacking()}
      {interrogatoireTim && <InterrogatoireInterractif onClose={onCloseInterrogatoireTim} />}
      {popupImagesCamera && renderPopupImagesCamera()}
      {pharmacie && renderPharmacie()}
      {interrogatoireSimon && renderInterrogatoireSimon()}
      {denoncerTim && renderDenoncerTim()}
      {reponseEmail && renderReponseEmail()}
    </>
  )
}

Objectif.propTypes = {
  data: PropTypes.object
}

export default Objectif
