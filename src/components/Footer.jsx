/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Ce composant permet de rendre le footer qui contient les objectifs

import Paper from "../assets/img/Paper.png";
import Objectif from "./Objectif";
import { BoxContext, DataContext } from "../utils/context/fetchContext.jsx";
import { useContext, useEffect, useState } from "react";
import useApi from "../utils/hooks/useApi.js";
import EventHandler from './EventHandler.jsx';

const Footer = () => {
  const { currentBox } = useContext(BoxContext);
  const token = localStorage.getItem("token");
  const { toggleDataObjectif } = useContext(DataContext);

  const { getObjectivesByBox } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getObjectivesByBox(token, currentBox);
      setDataObjectif(result.data);
    };
    fetchData();
  }, [toggleDataObjectif, currentBox, token]);

  // EXPLICATION : CurrentBox est utilisé pour fetcher uniquement les objectifs de la boite en cours.

  const [dataObjectif, setDataObjectif] = useState(null);



  return (
    <footer>
			<EventHandler />
      <div className="footer__topSection">
        <div className="footer__paper--container">
          <img className="footer__paper" src={Paper} />
        </div>
        <div className="footer__title--container">
          <p className="footer__title">Vos objectifs</p>
        </div>
      </div>
      <div className="footer__bottomSection">
        <div className="objectif__wrapper">
          {dataObjectif?.map((objectif, index) => (
            <Objectif data={objectif} key={`objectifKey-${index}`} />
          ))}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
