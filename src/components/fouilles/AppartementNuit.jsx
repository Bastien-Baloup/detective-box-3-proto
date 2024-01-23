/* eslint-disable react-hooks/exhaustive-deps */
import MarzipanoInit from "../../utils/const/marzipanoInit.js";
import { 
  useEffect, 
  useRef, 
} from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/appartement-nuit/style.css";
import data from "../../assets/fouilles/appartement-nuit/data.js";

const LieuAppartementNuit = ({ onClose, onChange }) => {
  const panoRef = useRef(null);
  const viewerRef = useRef(null);
  const arrivalAppartementNuit = useRef(sessionStorage.getItem('arrival_appartement_nuit'))

  const songStarter = () => {
    if (!arrivalAppartementNuit.current) {
        setTimeout(() => document.getElementById('arrival').play(), 1500)
    }
  }

  const appartementNuitInit = () => {

    const closeImgs = document.querySelectorAll('.close-img')
    closeImgs.forEach((closeImg) => {
      closeImg.onclick = () => {
        document.querySelectorAll('.img').forEach((img) => {
          img.style.display = 'none'
        })
      }
    })

    const watchElements = document.querySelectorAll('.watch')
    watchElements.forEach((watch) => {
      watch.onclick = () => {
        document.querySelectorAll('.img').forEach((img) => {
          img.style.display = 'none'
        })

        if (watch.id == "lien-jour") {
          onChange()
        } else {
          document.getElementById('img-' + watch.id).style.display = 'block'
        }
      }
    })

    sessionStorage.setItem('arrival_appartement_nuit', '1')
  };

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "appartement-nuit"), []);
  useEffect(appartementNuitInit, []);
  useEffect(songStarter, []);

  return (
    <div
      id="modal-appartement-nuit"
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
      <div id="fouille" className="single-scene">
        <div id="pano" ref={panoRef}></div>
        <div id="sceneList" style={{ display: "none" }}>
          <ul className="scenes">
            <a href="#)" className="scene" data-id="0-appartement-2">
              <li className="text">appartement 2</li>
            </a>
          </ul>
        </div>

        <div className="img" id="img-see1" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/appartement-nuit/assets/masque-1.png`}  className="img-see"/>
        </div>
        <div className="img" id="img-see2" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/appartement-nuit/assets/masque-2.png`}  className="img-see"/>
        </div>
        <div className="img" id="img-see3" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/appartement-nuit/assets/masque-3.png`}  className="img-see"/>
        </div>
        <div className="img" id="img-see4" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img src={`${import.meta.env.BASE_URL}fouilles/appartement-nuit/assets/masque-4.png`}  className="img-see"/>
        </div>

        <audio id="arrival" controls  style={{ display: "none" }}>
          <source 
            src={`${import.meta.env.BASE_URL}fouilles/appartement-nuit/assets/arrival.mp3`} 
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

LieuAppartementNuit.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LieuAppartementNuit;
