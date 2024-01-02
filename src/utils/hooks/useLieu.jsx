import { useState } from 'react';
import PropTypes from "prop-types";


// import LieuExemple from '../../components/fouilles/LieuExemple'
import Cross from "../../assets/icons/Icon_Cross-white.svg";

const Proto__AucunLieu = ({ onClose }) => {
  return (
    <div className="modal-objectif__background">
      <div className="modal-objectif__box">
        <button className="modal-objectif__icon--container">
          <img
            className="modal-objectif__icon"
            src={Cross}
            onClick={onClose}
            alt=""
          />
        </button>
        <h2 className="modal-objectif__title">
          Lieu de fouille
        </h2>
        <div>
          <p className="modal-objectif__subtitle" >
            Le lieu de fouille n&apos;est pas disponible dans cette version.
          </p>
        </div>
        <button className="modal-objectif__button button--red" onClick={onClose}>
          Retour
        </button>
      </div>
    </div>
  );
}

Proto__AucunLieu.propTypes = {
  onClose: PropTypes.func.isRequired,
};


const useLieu = () => {
  const [LieuOpen, setLieuOpen] = useState(false)
  const [Lieu, setLieu] = useState('')

  const renderLieu = () => {
    let LieuModal
    switch (Lieu) {
      // case 'box1lieu1':
      //   LieuModal = LieuExemple
      //   break
      default :
        LieuModal = Proto__AucunLieu
    }
    return (
      LieuOpen && <LieuModal onClose={() => setLieuOpen(false)} /> 
    )
  }

  return { renderLieu, setLieu, setLieuOpen }
}

export default useLieu