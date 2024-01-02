/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Adèle
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

const Adele = ({ closeAgentPage }) => {
  const { currentBox } = useContext(BoxContext);
  const token = localStorage.getItem("token");
  const { actionToggleDataAdele, toggleDataAdele, actionToggleDataHistory } =
    useContext(DataContext);
  // EXPLICATION : state spécifique pour afficher le mail de Lauren
  const [youveGotMail, setYouveGotMail] = useState(false);
  const [mailLauren1, setMailLauren1] = useState(false);
  const { updateCharactersById, updateHistory, getCharactersById } = useApi();
  const { dispatch } = useEvent();
  const { closeCompte } = useContext(CompteContext);

  //EXPLICATION : Adele est le personnage "1"

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharactersById(token, 1);
      setDataAdele(result);
    };
    fetchData();
  }, [toggleDataAdele]);

  const [dataAdele, setDataAdele] = useState(null);

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
  // EXPLICATION : Pour rappel, Adèle n'apparait pas en box 1
  const handleSubmit = (e) => {
    const thisBox = dataAdele.find(
      (element) => element.box_id == currentBox
    ).data;
    const box2 = dataAdele.find((element) => element.box_id == 2).data;
    const answerInThisBox = thisBox.find((element) =>
      element.ask.includes(slugify(value))
    );
    const previouslyAnsweredInThisBox =
      answerInThisBox && answerInThisBox.status;
    const answerInBox2 = box2.some((element) =>
      element.ask.includes(slugify(value))
    );
    e.preventDefault();
    if (value == "") {
      setErrorMessage("Je dois bien analyser quelque chose !");
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
    if (currentBox == 3 && answerInBox2) {
      setValue("");
      setErrorMessage(
        "Vous avez déjà analysé cet élément lors d'une box précédente. Il est désormais disponible dans votre Historique.”"
      );
      return;
    }
    setValue("");
    setErrorMessage("Je n'ai pas pu analyser ce que vous m'avez demandé.");
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

  const closeModalMedia = async (answerId, asnwerAsk) => {
    await updateCharactersById(token, 1, currentBox, asnwerAsk);
    await updateHistory(token, currentBox, answerId);
    dispatch({
      type: "setEvent",
      id: answerId,
    });
    actionToggleDataAdele();
    setModalMedia(false);
    if (answerId == "box2document4") {
      setYouveGotMail(true);
      await updateHistory(token, 2, "box2document8");
      dispatch({
        type: "setEvent",
        id: "box2document8",
      });
      actionToggleDataHistory();
    }
  };

  const displayYouveGotMail = () => {
    closeCompte();
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <audio autoPlay>
            <source src={urlApi.cdn() + "sounds/ding.mp3"} type="audio/mpeg" />
            Votre navigateur ne prend pas en charge ce format
          </audio>
          <div>Vous avez un mail</div>
          <button
            className="modal-objectif__button button--red"
            onClick={handleCloseYouveGotMail}
          >
            Valider
          </button>
        </div>
      </div>
    );
  };

  const handleCloseYouveGotMail = () => {
    setMailLauren1(true);
    setYouveGotMail(false);
  };

  const displayMailLauren1 = () => {
    closeCompte();
    return (
      <Document
        title="Email de Lauren Fraser"
        srcElement={urlApi.cdn() + "assets/document/219_Message_Lauren_1.jpg"}
        handleModalDocument={handleCloseMail1}
      />
    );
  };

  const handleCloseMail1 = async () => {
    setMailLauren1(false);
  };

  const catchphrase = [
    "sounds/405-repliques-adele-1.mp3",
    "sounds/405-repliques-adele-2.mp3",
    "sounds/405-repliques-adele-3.mp3",
    "sounds/405-repliques-adele-4.mp3",
    "sounds/405-repliques-adele-5.mp3",
    "sounds/405-repliques-adele-6.mp3",
    "sounds/405-repliques-adele-7.mp3",
  ];

  const randomNumber = Math.floor(Math.random() * catchphrase.length);

  return (
    <>
      {modal ? renderModal() : ""}
      {modalMedia ? renderModalMedia() : ""}
      {youveGotMail ? displayYouveGotMail() : ""}
      {mailLauren1 ? displayMailLauren1() : ""}
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
            src="https://db2cdn.fra1.cdn.digitaloceanspaces.com/assets/photos-personnages/adele.jpg"
            alt="photo d'adèle"
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
              name="adele"
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

Adele.propTypes = {
  closeAgentPage: PropTypes.func,
};

export default Adele;
