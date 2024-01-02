// EXPLICATION : Ce composant permet de rendre le slider qui est utilisé pour les renforts (affiche toutes les aides une par une)
// EXPLICATION : Ce composant est utilisé dans la page Help

import PropTypes from "prop-types";
import { useState } from "react";
import Empty from "../assets/icons/Icon_Cercle-empty.svg";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import Full from "../assets/icons/Icon_Cercle-full.svg";
import ArrowLeft from "../assets/icons/Icon_Arrow-left.svg";
import ArrowRight from "../assets/icons/Icon_Arrow-right.svg";

const Slider = ({ data, handleModal, url }) => {
	const [index, setIndex] = useState(0);
	const totalItems = data.hints.length;
	const pagination = [];

	// EXPLICATION : Affiche le tracker de bas de page
	const renderPagination = () => {
		for (let i = 0; i < totalItems; i++) {
			pagination.push(
				<img
					src={i <= index ? Full : Empty}
					alt="pagination icon marker"
					className="slider__pagination__tracker__icon"
					key={i}
				/>
			);
		}
		return pagination;
	};

	const nextItem = () => {
		setIndex(index === totalItems - 1 ? index : index + 1);
	};

	const previousItem = () => {
		setIndex(index === 0 ? index : index - 1);
	};

	const renderArrowLeft = () => {
		return (
			<button className="slider__arrow">
				{index === 0 ? (
					""
				) : (
					<img className="slider__arrow-left" src={ArrowLeft} alt="arrow previous" onClick={previousItem} />
				)}
			</button>
		);
	};

	const renderArrowRight = () => {
		return (
			<button className="slider__arrow">
				{index === totalItems - 1 ? (
					""
				) : (
					<img className="slider__arrow-right" src={ArrowRight} alt="arrow next" onClick={nextItem} />
				)}
			</button>
		);
	};

	const renderText = () => {
		const text = data.hints[index].text.map((el, i) => {
			if (el.startsWith("https://")) {
				return (
					<a className="slider__content__text--link" key={i} href={el} target="_blank" rel="noreferrer noopener">
						{el}
					</a>
				);
			}
			return <p key={i}>{el}</p>;
		});
		return text;
	};

	return (
		<section className="slider">
			<div className="slider__header">
				<div className="slider__header__title">
					Objectif : <br></br>
					{data.title}
				</div>
				<button className="slider__header__icon--container">
					<img className="slider__header__icon" src={Cross} onClick={handleModal} alt='' />
				</button>
			</div>
			<div className="slider__main">
				{renderArrowLeft()}
				<div className="slider__content">
					<div className="slider__content__text">{renderText()}</div>
					<div className="slider__content__img--container">
						{data.hints[index].image != null ? (
							<img className="slider__content__img" src={url + data.hints[index].image} alt='' />
						) : null}
					</div>
				</div>
				<div className="slider__pagination">
					<div className="slider__pagination__tracker">{renderPagination()}</div>
					<div className="slider__pagination__summary">
						{index + 1}/{totalItems}
					</div>
				</div>
				{renderArrowRight()}
			</div>
		</section>
	);
};

Slider.propTypes = {
	data: PropTypes.object,
	handleModal: PropTypes.func,
	url: PropTypes.string,
};

export default Slider;
