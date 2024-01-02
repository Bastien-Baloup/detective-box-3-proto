import MarzipanoInit from "../../utils/const/marzipanoInit";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/cave/style.css";
import data from "../../assets/fouilles/cave/data";

function CaveModal({ onClose }) {
  const panoRef = useRef(null);
  const viewerRef = useRef(null);
  const arrivalCave = useRef(sessionStorage.getItem("arrival_cave"));

  const songStarter = () => {
    if (!arrivalCave.current) {
      setTimeout(() => document.getElementById("arrival").play(), 1500);
    }
  };

  const caveInit = () => {
    const watchParent =
      document.querySelector(".watch").parentElement.parentElement
        .parentElement;
    if (watchParent) {
      watchParent.nextElementSibling.style.display = "none";
    }

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
      watch.addEventListener("click", () => {
        document.querySelectorAll(".img").forEach((img) => {
          img.style.display = "none";
        });
        const id = watch.id;
        if (id !== 'board') { 
          document.getElementById("img-" + id).style.opacity = 1;
          document.getElementById("img-" + id).style.display = "block";        
        }

       
        if (
          id === "see4" &&
          document.getElementById("comment-1").getAttribute("src") !== ""
        ) {
          document.getElementById("comment-1").play();

          document.getElementById("comment-1").addEventListener("ended", () => {
            document.getElementById("comment-1").setAttribute("src", "");
          });
        }

        if (
          id === "see5" &&
          document.getElementById("comment-2").getAttribute("src") !== ""
        ) {
          document.getElementById("comment-2").play();

          document.getElementById("comment-2").addEventListener("ended", () => {
            document.getElementById("comment-2").setAttribute("src", "");
          });
        }
      });
    });

    sessionStorage.setItem("arrival_cave", "1");
  };

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "cave"), []);
  useEffect(songStarter, []);
  useEffect(caveInit, []);

  return (
    <div
      id="modal-cave"
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
            <a href="#" className="scene" data-id="0-302_planque_celine_cave_1">
              <li className="text">302_planque_celine_cave_1</li>
            </a>

            <a href="#" className="scene" data-id="1-302_planque_celine_cave_2">
              <li className="text">302_planque_celine_cave_2</li>
            </a>

            <a href="#" className="scene" data-id="2-302_planque_celine_cave_3">
              <li className="text">302_planque_celine_cave_3</li>
            </a>
          </ul>
        </div>

        <div className="img" id="img-see3" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/cave/assets/caisse_outils.jpg`}
            className="img-see"
          />
        </div>
        <div className="img" id="img-see4" style={{ display: "none", height: '100dvh', maxWidth: '100%', width: 'fit-content'  }}>
          <span className="close-img">X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/cave/assets/carnet_estelle.jpg`}
            style={{ maxHeight: '75dvh', height: 'auto', width: 'auto', maxWidth: '100%' }}
            className="img-see"
          />
          <div
            style={{
              background: "black",
              textAlign: "center",
              padding: "0.5em",
            }}
          >
            <a
              href={`${
                import.meta.env.BASE_URL
              }fouilles/cave/assets/carnet-estelle-ouvert.jpg`}
              target="_blank"
              rel='noreferrer'
              className="btn-red"
            >
              Feuilleter
            </a>
          </div>
        </div>

        <div className="img" id="img-see5" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${
              import.meta.env.BASE_URL
            }fouilles/cave/assets/liste_donneurs.jpg`}
            className="img-see"
          />
        </div>

        <div className="img" id="img-see6" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/cave/assets/masque_1.jpg`}
            className="img-see"
          />
        </div>

        <div className="img" id="img-see7" style={{ display: "none" }}>
          <span className="close-img">X</span>
          <img
            src={`${import.meta.env.BASE_URL}fouilles/cave/assets/masque_2.jpg`}
            className="img-see"
          />
        </div>

        <audio id="arrival" controls style={{ display: "none" }}>
          <source
            src={`${import.meta.env.BASE_URL}fouilles/cave/assets/arrival.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <audio id="comment-1" controls style={{ display: "none" }}>
          <source
            src={`${import.meta.env.BASE_URL}fouilles/cave/assets/carnet.mp3`}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <audio id="comment-2" controls style={{ display: "none" }}>
          <source
            src={`${import.meta.env.BASE_URL}fouilles/cave/assets/lists.mp3`}
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

CaveModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CaveModal;

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
