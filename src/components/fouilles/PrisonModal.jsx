import MarzipanoInit from '../../utils/const/marzipanoInit'
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/prison/style.css";
import data from "../../assets/fouilles/prison/data";

function PrisonModal({ onClose }) {
  const panoRef = useRef(null);
  const viewerRef = useRef(null);
  const arrivalPrison = useRef(sessionStorage.getItem("arrival_prison"));

  const songStarter = () => {
    if (!arrivalPrison.current) {
      setTimeout(() => document.getElementById("arrival").play(), 1500);
    }
  };

  const prisonInit = () => {
    document.querySelectorAll(".watch").forEach((element) => {
      element.addEventListener("click", () => {
        document.querySelectorAll(".img").forEach((imgElement) => {
          imgElement.style.display = "none";
        });
        const id = element.getAttribute("id");
        document.getElementById("img-" + id).style.display = "block";
      });
    });

    document.querySelectorAll(".close-img").forEach((element) => {
      element.addEventListener("click", () => {
        document.querySelectorAll(".img").forEach((imgElement) => {
          imgElement.style.display = "none";
        });
      });
    });
    sessionStorage.setItem("arrival_prison", "1");
  };

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "prison"), []);
  useEffect(prisonInit, []);
  useEffect(songStarter, []);

  return (
    <div
      id="modal-prison"
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
      <div id="fouille" className="single-scenes">
        <div id="pano" ref={panoRef}></div>

        <div id="sceneList">
          <ul className="scenes">
            <a href="javascript:void(0)" className="scene" data-id="0-prison">
              <li className="text">Prison</li>
            </a>
          </ul>
        </div>

        <div className="img" id="img-see1" style={{ display: "none", height: '100dvh', maxWidth: '100%', width: 'fit-content' }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/prison/assets/1.png`}
            style={{ maxHeight: '80dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className="img-see"
          />
          <div style={{ textAlign: "center" }}>
            <div className="btn-red watch" id="see3">
              Retourner
            </div>
          </div>
        </div>

        <div className="img" id="img-see2" style={{ display: "none", height: '100dvh', maxWidth: '100%', width: 'fit-content' }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/prison/assets/2.png`}
            style={{ maxHeight: '80dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className="img-see"
          />
        </div>

        <div className="img" id="img-see3" style={{ display: "none", height: '100dvh', maxWidth: '100%', width: 'fit-content'}}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/prison/assets/3.png`}
            style={{ maxHeight: '80dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className="img-see"
          />
          <div style={{ textAlign: "center" }}>
            <div className="btn-red watch" id="see1">
              Retourner
            </div>
          </div>
        </div>

        <audio id="arrival" controls style={{ display: "none" }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/prison/assets/arrival.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <button
          className="modal-objectif__button button--red"
          style={{
            position: "fixed",
            bottom: "0.5rem",
            left: "0.5rem",
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

PrisonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PrisonModal;

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
