/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page Home pour afficher les cartes personnages + les formulaires personnages pour les requêtes

import Card from "../../components/Card.jsx";
import IconLauren from "../../assets/icons/Logo_Lauren.svg";
import IconRaphaelle from "../../assets/icons/Logo_Raphaelle.svg";
import IconTim from "../../assets/icons/Logo_Tim.svg";
import IconAdele from "../../assets/icons/Logo_Adele.svg";
import Tim from "./requetes/Tim";
import Adele from "./requetes/Adele";
import Lauren from "./requetes/Lauren";
import Raphaelle from "./requetes/Raphaelle";
import { useState } from "react";
import { BoxContext, DataContext } from "../../utils/context/fetchContext.jsx";
import { useContext, useEffect, useMemo } from "react";
import { urlApi } from "../../utils/const/urlApi.js";
import useApi from "../../utils/hooks/useApi.js";

function Home() {
  const [characterDisplayed, setCharacterDisplayed] = useState(null);
  const [dataEvent, setDataEvent] = useState(null);
  const { getEventByBox } = useApi();

  const { currentBox } = useContext(BoxContext);
  const { toggleDataEvent } = useContext(DataContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const events_ = await getEventByBox(token, currentBox)
      setDataEvent(events_.data)
    }
    fetchData()
  }, [toggleDataEvent])

  const event31 = useMemo(() => dataEvent && dataEvent.find(event => event.id == 31)?.status, [dataEvent])


  // EXPLICATION : Fonction pour afficher tout les personnages
  const displayAllCharacters = () => {
    return (
      <>
        <div className="card__wrapper">
          <Card
            srcImg={urlApi.cdn()+"assets/photos-personnages/raphaelle.jpg"}
            srcIcon={IconRaphaelle}
            name="Raphaëlle Sanchez"
            contentButton="Explorer un lieu"
            actionButton={() => setCharacterDisplayed("raphaelle")}
            state=""
          />
          <Card
            srcImg={urlApi.cdn()+"assets/photos-personnages/lauren.jpg"}
            srcIcon={IconLauren}
            name="Lauren Fraser"
            contentButton="Demander un interrogatoire"
            actionButton={() => setCharacterDisplayed("lauren")}
            state=""
        />
          <Card
            srcImg={urlApi.cdn()+"assets/photos-personnages/tim.jpg"}
            srcIcon={IconTim}
            name="Tim Lonewood"
            contentButton="Demander une analyse informatique"
            actionButton={() => setCharacterDisplayed("tim")}
            state=""
          />
          <Card
            srcImg={urlApi.cdn()+"assets/photos-personnages/adele.jpg"}
            srcIcon={IconAdele}
            name="Adèle Leinu"
            contentButton="Demander une analyse scientifique"
            actionButton={
              event31 !== 'done' ? null : () => setCharacterDisplayed("adele")
            }
            state={event31 !== 'done' ? "unavailable" : ""}
          />
        </div>
      </>
    );
  };

  // EXPLICATION : Afficher de nouveau tout les personnages
  const backToHome = () => {
    setCharacterDisplayed(null);
  };

  // EXPLICATION : Fonctions pour afficher tout les différents personnages
  const displayLauren = () => {
    return <Lauren closeAgentPage={backToHome} />;
  };

  const displayRaphaelle = () => {
    return <Raphaelle closeAgentPage={backToHome} />;
  };

  const displayTim = () => {
    return <Tim closeAgentPage={backToHome} />;
  };

  const displayAdele = () => {
    return <Adele closeAgentPage={backToHome} />;
  };

  return (
    <main className="main__home">
      {characterDisplayed == null && displayAllCharacters()}
      {characterDisplayed == "lauren" && displayLauren()}
      {characterDisplayed == "raphaelle" && displayRaphaelle()}
      {characterDisplayed == "tim" && displayTim()}
      {characterDisplayed == "adele" && displayAdele()}
    </main>
  );
}
export default Home;
