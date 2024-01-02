/* eslint-disable react-hooks/exhaustive-deps */
import MarzipanoInit from "../../utils/const/marzipanoInit.js";
import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/exemple/style.css";
import data from "../../assets/fouilles/exemple/data.js";
import { DataContext } from "../../utils/context/fetchContext.jsx";
import useApi from '../../utils/hooks/useApi.js'
import useEvent from '../../utils/hooks/useEvent.js';

const LieuExemple = ({ onClose }) => {
  const panoRef = useRef(null);
  const viewerRef = useRef(null);
  const arrivalExemple = useRef(sessionStorage.getItem("arrival_exemple"))
  const { actionToggleDataHistory } = useContext(DataContext);
  const { updateHistory } = useApi()
	const { dispatch } = useEvent()

  const songStarter = () => {
    if (!arrivalExemple.current) {
      setTimeout(() => document.getElementById("arrival").play(), 1500);
    }
    document.getElementById("frigo-vroom").play();
  };

  const clicHandle = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Erreur de communication avec l'app détectivebox : Token vide");
      return;
    }
    await updateHistory(token, 2, 'box2document6')
    dispatch({
      type: 'setEvent',
      id: 'box2document6'
    })
    actionToggleDataHistory()
  };

  const exempleInit = () => {
    document.querySelectorAll("#pano > div").forEach((element) => {
      element.style.zIndex = "2";
    });

    document.getElementById("click").addEventListener('click', clicHandle)

    sessionStorage.setItem("arrival_exemple", "1");
  };

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "exemple"), []);
  useEffect(exempleInit, []);
  useEffect(songStarter, []);

  return (
    <div
      id="modal-exemple"
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        top: "0",
        left: "0",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <div id="fouille" className="multiple-scenes">
        <div
          style={{
            background: `url('${
              import.meta.env.BASE_URL
            }fouilles/exemple/assets/masque.png') no-repeat`,
            backgroundSize: "100% 100%",
            height: "100vh",
            width: "100vw",
            zIndex: 1,
            position: "fixed",
            pointerEvents: "none",
          }}
        />
        <div id="pano" ref={panoRef}></div>
        <div id="sceneList" style={{ display: "none" }}>
          <ul className="scenes">
            <a
              href="#"
              className="scene"
              data-id="0-image-jpeg-9e2b05ece620-1-copie"
            >
              <li className="text">Exemple</li>
            </a>
          </ul>
        </div>

        <audio id="arrival" controls style={{ display: "none" }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/exemple/assets/arrival.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <audio
          id="frigo-vroom"
          autoPlay
          loop
          controls
          style={{ display: "none" }}
        >
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/exemple/assets/frigo-vroom.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
        <button
          className="modal-objectif__button button--red"
          style={{
            position: 'fixed',
            bottom: '0.5rem',
            left: '0.5rem',
            zIndex: 10000,
          }}
          onClick={onClose}
        >
          fermer
        </button>
      </div>
    </div>
  );
}

LieuExemple.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LieuExemple;
