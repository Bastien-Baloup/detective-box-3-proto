// EXPLICATION : Page Login qui va afficher les formulaires sign in, sign up et mot de passe oublié

import { useState } from "react";
import { AuthContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Logo from "../assets/img/DB-Logo-DetectiveBox_DetectiveBlanc.png";
import { Navigate } from "react-router-dom";
import useApi from '../utils/hooks/useApi.js';

function Login() {
	const [isSigninActive, setIsSigninActive] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessageSignin, setErrorMessageSignin] = useState("");
	const [errorMessageSignup, setErrorMessageSignup] = useState("");
	const [errorMessageForgot, setErrorMessageForgot] = useState("");
	const [email, setEmail] = useState("");
	const [emailForgot, setEmailForgot] = useState("");
	const [modalNewUser, setModalNewUser] = useState(false);
	const credentials = { email: email.toLowerCase(), password: password };
	const newaccount = { email: email.toLowerCase(), password: password, name: username };
	const { login, loggedIn } = useContext(AuthContext);
	const { getToken, createUser, forgotPassword } = useApi()

	// EXPLICATION : Si le joueur est connecté, alors redirection sur le choix des boxs
	if (loggedIn) {
		return <Navigate to="/box-choice" />;
	}

	const handleSubmitSignin = async (e) => {
		e.preventDefault();
		if (email == "" || password == "") {
			setErrorMessageSignin("Merci de remplir le formulaire pour vous connecter");
			return;
		}
		const res = await getToken(credentials);
		if (res.status === 401) {
			setErrorMessageSignin("Veuillez vérifier vos identifiants");
			return;
		}
		const dataToken = await res.json();
		login(dataToken.access_token);
		setUsername("");
		setEmail("");
		setPassword("");
		setErrorMessageSignin("");
	};

	const handleSubmitSignup = async (e) => {
		e.preventDefault();
		if (email == "" || password == "" || username == "") {
			setErrorMessageSignup("Merci de remplir le formulaire pour créer un compte");
			return;
		}
		const res = await createUser(newaccount);
		if (res.status === 409) {
			setErrorMessageSignup("Ce compte existe déjà");
			return;
		}
		// const newUser = await res.json();
		// console.log(newUser);
		setUsername("");
		setEmail("");
		setPassword("");
		setErrorMessageSignup("");
		setModalNewUser(true);
	};

	// EXPLICATION : Gérer le formulaire pour le mot de passe oublié
	const handleSubmitEmailForgot = async (e) => {
		e.preventDefault();
		if (emailForgot == "") {
			setErrorMessageForgot("Merci de rentrer une adresse mail");
			return;
		}
		await forgotPassword(emailForgot.toLowerCase());
		setEmailForgot("");
		setErrorMessageForgot("");
		alert("Un nouveau mot de passe vous a été envoyé par mail !");
	};

	// EXPLICATION : A chaque fois qu'on switch de sign in à sign up, alors on reset les states
	const switchToSignup = () => {
		setErrorMessageForgot("");
		setErrorMessageSignin("");
		setErrorMessageSignup("");
		setIsSigninActive(false);
		setUsername("");
		setEmail("");
		setPassword("");
	};
	// EXPLICATION : A chaque fois qu'on switch de sign up à sign in, alors on reset les states
	const switchToSignin = () => {
		setErrorMessageForgot("");
		setErrorMessageSignin("");
		setErrorMessageSignup("");
		setIsSigninActive(true);
		setUsername("");
		setEmail("");
		setPassword("");
	};

	// EXPLICATION : Modale de confirmation de la création d'un nouveau compte
	const displayModalConfirmNewUser = () => {
		return (
			<div className="modal-confirm__background">
				<div className="modal-confirm__box">
					<p className="modal-confirm__text">Votre compte a bien été créé</p>
					<button className="modal-confirm__button button--red" onClick={handleModalNewUser}>
						Se connecter
					</button>
				</div>
			</div>
		);
	};

	const handleModalNewUser = () => {
		setModalNewUser(false);
		switchToSignin();
	};

	return (
		<main className="login">
			<a className="login__link" href="https://app.detectivebox.fr/connexion">
				&lt; Retour aux choix des scénarios
			</a>
			<img className="login__logo" src={Logo} alt='' />
			{modalNewUser ? displayModalConfirmNewUser() : ""}
			{isSigninActive ? (
				<Signin
					handleSubmitSignin={handleSubmitSignin}
					errorMessageSignin={errorMessageSignin}
					errorMessageForgot={errorMessageForgot}
					setValueEmail={setEmail}
					valueEmail={email}
					setValuePassword={setPassword}
					valuePassword={password}
					handleSubmitEmailForgot={handleSubmitEmailForgot}
					valueEmailForgot={emailForgot}
					setValueEmailForgot={setEmailForgot}
					switchToSignup={switchToSignup}
				/>
			) : (
				<Signup
					handleSubmitSignup={handleSubmitSignup}
					errorMessageSignup={errorMessageSignup}
					valueUsername={username}
					setValueUsername={setUsername}
					valueEmail={email}
					setValueEmail={setEmail}
					valuePassword={password}
					setValuePassword={setPassword}
					switchToSignin={switchToSignin}
				/>
			)}
		</main>
	);
}
export default Login;
