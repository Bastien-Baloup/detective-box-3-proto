/* eslint-disable react-hooks/exhaustive-deps */
import MarzipanoInit from "../../utils/const/marzipanoInit";
import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/appartement/style.css";
import data from "../../assets/fouilles/appartement/data";
import { DataContext } from "../../utils/context/fetchContext";
import useApi from '../../utils/hooks/useApi.js'
import useEvent from '../../utils/hooks/useEvent.js';

function AppartementModal({ onClose }) {
  const panoRef = useRef(null);
  const viewerRef = useRef(null);
  const arrivalAppartement = useRef(sessionStorage.getItem("arrival_appartement"))
  const { actionToggleDataHistory } = useContext(DataContext);
  const { updateHistory } = useApi()
	const { dispatch } = useEvent()
  const clicked = useRef(false);
  const clickY = useRef(null);

  const songStarter = () => {
    if (!arrivalAppartement.current) {
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

  const retour = () => {
    document.getElementById("fouille").style.display = "block";
    document.getElementById("panel-photos").style.display = "none";
    document.getElementById("frigo").style.display = "none";
    document.getElementById("video-frigo").pause();
    document.getElementById("video-frigo").currentTime = 0;
  };

  const updateScrollPos = (e) => {
    document.documentElement.style.cursor = "row-resize";
    window.scrollTo(
      window.scrollX,
      window.scrollY + (clickY.current - e.pageY)
    );
  };

  const appartementInit = () => {
    document.addEventListener("mousemove", (e) => {
      clicked.current && updateScrollPos(e);
    });

    document.addEventListener("mousedown", (e) => {
      clicked.current = true;
      clickY.current = e.pageY;
    });

    document.addEventListener("mouseup", () => {
      clicked.current = false;
      document.documentElement.style.cursor = "auto";
    });

    document.querySelectorAll("#pano > div").forEach((element) => {
      element.style.zIndex = "2";
    });

    const ouvrirPhotos = document.getElementById("ouvrir-photos");
    if (ouvrirPhotos) {
      ouvrirPhotos.addEventListener("click", (e) => {
        e.preventDefault();
        const arrivalPhoto = sessionStorage.getItem("detective_box_photo");
        document.getElementById("panel-photos").style.display = "block";
        document.getElementById("fouille").style.display = "none";
        clicHandle();
        
        if (!arrivalPhoto) {
          document.getElementById("photos").play();

          const photosEndedHandler = () => {
            document.getElementById("ding").play();
            document.getElementById("texto").style.display = "block";
            setTimeout(() => {
              document.getElementById("texto").style.display = "none";
            }, 15000);
            document
              .getElementById("photos")
              .removeEventListener("ended", photosEndedHandler);
          };

          document
            .getElementById("photos")
            .addEventListener("ended", photosEndedHandler);

          sessionStorage.setItem("detective_box_photo", "1");
        }
      });
    }

    const ouvrirFrigo = document.getElementById("ouvrir-frigo");
    if (ouvrirFrigo) {
      ouvrirFrigo.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("frigo").style.display = "block";
        document.getElementById("fouille").style.display = "none";
        document.getElementById("video-frigo").play();
      });
    }

    document.querySelectorAll(".w-50").forEach((element) => {
      element.addEventListener("click", () => {
        document.querySelectorAll(".w-75").forEach((el) => {
          el.style.display = "none";
        });
        element.nextElementSibling.style.display = "block";
      });
    });

    document.querySelectorAll(".w-75").forEach((element) => {
      element.addEventListener("click", () => {
        element.style.display = "none";
      });
    });

    sessionStorage.setItem("arrival_appartement", "1");
  };

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "appartement"), []);
  useEffect(appartementInit, []);
  useEffect(songStarter, []);

  return (
    <div
      id="modal-appartement"
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
            }fouilles/appartement/assets/masque.png') no-repeat`,
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
              <li className="text">Appartement</li>
            </a>
          </ul>
        </div>

        <audio id="arrival" controls style={{ display: "none" }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/appartement/assets/arrival.mp3`}
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
            }fouilles/appartement/assets/frigo-vroom.mp3`}
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
      <div
        id="panel-photos"
        style={{
          overflow: "scroll",
          backgroundImage: `url('${
            import.meta.env.BASE_URL
          }fouilles/appartement/assets/bg.png')`,
          backgroundSize: "cover",
          display: "none",
          height: "100%",
        }}
      >
        <div>
          <a
            id="retour-photos"
            href="#"
            className="confirm"
            onClick={retour}
            style={{
              position: "absolute",
              zIndex: 100,
              top: "2%",
              right: "2%",
            }}
          >
            Retour à la pièce
          </a>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/appartement/assets/duchamp.jpg`}
            className="w-50 mt-5 ml-5 shadow m-3"
            style={{ transform: "rotate(15deg)" }}
          />
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/appartement/assets/message-1.png`}
            className="w-25 shadow m-3"
            style={{ transform: "rotate(-10deg)" }}
          />
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/appartement/assets/message-2.png`}
            className="w-25 shadow m-3"
            style={{ transform: "rotate(15deg)" }}
          />
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/appartement/assets/message-3.png`}
            className="w-50 mb-5 shadow m-3"
            style={{ transform: "rotate(5deg)" }}
          />
          <img
            src={`${import.meta.env.BASE_URL}fouilles/appartement/assets/3.jpg`}
            className="w-25 shadow m-3"
            style={{ transform: "rotate(-10deg) translate(7.5%, -30%)" }}
          />
          <img
            src={`${import.meta.env.BASE_URL}fouilles/appartement/assets/1.jpg`}
            className="w-25 ml-5 shadow m-3"
            style={{ transform: "rotate(5deg) translate(-112.5%, 7.5%)" }}
          />

          <div style={{ width: "100%", textAlign: "center" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/appartement/assets/4.jpg`}
              className="w-25 ml-5shadow m-3"
              style={{ transform: "rotate(10deg)" }}
            />
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/appartement/assets/2.jpg`}
              className="w-25 mt-5 ml-5 shadow m-3"
              style={{ transform: "rotate(5deg)" }}
            />
          </div>
        </div>

        <img
          id="texto"
          src={`${
            import.meta.env.BASE_URL
          }fouilles/appartement/assets/texto-sanchez.png`}
          style={{
            display: "none",
            position: "fixed",
            top: "10px",
            right: "10px",
            height: "90vh",
          }}
        />

        <audio id="photos" controls style={{ display: "none" }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/appartement/assets/photo.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <audio id="ding" controls style={{ display: "none" }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/appartement/assets/ding.mp3`}
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
      <div id="frigo" style={{ backgroundColor: "black", display: "none" }}>
        <video
          id="video-frigo"
          src={`${
            import.meta.env.BASE_URL
          }fouilles/appartement/assets/frigo.mp4`}
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            maxHeight: "calc(100dvh - 40px)",
          }}
        ></video>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "3em",
          }}
        >
          <a
            id="retour-frigo"
            href="#"
            className="confirm"
            onClick={retour}
            style={{
              width: "max-content",
              margin: "auto",
              marginTop: "10px",
            }}
          >
            Retour à la pièce
          </a>
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
    </div>
  );
}

AppartementModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AppartementModal;
