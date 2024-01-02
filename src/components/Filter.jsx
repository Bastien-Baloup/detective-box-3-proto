// EXPLICATION : Ce composant permet de créer les boutons filtres utilisés dans la page Historique

import PropTypes from "prop-types";
import { useState } from "react";

const Filter = ({ category, handleSearch, activebyDefault }) => {
	const defaultState = () => {
		if (activebyDefault == true) {
			return true;
		}
		return false;
	};

	const [isActive, setIsActive] = useState(() => defaultState());

	// EXPLICATION : Au clic, le filtre change d'état (change de couleur dans l'app) + appel la fonction handleSearch
	const handleClick = () => {
		setIsActive(!isActive);
		handleSearch();
	};

	return (
		<>
			<button onClick={handleClick} className={`filter__button ${isActive ? " filter--active" : ""}`}>
				{category}
			</button>
		</>
	);
};

Filter.propTypes = {
	category: PropTypes.string,
	handleSearch: PropTypes.func,
	activebyDefault: PropTypes.bool,
};

export default Filter;
