import { useState, useContext, useEffect } from 'react'
import { DataContext, BoxContext } from '../../utils/context/fetchContext'
import useApi from '../../utils/hooks/useApi.js'
import { urlApi } from '../../utils/const/urlApi.js'

const Empreintes = () => {
  const { toggleDataEvent, actionToggleDataEvent, actionToggleDataHistory } = useContext(DataContext)
  const { getEventByBox, updateEvent, updateHistory } = useApi()

  const { currentBox } = useContext(BoxContext)
  const token = localStorage.getItem('token')

  const [modal, setModal] = useState(true)
  const [modalAnswer, setModalAnswer] = useState(false)

  const data = {
    title: "Liste des empreintes ",
    choices: [
      'Inconnu',
      'Alexandra Allavena',
      'Eric Lombardo',
      'Philippe Pizzio',
      'Richard Granville',
      'Simon Berbre',
      'Sophie Palmero',
      'Tim Lombardo'
    ],
    zones: [
      {
        nom: 'Zone du banquier',
        empreintes: [
          'proto3/assets/empreintes/richard-granville.jpg',
          'proto3/assets/empreintes/philippe-pizzio.jpg',
          'proto3/assets/empreintes/inconnu-sacha.jpg'
        ]
      },
      {
        nom: 'Accès à la zone sécurisée',
        empreintes: [
          'proto3/assets/empreintes/alexandra-allavena.jpg',
          'proto3/assets/empreintes/eric-lombardo.jpg',
          'proto3/assets/empreintes/inconnu-sacha.jpg',
          'proto3/assets/empreintes/sophie-palmero.jpg'
        ]
      },
      {
        nom: 'Local du STAFF et Réserve',
        empreintes: [
          'proto3/assets/empreintes/philippe-pizzio.jpg',
          'proto3/assets/empreintes/sophie-palmero.jpg',
          'proto3/assets/empreintes/simon-berbre.jpg',
          'proto3/assets/empreintes/alexandra-allavena.jpg'
        ]
      },
      {
        nom: 'Maintenance et Surveillance',
        empreintes: [
          'proto3/assets/empreintes/simon-berbre.jpg',
          'proto3/assets/empreintes/sophie-palmero.jpg',
          'proto3/assets/empreintes/tim-lombardo.jpg'
        ]
      },
      {
        nom: 'Zone sécurisée de transfert de fonds',
        empreintes: [
          'proto3/assets/empreintes/eric-lombardo.jpg',
          'proto3/assets/empreintes/inconnu-sacha.jpg',
          'proto3/assets/empreintes/simon-berbre.jpg',
          'proto3/assets/empreintes/philippe-pizzio.jpg'
        ]
      }
    ],
    answer: [
      'richardgranville',
      'philippepizzio',
      'inconnu',
      'alexandraallavena',
      'ericlombardo',
      'inconnu',
      'sophiepalmero',
      'philippepizzio',
      'sophiepalmero',
      'simonberbre',
      'alexandraallavena',
      'simonberbre',
      'sophiepalmero',
      'timlombardo',
      'ericlombardo',
      'inconnu',
      'simonberbre',
      'philippepizzio'
    ],
    answertext: [
      'Bien vu, Il semblerait que nous ayons une empreinte intruse, je lance de ce pas une identification !',
      "Vous pourrez retrouver la liste de relevés d'empreinte dans votre historique."
    ],
    errorMessage: 'Je ne pense pas que ce soit cela.',
    detail2: ['Ah, tenez j’en ai trois qui correspondent à 90%. Vous pensez que vous pouvez identifier la bonne ?'],
    empreintes2: [
      'proto3/assets/empreintes/inconnu-mauvais-1.jpg',
      'proto3/assets/empreintes/inconnu-mauvais-2.jpg',
      'proto3/assets/empreintes/inconnu-sacha.jpg'
    ],
    answer2: 2,
    answertext2: [
      'Attendez, je vérifie... Mortel !',
      'Ça correspond à 100%, merci !',
      'Voici donc le résultat : Sacha Leza, né·e le 22 février 1994.',
      'Je vous mets sa fiche identité dans votre historique. Iel n’a pas beaucoup d’antécédents...',
      'Ah, si ! Une interpellation pour avoir tenté d’usurper l’identité de quelqu’un dans une banque en prenant son apparence.',
      'On dirait qu’iel est plutôt doué·e pour se déguiser...'
    ],
    errorMessage2: 'Je ne pense pas que ce soit cela.'
  }

  const [errorMessage, setErrorMessage] = useState(false)
  const [value, setValue] = useState('')
  const [selectedChoices, setSelectedChoices] = useState([])
  const [events, setEvents] = useState(null)

  useEffect(() => {
    const getEvents = async () => {
      const events_ = await getEventByBox(token, currentBox)
      setEvents(events_.data)
    }
    getEvents()
  }, [toggleDataEvent])

  const renderText = (data) => {
    if (!data) {
      return
    }
    const text = data.map((el, i) => {
      return (
        <p className='modal-objectif__subtitle' key={i}>
          {el}
        </p>
      )
    })
    return text
  }

  const slugify = (input) => {
    const inputSlugified = input
      .replace(/\s/g, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
    return inputSlugified
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let condition = null
    const event121 = events && events.find((event) => event.id === 121)
    const firstPartIsDone = event121?.status === 'done'
    if (!firstPartIsDone) {
      // first part
      condition = data?.answer.every((answer, id) => selectedChoices[id] === answer)
      console.log(data.answer)
      console.log(selectedChoices)
    } else {
      // second part
      condition = value === data?.answer2
    }
    if (condition) {
      setErrorMessage('')
      setValue('')
      setModal(false)
      setModalAnswer(true)
    } else {
      setErrorMessage(data.errorMessage)
    }
  }

  const event121 = events && events.find((event) => event.id === 121)
  const firstPartIsDone = event121?.status === 'done'



  let answerForm

  if (!firstPartIsDone) {
    if (selectedChoices.length === 0) {
      const initialSelectedChoices = data?.zones.flatMap((zone) => zone.empreintes.map(() => 'inconnu'))
      setSelectedChoices(initialSelectedChoices)
    }

    const handleSelectChange = (zoneId, empreinteId, value) => {
      let index = 0

      for (let i = 0; i < zoneId; i++) {
        index += data?.zones[i]?.empreintes.length || 0
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
              onChange={(e) => handleSelectChange(zoneId, empreinteId, e.target.value)}
            >
              {data?.choices.map((choice, index) => (
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
    const renderedZones = data?.zones.map((zone, index) => renderZone(zone, index))
    // first part: identifier les empreintes par zones
    answerForm = (
      <form className='modal-objectif__form' onSubmit={handleSubmit}>
        {renderedZones}
        <button type='submit' className='modal-objectif__button button--red'>
          Envoyer
        </button>
      </form>
    )
  } else {
    const renderChoixEmpreintes = (empreintes) =>
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
        {data?.detail2 && <div>{renderText(data?.detail2)}</div>}
        <form className='modal-objectif__form' onSubmit={handleSubmit}>
          <div className='modal-objectif__empreintes_zone'>{renderChoixEmpreintes(data?.empreintes2)}</div>
          <button type='submit' className='modal-objectif__button button--red'>
            Envoyer
          </button>
        </form>
      </>
    )
  }

  const renderModal = () => {
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <h3 className='modal-objectif__title'>
            {data.title}
          </h3>
          {data?.subtitle && <div>{data?.subtitle}</div>}
          <div className='modal-objectif__errorMessage'>{errorMessage}</div>
          {answerForm}
        </div>
      </div>
    )
  }

  const handleModalAnswer = async () => {
    setModalAnswer(false)

    const event121 = events && events.find((event) => event.id === 121)
    const firstPartIsDone = event121?.status === 'done'
    if (!firstPartIsDone) {
      // first part
      await updateEvent(token, 1, 121, 'done')
      actionToggleDataEvent()
      await updateHistory(token, currentBox, 'box1document1')
      actionToggleDataHistory()
      setModal(true)
      return
    }
  }

  const renderModalAnswer = () => {
    const event121 = events && events.find((event) => event.id === 121)
    const firstPartIsDone = event121?.status === 'done'
    if (firstPartIsDone) {
      // second part
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <h3 className='modal-objectif__title'>
              {data.title}
            </h3>
            <div>{renderText(data.answertext2)}</div>
            <button type='button' className='modal-objectif__button button--red' onClick={handleModalAnswer}>
              Continuer l&apos;enquête
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='modal-objectif__background'>
          <div className='modal-objectif__box'>
            <h3 className='modal-objectif__title'>
              {data.title}
            </h3>
            <div>{renderText(data.answertext)}</div>
            <button type='button' className='modal-objectif__button button--red' onClick={handleModalAnswer}>
              Continuer l&apos;enquête
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {modal && renderModal()}
      {modalAnswer && renderModalAnswer()}
    </>
  )
}

export default Empreintes