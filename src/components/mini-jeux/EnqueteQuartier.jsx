/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { urlApi } from '../../utils/const/urlApi'
import PropTypes from 'prop-types'
import Cross from '../../assets/icons/Icon_Cross-white.svg'

const EnqueteQuartier = ({ onValid }) => {
  const [discoveredZones, setDiscoveredZones] = useState(0)
  const [visitedPlaces, setVisitedPlaces] = useState({})
  const [popupOpened, setPopupOpened] = useState(false)
  const [currentPlace, setCurrentPlace] = useState()

  const zones = [
    // Zone 0 (Initial Zone)
    {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      trigger: 1,
      places: [
        {
          img: 'path/to/image.jpg',
          top: 'min(9dvw, 143px)',
          left: 'min(15dvw, 239px)',
          title: 'PHARMACIE',
          subtitle: 'Fontvieille',
          text: [
            'Nous avons déjà interrogé le pharmacien',
            "Continuons notre enquête de quartier avec l'aide du portrait-robot. Les commerces des environs ont certainement déjà vu cette personne.",
            'Ils pourront surement nous aider à trouver la planque du gang de La Horde.'
          ]
        }
      ]
    },
    // Zone 1
    {
      top: 'min(8dvw, 127px)',
      left: 'min(7dvw, 111px)',
      width: 'min(19dvw, 303px)',
      height: 'min(14dvw, 223px)',
      trigger: 4,
      places: [
        {
          img: 'path/to/image.jpg',
          top: 'min(13.5dvw, 215px)',
          left: 'min(7.75dvw, 123px)',
          title: 'BOULANGERIE',
          subtitle: 'Au bon pain du Rocher',
          text: [`"Je suis désolé, je ne l'ai jamais vue."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(17.5dvw, 279px)',
          left: 'min(22dvw, 351px)',
          title: 'SALON DE BEAUTÉ',
          subtitle: 'Beauty Chamber',
          text: [
            `"Mmmh, oui je l’ai vu passer quand j’étais en pause clope, je m’en souviens car elle avait des cheveux roux, j’étais à deux doigts de lui demander si c’était naturel ou une couleur... et si c’était la dernière option je voulais le nom de son coiffeur ! Elle était avec un jeune et ils parlaient de masques, je crois..."`
          ],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(18.5dvw, 295px)',
          left: 'min(15dvw, 239px)',
          title: 'BAR TABAC',
          subtitle: 'le Fontvieille',
          text: [
            `"Ah ouais, joli brin de femme ! Un peu âgée à mon goût... Je l'ai vu passer il y a quelques jours, elle avait l'air préssée, elle cherchait quelque chose. Je l'ai revu quelques temps après, elle avait un sac en main, ça ressemblait un peu à ces sacs de boutique de décoration un peu huppée, vous voyez l'idée ?"`
          ],
          end: false
        }
      ]
    },

    // Zone 2
    {
      top: 'min(16dvw, 255px)',
      left: 'min(16dvw, 255px)',
      width: 'min(25dvw, 400px)',
      height: 'min(22dvw, 351px)',
      trigger: 8,
      places: [
        {
          img: 'path/to/image.jpg',
          top: 'min(32dvw, 511px)',
          left: 'min(18.75dvw, 300px)',
          title: 'COIFFEUR',
          subtitle: 'Admira’Tif',
          text: [`"Je suis désolé, je n'ai jamais vu cette femme."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(19dvw, 304px)',
          left: 'min(32.5dvw, 519px)',
          title: 'RESTAURANT',
          subtitle: 'La Rallonge',
          text: [`"Je suis désolé, je ne l'ai jamais vue."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(26dvw, 415px)',
          left: 'min(23dvw, 367px)',
          title: 'QUINCAILLERIE',
          subtitle: 'Tout pour la maison',
          text: [`"Une femme austère si vous voulez mon avis... Je ne l’ai jamais vu en revanche."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(34dvw, 543px)',
          left: 'min(33dvw, 527px)',
          title: 'MAGASIN DE DÉGUISEMENT',
          subtitle: 'Un jour, un masque',
          text: [
            `"Oui, je l’ai vu, elle est passée il y a quelques temps de ça, chercher une commande qu’on m’avait passé au nom d’un certain Cédric. C’était très spécifique, cinq masques d’animaux : un loup, un lapin, un caméléon, un renard et un lynx. Elle doit vivre dans le quartier parce qu’elle avait un sac du restaurant japonais."`
          ],
          end: false
        }
      ]
    },

    // Zone 3
    {
      top: 'min(26dvw, 415px)',
      left: 'min(32dvw, 511px)',
      width: 'min(36dvw, 575px)',
      height: 'min(22dvw, 351px)',
      trigger: 100,
      places: [
        // Define places for Zone 3
        {
          img: 'path/to/image.jpg',
          top: 'min(27.5dvw, 439px)',
          left: 'min(44dvw, 703px)',
          title: 'CORDONNIER',
          subtitle: 'Seconde semelle',
          text: [`"Je suis désolé, je ne l'ai jamais vue."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(39.5dvw, 631px)',
          left: 'min(44.5dvw, 711px)',
          title: 'SUPERMARCHÉ',
          subtitle: 'Casino de Fontvieille',
          text: [`"Je suis désolé, je n'ai jamais vu cette femme."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(34.5dvw, 551px)',
          left: 'min(51.5dvw, 822px)',
          title: 'RESTAURANT',
          subtitle: 'La Faim des Haricots',
          text: [`"Je suis désolé, je ne l'ai jamais vue."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(45dvw, 719px)',
          left: 'min(55.5dvw, 886px)',
          title: 'MAGASIN DE PRÊT-A-PORTER',
          subtitle: 'Côté Style',
          text: [`"Je suis désolé, je n'ai jamais vu cette femme."`],
          end: false
        },
        {
          img: 'path/to/image.jpg',
          top: 'min(34dvw, 543px)',
          left: 'min(64.5dvw, 1030px)',
          title: 'RESTAURANT',
          subtitle: 'Moshi-Moshi',
          text: [
            `"Ah oui, je m’en souviens, elle m’a passé une commande pour le soir et quand j’ai rappelé pour dire que c’était prêt, je me suis aperçue qu’elle m’avait laissé le numéro de leur concierge.... C’était bizarre. Tenez, je l’ai encore : 01 23 45 67 89."`
          ],
          end: true
        }
        // Add more places as needed
      ]
    }
  ]
  const renderText = data => {
    const text = data.map((el, i) => {
      return (
        <p className='modal-objectif__subtitle' key={i}>
          {el}
        </p>
      )
    })
    return text
  }

  const handlePlaceClick = place => {
    setCurrentPlace(place)
    setPopupOpened(true)
    const temp = { ...visitedPlaces }
    temp[place.title] = true
    setVisitedPlaces(temp)
  }

  const renderPlaces = () => {
    return zones.slice(0, discoveredZones + 1).map((zone, index) =>
      zone.places.map((place, index2) => (
        <button
          className={'place zone-' + index}
          onClick={() => handlePlaceClick(place)}
          style={{
            position: 'absolute',
            top: place.top,
            left: place.left,
            zIndex: 6
          }}
          key={index * 100 + index2}
        >
          <img src={place.img} alt='' />
        </button>
      ))
    )
  }
  const renderZones = () => {
    return zones.slice(0, discoveredZones + 1).map((zone, index) => (
      <div
        className={'zone zone-' + index}
        style={{
          position: 'absolute',
          top: zone.top,
          left: zone.left,
          width: zone.width,
          height: zone.height,
          zIndex: 5
        }}
        key={index}
      />
    ))
  }

  const renderPopup = () => {
    const closeModal = () => {
      setCurrentPlace(null)
      setPopupOpened(false)
      console.log(Object.keys(visitedPlaces).length)
      console.log(zones[discoveredZones].trigger)
      if (Object.keys(visitedPlaces).length >= zones[discoveredZones].trigger) {
        setDiscoveredZones(discoveredZones + 1)
      }
    }
    return (
      <div className='modal-objectif__background'>
        <div className='modal-objectif__box'>
          <button className='modal-objectif__icon--container'>
            <img className='modal-objectif__icon' src={Cross} onClick={closeModal} alt='' />
          </button>
          <h2 className='modal-objectif__title'>{currentPlace.title}</h2>
          <h3 className='modal-objectif__title'>{currentPlace.subtitle}</h3>

          <div>{renderText(currentPlace.text)}</div>
          {currentPlace.end && (
            <button className='modal-objectif__button button--red' onClick={onValid}>
              Appeler le concierge
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div id='enquete-quartier'>
      <img id='background' src={urlApi.cdn() + 'proto3/assets/enquete-quartier.jpg'} alt='' />
      {renderPlaces()}
      {renderZones()}
      {popupOpened && renderPopup()}
    </div>
  )
}

EnqueteQuartier.propTypes = {
  onValid: PropTypes.func
}

export default EnqueteQuartier
