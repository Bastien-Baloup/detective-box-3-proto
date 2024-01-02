/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Tim
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from "../components/Input.jsx";
import Document from "../components/Document.jsx";
import Video from "../components/Video.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import {
  BoxContext,
  DataContext,
  AmbianceContext,
  CompteContext,
} from "../utils/context/fetchContext";
import { useContext, useState, useEffect } from "react";
import useApi from "../utils/hooks/useApi.js";
import useEvent from "../utils/hooks/useEvent.js";

const Tim = ({ closeAgentPage }) => {
  const { currentBox } = useContext(BoxContext);
  const token = localStorage.getItem("token");
  const { actionToggleDataTim, toggleDataTim, actionToggleDataHistory } =
    useContext(DataContext);
  const { fetchPreviousStateNappe } = useContext(AmbianceContext);
  const { updateCharactersById, updateHistory, getCharactersById } = useApi();
  const { dispatch } = useEvent();
  const { closeCompte } = useContext(CompteContext);

  //EXPLICATION : Tim est le personnage "5"
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharactersById(token, 5);
      setDataTim(result);
    };
    fetchData();
  }, [toggleDataTim]);

  const [dataTim, setDataTim] = useState(null);

  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalMedia, setModalMedia] = useState(false);
  const [answer, setAnswer] = useState("");

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
  // EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
  const handleSubmit = (e) => {
    const thisBox = dataTim.find(
      (element) => element.box_id == currentBox
    ).data;
    const box1 = dataTim.find((element) => element.box_id == 1).data;
    const box2 = dataTim.find((element) => element.box_id == 2).data;
    const answerInThisBox = thisBox.find((element) =>
      element.ask.includes(slugify(value))
    );
    const previouslyAnsweredInThisBox =
      answerInThisBox && answerInThisBox.status;
    const answerInBox1 = box1.some((element) =>
      element.ask.includes(slugify(value))
    );
    const answerInBox2 = box2.some((element) =>
      element.ask.includes(slugify(value))
    );
    e.preventDefault();
    if (value == "") {
      setErrorMessage(
        "Vous n'avez rien à me faire analyser ? Je retourne gamer alors."
      );
      setValue("");
      return;
    }
    if (previouslyAnsweredInThisBox) {
      setValue("");
      setErrorMessage(
        "Vous m'avez dejà demandé d'analyser cet élément. Il est désormais disponible dans votre Historique.”"
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
    if (currentBox == 2 && answerInBox1) {
      setValue("");
      setErrorMessage(
        "Vous avez déjà analysé cet élément lors d'une box précédente. Il est désormais disponible dans votre Historique."
      );
      return;
    }
    if (currentBox == 3 && (answerInBox2 || answerInBox1)) {
      setValue("");
      setErrorMessage(
        "Vous avez déjà analysé cet élément lors d'une box précédente. Il est désormais disponible dans votre Historique."
      );
      return;
    }
    setValue("");
    setErrorMessage("Nan, j'ai rien sur ce que vous me demandez.");
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
      if (el.startsWith("https://")) {
        return (
          <a
            className="modal-objectif__subtitle--link"
            key={i}
            href={el}
            target="_blank"
            rel="noreferrer noopener"
          >
            {el}
          </a>
        );
      }
      return (
        <p className="modal-objectif__subtitle" key={i}>
          {el}
        </p>
      );
    });
    return text;
  };

  const validateModal = async () => {
    setModal(false);
    if (answer.ask == ["stellalouiseberg"]) {
      await updateHistory(token, 2, "box2document2");
      dispatch({
        type: "setEvent",
        id: "box2document2",
      });
      actionToggleDataHistory();
    }
  };

  const openMedia = () => {
    if (answer.id.includes("video")) {
      fetchPreviousStateNappe();
    }
    validateModal();
    setModalMedia(true);
  };

  const renderModalMedia = () => {
    closeCompte();
    if (answer.id.includes("document")) {
      return (
        <Document
          title={answer.title}
          srcElement={urlApi.cdn() + answer.src}
          handleModalDocument={() => closeModalMedia(answer.id, answer.ask)}
        />
      );
    }
    if (answer.id.includes("video")) {
      return (
        <Video
          title={answer.title}
          srcVideo={urlApi.cdn() + answer.src + ""}
          handleModalVideo={() => closeModalMedia(answer.id, answer.ask)}
        />
      );
    }
  };

  const closeModalMedia = async (answerId, asnwerAsk) => {
    await updateCharactersById(token, 5, currentBox, asnwerAsk);
    await updateHistory(token, currentBox, answerId);
    dispatch({
      type: "setEvent",
      id: answerId,
    });
    actionToggleDataTim();
    setModalMedia(false);
  };

  const catchphrase = [
    "sounds/404-repliques-tim-1.mp3",
    "sounds/404-repliques-tim-2.mp3",
    "sounds/404-repliques-tim-3.mp3",
    "sounds/404-repliques-tim-4.mp3",
    "sounds/404-repliques-tim-5.mp3",
    "sounds/404-repliques-tim-6.mp3",
    "sounds/404-repliques-tim-7.mp3",
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
            src="https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/tim.jpg"
            alt="photo de tim"
          />
        </div>
        <div className="agent__main">
          <div className="agent__title--container">
            <p className="agent__title">Que souhaitez-vous analyser ?</p>
          </div>
          <div className="agent__errorMessage">{errorMessage}</div>
          <form className="agent__form" onSubmit={handleSubmit}>
            <Input
              type="texte"
              label="Elément à analyser"
              name="tim"
              placeholder="Ce champ est vide"
              value={value}
              setValue={setValue}
            />
            <button className="agent__form__button button--red">Valider</button>
          </form>
        </div>
        <div className="agent__closeButton--container" onClick={closeAgentPage}>
          <img src={Cross} className="agent__closeButton" alt="fermer" />
        </div>
      </div>
    </>
  );
};

Tim.propTypes = {
  closeAgentPage: PropTypes.func,
};

export default Tim;
