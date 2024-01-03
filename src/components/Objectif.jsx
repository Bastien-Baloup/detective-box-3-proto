/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant est très complexe et important : il permet de rendre les objectifs
// EXPLICATION : Il affiche egalement toute la logique de validation des objectifs
// EXPLICATION : Il affiche egalement toute la logique des différents événements de l'application

import PropTypes from "prop-types";
import {
  useState,
  useEffect,
  useLayoutEffect,
  // useCallback,
} from "react";
import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";
import Input from "./Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
// import Document from "../components/Document";
// import Video from "../components/Video";
// import Audio from "../components/Audio";

import { urlApi } from "../utils/const/urlApi";
import {
  // BoxContext,
  DataContext,
  // AmbianceContext,
  CompteContext
} from "../utils/context/fetchContext";
import { useContext } from "react";
// import useApi from "../utils/hooks/useApi.js";
// import useEvent from "../utils/hooks/useEvent.js";
// import useLieu from '../utils/hooks/useLieu.jsx'



const Objectif = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [modalAnswer, setModalAnswer] = useState(false);
  const [modalAnswerBis, setModalAnswerBis] = useState(false);
  const [modalBis, setModalBis] = useState(false);
  const [doneObjectifModal, setDoneObjectifModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [value, setValue] = useState("");
  const [nextStep, setNextStep] = useState(false);

  // const { currentBox } = useContext(BoxContext);
  // const token = localStorage.getItem("token");
  // const { pauseNappe } = useContext(AmbianceContext);
  const {
    // actionToggleDataEvent,
    toggleDataEvent,
    // actionToggleDataHelp,
    toggleDataHelp,
    // actionToggleDataHistory,
    toggleDataHistory,
    // actionToggleDataObjectif,
    toggleDataObjectif,
  } = useContext(DataContext);
  const { closeCompte } = useContext(CompteContext);

  // const {
    // updateHelp,
    // getEventByBox,
    // updateEvent,
    // getHistoryByBox,
    // getHelpByBox,
    // updateHistory,
    // updateObjectives,
    // getObjectivesByBox,
  // } = useApi();

  // const { dispatch } = useEvent();
  // const { renderLieu, setLieu, setLieuOpen } = useLieu()

  // const openLieu = (lieu) => {
	// 	setLieu(lieu)
	// 	setLieuOpen(true)
	// 	setModal(false)
	// }
  // EXPLICATION : Fonction pour récupérer l'état des événements
  useLayoutEffect(() => {
    const fetchData = async () => {
      //TODO Récupération des évènements, exemple:
      // const events = await getEventByBox(token, currentBox);
      // if (events != undefined) {
      //   const event13Data = events.data.find((event) => event.id === 13);
      //   event13.current = event13Data.status;
      // }
    };
    fetchData();
  }, [toggleDataEvent]);

  // EXPLICATION : Fonction pour récupérer l'état de l'historique
  useEffect(() => {
    const fetchData = async () => {
      //TODO Récupération data de l'historique, exemple:
      // const clues = await getHistoryByBox(token, currentBox);
      // const box1video3Data = clues.data.find((event) => event.id == "box1video3");
      // setBox1Video3(box1video3Data.status);
    };
    fetchData();
  }, [toggleDataHistory]);

  // EXPLICATION : Fonction pour récupérer l'état des renforts (help)
  useEffect(() => {
    const fetchData = async () => {
      //TODO Récupération data des renforts, exemple:
      // const help = await getHelpByBox(token, currentBox);
      // const box3help4Data = help.data.find(
      //   (event) => event.id == "box3help4"
      // );
      // setBox3Help4(box3help4Data.status);
    };
    fetchData();
  }, [toggleDataHelp]);

  // EXPLICATION : UseEffect pour récupérer l'état des objectifs
  useEffect(() => {
    const fetchData = async () => {
      //TODO Récupération data des objectifs, exemple:
      // const objectifs = await getObjectivesByBox(token, currentBox);
      // const objectif12Data = objectifs.data.find((event) => event.id == 12);
      // setObjectif12(objectif12Data.status);
    };
    fetchData();
  }, [toggleDataObjectif]);


//TODO traitements spécifiques d'objectifs


  // -- GENERIQUE -- //

  const handleModal = () => {
    if (!modal) { closeCompte() }
    setModal(!modal);
    setErrorMessage("");
    setValue("");
  };

  const handleModalBis = () => {
    if (!modalBis) { closeCompte() }
    setModalBis(!modalBis);
    setErrorMessage("");
    setValue("");
  };

  const slugify = (input) => {
    let inputSlugified = input
      .replace(/\s/g, "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
    return inputSlugified;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.answer.includes(slugify(value))) {
      //TODO Gestion spécifique bonnes réponses, exemples
			// if (data.id == 13 && box1video3 == false) {
			// 	setErrorMessage("Je pense que nous avons trop peu d'éléments pour tirer une conclusion pour cette piste");
			// 	setValue("");
			// 	return;
			// }

      setErrorMessage("");
      setValue("");
      setModal(false);
      setModalAnswer(true);
      return;
    } else {
      //TODO Gestion spécifique réponses fausses, exemples:
      // if (data.id == 13) {
      //   if (slugify(value) == "jacquelinegarraud") {
      //     setErrorMessage("Est-ce qu'elle n'est pas connue sous un autre nom ?");
      //     setValue("");
      //     return;
      //   }
      // }

      setErrorMessage(data.errorMessage);
      setValue("");
    }
  };

  const handleModalAnswer = async () => {
    if (data.newdetail) {
      setModalAnswer(false);
      setModalBis(true);
      setNextStep(true);
      return;
    } else {
      setModalAnswer(false);
      //TODO Gestion validation objectif, exemples:
      // if (data.id == 21) {
      //   setAudioSamuel(true);
      //   pauseNappe();
      //   return;
      // }
      // if (data.id == 23) {
      //   await updateObjectives(token, 2, 23, "done");
      //   await updateHelp(token, 2, "box2help3", "done");
      //   actionToggleDataObjectif();
      //   actionToggleDataHelp();
      //   await updateHistory(token, 2, "box2document9");
      //   dispatch({
      //     type: "setEvent",
      //     id: "box2document9",
      //   });
      //   actionToggleDataHistory();
      //   return;
      // }
    }
  };

  const handleSubmitBis = (e) => {
    e.preventDefault();
    if (data.newanswer.includes(slugify(value))) {
      setErrorMessage("");
      setValue("");
      setModalBis(false);
      setModalAnswerBis(true);
      return;
    } else {
      setErrorMessage(data.newerrorMessage);
      setValue("");
    }
  };

  const handleModalAnswerBis = async () => {
    setModalAnswerBis(false);
    setNextStep(false);
    //TODO validation objectifs à 2 réponses
  };

  const renderModal = () => {
    closeCompte()
    //TODO gestion des forulaires de réponses spécifiques
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <button className="modal-objectif__icon--container">
            <img
              className="modal-objectif__icon"
              src={Cross}
              onClick={handleModal}
              alt=""
            />
          </button>
          <h2 className="modal-objectif__title">
            Objectif : <br></br> {data.title}
          </h2>
          <div className="modal-objectif__errorMessage">{errorMessage}</div>
          <div>{renderText(data.detail)}</div>
          <form className="modal-objectif__form" onSubmit={handleSubmit}>
            <Input
              type="texte"
              label={data.label}
              name="objectif"
              placeholder="Ce champ est vide"
              value={value}
              setValue={setValue}
            />
            <button className="modal-objectif__button button--red">
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderModalBis = () => {
    closeCompte()
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <button className="modal-objectif__icon--container">
            <img
              className="modal-objectif__icon"
              src={Cross}
              onClick={handleModalBis}
              alt=""
            />
          </button>
          <h2 className="modal-objectif__title">
            Objectif : <br></br> {data.title}
          </h2>
          <div className="modal-objectif__errorMessage">{errorMessage}</div>
          <div>{renderText(data.newdetail)}</div>
          <form className="modal-objectif__form" onSubmit={handleSubmitBis}>
            <Input
              type="texte"
              label={data.newlabel}
              name="objectifbis"
              placeholder="Ce champ est vide"
              value={value}
              setValue={setValue}
            />
            <button className="modal-objectif__button button--red">
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderModalAnswer = () => {
    closeCompte()
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <h2 className="modal-objectif__title">
            Objectif : <br></br> {data.title}
          </h2>
          {data.answersrc ? (
            <audio autoPlay>
              <source src={urlApi.cdn() + data.answersrc} type="audio/mpeg" />
              Votre navigateur ne prend pas en charge ce format
            </audio>
          ) : (
            ""
          )}
          <div>{renderText(data.answertext)}</div>
          <button
            className="modal-objectif__button button--red"
            onClick={handleModalAnswer}
          >
            Continuer l&apos;enquête
          </button>
        </div>
      </div>
    );
  };

  const renderModalAnswerBis = () => {
    closeCompte()
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <h2 className="modal-objectif__title">
            Objectif : <br></br> {data.title}
          </h2>
          {data.newanswersrc ? (
            <audio autoPlay>
              <source
                src={urlApi.cdn() + data.newanswersrc}
                type="audio/mpeg"
              />
              Votre navigateur ne prend pas en charge ce format
            </audio>
          ) : (
            ""
          )}
          <div>{renderText(data.newanswertext)}</div>
          <button
            className="modal-objectif__button button--red"
            onClick={handleModalAnswerBis}
          >
            Continuer l&apos;enquête
          </button>
        </div>
      </div>
    );
  };

  const renderText = (data) => {
    const text = data.map((el, i) => {
      return (
        <p className="modal-objectif__subtitle" key={i}>
          {el}
        </p>
      );
    });
    return text;
  };

  const handleDoneObjectifModal = () => {
    if(!doneObjectifModal){ closeCompte() }
    setDoneObjectifModal(!doneObjectifModal);
  };

  const renderDoneObjectifModal = () => {
    closeCompte()
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <h2 className="modal-objectif__title">
            Objectif : <br></br> {data.title}
          </h2>
          {data.newanswertext ? (
            <div>{renderText(data.newanswertext)}</div>
          ) : (
            <div>{renderText(data.answertext)}</div>
          )}
          <button
            className="modal-objectif__button button--red"
            onClick={handleDoneObjectifModal}
          >
            Valider
          </button>
        </div>
      </div>
    );
  };

  // -- RENDER DES BOUTONS OBJECTIFS -- //

  const renderObjectif = () => {
    if (data.status == "done") {
      return (
        <>
          <button
            className="objectif objectif--done"
            onClick={handleDoneObjectifModal}
          >
            <div className="objectif__mainInfo">
              <div className="objectif__icon-wrapper">
                <img
                  src={Check}
                  className="objectif__icon"
                  alt="objectif terminé"
                />
              </div>
              <h3 className="objectif__title">{data.title}</h3>
            </div>
            <div className="objectif__subInfo">
              <p className="objectif__subtitle">{data.subtitle}</p>
            </div>
          </button>
        </>
      );
    }
    if (data.status == "open") {
      return (
        <>
          <button
            className="objectif objectif--open"
            onClick={nextStep ? handleModalBis : handleModal}
          >
            <div className="objectif__mainInfo">
              <div className="objectif__icon-wrapper">
                <img
                  src={LockOpen}
                  className="objectif__icon"
                  alt="objectif ouvert"
                />
              </div>
              <h3 className="objectif__title">{data.title}</h3>
            </div>
            <div className="objectif__subInfo">
              <p className="objectif__subtitle">{data.subtitle}</p>
            </div>
          </button>
        </>
      );
    }
    if (data.status == "closed") {
      return (
        <>
          <button className="objectif objectif--closed">
            <div className="objectif__icon-wrapper--closed">
              <img
                src={LockClosed}
                className="objectif__icon"
                alt="objectif bloqué"
              />
            </div>
            <h3 className="objectif__title--closed">
              Cet objectif est bloqué pour le moment
            </h3>
          </button>
        </>
      );
    }
  };

  return (
    <>
      {renderObjectif()}
      {/* {renderLieu()} */}
      {modal ? renderModal() : ""}
      {modalBis ? renderModalBis() : ""}
      {modalAnswer ? renderModalAnswer() : ""}
      {modalAnswerBis ? renderModalAnswerBis() : ""}
      {doneObjectifModal ? renderDoneObjectifModal() : ""}
    </>
  );
};

Objectif.propTypes = {
  data: PropTypes.object,
};

export default Objectif;
