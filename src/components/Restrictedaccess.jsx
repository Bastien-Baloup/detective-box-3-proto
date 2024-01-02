// EXPLICATION : Ce composant permet d'encapsuler l'application + la page Parametre + la page Credit.
// EXPLICATION : Si l'utilisateur n'est pas connecté, alors on retourne sur la page Sign-in

import { Outlet } from "react-router-dom";
import { AuthContext } from "../utils/context/fetchContext.jsx";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

const Restrictedaccess = () => {
	const { loggedIn } = useContext(AuthContext);
	const [loader, setLoader] = useState(true);

	if (!loggedIn) {
		return <Navigate to="/sign-in" />;
	}

	setTimeout(() => {
		setLoader(false);
	}, 4000);

	return (
		<>
			{loader ? <Loader /> : ""}
			<Outlet />
		</>
	);
};

export default Restrictedaccess;
