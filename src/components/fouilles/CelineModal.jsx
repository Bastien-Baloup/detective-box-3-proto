import MarzipanoInit from "../../utils/const/marzipanoInit";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/celine/style.css";
import data from "../../assets/fouilles/celine/data";

function CelineModal({ onClose }) {
  const panoRef = useRef(null);
  const viewerRef = useRef(null);
  const arrivalCeline = useRef(sessionStorage.getItem("arrival_celine"));

  const songStarter = () => {
    if (!arrivalCeline.current) {
      setTimeout(() => document.getElementById("arrival").play(), 1500);
    }
  };

  const celineInit = () => {
    const closeImgs = document.querySelectorAll(".close-img");
    closeImgs.forEach((closeImg) => {
      closeImg.addEventListener("click", () => {
        document.querySelectorAll(".img").forEach((img) => {
          img.style.display = "none";
        });
      });
    });

    const watchElements = document.querySelectorAll(".watch");
    watchElements.forEach((watch) => {
      watch.addEventListener("click", (event) => {
        document.querySelectorAll(".img").forEach((img) => {
          img.style.display = "none";
        });
        const id = event.currentTarget.id;
        document.getElementById("img-" + id).style.opacity = 1;
        document.getElementById("img-" + id).style.display = "block";
      });
    });

    const grenierElement = document.querySelector(".grenier");
    if (grenierElement) {
      const playGenierAudio = (event) => {
        document.getElementById("grenier-audio").play();
        grenierElement.removeEventListener(event.type, playGenierAudio);
      };
      grenierElement.addEventListener("click", playGenierAudio);
    }

    const point2Element = document.getElementById("point-2");
    if (point2Element) {
      point2Element.addEventListener("click", () => {
        document.getElementById("music").play();
      });
    }

    const watchParent =
      document.querySelector(".watch").parentElement.parentElement
        .parentElement;
    if (watchParent) {
      watchParent.nextElementSibling.style.display = "none";
    }

    sessionStorage.setItem("arrival_celine", "1");
  };

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "celine"), []);
  useEffect(songStarter, []);
  useEffect(celineInit, []);

  return (
    <div
      id="modal-celine"
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
        <div id="pano" ref={panoRef}></div>

        <div id="sceneList">
          <ul className="scenes">
            <a href="#" className="scene" data-id="0-302_planque3_celine_1">
              <li className="text">302_Planque3_Celine_1</li>
            </a>

            <a href="#" className="scene" data-id="1-302_planque3_celine_2">
              <li className="text">302_Planque3_Celine_2</li>
            </a>

            <a href="#" className="scene" data-id="2-302_planque3_celine_3">
              <li className="text">302_Planque3_Celine_3</li>
            </a>

            <a href="#" className="scene" data-id="3-302_planque3_celine_4">
              <li className="text">302_Planque3_Celine_4</li>
            </a>
          </ul>
        </div>

        <div className="img" id="img-see1" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/celine/assets/photo.jpg`}
            className="img-see"
          />
        </div>

        <div className="img" id="img-see2" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/celine/assets/arbre.jpg`}
            className="img-see"
          />
          <div style={{ textAlign: "center", backgroundColor: "black" }}>
            <a
              href={`${
                import.meta.env.BASE_URL
              }fouilles/celine/assets/arbre.jpg`}
              target="_blank"
              rel="noreferrer"
              className="btn-red"
            >
              Voir de plus près
            </a>
          </div>
        </div>

        <div className="img" id="img-see3" style={{ display: "none", height: '100dvh', maxWidth: '100%', width: 'fit-content' }}>
          <span className="close-img">X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/celine/assets/dossier.jpg`}
            style={{ maxHeight: '75dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className="img-see"
          />
          <div
            style={{
              textAlign: "center",
              backgroundColor: "black",
              padding: "0.5em",
            }}
          >
            <span className="btn-red watch d-screen-none" id="see3pdf">
              Feuilleter
            </span>
            <a
              href={`${
                import.meta.env.BASE_URL
              }fouilles/celine/assets/dossier.pdf`}
              target="_blank"
              rel="noreferrer"
              className="btn-red watch d-mobile-none"
            >
              Feuilleter
            </a>
          </div>
        </div>

        <div
          className="img img-pdf"
          id="img-see3pdf"
          style={{ display: "none" }}
        >
          <span className="close-img">X</span>
          <object
            data={`${
              import.meta.env.BASE_URL
            }fouilles/celine/assets/dossier.pdf#toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
          >
            <div>
              Votre navigateur n&apos;intègre pas de lecteur pdf. Visionner le
              fichier directement{" "}
              <a
                href={`${
                  import.meta.env.BASE_URL
                }fouilles/celine/assets/dossier.pdf`}
              >
                ICI
              </a>
            </div>
          </object>
        </div>

        <div className="img" id="img-see4" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/celine/assets/board.jpg`}
            className="img-see"
          />
          <p
            className="info-hotspot-text"
            style={{
              padding: "0.5em",
              textAlign: "center",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            Tiens le Detective Board de l’affaire… <br />
            Pourquoi donc Céline en garde un exemplaire chez elle ?
          </p>
        </div>

        <div className="img" id="img-see5" style={{ display: "none" }}>
          <span className="close-img">X</span>

          <span className="btn-red watch d-screen-none" id="see5pdf">
            Feuilleter
          </span>
          <a
            href={`${import.meta.env.BASE_URL}fouilles/celine/assets/livre.pdf`}
            target="_blank"
            rel="noreferrer"
            className="btn-red watch d-mobile-none"
            id="see5pdf"
          >
            Feuilleter
          </a>

          <div id="point-2" className="btn-red">
            Actionner
          </div>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/celine/assets/lilith.jpg`}
            className="img-see"
          />
        </div>

        <div
          className="img img-pdf"
          id="img-see5pdf"
          style={{ display: "none" }}
        >
          <span className="close-img">X</span>
          <object
            data={`${import.meta.env.BASE_URL}fouilles/celine/assets/livre.pdf`}
            type="application/pdf"
          >
            <div>
              Votre navigateur n&apos;intègre pas de lecteur pdf. Visionner le
              fichier directement{" "}
              <a
                href={`${
                  import.meta.env.BASE_URL
                }fouilles/celine/assets/livre.pdf`}
              >
                ICI
              </a>
            </div>
          </object>
        </div>

        <div className="img" id="img-see6" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/celine/assets/recu-1.jpg`}
            className="img-see"
          />
          <div
            style={{
              textAlign: "center",
              backgroundColor: "black",
              padding: "0.5em",
            }}
          >
            <span className="btn-red watch" id="see7">
              Retourner
            </span>
          </div>
        </div>

        <div className="img" id="img-see7" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/celine/assets/recu-2.jpg`}
            className="img-see"
          />
          <div
            style={{
              textAlign: "center",
              backgroundColor: "black",
              padding: "0.5em",
            }}
          >
            <span className="btn-red watch" id="see6">
              Retourner
            </span>
          </div>
        </div>

        <audio id="arrival" controls style={{ display: "none" }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/celine/assets/arrival.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <audio id="grenier-audio" controls style={{ display: "none" }}>
          <source
            src={`${
              import.meta.env.BASE_URL
            }fouilles/celine/assets/comment.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <audio id="music" controls style={{ display: "none" }}>
          <source
            src={`${import.meta.env.BASE_URL}fouilles/celine/assets/music.mp3`}
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

CelineModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CelineModal;

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
