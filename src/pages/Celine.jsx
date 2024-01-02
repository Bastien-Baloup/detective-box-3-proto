/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Céline
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from "../components/Input.jsx";
import Document from "../components/Document.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import {
  BoxContext,
  DataContext,
  CompteContext,
} from "../utils/context/fetchContext";
import { useContext, useState, useEffect } from "react";
import useApi from "../utils/hooks/useApi.js";
import useEvent from "../utils/hooks/useEvent.js";

const Celine = ({ closeAgentPage }) => {
  const { currentBox } = useContext(BoxContext);
  const token = localStorage.getItem("token");
  const { actionToggleDataCeline, toggleDataCeline, toggleDataHistory } =
    useContext(DataContext);
  const {
    updateCharactersById,
    updateHistory,
    getCharactersById,
    getHistoryByBox,
  } = useApi();
  const { dispatch } = useEvent();
  const { closeCompte } = useContext(CompteContext);

  //EXPLICATION : Celine est le personnage "3"

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharactersById(token, 3);
      setDataCeline(result);
    };
    fetchData();
  }, [toggleDataCeline]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHistoryByBox(token, 3);
      const box3audio3Data = result.data.find(
        (event) => event.id == "box3audio3"
      );
      setBox3Audio3(box3audio3Data.status);
    };
    fetchData();
  }, [toggleDataHistory]);

  const [dataCeline, setDataCeline] = useState(null);
  const [box3audio3, setBox3Audio3] = useState(false);

  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMedia, setModalMedia] = useState(false);
  const [answer, setAnswer] = useState("");

  //EXPLICATION : Fonction pour sortir les joueurs de la page de Celine si elle vient de se faire enlever (box3audio3 dans historique)
  if (currentBox == 3 && box3audio3) {
    closeAgentPage();
  }

  // EXPLICATION : Fonction pour slugifier l'input des joueurs
  const slugify = (input) => {
    let inputSlugified = input
      .replace(/\s/g, "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
    return inputSlugified;
  };

  // EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
  // EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (générique, box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
  // EXPLICATION : Celine et Lauren sont les seules à avoir des boxs génériques
  const handleSubmit = (e) => {
    const thisBox = dataCeline.find(
      (element) => element.box_id == currentBox
    ).data;
    const box1 = dataCeline.find((element) => element.box_id == 1).data;
    const box2 = dataCeline.find((element) => element.box_id == 2).data;
    const generic = dataCeline.find((element) => element.box_id == 4).data;
    const answerInThisBox = thisBox.find((element) =>
      element.ask.includes(slugify(value))
    );
    const previouslyAnsweredInThisBox =
      answerInThisBox && answerInThisBox.status;
    const answerInFailedInterview = generic.find((element) =>
      element.ask.includes(slugify(value))
    );
    const answerInBox1 = box1.some((element) =>
      element.ask.includes(slugify(value))
    );
    const answerInBox2 = box2.some((element) =>
      element.ask.includes(slugify(value))
    );
    e.preventDefault();
    if (value == "") {
      setErrorMessage("Je ne peux pas fouiller les archives sans un nom !");
      setValue("");
      return;
    }
    if (previouslyAnsweredInThisBox) {
      setValue("");
      setErrorMessage(
        "Vous m'avez dejà demandé le dossier cette personne. Rendez-vous dans l'Historique pour le consulter de nouveau."
      );
      return;
    }
    if (answerInThisBox) {
      setAnswer(answerInThisBox);
      setModal(true);
      setValue("");
      setErrorMessage("");
      return;
    }
    if (answerInFailedInterview) {
      setAnswer(answerInFailedInterview);
      setModal(true);
      setValue("");
      setErrorMessage("");
      return;
    }
    if (currentBox == 2 && answerInBox1) {
      setValue("");
      setErrorMessage(
        "Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
      );
      return;
    }
    if (currentBox == 3 && (answerInBox2 || answerInBox1)) {
      setValue("");
      setErrorMessage(
        "Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
      );
      return;
    }
    setValue("");
    setErrorMessage("Je ne trouve pas cette personne.");
  };

  const renderModal = () => {
    closeCompte();
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          {answer.srcComment ? (
            <audio autoPlay>
              <source
                src={urlApi.cdn() + answer.srcComment}
                type="audio/mpeg"
              />
              Votre navigateur ne prend pas en charge ce format
            </audio>
          ) : (
            ""
          )}
          <div>{renderText()}</div>
          {answer.id ? (
            <button
              className="modal-objectif__button button--red"
              onClick={openMedia}
            >
              Voir l&apos;élément
            </button>
          ) : (
            <button
              className="modal-objectif__button button--red"
              onClick={validateModal}
            >
              Nouvelle requête
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderText = () => {
    const text = answer.text.map((el, i) => {
      return (
        <p className="modal-objectif__subtitle" key={i}>
          {el}
        </p>
      );
    });
    return text;
  };

  const validateModal = () => {
    setModal(false);
  };

  const openMedia = () => {
    validateModal();
    setModalMedia(true);
  };

  const renderModalMedia = () => {
    closeCompte();
    return (
      <Document
        title={answer.title}
        srcElement={urlApi.cdn() + answer.src}
        handleModalDocument={() => closeModalMedia(answer.id, answer.ask)}
      />
    );
  };

  // EXPLICATION : Précision particuilère pour le personnage de Xavier Monrency (archive 23) qui fait apparaitre un deuxième document dans l'historique
  const closeModalMedia = async (answerId, asnwerAsk) => {
    await updateCharactersById(token, 3, currentBox, asnwerAsk);
    await updateHistory(token, currentBox, answerId);
    dispatch({
      type: "setEvent",
      id: answerId,
    });
    if (answerId == "box1archive23") {
      await updateHistory(token, 1, "box1document4");
      dispatch({
        type: "setEvent",
        id: "box1document4",
      });
    }
    actionToggleDataCeline();
    setModalMedia(false);
  };

  const catchphrase = [
    "sounds/403-repliques-celine-1.mp3",
    "sounds/403-repliques-celine-2.mp3",
    "sounds/403-repliques-celine-3.mp3",
    "sounds/403-repliques-celine-4.mp3",
    "sounds/403-repliques-celine-5.mp3",
    "sounds/403-repliques-celine-6.mp3",
    "sounds/403-repliques-celine-7.mp3",
  ];

  const randomNumber = Math.floor(Math.random() * catchphrase.length);

  return (
    <>
      {modal ? renderModal() : ""}
      {modalMedia ? renderModalMedia() : ""}
      <audio autoPlay>
        <source
          src={urlApi.cdn() + catchphrase[randomNumber]}
          type="audio/mpeg"
        />
        Votre navigateur ne prend pas en charge ce format
      </audio>
      <div className="agent">
        <div className="agent__portrait--container">
          <img
            className="agent__portrait"
            src="https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/celine.jpg"
            alt="photo de celine"
          />
        </div>
        <div className="agent__main">
          <div className="agent__title--container">
            <p className="agent__title">Quel dossier cherchez-vous ?</p>
          </div>
          <div className="agent__errorMessage">{errorMessage}</div>
          <form className="agent__form" onSubmit={handleSubmit}>
            <Input
              type="texte"
              label="Prénom et Nom"
              name="celine"
              placeholder="Ce champ est vide"
              value={value}
              setValue={setValue}
            />
            <button className="agent__form__button button--red">Valider</button>
          </form>
        </div>
        <button
          className="agent__closeButton--container"
          onClick={closeAgentPage}
        >
          <img src={Cross} className="agent__closeButton" alt="fermer" />
        </button>
      </div>
    </>
  );
};

Celine.propTypes = {
  closeAgentPage: PropTypes.func,
};

export default Celine;
