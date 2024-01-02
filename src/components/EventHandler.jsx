/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { DataContext, AmbianceContext, BoxContext } from '../utils/context/fetchContext';

import useApi from '../utils/hooks/useApi';
import useEvent from '../utils/hooks/useEvent';
import { urlApi } from "../utils/const/urlApi";

import Audio from "../components/Audio";
import Video from "../components/Video";



const EventHandler = () => {
  const { actionToggleDataEvent, actionToggleDataHistory, toggleDataEvent, toggleDataHistory } = useContext(DataContext);
	const { fetchPreviousStateNappe } = useContext(AmbianceContext);
  const { currentBox } = useContext(BoxContext);

  const { updateEvent, updateHistory, getHistoryByBox, getEventByBox, updateBox, updateTimeEndBox} = useApi();
  const { state, dispatch } = useEvent();

  const [event25, setEvent25] = useState("");

  const [box2video5, setBox2Video5] = useState(false);

  const [toggleEvent2, setActionToggleEvent2] = useState(false);

  const [modaleMalle, setModaleMalle] = useState(false);
  const [modaleRebecca, setModaleRebecca] = useState(false);
  const [modaleVHS, setModaleVHS] = useState(false);
  const [modaleInterrogatoireGarraud, setModaleInterrogatoireGarraud] = useState(false);
  const [videoInterrogatoireGarraud, setVideoInterrogatoireGarraud] = useState(false);
  const [modaleSquelette, setModaleSquelette] = useState(false);

  const [videoBureauLauren, setVideoBureauLauren] = useState(false);
  const [endGameModale, setEndGameModale] = useState(false);

  const navigate = useNavigate();



    // EXPLICATION : Fonction pour récupérer l'état des événements
    useLayoutEffect(() => {
      const fetchData = async () => {
        const events = await getEventByBox(token, currentBox);
        if (events != undefined) {
          if (currentBox === 2) {
            const event25Data = events.data.find((event) => event.id === 25);
            setEvent25(event25Data.status);
            setActionToggleEvent2(!toggleEvent2);
          }
          
        }
      };
      fetchData();
    }, [toggleDataEvent]);

    useEffect(() => {
      const fetchData = async () => {
        const clues = await getHistoryByBox(token, currentBox);
        // if (currentBox == 1) {
        //   const box1lieu2Data = clues.data.find(
        //     (event) => event.id == "box1lieu2"
        //   );
        //   setBox1Lieu2(box1lieu2Data.status);
        // }
        if (currentBox == 2) {
        // const box2lieu1Data = clues.data.find(
        //   (event) => event.id == "box2lieu1"
        // );
        // setBox2Lieu1(box2lieu1Data.status);
        // const box2lieu3Data = clues.data.find(
        //   (event) => event.id == "box2lieu3"
        // );
        // setBox2Lieu3(box2lieu3Data.status);
        const box2video5Data = clues.data.find(
          (event) => event.id == "box2video5"
        );
          setBox2Video5(box2video5Data.status);
        }
        // if (currentBox == 3) {
        //   const box3audio3Data = clues.data.find(
        //     (event) => event.id == "box3audio3"
        //   );
        //   setBox3Audio3(box3audio3Data.status);
        //   const box3lieu2Data = clues.data.find(
        //     (event) => event.id == "box3lieu2"
        //   );
        //   setBox3Lieu2(box3lieu2Data.status);
        //   const box3lieu3Data = clues.data.find(
        //     (event) => event.id == "box3lieu3"
        //   );
        //   setBox3Lieu3(box3lieu3Data.status);
        // }
      };
      fetchData();
    }, [toggleDataHistory]);

  const token = localStorage.getItem("token");

  

  const openModaleMalle = useCallback(
    () => setModaleMalle(true),
    [setModaleMalle]
  );
  const openModaleVHS = useCallback(() => setModaleVHS(true), [setModaleVHS]);
  const openModaleInterrogatoireGarraud = useCallback(
    () => setModaleInterrogatoireGarraud(true),
    [setModaleInterrogatoireGarraud]
  );
  const openModaleSquelette = useCallback(
    () => setModaleSquelette(true),
    [setModaleSquelette]
  );
  const openEndGameModale = useCallback(
    () => setEndGameModale(true),
    [setEndGameModale]
  )

	const reset = useCallback(() => dispatch({ type: "resetEvent" }), [dispatch]);

  useEffect(() => {
    console.log("Event triggered: " + state.id);
    if (currentBox == 1 && state.id === "box1document1" && !modaleMalle) {
      openModaleMalle();
    }
    if (state.id === "box1video2" && !modaleVHS) {
      openModaleVHS();
    }
    if (
      currentBox == 1 &&
      state.id === "box1document6" &&
      !modaleInterrogatoireGarraud
    ) {
      openModaleInterrogatoireGarraud();
    }
    if (state.id === "box1video3") {
      actionToggleDataHistory();
    }
    if (state.id === "box3document2" && !modaleSquelette) {
      openModaleSquelette();
    }
    if (state.id === "box3video3") {
      openEndGameModale()
    }
    return () => {
      console.log("cleanup");
      reset();
    };
  }, [state.toogleEvent]);

  useEffect(() => {
    if (currentBox == 2) {
      console.log(event25, box2video5);
      // EXPLICATION : Pour faire le lien entre le composant Home (carte Lauren) et ici
      if (event25 == "open" && box2video5 == false) {
        setVideoBureauLauren(true);
        fetchPreviousStateNappe();
      }
    }
  }, [toggleEvent2]);

  const handleOpenRebeccaAudio = () => {
    fetchPreviousStateNappe();
    setModaleMalle(false);
    setModaleRebecca(true);
  };

	const displayContentMalle = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <p>
            Je vous transmets l&apos;enregistrement qu&apos;on a trouvé dans la
            malle pour que vous puissiez l&apos;écouter.
          </p>
          <p> Tim nous confirme que c&apos;est bien la voix de Rebecca.</p>
          <p>
            Attention, j&apos;ai écouté l&apos;enregistrement et il est assez
            dur. Pour les âmes sensibles, cliquez sur la transcription.
          </p>
          <p> On a aussi un médaillon, difficile de dire à quoi il sert. </p>
          <p>
            Quant aux inscriptions, je vous laisse me dire ce que ça vous
            inspire... tous les éléments sont dans l&apos;historique
          </p>
          <button
            className="modal-objectif__button button--red"
            onClick={handleOpenRebeccaAudio}
          >
            Ecouter l&apos;enregistrement
          </button>
        </div>
      </div>
    );
  };

	const displayAudioRebecca = () => {
    return (
      <Audio
        title="Derniers mots de Rebecca"
        srcImg1={urlApi.cdn() + "assets/photos-personnages/rebecca_dumont.jpg"}
        srcImg2={null}
        srcTranscription={
          urlApi.cdn() +
          "assets/transcripts/102_Derniers_mots_Rebecca_transcript.pdf"
        }
        handleModalAudio={closeAudioRebecca}
        srcAudio={urlApi.cdn() + "sounds/102-derniers-mots-rebecca.mp3"}
      />
    );
  };

	const closeAudioRebecca = async () => {
    await updateEvent(token, 1, 13, "done");
    actionToggleDataEvent();
    await updateHistory(token, 1, "box1audio1");
    dispatch({
      type: "setEvent",
      id: "box1audio1",
    });
    actionToggleDataHistory();
    setModaleRebecca(false);
  };

  const displayModaleVHS = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <p>Voilà ce qu&apos;on a retrouvé dans le coffre:</p>
          <p>LETTRE</p>
          <p>La lettre est disponible dans l&apos;onglet Historique</p>
          <p>VHS</p>
          <p>
            Il y a deux passages intéressants dans la video: un vers 15min où on
            voit Charles Garraud et un autre à la fin... La VHS est entre les
            mains de Tim pour de plus amples analyses. N&apos;hésitez pas à le
            solliciter pour accéder au contenu.
          </p>
          <p>PLAN</p>
          <p>
            Il y avait aussi ce plan étrange, il n&apos;a pas l&apos;air bien
            vieux, il a dû être accroché à la maison il n&apos;y a pas
            longtemps.
          </p>
          <p>
            Ça ne correspond à aucune des adresses qu&apos;on a trouvées
            jusqu&apos;ici...
          </p>
          <p>Vous pouvez l&apos;étudier depuis l&apos;Historique</p>
          <button
            className="modal-objectif__button button--red"
            onClick={handleCloseModaleVHS}
          >
            Continuer l&apos;enquête
          </button>
        </div>
      </div>
    );
  };

  const handleCloseModaleVHS = async () => {
    await updateEvent(token, 1, 14, "done");
    actionToggleDataEvent();
    setModaleVHS(false);
  };

	const displayModaleInterrogatoireGarraud = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <p>
            Ça fait de sacrées révélations tout ça... Je pense qu&apos;avec ce
            qu&apos;on a là, on devrait pouvoir interroger Charles Garraud.
          </p>
          <button
            className="modal-objectif__button button--red"
            onClick={handleOpenInterrogatoire}
          >
            Passer à l&apos;interrogatoire
          </button>
        </div>
      </div>
    );
  };

  const handleOpenInterrogatoire = () => {
    setModaleInterrogatoireGarraud(false);
    setVideoInterrogatoireGarraud(true);
    fetchPreviousStateNappe();
  };

  const displayVideoInterrogatoireGarraud = () => {
    return (
      <Video
        title="Interrogatoire de Charles Garraud"
        srcVideo={urlApi.cdn() + "videos/db-s02-104-vdef.mp4"}
        handleModalVideo={handleCloseVideoInterrogatoire}
      />
    );
  };

  const handleCloseVideoInterrogatoire = async () => {
    setVideoInterrogatoireGarraud(false);
    setEndGameModale(true);
  };

    // --- LOGIQUE EVENT BOX 2 --- //

    const displayVideoBureauLauren = () => {
      return (
        <Video
          title="Bureau de Lauren Fraser"
          srcVideo={urlApi.cdn() + "videos/db-s02-209-vdef.mp4"}
          handleModalVideo={handleCloseVideoBureau}
        />
      );
    };
  
    const handleCloseVideoBureau = async () => {
      setVideoBureauLauren(false);
      setEndGameModale(true);
    };
  
      // --- LOGIQUE EVENT BOX 3 --- //

  const displayModaleSquelette = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box">
          <p>Bon travail, regardons ce qu&apos;il y a dans ce coffre :</p>
          <p>
            Un squelette entier, je ne sais pas de quand il date, mais
            c&apos;est sacrément bien conservé, sauf la tête.
          </p>
          <p>
            Vous devriez demander à Adèle ce qu&apos;elle peut trouver dessus.{" "}
          </p>
          <p>Et une vieille photo…</p>
          <p>Vous trouverez tout ça dans l&apos;Historique.</p>
          <button
            className="modal-objectif__button button--red"
            onClick={handleCloseModaleSquelette}
          >
            Continuer l&apos;enquête
          </button>
        </div>
      </div>
    );
  };

  const handleCloseModaleSquelette = () => {
    setModaleSquelette(false);
  };

  const handleEndGameModale = async () => {
    if (currentBox == 1) {
      // await updateHistory(token, 1, "box1video4");
      await updateEvent(token, 1, 15, "done");
      await updateBox(token, 1, "done");
      await updateBox(token, 2, "open");
      await updateTimeEndBox(token, 1);
    }
    if (currentBox == 2) {
      // await updateHistory(token, 2, "box2video5");
      await updateEvent(token, 2, 25, "done");
      await updateBox(token, 2, "done");
      await updateBox(token, 3, "open");
      await updateTimeEndBox(token, 2);
    }
    if (currentBox == 3) {
      updateHistory(token, 3, "box3video3");
      dispatch({
        type: "setEvent",
        id: "box3video3",
      });
      //await updateBox(token, 3, "done");
      await updateTimeEndBox(token, 3);
    }
    navigate("/box-choice");
  };

  const renderEndText = () => {
    if (currentBox == 1) {
      return (
        <div className="modal-objectif__endGame--text">
          <p>Vous avez fini la première partie</p>
          <p>Rendez-vous en box 2 pour la suite de l&apos;enquête</p>
        </div>
      );
    }
    if (currentBox == 2) {
      return (
        <div className="modal-objectif__endGame--text">
          <p>Vous avez fini la seconde partie</p>
          <p>Rendez-vous en box 3 pour clore cette affaire</p>
        </div>
      );
    }
    if (currentBox == 3) {
      return (
        <div className="modal-objectif__endGame--text">
          <p>
            Vous avez définitivement clôturé le dossier du Tueur au Tarot, bravo
            Agents !
          </p>
          <p>Au plaisir de vous retrouver sur de prochaines enquêtes.</p>
        </div>
      );
    }
  };

  const displayEndGameModale = () => {
    return (
      <div className="modal-objectif__background">
        <div className="modal-objectif__box modal-objectif__endGame">
          {renderEndText()}
          {currentBox == 3 ? (
            <button
              className="modal-objectif__button button--red"
              onClick={handleEndGameModale}
            >
              Classer l&apos;affaire
            </button>
          ) : (
            <button
              className="modal-objectif__button button--red"
              onClick={handleEndGameModale}
            >
              Clore cette partie de l&apos;enquête
            </button>
          )}
        </div>
      </div>
    );
  };





  return (
    <>
    {modaleMalle ? displayContentMalle() : null}
    {modaleRebecca ? displayAudioRebecca() : null}
    {modaleVHS ? displayModaleVHS() : null}
    {modaleInterrogatoireGarraud
      ? displayModaleInterrogatoireGarraud()
      : null}
    {videoInterrogatoireGarraud ? displayVideoInterrogatoireGarraud() : null}
    {videoBureauLauren ? displayVideoBureauLauren() : null}
    {modaleSquelette ? displayModaleSquelette() : null}
    {endGameModale ? displayEndGameModale() : null}
    </>
  )
}

export default EventHandler