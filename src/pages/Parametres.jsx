/* eslint-disable react-hooks/exhaustive-deps */
// EXPLICATION : Page pour permettre aux joueurs de changer leur identifiant et leur mot de passe

import Input from "../components/Input.jsx";
import { useState, useEffect } from "react";
import useApi from '../utils/hooks/useApi.js';

function Parametres() {
	const token = localStorage.getItem("token");
	const { updatePassword, getUser, updateName } = useApi()

	useEffect(() => {
		const fetchData = async () => {
			const user = await getUser(token);
			setuser(user);
		};
		fetchData();
	}, [token]);

	const [user, setuser] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const newinfos = { email: user.email, name: username };

	const handleSubmitChange = async (e) => {
		e.preventDefault();
		if (password == "" && username == "") {
			setErrorMessage("Merci de remplir au moins un champ pour modifier vos informations");
			return;
		}
		if (password != "" && username != "") {
			setErrorMessage("Merci de changer une information à la fois");
			setUsername("");
			setPassword("");
			return;
		}
		if (password != "" && username == "") {
			await updatePassword(token, password);
			setErrorMessage("Votre mot de passe a bien été modifié !");
		}
		if (password == "" && username != "") {
			await updateName(token, user.id, newinfos);
			setuser((prevUser) => ({ ...prevUser, name: username }));
			setErrorMessage("Votre nom d'agent a bien été modifié !");
		}
		setUsername("");
		setPassword("");
	};

	return (
		<main className="parametres">
			<h1 className="parametres__title">Paramètres</h1>
			<p className="parametres__user">Agent {user.name}</p>
			<div className="parametres__errorMessage">{errorMessage}</div>
			<form className="parametres__form" onSubmit={handleSubmitChange}>
				<p className="parametres__subtitle">Changer votre :</p>
				<Input
					type="texte"
					pattern="\S(.*\S)?"
					label="Nom d'agent"
					name="signup"
					placeholder="Raphaëlle Sanchez"
					value={username}
					setValue={setUsername}
				/>
				<p className="parametres__subtitle">Changer votre :</p>
				<Input
					type="password"
					label="Mot de passe"
					name="signup"
					placeholder="********"
					value={password}
					setValue={setPassword}
				/>
				<button className="parametres__form__button button--red">Valider</button>
			</form>
		</main>
	);
}
export default Parametres;
