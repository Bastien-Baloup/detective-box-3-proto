/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant est très complexe et important : il permet de rendre les objectifs
// EXPLICATION : Il affiche egalement toute la logique de validation des objectifs
// EXPLICATION : Il affiche egalement toute la logique des différents événements de l'application

import PropTypes from "prop-types";
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";
import Input from "./Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import Document from "../components/Document";
import Video from "../components/Video";
import Audio from "../components/Audio";

import { urlApi } from "../utils/const/urlApi";
import {
  BoxContext,
  DataContext,
  AmbianceContext,
  CompteContext
} from "../utils/context/fetchContext";
import { useContext } from "react";
import useApi from "../utils/hooks/useApi.js";
import useEvent from "../utils/hooks/useEvent.js";
import useLieu from '../utils/hooks/useLieu.jsx'



const Objectif = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [modalAnswer, setModalAnswer] = useState(false);
  const [modalAnswerBis, setModalAnswerBis] = useState(false);
  const [modalBis, setModalBis] = useState(false);
  const [doneObjectifModal, setDoneObjectifModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [value, setValue] = useState("");
  const [nextStep, setNextStep] = useState(false);

  const { currentBox } = useContext(BoxContext);
  const token = localStorage.getItem("token");
  const { fetchPreviousStateNappe } = useContext(AmbianceContext);
  const {
    actionToggleDataEvent,
    toggleDataEvent,
    actionToggleDataHelp,
    toggleDataHelp,
    actionToggleDataHistory,
    toggleDataHistory,
    actionToggleDataObjectif,
    toggleDataObjectif,
  } = useContext(DataContext);
  const { closeCompte } = useContext(CompteContext);

  let event13 = useRef("");
  let event14 = useRef("");
  let event15 = useRef("");
  let event23 = useRef("");
  const [event35, setEvent35] = useState("");

  // let event25 = useRef("");
  // let event35 = useRef("");
  // const [event13, setEvent13] = useState("");
  // const [event14, setEvent14] = useState("");
  // const [event15, setEvent15] = useState("");
  // const [event23, setEvent23] = useState("");


  const [box1lieu2, setBox1Lieu2] = useState(false);
	const [box1video3, setBox1Video3] = useState(false)
  const [box2lieu1, setBox2Lieu1] = useState(false);
  const [box2lieu3, setBox2Lieu3] = useState(false);
  const [box3audio3, setBox3Audio3] = useState(false);
  const [box3lieu2, setBox3Lieu2] = useState(false);

  const [box3lieu3, setBox3Lieu3] = useState(false);

  const [box3help4, setBox3Help4] = useState("");

  let objectif33 = useRef("");
  const [objectif11, setObjectif11] = useState("");
  const [objectif12, setObjectif12] = useState("");
  const [objectif13, setObjectif13] = useState("");
  // const [objectif33, setObjectif33] = useState("");
  const [objectif34, setObjectif34] = useState("");

  const [toggleEvent2, setActionToggleEvent2] = useState(false);

  const [modaleHacking, setModaleHacking] = useState(false);
  const [modaleMailHacking, setModaleMailHacking] = useState(false);
  const [displayButtonOpenMail, setDisplayButtonOpenMail] = useState(false);
  const [telCeline, setTelCeline] = useState(false)

  const [mauvaiseFin1, setMauvaiseFin1] = useState(false);
  const [mauvaiseFin2, setMauvaiseFin2] = useState(false);
  const [resolution, setResolution] = useState(false);
  const [tempsEcoule, setTempsEcoule] = useState(false);
  const [displayTextMauvaiseFin1, setDisplayTextMauvaiseFin1] = useState(false);
  const [displayTextMauvaiseFin2, setDisplayTextMauvaiseFin2] = useState(false);
  const [displayTextResolution, setDisplayTextResolution] = useState(false);
  const [interrogatoireFinal, setInterrogatoireFinal] = useState(false);
  const [audioSamuel, setAudioSamuel] = useState(false);
  const [youveGotMail, setYouveGotMail] = useState(false);
  const [audioBreakingNews, setAudioBreakingNews] = useState(false);
  const [videoBreakingNews, setVideoBreakingNews] = useState(false);
  const [audioEndBreakingNews, setAudioEndBreakingNews] = useState(false);
  const [mailLauren2, setMailLauren2] = useState(false);
  const [videoSauverLauren, setVideoSauverLauren] = useState(false);
  const [debriefLauren, setDebriefLauren] = useState(false);

  const {
    updateHelp,
    getEventByBox,
    updateEvent,
    getHistoryByBox,
    getHelpByBox,
    updateHistory,
    updateObjectives,
    getObjectivesByBox,
  } = useApi();

  const { dispatch } = useEvent();
  const { renderLieu, setLieu, setLieuModalOpen } = useLieu()

  const openLieu = (lieu) => {
		setLieu(lieu)
		setLieuModalOpen(true)
		setModal(false)
	}
  // EXPLICATION : Fonction pour récupérer l'état des événements
  useLayoutEffect(() => {
    const fetchData = async () => {
      const events = await getEventByBox(token, currentBox);
      if (events != undefined) {
        if (currentBox === 1) {
          const event13Data = events.data.find((event) => event.id === 13);
          event13.current = event13Data.status;
          const event14Data = events.data.find((event) => event.id === 14);
          event14.current = event14Data.status;
          const event15Data = events.data.find((event) => event.id === 15);
          event15.current = event15Data.status;
        }
        if (currentBox === 2) {
          const event23Data = events.data.find((event) => event.id === 23);
          event23.current = event23Data.status;
          setActionToggleEvent2(!toggleEvent2);
        }
        if (currentBox === 3) {
          const event35Data = events.data.find((event) => event.id === 35);
          setEvent35(event35Data.status);
          setActionToggleEvent2(!toggleEvent2);
        }
      }
    };
    fetchData();
  }, [toggleDataEvent]);

  //EXPLICATION : UseEffect pour déclencher les evenements entre les différents composants
  useEffect(() => {
    if (currentBox == 3) {
      // EXPLICATION : Pour faire le lien entre le composant Header (timer) et ici
      if (event35 == "open") {
        setTempsEcoule(true);
      }
    }
  }, [toggleEvent2]);

  // EXPLICATION : Fonction pour récupérer l'état de l'historique
  useEffect(() => {
    const fetchData = async () => {
      const clues = await getHistoryByBox(token, currentBox);
      if (currentBox == 1) {
        const box1lieu2Data = clues.data.find(
          (event) => event.id == "box1lieu2"
        );
        setBox1Lieu2(box1lieu2Data.status);
				const box1video3Data = clues.data.find((event) => event.id == "box1video3");
				setBox1Video3(box1video3Data.status);
      }
      if (currentBox == 2) {
        const box2lieu1Data = clues.data.find(
          (event) => event.id == "box2lieu1"
        );
        setBox2Lieu1(box2lieu1Data.status);
        const box2lieu3Data = clues.data.find(
          (event) => event.id == "box2lieu3"
        );
        setBox2Lieu3(box2lieu3Data.status);
        // const box2video5Data = clues.data.find(
          // (event) => event.id == "box2video5"
        // );
        // setBox2Video5(box2video5Data.status);
      }
      if (currentBox == 3) {
        const box3audio3Data = clues.data.find(
          (event) => event.id == "box3audio3"
        );
        setBox3Audio3(box3audio3Data.status);
        const box3lieu2Data = clues.data.find(
          (event) => event.id == "box3lieu2"
        );
        setBox3Lieu2(box3lieu2Data.status);
        const box3lieu3Data = clues.data.find(
          (event) => event.id == "box3lieu3"
        );
        setBox3Lieu3(box3lieu3Data.status);
      }
    };
    fetchData();
  }, [toggleDataHistory]);

  // EXPLICATION : Fonction pour récupérer l'état des renforts (help)
  useEffect(() => {
    const fetchData = async () => {
      const help = await getHelpByBox(token, currentBox);
      if (currentBox == 3) {
        const box3help4Data = help.data.find(
          (event) => event.id == "box3help4"
        );
        setBox3Help4(box3help4Data.status);
      }
    };
    fetchData();
  }, [toggleDataHelp]);

  // EXPLICATION : UseEffect pour récupérer l'état des objectifs
  useEffect(() => {
    const fetchData = async () => {
      const objectifs = await getObjectivesByBox(token, currentBox);
      if (currentBox == 1) {
        const objectif12Data = objectifs.data.find((event) => event.id == 12);
        setObjectif12(objectif12Data.status);
        const objectif11Data = objectifs.data.find((event) => event.id == 11);
        setObjectif11(objectif11Data.status);
        const objectif13Data = objectifs.data.find((event) => event.id == 13);
        setObjectif13(objectif13Data.status);
      }
      if (currentBox == 3) {
        const objectif33Data = objectifs.data.find((event) => event.id == 33);
        objectif33.current = objectif33Data.status;
        const objectif34Data = objectifs.data.find((event) => event.id == 34);
        setObjectif34(objectif34Data.status);
      }
    };
    fetchData();
  }, [toggleDataObjectif]);

  ////EXPLICATION : UseEffect pour avoir les event sur les lieux de fouille
  // let es = useRef(null);
  // const setUpEventSource = () => {
  //   if (es.current) {
  //     return;
  //   }
  //   es.current = new EventSource(
  //     "https://sse.detectivebox.fr/stream?token=" + token
  //   );
  //   console.log("ES created");
  //   es.current.addEventListener("message", async (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("ES message received: " + data.id);
  //     if (currentBox == 1 && data.id === "box1document1") {
  //       setModaleMalle(true);
  //     }
  //     if (data.id === "box1video2") {
  //       setModaleVHS(true);
  //     }
  //     if (currentBox == 1 && data.id === "box1document6") {
  //       setModaleInterrogatoireGarraud(true);
  //     }
  //     if (data.id === "box2document6") {
  //       actionToggleDataHistory();
  //     }
  //     if (data.id === "box3document2") {
  //       await updateHistory(token, 3, "box3document3");
  //       actionToggleDataHistory();
  //       await updateObjectives(token, 3, 33, "open");
  //       await updateObjectives(token, 3, 34, "open");
  //       actionToggleDataObjectif();
  //       await updateHelp(token, 3, "box3help3", "open");
  //       await updateHelp(token, 3, "box3help6", "open");
  //       await updateHelp(token, 3, "box3help2", "done");
  //       actionToggleDataHelp();
  //       setModaleSquelette(true);
  //     }
  //   });
  //   es.current.addEventListener("error", () => {
  //     console.log("ES disconnected");
  //     es.current.close();
  //     setTimeout(() => setUpEventSource(), 1000);
  //   });
  // };

  // useEffect(() => {
  //   setUpEventSource();
  // }, []);



  // --- CONDITIONS SPE OBJECTIF 14 --- //

  const [victime1, setVictime1] = useState("");
  const [victime2, setVictime2] = useState("");
  const [victime3, setVictime3] = useState("");
  const [victime4, setVictime4] = useState("");
  const [victime5, setVictime5] = useState("");
  const [victime6, setVictime6] = useState("");

  const getVictimesValue = useCallback(() => {
    const allVictimes = [
      victime1,
      victime2,
      victime3,
      victime4,
      victime5,
      victime6,
    ];
    setValue(allVictimes);setModal
  }, [victime1, victime2, victime3, victime4, victime5, victime6]);

  useEffect(() => {
    getVictimesValue();
  }, [getVictimesValue]);

  const handleSubmit14 = () => {
    if (JSON.stringify(data.answer) == JSON.stringify(value)) {
      setErrorMessage("");
      setValue("");
      setModal(false);
      setModalAnswer(true);
      return;
    } else {
      setErrorMessage(data.errorMessage);
    }
  };

  // --- CONDITIONS SPE OBJECTIF 21 --- //

  const [intVictimes, setIntVictimes] = useState({
    "Aaron King": true,
    "Ainmire Oconradh": true,
    "Annelijn Dikboom": true,
    "Annina Kurschner": true,
    "Augustas Alsys": true,
    "Bogdana Nikol": true,
    "Daisy Vandenbulcke": true,
    "Dimosthenis Rigas": true,
    "Dominik Jele": true,
    "Edvard Kallio": true,
    "Elias Varelas": true,
    "Elimena Furino": true,
    "Eliza Gaewska": true,
    "Ere Jakobson": true,
    "Horasiu Prunea": true,
    "Imelda Tuzzolino": true,
    "Ivar Mortensen": true,
    "Janina Muster": true,
    "Jörn Frenzel": true,
    "Karina Galicka": true,
    "Konstantin Wallner": true,
    "Lina Syren": true,
    "Marian Bilek": true,
    "Marike Vonbraun": true,
    "Petar Cojocaru": true,
    "Riano Della Valle": true,
    "Taneli Tuominen": true,
    "Timo Sladie": true,
  });

  const getIntVictimesValue = useCallback(() => {
    const allIntVictimesTrue = Object.keys(intVictimes).filter(
      (el) => intVictimes[el]
    );
    setValue(allIntVictimesTrue);
  }, [intVictimes]);

  useEffect(() => {
    getIntVictimesValue();
  }, [getIntVictimesValue]);

  const handleSubmit21 = () => {
    if (value.length > 8) {
      setErrorMessage(
        "Il nous faut éliminer encore des victimes si l'on veut avancer dans l'enquête et revenir voir Garraud avec de nouveaux éléments…"
      );
      return;
    }
    if (value.length < 8) {
      setErrorMessage(
        "Vous y êtes allés un peu fort sur ce premier tri ! On devrait en garder plus pour être certain de ne pas en oublier en route"
      );
      return;
    }
    if (JSON.stringify(data.answer) == JSON.stringify(value)) {
      setErrorMessage("");
      setValue("");
      setModal(false);
      setModalAnswer(true);
      return;
    } else {
      setErrorMessage(data.errorMessage);
    }
  };

  const toggleIntVictime = (el) => {
    if (intVictimes[el] == true) {
      setIntVictimes((prevState) => ({ ...prevState, [el]: false }));
    } else {
      setIntVictimes((prevState) => ({ ...prevState, [el]: true }));
    }
  };

  // --- CONDITIONS SPE OBJECTIF 23 --- //

  const [finalVictimes, setFinalVictimes] = useState({
    "Aaron King": true,
    "Annina Kurschner": true,
    "Daisy Vandenbulcke": true,
    "Elimena Furino": true,
    "Horasiu Prunea": true,
    "Jörn Frenzel": true,
    "Konstantin Wallner": true,
    "Riano Della Valle": true,
  });

  const getFinalVictimesValue = useCallback(() => {
    const allFinalVictimesTrue = Object.keys(finalVictimes).filter(
      (el) => finalVictimes[el]
    );
    setValue(allFinalVictimesTrue);
  }, [finalVictimes]);

  useEffect(() => {
    getFinalVictimesValue();
  }, [getFinalVictimesValue]);

  const handleSubmit23 = () => {
    getFinalVictimesValue();
    if (value.length > 5 || value.length < 5) {
      setErrorMessage("Nous avons 5 cartes, il nous faut 5 victimes");
      return;
    }
    if (JSON.stringify(data.answer) == JSON.stringify(value)) {
      setErrorMessage("");
      setValue("");
      setModal(false);
      setModalAnswer(true);
      return;
    } else {
      setErrorMessage(data.errorMessage);
    }
  };

  const toggleFinalVictime = (el) => {
    if (finalVictimes[el] == true) {
      setFinalVictimes((prevState) => ({ ...prevState, [el]: false }));
    } else {
      setFinalVictimes((prevState) => ({ ...prevState, [el]: true }));
    }
  };

  // -- CONDITIONS SPE OBJECTIF 33 -- //

  const [victimeSaved, setVictimeSaved] = useState("");
  const [displayButtonCelineTel, setDisplayButtonCelineTel] = useState(false);

  const handleVictimeChoice = (choice) => {
    setVictimeSaved(choice);
    handleModal();
    setTelCeline(true);
  };

  const handleFinalStep = async () => {
    await updateHelp(token, 3, "box3help4", "done");
    dispatch({
      type: "setEvent",
      id: "box3help4",
    });
    await updateHelp(token, 3, "box3help5", "open");
    dispatch({
      type: "setEvent",
      id: "box3help5",
    });
    await updateEvent(token, 3, 33, "open");
    actionToggleDataHelp();
    actionToggleDataEvent();
    setTelCeline(false);
  };

  const displayModaleMauvaiseFin1 = () => {
    closeCompte()
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <audio autoPlay onEnded={() => setDisplayTextMauvaiseFin1(true)}>
            <source
              src={urlApi.cdn() + "sounds/308-mauvaise-fin-1.mp3"}
              type="audio/mpeg"
            />
            Votre navigateur ne prend pas en charge ce format
          </audio>
          {displayTextMauvaiseFin1 ? (
            <>
              <p>
                Ce n&apos;était pas la bonne cible, nous nous sommes trompés...
                Céline est malheureusement dans la nature et elle a réussi son
                grand œuvre.
              </p>
              <p>
                Souhaitez-vous réessayer le dernier objectif ou passer à
                l&apos;épilogue ?
              </p>
              <button
                className="modal-objectif__button button--red"
                onClick={handleReset}
              >
                Recommencer
              </button>
              <button
                className="modal-objectif__button button--red"
                onClick={handleGoToResolution}
              >
                Résolution de l&apos;enquête
              </button>
            </>
          ) : (
            <p>Merci Agents, je saute dans un avion !</p>
          )}
        </div>
      </div>
    );
  };

  const displayModaleMauvaiseFin2 = () => {
    closeCompte()
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <audio autoPlay onEnded={() => setDisplayTextMauvaiseFin2(true)}>
            <source
              src={urlApi.cdn() + "sounds/309-mauvaise-fin-2.mp3"}
              type="audio/mpeg"
            />
            Votre navigateur ne prend pas en charge ce format
          </audio>
          {displayTextMauvaiseFin2 ? (
            <>
              <p>
                Ce n&apos;était pas la bonne cible, nous nous sommes trompés...
                Céline est malheureusement dans la nature et elle a réussi son
                grand œuvre.
              </p>
              <p>
                Souhaitez-vous réessayer le dernier objectif ou passer à
                l&apos;épilogue ?
              </p>
              <button
                className="modal-objectif__button button--red"
                onClick={handleReset}
              >
                Recommencer
              </button>
              <button
                className="modal-objectif__button button--red"
                onClick={handleGoToResolution}
              >
                Résolution de l&apos;enquête
              </button>
            </>
          ) : (
            <p>Merci Agents, je saute dans un avion !</p>
          )}
        </div>
      </div>
    );
  };

  const handleSubmitCity = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (slugify(value) == "milan" && victimeSaved == "maria") {
      setErrorMessage(
        "Bon, j'ai fait quelques recherches rapidement sur cette Maria Gruber... malheureusement c'est un prénom très répandu, surtout en Autriche, difficile de cibler correctement l'endroit qu'on cherche... mais ça vous aidera peut-être"
      );
      return;
    }
    if (slugify(value) == "milan" && victimeSaved == "giuseppe") {
      handleModal();
      await updateEvent(token, 3, 33, "done");
      actionToggleDataEvent();
      setMauvaiseFin1(true);
      return;
    }
    if (slugify(value) == "graz" && victimeSaved == "maria") {
      handleModal();
      await updateEvent(token, 3, 33, "done");
      actionToggleDataEvent();
      setResolution(true);
      return;
    }
    if (slugify(value) == "graz" && victimeSaved == "giuseppe") {
      handleModal();
      await updateEvent(token, 3, 33, "done");
      actionToggleDataEvent();
      setMauvaiseFin2(true);
      return;
    } else {
      setErrorMessage(
        "Je ne trouve aucune personne à ce nom dans cette ville. On doit s'être trompé quelque part"
      );
    }
  };

  const renderLastStep = () => {
    closeCompte()
    if (objectif34 == "open") {
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
            <p className="modal-objectif__subtitle">
              Il nous manque des informations sur l&apos;identité du tueur pour
              aller plus loin
            </p>
            <button
              className="modal-objectif__button button--red"
              onClick={handleModal}
            >
              Continuer l&apos;enquête
            </button>
          </div>
        </div>
      );
    }
    if (objectif34 == "done" && box3lieu3 == true && victimeSaved == "") {
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
            <p className="modal-objectif__subtitle">
              On a le nom des deux dernières cibles, mais il n&apos;en reste
              plus qu&apos;une en vie, il faut qu&apos;on la trouve pour pouvoir
              la sauver.
            </p>
            <p className="modal-objectif__subtitle">
              Qui est la dernière cible encore vivante ?
            </p>
            <button
              className="modal-objectif__button button--red"
              onClick={() => handleVictimeChoice("maria")}
            >
              Maria Gruber
            </button>
            <button
              className="modal-objectif__button button--red"
              onClick={() => handleVictimeChoice("giuseppe")}
            >
              Giuseppe Rossi
            </button>
          </div>
        </div>
      );
    }
    if (victimeSaved != "" && box3help4 == "done") {
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
            <p className="modal-objectif__subtitle">
              Les choses s&apos;accélèrent, elle nous a mis un ultimatum !
            </p>
            <p className="modal-objectif__subtitle">
              Il faut qu&apos;on sache où est cette personne pour intervenir à
              temps, on ne peut pas se permettre de se tromper
            </p>
            <form className="modal-objectif__form" onSubmit={handleSubmitCity}>
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
    }
  };

  const displayTelCeline = () => {
    closeCompte()
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <h2 className="modal-objectif__title">
            Objectif : <br></br> {data.title}
          </h2>
          {victimeSaved == "maria" ? (
            <audio autoPlay onEnded={() => setDisplayButtonCelineTel(true)}>
              <source
                src={
                  urlApi.cdn() + "sounds/304-dernier-objectif-rempli-maria.mp3"
                }
                type="audio/mpeg"
              />
              Votre navigateur ne prend pas en charge ce format
            </audio>
          ) : (
            <audio autoPlay onEnded={() => setDisplayButtonCelineTel(true)}>
              <source
                src={
                  urlApi.cdn() +
                  "sounds/304-dernier-objectif-rempli-giuseppe.mp3"
                }
                type="audio/mpeg"
              />
              Votre navigateur ne prend pas en charge ce format
            </audio>
          )}
          <p className="modal-objectif__subtitle">
            “Le jeu n&apos;est pas fini, Raph…”
          </p>
          {displayButtonCelineTel ? (
            <button
              className="modal-objectif__button button--red"
              onClick={handleFinalStep}
            >
              Continuer l&apos;enquête
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

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
    if (data.id == 13) {
      if (slugify(value) == "jacquelinegarraud") {
        setErrorMessage("Est-ce qu'elle n'est pas connue sous un autre nom ?");
        setValue("");
        return;
      }
    }
    if (data.id == 31) {
      if (
        slugify(value) == "aussichtspavillion" ||
        slugify(value) == "wutoschingen"
      ) {
        setErrorMessage(
          "Je pense qu'on approche, mais elle parle d'un lieu préhistorique, non ?"
        );
        setValue("");
        return;
      }
    }
    if (data.id == 32) {
      if (
        slugify(value) == "arbailles" ||
        slugify(value) == "arbaille" ||
        slugify(value) == "foretdesarbailles" ||
        slugify(value) == "foretarbailles"
      ) {
        setErrorMessage(
          "La forêt des Arbailles... C'est grand. Il me faudrait plus d'informations, quelque chose qui m'aiderait à situer un point dans la forêt. Peut-être que Lauren savait ?"
        );
        setValue("");
        return;
      }
    }
    if (data.id == 34) {
      if (data.answer.includes(slugify(value))) {
        if (box3help4 == "open") {
          setErrorMessage("");
          setValue("");
          setModal(false);
          setModalAnswer(true);
          return;
        }
        if (box3lieu2 == true) {
          setErrorMessage(
            "Cet arbre généalogique ne joue pas en sa faveur, mais ça ne veut pas tout dire."
          );
          setValue("");
          return;
        }
        if (box3audio3 == true) {
          setErrorMessage(
            "Si on allait plutôt chez elle pour voir de quoi il en retourne ?"
          );
          setValue("");
          return;
        } else {
          setErrorMessage(
            "C'est un peu léger d'inculper quelqu'un avec le peu d'infos qu'on a"
          );
          setValue("");
          return;
        }
      } else {
        setErrorMessage(data.errorMessage);
        setValue("");
      }
    }
    if (data.answer.includes(slugify(value))) {
      if (data.id == 13 && box1lieu2 == false) {
        setErrorMessage(
          "Je pense que nous avons trop peu d'éléments pour tirer une conclusion pour cette piste"
        );
        setValue("");
        return;
      }
			if (data.id == 13 && box1video3 == false) {
				setErrorMessage("Je pense que nous avons trop peu d'éléments pour tirer une conclusion pour cette piste");
				setValue("");
				return;
			}
      if (data.id == 22 && box2lieu3 == false) {
        setErrorMessage(
          "Allez d'abord récolter des preuves dans la cellule de Garraud !"
        );
        setValue("");
        return;
      }
      setErrorMessage("");
      setValue("");
      setModal(false);
      setModalAnswer(true);
      return;
    } else {
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
      if (data.id == 12) {
        if (objectif11 == "done" && objectif13 == "done") {
          await updateObjectives(token, 1, 14, "open");
          await updateObjectives(token, 1, 12, "done");
          actionToggleDataObjectif();
          await updateHelp(token, 1, "box1help4", "open");
          await updateHelp(token, 1, "box1help2", "done");
          actionToggleDataHelp();
          await updateHistory(token, 1, "box1document5");
          dispatch({
            type: "setEvent",
            id: "box1document5",
          });
          actionToggleDataHistory();
          setModaleHacking(true);
          return;
        } else {
          await updateObjectives(token, 1, 12, "done");
          actionToggleDataObjectif();
          await updateHelp(token, 1, "box1help2", "done");
          actionToggleDataHelp();
          await updateHistory(token, 1, "box1document5");
          dispatch({
            type: "setEvent",
            id: "box1document5",
          });
          actionToggleDataHistory();
          setModaleHacking(true);
          return;
        }
      }
      if (data.id == 13) {
        if (objectif11 == "done" && objectif12 == "done") {
          await updateObjectives(token, 1, 14, "open");
          await updateObjectives(token, 1, 13, "done");
          actionToggleDataObjectif();
          await updateHelp(token, 1, "box1help4", "open");
          await updateHelp(token, 1, "box1help3", "done");
          actionToggleDataHelp();
          return;
        } else {
          await updateObjectives(token, 1, 13, "done");
          actionToggleDataObjectif();
          await updateHelp(token, 1, "box1help3", "done");
          actionToggleDataHelp();
          return;
        }
      }
      if (data.id == 14) {
        await updateObjectives(token, 1, 14, "done");
        actionToggleDataObjectif();
        return;
      }
      if (data.id == 21) {
        setAudioSamuel(true);
        fetchPreviousStateNappe();
        return;
      }
      if (data.id == 23) {
        await updateObjectives(token, 2, 23, "done");
        await updateHelp(token, 2, "box2help3", "done");
        await updateObjectives(token, 2, 24, "open");
        await updateHelp(token, 2, "box2help4", "open");
        setYouveGotMail(true);
        actionToggleDataObjectif();
        actionToggleDataHelp();
        await updateHistory(token, 2, "box2document9");
        dispatch({
          type: "setEvent",
          id: "box2document9",
        });
        await updateHistory(token, 2, "box2document12");
        dispatch({
          type: "setEvent",
          id: "box2document12",
        });
        actionToggleDataHistory();
        return;
      }
      if (data.id == 24) {
        await updateObjectives(token, 2, 24, "done");
        await updateHelp(token, 2, "box2help4", "done");
        await updateHelp(token, 2, "box2help5", "open");
        actionToggleDataObjectif();
        actionToggleDataHelp();
        return;
      }
      if (data.id == 31) {
        await updateObjectives(token, 3, 31, "done");
        await updateHelp(token, 3, "box3help1", "done");
        actionToggleDataObjectif();
        actionToggleDataHelp();
        return;
      }
      if (data.id == 32) {
        await updateObjectives(token, 3, 32, "done");
        actionToggleDataObjectif();
        return;
      }
      if (data.id == 34) {
        await updateObjectives(token, 3, 34, "done");
        await updateHelp(token, 3, "box3help6", "done");
        await updateHistory(token, 3, "box3audio1");
        dispatch({
          type: "setEvent",
          id: "box3audio1",
        });
        await updateHistory(token, 3, "box3lieu3");
        dispatch({
          type: "setEvent",
          id: "box3lieu3",
        });
        await updateHistory(token, 3, "box3video2");
        dispatch({
          type: "setEvent",
          id: "box3video2",
        });
        await updateHistory(token, 3, "box3document10");
        dispatch({
          type: "setEvent",
          id: "box3document10",
        });
        await updateHistory(token, 3, "box3document12");
        dispatch({
          type: "setEvent",
          id: "box3document12",
        });
        await updateHistory(token, 3, "box3document9");
        dispatch({
          type: "setEvent",
          id: "box3document9",
        });
        actionToggleDataHistory();
        actionToggleDataObjectif();
        actionToggleDataHelp();
        setVideoSauverLauren(true);
        fetchPreviousStateNappe();
        return;
      }
      if (data.id == 33) {
        await updateHelp(token, 3, "box3help4", "open");
        await updateHelp(token, 3, "box3help3", "done");
        actionToggleDataHelp();
        setModalAnswer(false);
        return;
      }
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
    if (data.id == 11) {
      await updateHistory(token, 1, "box1document3");
      dispatch({
        type: "setEvent",
        id: "box1document3",
      });
      actionToggleDataHistory();
      if (objectif12 == "done" && objectif13 == "done") {
        await updateObjectives(token, 1, 14, "open");
        await updateObjectives(token, 1, 11, "done");
        await updateHelp(token, 1, "box1help4", "open");
        await updateHelp(token, 1, "box1help1", "done");
        actionToggleDataObjectif();
        actionToggleDataHelp();
        return;
      } else {
        await updateObjectives(token, 1, 11, "done");
        actionToggleDataObjectif();
        await updateHelp(token, 1, "box1help1", "done");
        return;
      }
    }
    if (data.id == 22) {
      await updateObjectives(token, 2, 22, "done");
      await updateHelp(token, 2, "box2help2", "done");
      await updateObjectives(token, 2, 23, "open");
      await updateHelp(token, 2, "box2help3", "open");
      actionToggleDataObjectif();
      actionToggleDataHelp();
      return;
    }
  };

  const renderModal = () => {
    closeCompte()
    if (data.id == 14) {
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
            <div>{renderText(data.detail)}</div>
            <div className="modal-objectif__victimes__main">
              <div className="modal-objectif__victimes__select--list">
                <div className="modal-objectif__victimes__select--container">
                  <select
                    className="modal-objectif__victimes__select"
                    name="victime1"
                    onChange={(e) => setVictime1(e.target.value)}
                  >
                    {data.choices.map((el, i) => {
                      return (
                        <option value={el} key={i}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="modal-objectif__victimes__select--container">
                  <select
                    className="modal-objectif__victimes__select"
                    name="victime2"
                    onChange={(e) => setVictime2(e.target.value)}
                  >
                    {data.choices.map((el, i) => {
                      return (
                        <option value={el} key={i}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="modal-objectif__victimes__select--container">
                  <select
                    className="modal-objectif__victimes__select"
                    name="victime3"
                    onChange={(e) => setVictime3(e.target.value)}
                  >
                    {data.choices.map((el, i) => {
                      return (
                        <option value={el} key={i}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="modal-objectif__victimes__select--container">
                  <select
                    className="modal-objectif__victimes__select"
                    name="victime4"
                    onChange={(e) => setVictime4(e.target.value)}
                  >
                    {data.choices.map((el, i) => {
                      return (
                        <option value={el} key={i}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="modal-objectif__victimes__select--container">
                  <select
                    className="modal-objectif__victimes__select"
                    name="victime5"
                    onChange={(e) => setVictime5(e.target.value)}
                  >
                    {data.choices.map((el, i) => {
                      return (
                        <option value={el} key={i}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="modal-objectif__victimes__select--container">
                  <select
                    className="modal-objectif__victimes__select"
                    name="victime6"
                    onChange={(e) => setVictime6(e.target.value)}
                  >
                    {data.choices.map((el, i) => {
                      return (
                        <option value={el} key={i}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="modal-objectif__victimes__list">
                {data.victimes.map((el, i) => {
                  return (
                    <div key={i} className="modal-objectif__victimes__info">
                      <div className="modal-objectif__victimes__photos--container">
                        <img
                          className="modal-objectif__victimes__photos"
                          src={urlApi.cdn() + el.img}
                          alt=""
                        />
                      </div>
                      <p className="modal-objectif__victimes__nom">{el.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-objectif__errorMessage">{errorMessage}</div>
            <button
              className="modal-objectif__button button--red"
              onClick={handleSubmit14}
            >
              Valider
            </button>
          </div>
        </div>
      );
    }
    if (data.id == 21) {
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
            <div>{renderText(data.detail)}</div>
            <div className="modal-objectif__victimestri__liste">
              {data.victimes.map((el, i) => {
                return (
                  <div
                    key={i}
                    className={`modal-objectif__victimestri__info ${
                      intVictimes[el.name] == false
                        ? "victimestri__info--selected"
                        : ""
                    }`}
                  >
                    <div className="modal-objectif__victimestri__photo--container">
                      <img
                        className={`modal-objectif__victimestri__photo ${
                          intVictimes[el.name] == false
                            ? "victimestri__photo--selected"
                            : ""
                        }`}
                        src={urlApi.cdn() + el.img}
                        onClick={() => toggleIntVictime(el.name)}
                        alt=""
                      />
                    </div>
                    <p className="modal-objectif__victimestri__nom">
                      {el.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="modal-objectif__errorMessage">{errorMessage}</div>
            <button
              className="modal-objectif__button button--red"
              onClick={handleSubmit21}
            >
              Valider
            </button>
          </div>
        </div>
      );
    }
    if (data.id == 23) {
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
            <div>{renderText(data.detail)}</div>
            <div className="modal-objectif__victimestri__liste">
              {data.victimes.map((el, i) => {
                return (
                  <div
                    key={i}
                    className={`modal-objectif__victimestri__info ${
                      finalVictimes[el.name] == false
                        ? "victimestri__info--selected"
                        : ""
                    }`}
                  >
                    <div className="modal-objectif__victimestri__photo--container">
                      <img
                        className={`modal-objectif__victimestri__photo ${
                          finalVictimes[el.name] == false
                            ? "victimestri__photo--selected"
                            : ""
                        }`}
                        src={urlApi.cdn() + el.img}
                        onClick={() => toggleFinalVictime(el.name)}
                        alt=""
                      />
                    </div>
                    <p className="modal-objectif__victimestri__nom">
                      {el.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="modal-objectif__errorMessage">{errorMessage}</div>
            <button
              className="modal-objectif__button button--red"
              onClick={handleSubmit23}
            >
              Valider
            </button>
          </div>
        </div>
      );
    }
    if (data.id == 24 && box2lieu1 == false) {
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
            <div>{renderText(data.predetail)}</div>
            <button
              className="modal-objectif__button button--red"
              onClick={handleModal}
            >
              Valider
            </button>
          </div>
        </div>
      );
    }

    if (data.id == 33 && box3help4 != "closed") {
      return <>{renderLastStep()}</>;
    }
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
      if (data.id == 14 || data.id == 24) {
        return (
          <>
            <button
              className="objectif objectif--open"
              onClick={handleDoneObjectifModal}
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

  // --- LOGIQUE EVENT BOX 1 --- //
  const displayHacking = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box modal-hacking">
          <audio autoPlay onEnded={() => setDisplayButtonOpenMail(true)}>
            <source
              src={urlApi.cdn() + "sounds/103-hacking-tueur.mp3"}
              type="audio/mpeg"
            />
            Votre navigateur ne prend pas en charge ce format
          </audio>
          <div className="text-hacking" data-text="Vous avez un mail">
            Vous avez un mail
          </div>
          {displayButtonOpenMail ? (
            <button
              className="modal-objectif__button button--red"
              onClick={handleOpenMailHacking}
            >
              Valider
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  const handleOpenMailHacking = () => {
    setModaleHacking(false);
    setModaleMailHacking(true);
  };

  const handleCloseMailHacking = async () => {
    setModaleMailHacking(false);
  };

  const displayMailHacking = () => {
    return (
      <>
        <audio autoPlay>
          <source
            src={urlApi.cdn() + "sounds/musiques-db-s2-theme-tueur.wav"}
            type="audio/wav"
          />
          Votre navigateur ne prend pas en charge ce format
        </audio>
        <Document
          title="Email du tueur"
          srcElement={
            urlApi.cdn() + "assets/document/125_Email_Tueur_Oublie.jpg"
          }
          handleModalDocument={handleCloseMailHacking}
        />
      </>
    );
  };



  const displayAudioSamuel = () => {
    return (
      <Audio
        title="Echanges Samuel Perry & Raphaëlle Sanchez"
        srcImg1={urlApi.cdn() + "assets/photos-personnages/Samuel Perry.jpg"}
        srcImg2={urlApi.cdn() + "assets/photos-personnages/raphaelle.jpg"}
        srcTranscription={
          urlApi.cdn() +
          "assets/transcripts/207_Echanges_Samuel_Perry-Raphaelle_transcript.pdf"
        }
        handleModalAudio={closeAudioSamuel}
        srcAudio={
          urlApi.cdn() + "sounds/207-echanges-samuel-perry-raphaelle.mp3"
        }
      />
    );
  };

  const closeAudioSamuel = async () => {
    setAudioSamuel(false);
    setAudioBreakingNews(true);
  };

  const displayAudioBreakingNews = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <audio autoPlay>
            <source
              src={
                urlApi.cdn() +
                "sounds/203-commentaires-raphaelle-breaking-news-1.mp3"
              }
              type="audio/mpeg"
            />
            Votre navigateur ne prend pas en charge ce format
          </audio>
          <p>Attendez, allumez la TV ! </p>
          <button
            className="modal-objectif__button button--red"
            onClick={handleCloseAudioBreakingNews}
          >
            Regarder les infos
          </button>
        </div>
      </div>
    );
  };

  const handleCloseAudioBreakingNews = () => {
    setAudioBreakingNews(false);
    setVideoBreakingNews(true);
    fetchPreviousStateNappe();
  };

  const displayVideoBreakingNews = () => {
    return (
      <>
        {audioEndBreakingNews ? (
          <audio autoPlay onEnded={() => setVideoBreakingNews(false)}>
            <source
              src={
                urlApi.cdn() +
                "sounds/203-commentaires-raphaelle-breaking-news-2.mp3"
              }
              type="audio/mpeg"
            />
            Votre navigateur ne prend pas en charge ce format
          </audio>
        ) : (
          <Video
            title="Flash Info"
            srcVideo={urlApi.cdn() + "videos/db-s02-203-vdef.mp4"}
            handleModalVideo={handleCloseVideoBreakingNews}
          />
        )}
      </>
    );
  };

  const handleCloseVideoBreakingNews = async () => {
    setAudioEndBreakingNews(true);
    fetchPreviousStateNappe();
    await updateHistory(token, 2, "box2video3");
    dispatch({
      type: "setEvent",
      id: "box2video3",
    });
    await updateHistory(token, 2, "box2audio3");
    dispatch({
      type: "setEvent",
      id: "box2audio3",
    });
    await updateHistory(token, 2, "box2document11");
    dispatch({
      type: "setEvent",
      id: "box2document11",
    });
    await updateObjectives(token, 2, 22, "open");
    await updateHelp(token, 2, "box2help2", "open");
    await updateObjectives(token, 2, 21, "done");
    await updateHelp(token, 2, "box2help1", "done");
    actionToggleDataHistory();
    actionToggleDataObjectif();
    actionToggleDataHelp();
  };

  const handleCloseYouveGotMail = () => {
    setMailLauren2(true);
    setYouveGotMail(false);
  };

  const displayYouveGotMail = () => {
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



  const handleCloseMail2 = async () => {
    setMailLauren2(false);
  };

  const displayMailLauren2 = () => {
    return (
      <Document
        title="Email de Lauren Fraser"
        srcElement={urlApi.cdn() + "assets/document/220_Message_Lauren_2.jpg"}
        handleModalDocument={handleCloseMail2}
      />
    );
  };

  const displayVideoSauverLauren = () => {
    fetchPreviousStateNappe();
    return (
      <Video
        title="Cave de Céline"
        srcVideo={urlApi.cdn() + "videos/db-s02-302-def.mp4"}
        handleModalVideo={handleCloseVideoSauverLauren}
      />
    );
  };

  const handleCloseVideoSauverLauren = async () => {
    setVideoSauverLauren(false);
    setDebriefLauren(true);
    fetchPreviousStateNappe();
  };

  const displayDebriefLauren = () => {
    return (
      <Audio
        title="Débrief Lauren"
        srcImg1={urlApi.cdn() + "assets/photos-personnages/lauren.jpg"}
        srcImg2={urlApi.cdn() + "assets/photos-personnages/raphaelle.jpg"}
        srcTranscription={
          urlApi.cdn() + "assets/transcripts/303_Debrief_Lauren_transcript.pdf"
        }
        handleModalAudio={closeDebriefLauren}
        srcAudio={urlApi.cdn() + "sounds/303-debrief-lauren.mp3"}
      />
    );
  };

  const closeDebriefLauren = () => {
    setDebriefLauren(false);
    openLieu('box3lieu3')
  };

  const displayModaleTempsEcoule = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <audio autoPlay>
            <source
              src={urlApi.cdn() + "sounds/306-fin-du-temps.mp3"}
              type="audio/mpeg"
            />
            Votre navigateur ne prend pas en charge ce format
          </audio>
          <p>
            Le temps est écoulé, nous n&apos;avons pas pu sauver la victime à
            temps !
          </p>
          <p>
            Souhaitez-vous réessayer le dernier objectif ou passer à
            l&apos;épilogue ?
          </p>
          <button
            className="modal-objectif__button button--red"
            onClick={handleReset}
          >
            Recommencer
          </button>
          <button
            className="modal-objectif__button button--red"
            onClick={handleGoToResolution}
          >
            Résolution de l&apos;enquête
          </button>
        </div>
      </div>
    );
  };

  const handleReset = async () => {
    setTempsEcoule(false);
    setMauvaiseFin1(false);
    setMauvaiseFin2(false);
    setValue("");
    setVictimeSaved("");
    setNextStep(false);
    await updateEvent(token, 3, 35, "closed");
    await updateEvent(token, 3, 33, "closed");
    await updateHelp(token, 3, "box3help5", "closed");
    await updateHelp(token, 3, "box3help4", "open");
    actionToggleDataEvent();
    actionToggleDataHelp();
  };

  const handleGoToResolution = async () => {
    await updateEvent(token, 3, 35, "done");
    await updateEvent(token, 3, 33, "done");
    actionToggleDataEvent();
    setTempsEcoule(false);
    setMauvaiseFin1(false);
    setMauvaiseFin2(false);
    setResolution(true);
  };

  const displayModaleResolution = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <audio autoPlay onEnded={() => setDisplayTextResolution(true)}>
            <source
              src={urlApi.cdn() + "sounds/307-bonne-fin.mp3"}
              type="audio/mpeg"
            />
            Votre navigateur ne prend pas en charge ce format
          </audio>
          {displayTextResolution ? (
            <>
              <p>
                Bravo, grâce à vous, nous avons réussi à sauver la dernière
                cible et à arrêter Céline !
              </p>
              <p>Il est temps de tout lui faire avouer.</p>
              <button
                className="modal-objectif__button button--red"
                onClick={handleInterrogatoireFinal}
              >
                Voir l&apos;interrogatoire
              </button>
            </>
          ) : (
            <p>Merci Agents, je saute dans un avion !</p>
          )}
        </div>
      </div>
    );
  };



  const handleInterrogatoireFinal = () => {
    setResolution(false);
    setInterrogatoireFinal(true);
    fetchPreviousStateNappe();
  };

  const displayInterrogatoireFinal = () => {
    return (
      <Video
        title="Interrogatoire de Céline Valluy"
        srcVideo={urlApi.cdn() + "videos/db-s02-309-def.mp4"}
        handleModalVideo={handleEndBox3}
      />
    );
  }

  const handleEndBox3 = () => {
    setInterrogatoireFinal(false);
    updateHistory(token, 3, 'box3video3')
    actionToggleDataHistory()
    dispatch({
      type: "setEvent",
      id: "box3video3",
    });
    //setEndGameModale(true);
  };



  return (
    <>
      {renderObjectif()}
      {renderLieu()}
      {modal ? renderModal() : ""}
      {modalBis ? renderModalBis() : ""}
      {modalAnswer ? renderModalAnswer() : ""}
      {modalAnswerBis ? renderModalAnswerBis() : ""}
      {doneObjectifModal ? renderDoneObjectifModal() : ""}
      {modaleHacking ? displayHacking() : null}
      {modaleMailHacking ? displayMailHacking() : null}
      {youveGotMail ? displayYouveGotMail() : null}
      {mailLauren2 ? displayMailLauren2() : null}
      {audioSamuel ? displayAudioSamuel() : null}
      {audioBreakingNews ? displayAudioBreakingNews() : null}
      {videoBreakingNews ? displayVideoBreakingNews() : null}
      {videoSauverLauren ? displayVideoSauverLauren() : null}
      {debriefLauren ? displayDebriefLauren() : null}
      {mauvaiseFin1 ? displayModaleMauvaiseFin1() : null}
      {mauvaiseFin2 ? displayModaleMauvaiseFin2() : null}
      {telCeline ? displayTelCeline() : null}
      {resolution ? displayModaleResolution() : null}
      {tempsEcoule ? displayModaleTempsEcoule() : null}
      {interrogatoireFinal ? displayInterrogatoireFinal() : null}
    </>
  );
};

Objectif.propTypes = {
  data: PropTypes.object,
};

export default Objectif;
