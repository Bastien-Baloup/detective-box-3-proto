/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Lauren
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from '../../../components/Input.jsx'
import Audio from '../../../components/Audio.jsx'
import Cross from '../../../assets/icons/Icon_Cross-white.svg'
import PropTypes from 'prop-types'
import { urlApi } from '../../../utils/const/urlApi.js'
import { BoxContext, DataContext, AmbianceContext, CompteContext } from '../../../utils/context/fetchContext.jsx'
import { useContext, useState, useEffect, useMemo } from 'react'
// import { dataLauren } from "../utils/const/dataLauren";
import useApi from '../../../utils/hooks/useApi.js'
import useEvent from '../../../utils/hooks/useEvent.js'

const Lauren = ({ closeAgentPage }) => {
  const { currentBox } = useContext(BoxContext)
  const { pauseNappe } = useContext(AmbianceContext)
  const token = localStorage.getItem('token')
  const { actionToggleDataLauren, toggleDataLauren, actionToggleDataHistory, toggleDataObjectif } =
    useContext(DataContext)
  const {
    updateCharactersById,
    updateHistory,
    getCharactersById,
    getObjectivesByBox,
    getHistoryByBox
  } = useApi()
  const { dispatch } = useEvent()
  const { closeCompte } = useContext(CompteContext)

  //EXPLICATION : Lauren est le personnage "2"

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharactersById(token, 2)
      setDataLauren(result)
    }
    fetchData()
  }, [toggleDataLauren])

  const [dataObjectif, setDataObjectif] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const objectifs = await getObjectivesByBox(token, currentBox)
      setDataObjectif(objectifs.data)
    }
    fetchData()
  }, [toggleDataObjectif])

  const obj3 = useMemo(() => dataObjectif && dataObjectif.find(document => document.id == 3)?.status, [dataObjectif])

  const [dataHistory, setDataHistory] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const documents = await getHistoryByBox(token, currentBox)
      setDataHistory(documents.data)
    }
    fetchData()
  }, [toggleDataObjectif])

  const box1audio9 = useMemo(() => dataHistory && dataHistory.find(document => document.id === 'box1audio9')?.status)
  const box1audio10 = useMemo(() => dataHistory && dataHistory.find(document => document.id === 'box1audio10')?.status)

  const [dataLauren, setDataLauren] = useState(null)

  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [modal, setModal] = useState(false)
  const [modalMedia, setModalMedia] = useState(false)
  const [answer, setAnswer] = useState('')
  const [pharmacie, setPharmacie] = useState(false)
  const [autopsie, setAutopsie] = useState(false)

  // EXPLICATION : Fonction pour slugifier l'input des joueurs
  const slugify = input => {
    let inputSlugified = input
      .replace(/\s/g, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
    return inputSlugified
  }

  // EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
  // EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (générique, box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
  // EXPLICATION : Celine et Lauren sont les seules à avoir des boxs génériques
  const handleSubmit = e => {
    e.preventDefault()
    const thisBox = dataLauren.find(element => element.box_id == currentBox).data
    //const generic = dataLauren.find(element => element.box_id == 4).data
    console.log(slugify(value))
    const answerInThisBox = thisBox.find(element => element.ask.includes(slugify(value)))
    const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status
    //const answerInFailedInterview = generic.find(element => element.ask.includes(slugify(value)))
    if (value == '') {
      setErrorMessage("Il me faut l'identité de la personne à interroger")
      setValue('')
      return
    }
    if (previouslyAnsweredInThisBox) {
      setValue('')
      setErrorMessage(
        "Vous m'avez dejà demandé d'interroger cette personne. Rendez-vous dans l'Historique pour réécouter l'interview."
      )
      return
    }
    if (answerInThisBox) {
      setAnswer(answerInThisBox)
      setValue('')
      setErrorMessage('')

      if (answerInThisBox.id == 'box1audio2') {
        setPharmacie(true)
        return
      }
      if (obj3 === 'closed') {
        if (['box1audio9', 'box1audio10', 'box1audio11'].includes(answerInThisBox.id)) {
          setAnswer({ text: ['Ils n’ont rien eu de plus à me dire que ce qu’ils ont déjà déclaré à la police'] })
        }
      }

      setModal(true)
      return
    }
    // if (answerInFailedInterview) {
    //   setAnswer(answerInFailedInterview)
    //   setModal(true)
    //   setValue('')
    //   setErrorMessage('')
    //   return
    // }
    setValue('')
    setErrorMessage("Je n'ai pas pu joindre la personne dont vous me parlez.")
  }

  const renderPharmacie = () => {
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
          <div>{renderText()}</div>
          <button className='modal-objectif__button button--red' onClick={handleClick}>
            Interroger le pharmacien
          </button>
        </div>
      </div>
    )
  }

  const renderModal = () => {
    closeCompte()
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          {answer.srcComment ? (
            <audio autoPlay>
              <source src={urlApi.cdn() + answer.srcComment} type='audio/mpeg' />
              Votre navigateur ne prend pas en charge ce format
            </audio>
          ) : (
            ''
          )}
          <div>{renderText()}</div>
          {answer.id ? (
            <button className='modal-objectif__button button--red' onClick={openMedia}>
              Voir l&apos;élément
            </button>
          ) : (
            <button className='modal-objectif__button button--red' onClick={validateModal}>
              Nouvelle requête
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderText = () => {
    const text = answer.text.map((el, i) => {
      return (
        <p className='modal-objectif__subtitle' key={i}>
          {el}
        </p>
      )
    })
    return text
  }

  const validateModal = () => {
    setModal(false)
  }

  const openMedia = () => {
    pauseNappe()
    validateModal()
    setModalMedia(true)
  }

  const renderModalMedia = () => {
    closeCompte()
    return (
      <Audio
        title={answer.title}
        srcImg1={urlApi.cdn() + answer.img1}
        srcImg2={urlApi.cdn() + answer.img2}
        srcTranscription={urlApi.cdn() + answer.srcTranscript}
        srcAudio={urlApi.cdn() + answer.srcAudio}
        handleModalAudio={() => closeModalMedia(answer.id, answer.ask)}
      />
    )
  }

  const closeModalMedia = async (answerId, asnwerAsk) => {
    await updateCharactersById(token, 2, currentBox, asnwerAsk)
    await updateHistory(token, currentBox, answerId)
    actionToggleDataLauren()
    actionToggleDataHistory()
    if ((answerId === 'box1audio9' && box1audio10) || (answerId === 'box1audio10' && box1audio9)) {
      setMensonge(true)
    }
    if (answerId === 'box1audio11') {
      setAutopsie(true)
    }
    setModalMedia(false)
  }

  const catchphraseLauren = [
    'sounds/402-repliques-lauren-1.mp3',
    'sounds/402-repliques-lauren-2.mp3',
    'sounds/402-repliques-lauren-3.mp3',
    'sounds/402-repliques-lauren-4.mp3',
    'sounds/402-repliques-lauren-5.mp3',
    'sounds/402-repliques-lauren-6.mp3',
    'sounds/402-repliques-lauren-7.mp3'
  ]

  const randomNumberLauren = Math.floor(Math.random() * catchphraseLauren.length)

  const closeAutopsie = async () => {
    await updateHistory(token, 1, 'box1document7')
    actionToggleDataHistory()
    setAutopsie(false)
  }

  const renderAutopsie = () => {
    closeCompte()
    const text = [
      "Ça y est, j'ai enfin fini l'autopsie ! Voici les résultats :",
      'Conclusion de l’autopsie complète :',
      'Informations données lors de l’autopsie préliminaire : Aucune contradiction',
      'Informations supplémentaires : Au vu des caractéristiques d’angle et de profondeur de la blessure, celle-ci a été infligée par une personne d’une taille égale ou inférieure à celle de la victime.',
      'Remarques : J’ai analysé les tatouages de la victime avec Google Lens, c’est trop pratique pour ça ! Malheureusement ils étaient trop abimés pour que ça donne un résultat...'
    ]
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <div>
            {text.map((el, i) => {
              return (
                <p className='modal-objectif__subtitle' key={i}>
                  {el}
                </p>
              )
            })}
          </div>
          <button className='modal-objectif__button button--red' onClick={closeAutopsie}>
            Continuer l&apos;enquête
          </button>
        </div>
      </div>
    )
  }

  const [mensonge, setMensonge] = useState(false)

  const clickPhilippe = () => {
    setMensonge(false)
    setPhilippe(true)
  }

  const clickSimon = () => {
    setMensonge(false)
    setSimon(true)
  }

  const renderMensonge = () => {
    return (
    <div className='modal-objectif__background'>
      <div className='modal-objectif__box'>
        <div>Lauren : "À votre avis, y en a-t-il un des deux qui a menti ?"</div>  
          <button className='modal-objectif__button button--red' onClick={clickPhilippe}>Philippe</button>
          <button className='modal-objectif__button button--red' onClick={clickSimon}>Simon</button>
      </div>
    </div>
    )
  }

  const [philippe, setPhilippe] = useState(false)

  const renderPhilippe = () => {
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <div>"Lauren :Oui, vous avez raison, il n’a pas l'air d'avoir tout dit. Il n’a pas d’alibi, rien ?"</div>  
          <button className='modal-objectif__button button--red' onClick={() => setPhilippe(false)}>Continuer l&apos;enquête</button>
        </div>
      </div>
    )
  }

  const [simon, setSimon] = useState(false)

  const closeSimon = async () => {
    await updateHistory(token, 1, 'box1document8')
    actionToggleDataHistory()
    setSimon(false)
  }

  const renderSimon = () => {
    return (
      <div className='modal-objectif__background'>
      <div className='modal-objectif__box'>
        <div>"Oui, j’ai noté aussi qu’il a menti à plusieurs reprises, attendez je demande à Tim qu’il me sorte ce qu’il a sur lui... Voilà, tenez !"</div>  
        <button className='modal-objectif__button button--red' onClick={closeSimon}>Continuer l&apos;enquête</button>
      </div>
    </div>
    )
  }

  return (
    <>
      {modal && renderModal()}
      {modalMedia && renderModalMedia()}
      {pharmacie && renderPharmacie()}
      {autopsie && renderAutopsie()}
      {mensonge && renderMensonge()}
      {philippe && renderPhilippe()}
      {simon && renderSimon()}
      <audio autoPlay>
        <source src={urlApi.cdn() + catchphraseLauren[randomNumberLauren]} type='audio/mpeg' />
        Votre navigateur ne prend pas en charge ce format
      </audio>
      <div className='agent'>
        <div className='agent__portrait--container'>
          <img
            className='agent__portrait'
            src={urlApi.cdn() + 'assets/photos-personnages/lauren.jpg'}
            alt='Photo de Lauren'
          />
        </div>
        <div className='agent__main'>
          <div className='agent__title--container'>
            <p className='agent__title'>Qui souhaitez-vous interroger ?</p>
          </div>
          <div className='agent__errorMessage'>{errorMessage}</div>
          <form className='agent__form' onSubmit={handleSubmit}>
            <Input
              type='texte'
              label='Prénom et Nom'
              name='lauren'
              placeholder='Ce champ est vide'
              value={value}
              setValue={setValue}
            />
            <button className='agent__form__button button--red'>Valider</button>
          </form>
        </div>
        <button className='agent__closeButton--container' onClick={closeAgentPage}>
          <img src={Cross} className='agent__closeButton' alt='fermer' />
        </button>
      </div>
    </>
  )
}

Lauren.propTypes = {
  closeAgentPage: PropTypes.func
}

export default Lauren
