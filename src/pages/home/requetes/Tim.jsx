/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour faire les requêtes auprès du personnage de Tim
// EXPLICATION : Les validations des requêtes sont faites ici

import Input from "../../../components/Input.jsx";
import Document from "../../../components/Document.jsx";
import Video from "../../../components/Video.jsx";
import Cross from "../../../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../../../utils/const/urlApi.js";
import {
  BoxContext,
  DataContext,
  AmbianceContext,
  CompteContext,
} from "../../../utils/context/fetchContext.jsx";
import { useContext, useState, useMemo } from "react";
import useApi from "../../../utils/hooks/useApi.js";

const Tim = ({ closeAgentPage }) => {
  const { currentBox } = useContext(BoxContext);
  const token = localStorage.getItem("token");
  const { 
    actionToggleDataTim, 
    actionToggleDataHistory,
    toggleDataTim, 
    toggleDataObjectif,
    // actionToggleDataHistory 
  } = useContext(DataContext);
  const { pauseNappe } = useContext(AmbianceContext);
  const { updateCharactersById, updateHistory, getCharactersById, getObjectivesByBox } = useApi();
  const { closeCompte } = useContext(CompteContext);

  //EXPLICATION : Tim est le personnage "5"
  useMemo(() => {
    const fetchData = async () => {
      const result = await getCharactersById(token, 5);
      setDataTim(result);
    };
    fetchData();
  }, [toggleDataTim]);

  // EXPLICATION : UseEffect pour récupérer l'état des objectifs
  const [objectif2, setObjectif2] = useState('')
  useMemo(() => {
    const getObjectives = async () => {
      //TODO Récupération data des objectifs, exemple:
      const objectifs = await getObjectivesByBox(token, currentBox);
      const objectif2Data = objectifs.data.find((event) => event.id == 2);
      setObjectif2(objectif2Data.status);
    };
    getObjectives();
  }, [toggleDataObjectif]);

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
    e.preventDefault();

    const thisBox = dataTim.find(
      (element) => element.box_id == currentBox
    ).data;
    const answerInThisBox = thisBox.find((element) =>
      element.ask.includes(slugify(value))
    );
    const previouslyAnsweredInThisBox =
      answerInThisBox && answerInThisBox.status;
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
    let text = ""
    if (objectif2 == "closed" && answer?.text1) {
      text = answer.text1.map((el, i) => {
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
    } else {
      text = answer.text.map((el, i) => {
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
    }

    return text;
  };

  const validateModal = async () => {
    setModal(false);
    //TODO Gestion ajout document supplémentaire dans l'historique
    // if (answer.ask == ["stellalouiseberg"]) {
    //   await updateHistory(token, 2, "box2document2");
    //   dispatch({
    //     type: "setEvent",
    //     id: "box2document2",
    //   });
    //   actionToggleDataHistory();
    // }
  };

  const openMedia = () => {
    if (answer.id.includes("video")) {
      pauseNappe();
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

    if (answerId !== "box1document4" || objectif2 !== 'closed') {
      await updateHistory(token, currentBox, answerId);
      actionToggleDataHistory()
    }
    
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
