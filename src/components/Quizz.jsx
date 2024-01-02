// EXPLICATION : Ce composant permet d'afficher le quizz pour les box 2 et box 3.
// EXPLICATION : Le quizz n'apparait qu'une seule fois ever. Son status est mis à jour dans le Header

import PropTypes from "prop-types";
import { useState } from "react";
import Empty from "../assets/icons/Icon_Cercle-empty.svg";
import Full from "../assets/icons/Icon_Cercle-full.svg";
import Input from "./Input.jsx";
import Timer from "./Timer.jsx";

const Quizz = ({ data, handleEndQuizz, url }) => {
	const [instructionActive, setInstructionActive] = useState(true);
	const [resultActive, setResultActive] = useState(false);
	const [gameActive, setGameActive] = useState(false);
	const [questionDisplayed, setQuestionDisplayed] = useState(false);
	const [answerDisplayed, setAnswerDisplayed] = useState(false);
	const [score, setScore] = useState(0);
	const [validationQuestion, setvalidationQuestion] = useState(false);
	const [index, setIndex] = useState(0);
	const [valueInput, setValueInput] = useState("");
	const totalQuestions = data.questions.length;
	const pagination = [];

	const displayInstructions = () => {
		return (
			<div className="quizz__instructions">
				<p className="quizz__instructions__text">
					Avant tout, on va commencer par un petit questionnaire, pour voir ce dont vous vous souvenez.
					<br></br> On vous chronomètre, pour tester un peu votre mémoire.
				</p>
				<button className="quizz__instructions__button button--red" onClick={endInstructions}>
					Commencer
				</button>
			</div>
		);
	};

	// EXPLICATION : A la fin de la modale d'instruction, afficher le jeu avec la première question
	const endInstructions = () => {
		setInstructionActive(false);
		setGameActive(true);
		setQuestionDisplayed(true);
	};

	// EXPLICATION : Alternance entre les questions et les réponses
	const displayGame = () => {
		return (
			<>
				{questionDisplayed ? renderQuestion() : ""}
				{answerDisplayed ? renderAsnwer() : ""}
			</>
		);
	};

	// EXPLICATION : Afficher le tracker de question en bas de modale
	const renderPagination = () => {
		for (let i = 0; i < totalQuestions; i++) {
			pagination.push(
				<img
					src={i <= index ? Full : Empty}
					alt="pagination icon marker"
					className="quizz__pagination__tracker__icon"
					key={i}
				/>
			);
		}
		return pagination;
	};

	// EXPLICATION : Fonction pour avoir plusieurs valeurs stockées si réponse à choix multiple
	const setMultiValueInput = (value) => {
		setValueInput((previousValueInput) => [...previousValueInput, value]);
	};

	// EXPLICATION : Render des options en fonction de si la question est à choix multiple ou non (props multi ou non)
	const renderChoices = () => {
		if (data.questions[index].multi) {
			const inputs = data.questions[index].choices.map((el, i) => {
				return <Input type="checkbox" name={el} label={el} setValue={setMultiValueInput} key={i} />;
			});
			return inputs;
		} else {
			const inputs = data.questions[index].choices.map((el, i) => {
				return <Input type="radio" name="essai" label={el} setValue={setValueInput} key={i} />;
			});
			return inputs;
		}
	};

	// EXPLICATION : Afficher le texte des questions
	const renderQuestionText = () => {
		const text = data.questions[index].question.map((el, i) => {
			return <p key={i}>{el}</p>;
		});
		return text;
	};

	// EXPLICATION : Afficher les questions avec le timer. Si le timer passe à zéro, on passe à la réponse.
	const renderQuestion = () => {
		return (
			<div className="quizz__question">
				<div className="quizz__question__timer">
					<Timer initialMinute={0} initialSecond={30} timerEndedFunction={handleQuestionForm} />
				</div>
				<p className="quizz__question__title">Question n°{data.questions[index].id} :</p>
				<div className="quizz__question__subtitle">{renderQuestionText()}</div>
				<div className="quizz__question__choices">{renderChoices()}</div>
				<div className="quizz__question__img--container">
					{data.questions[index].image != null ? (
						<img className="quizz__question__img" src={url + data.questions[index].image} alt='' />
					) : null}
				</div>
				<button className="quizz__question__button button--red" onClick={handleQuestionForm}>
					Valider
				</button>
				<div className="quizz__pagination">
					<div className="quizz__pagination__tracker">{renderPagination()}</div>
					<div className="quizz__pagination__summary">
						{index + 1}/{totalQuestions}
					</div>
				</div>
			</div>
		);
	};

	// EXPLICATION : Afficher le texte des réponses
	const renderAnswerText = () => {
		const text = data.answers[index].explanation.map((el, i) => {
			return <p key={i}>{el}</p>;
		});
		return text;
	};

	// EXPLICATION : Afficher les réponses
	const renderAsnwer = () => {
		return (
			<div className="quizz__answer">
				<p className="quizz__answer__title">Question n°{data.questions[index].id} :</p>
				<p className={`quizz__answer__validation${validationQuestion ? "--true" : "--false"}`}>
					{validationQuestion ? "Bonne réponse" : "Mauvaise Réponse"}
				</p>
				<div className="quizz__answer__subtitle">{renderAnswerText()}</div>
				<div className="quizz__answer__img--container">
					{data.answers[index].image != null ? (
						<img className="quizz__answer__img" src={url + data.answers[index].image} alt='reponse quizz' />
					) : null}
				</div>
				<button className="quizz__question__button button--red" onClick={handleAnswerForm}>
					Suivant
				</button>
				<div className="quizz__pagination">
					<div className="quizz__pagination__tracker">{renderPagination()}</div>
					<div className="quizz__pagination__summary">
						{index + 1}/{totalQuestions}
					</div>
				</div>
			</div>
		);
	};

	// EXPLICATION : Si bonne réponse, alors augmenter le score + changer le state de validationQuestion pour afficher "bonne réponse" ou "mauvaise réponse" sur la modale des réponse
	const handleQuestionForm = () => {
		if (data.answers[index].multi) {
			if (data.answers[index].answer.every((answer) => valueInput.includes(answer))) {
				setScore(score + 1);
				setvalidationQuestion(true);
			}
		}
		if (valueInput == data.answers[index].answer) {
			setScore(score + 1);
			setvalidationQuestion(true);
		}
		setQuestionDisplayed(false);
		setAnswerDisplayed(true);
	};

	// EXPLICATION : Si la réponse est la dernière de la liste, alors on arrête le jeu et on affiche les résultats.
	const handleAnswerForm = () => {
		if (index === totalQuestions - 1) {
			endGame();
		} else {
			setIndex(index + 1);
			setQuestionDisplayed(true);
			setAnswerDisplayed(false);
			setvalidationQuestion(false);
			setValueInput("");
		}
	};

	// EXPLICATION : On arrête le jeu et on affiche les résultats
	const endGame = () => {
		setGameActive(false);
		setResultActive(true);
	};

	// EXPLICATION : On affiche les commentaires en fonction du score
	const displayComment = () => {
		if (score === 0) {
			return "C'est pas terrible tout ça, j'espère que vous avez plus de capacité de déduction que de mémoire…";
		}
		if (score >= 1 && score <= 4) {
			return "Oula, mais vous avez tout oublié ! J'espère que ça va vous revenir petit à petit.";
		}
		if (score >= 5 && score <= 8) {
			return "Pas mal, comme on pouvait l'attendre de nos meilleurs agents !";
		}
		if (score === 9 || score === 10) {
			return "Je le savais, vous êtes les meilleurs !";
		}
	};

	// EXPLICATION : On affiche la modale de résultat avec le score, le commentaire associé et le bouton qui permet de fermer le quizz (et d'afficher la vidéo de briefing -- voir Header)
	const displayResults = () => {
		return (
			<div className="quizz__results">
				<p className="quizz__results__text--1">Vous avez:</p>
				<p className="quizz__results__text--score">
					{score} / {totalQuestions}
				</p>
				<p className="quizz__results__text--2">bonnes réponses.</p>
				<p className="quizz__results__comment">{displayComment()}</p>
				<button className="quizz__instructions__button button--red" onClick={handleEndQuizz}>
					Reprendre l&apos;enquête
				</button>
			</div>
		);
	};

	return (
		<div className="quizz__background">
			<div className="quizz">
				{instructionActive ? displayInstructions() : ""}
				{gameActive ? displayGame() : ""}
				{resultActive ? displayResults() : ""}
			</div>
		</div>
	);
};

Quizz.propTypes = {
	data: PropTypes.object,
	handleEndQuizz: PropTypes.func,
	url: PropTypes.string,
};

export default Quizz;
