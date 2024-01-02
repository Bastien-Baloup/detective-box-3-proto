import MarzipanoInit from "../../utils/const/marzipanoInit";
import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/foret/style.css";
import data from "../../assets/fouilles/foret/data";
import { DataContext } from "../../utils/context/fetchContext";
import useApi from "../../utils/hooks/useApi.js";
import useEvent from "../../utils/hooks/useEvent.js";

function ForetModal({ onClose }) {
  const panoRef = useRef(null);
  const viewerRef = useRef(null);
  const arrivalForet = useRef(sessionStorage.getItem("arrival_foret"));
  const isWatchClick = useRef(false);
  const {
    actionToggleDataHistory,
    actionToggleDataHelp,
    actionToggleDataObjectif,
  } = useContext(DataContext);
  const { updateHistory, updateHelp, updateObjectives } = useApi();
  const { dispatch } = useEvent();

  const clickHandle = async () => {
    console.log('click')
    let token = localStorage.getItem("token");

    await updateHistory(token, 3, "box3document2");
    dispatch({
      type: "setEvent",
      id: "box3document2",
    });
    await updateHistory(token, 3, "box3document3");
    dispatch({
      type: "setEvent",
      id: "box3document3",
    });
    actionToggleDataHistory();
    await updateObjectives(token, 3, 33, "open");
    await updateObjectives(token, 3, 34, "open");
    actionToggleDataObjectif();
    await updateHelp(token, 3, "box3help3", "open");
    await updateHelp(token, 3, "box3help6", "open");
    await updateHelp(token, 3, "box3help2", "done");
    actionToggleDataHelp();
  };

  const fadeIn = (element) => {
    element.style.display = "block";
    element.classList.add("fade-in-1");
    element.classList.remove("fade-out");
    setTimeout(() => {
      element.style.opacity = 1;
    }, 50);
  };

  const fadeIn10 = (element) => {
    element.style.display = "block";
    element.classList.add("fade-in-10");
    element.classList.remove("fade-out");
    setTimeout(() => {
      element.style.opacity = 1;
    }, 50);
  };

  const fadeOut = (element) => {
    element.style.opacity = 0;
    element.classList.add("fade-out");
    element.classList.remove("fade-in");
    setTimeout(() => {
      element.style.display = "none";
    }, 1000);
  };

  const songStarter = () => {
    if (!arrivalForet.current) {
      setTimeout(() => document.getElementById("arrival").play(), 1500);
    }
    document.getElementById("birds").play();
  };

  const playAudio = (audioElement) => {
    audioElement.play();
  };

  const foretInit = () => {
    const linkHotspot = document.querySelector(".link-hotspot");
    linkHotspot.addEventListener("click", () => {
      const location = linkHotspot.textContent;

      if (location === "Sortir du dolmen") {
        playAudio(document.getElementById("arbres"));
        const arbresElement = document.getElementById("arbres");
        if (arbresElement.src !== "") {
          document.getElementById("arrival").pause();
          playAudio(arbresElement);
          arbresElement.addEventListener("ended", () => {
            arbresElement.src = "";
          });
        }
      }
    });

    const diggingElement = document.getElementById("digging");
    const digImgElements = document.querySelectorAll(".dig-img");
    digImgElements.forEach((digImg) => {
      digImg.addEventListener("click", () => {
        fadeOut(digImg);
        diggingElement.pause();
        diggingElement.currentTime = 0;
        fadeOut(document.querySelector(".dig-see"));
      });
    });

    const playDiggingNotAudio = () => {
      document.getElementById("digging-not").play();
      diggingElement.removeEventListener("ended", playDiggingNotAudio);
    };

    const playDiggingFound = () => {
      document.getElementById("digging-found").play();
      diggingElement.removeEventListener("ended", playDiggingFound);
    };

    const digElements = document.querySelectorAll(".dig");
    let number = 0;
    digElements.forEach((dig) => {
      dig.addEventListener("click", () => {
        playAudio(diggingElement);
        fadeIn(document.querySelector(".dig-img"));

        if (dig.id === "dig30") {
          fadeOut(document.querySelector(".dig-see"));
          fadeIn10(document.querySelector(".dig-see-2"));

          diggingElement.addEventListener("ended", playDiggingFound);
        } else {
          fadeOut(document.querySelector(".dig-see-2"));
          fadeIn10(document.querySelector(".dig-see"));

          diggingElement.addEventListener("ended", playDiggingNotAudio);

          number = number === 7 ? 7 : number + 1;
          document.getElementById("digging-not").src = `${
            import.meta.env.BASE_URL
          }fouilles/foret/digging-${number}.mp3`;
        }
      });
    });

    const imgElements = document.querySelectorAll(".img");
    imgElements.forEach((img) => {
      fadeOut(img);
      img.addEventListener("click", () => {
        if (!isWatchClick.current) {
          fadeOut(img);
        }
        isWatchClick.current = false;
      });
    });

    document.body.addEventListener("click", () => {
      imgElements.forEach((img) => {
        if (!isWatchClick) {
          fadeOut(img);
        }
      });
      isWatchClick.current = false;
    });

    const watchElements = document.querySelectorAll(".watch");
    watchElements.forEach((watch) => {
      watch.addEventListener("click", () => {
        isWatchClick.current = true;

        const id = watch.id;
        const imgElement = document.getElementById("img-" + id);
        fadeIn(imgElement);
      });
    });

    sessionStorage.setItem("arrival_foret", "1");
  };

  useEffect(() => MarzipanoInit(panoRef, viewerRef, data, "foret"), []);
  useEffect(songStarter, []);
  useEffect(foretInit, []);

  return (
    <div
      id="modal-foret"
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
        <div id="pano" ref={panoRef}>
          <div className="dig-img" style={{ display: "none" }}>
            <div className="dig-see" style={{ display: "none", opacity: 0 }} >
              <img
                src={`${import.meta.env.BASE_URL}fouilles/foret/rien.jpg`}
                className="dig-rien"
              />
              <span className='close-img'>X</span>
            </div>
            
            <div className="dig-see-2" style={{ display: "none", opacity: 0 }}>
              <img
                src={`${import.meta.env.BASE_URL}fouilles/foret/os.jpg`}
                className="dig-see-3"
              />
              <br />
              <a href="#" className="confirm" onClick={() => {clickHandle();onClose()}}>
                Ouvrir le coffre
              </a>
            </div>
          </div>
          <div className="img" id="img-see1" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande25.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see20" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande25.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see3" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande2.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see25" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande3.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see2" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande4.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see10" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande5.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see11" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande6.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see12" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande7.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see9" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande8.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see5" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande9.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see6" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande10.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see7" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande11.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see14" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande12.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see22" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande13.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see22" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande9.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see24" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande8.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see15" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande14.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see16" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande15.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see12" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande16.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see18" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande16.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see19" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande17.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see16" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande18.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see19" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande19.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see8" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande20.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see21" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande21.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see13" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande1.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see23" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande23.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see17" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande24.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see4" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande22.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see25" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande7.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see26" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande12.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see27" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande21.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see28" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande19.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see29" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande9.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see30" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande23.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>

          <div className="img" id="img-see31" style={{ display: "none" }}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }fouilles/foret/gravures/bande2.jpg`}
              className="img-see"
            />
            <span className='close-img'>X</span>
          </div>
        </div>
        <div id="sceneList" style={{ display: "none" }}>
          <ul className="scenes">
            <a href="#" className="scene" data-id="0-chapelle">
              <li className="text">Chapelle</li>
            </a>
            {[4, 1, 5, 8, 10, 12, 13, 3, 2, 9, 7, 6, 16, 11, 15, 14].map(
              (index) => (
                <a
                  key={`scene-${index}`}
                  href="#"
                  className="scene"
                  data-id={index < 10 ? `0${index}` : index}
                >
                  <li className="text">Avancer dans cette direction</li>
                </a>
              )
            )}
          </ul>
        </div>
        <a
          id="reset-lieu"
          style={{
            position: "fixed",
            left: "0.5rem",
            top: "0.5rem",
            zIndex: 1000,
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          href="#"
        >
          Retourner au début
        </a>
        {[
          "arrival",
          "arbres",
          "digging",
          "digging-not",
          "digging-found",
          "birds",
        ].map((audioId) => (
          <audio
            key={audioId}
            id={audioId}
            controls
            style={{ display: "none" }}
          >
            <source
              src={`${import.meta.env.BASE_URL}fouilles/foret/${audioId}.mp3`}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        ))}
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

ForetModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ForetModal;

/*
<button
  className='modal-objectif__button button--red'
  onClick={onClose}
>
  fermer
</button>
*/
