// These are the data that we are gonna fetch to display in the Quizz component.
// The quizz must only be played once ever

export const dataQuizz = {
	box2: {
		status: false,
		questions: [
			{
				id: 1,
				question: [
					"Un nouveau meurtre commis par un tueur en série qui n'avait pas sévi depuis près de 15 ans a rouvert l'affaire.",
					"Comment était-il surnommé à l'époque ?",
				],
				choices: ["L'assassin aux dominos", "Le tueur au Tarot", "Le meurtrier des dames"],
				image: null,
			},
			{
				id: 2,
				question: ["Qui était Charles Garraud ?"],
				choices: [
					"Un meurtrier actuellement en prison, copycat qui s'est fait passer pour le tueur au Tarot",
					"Le vrai tueur au Tarot, mis en prison il y a vingt ans",
					"Une victime du tueur au Tarot",
				],
				image: null,
			},
			{
				id: 3,
				question: [
					"On a reçu un étrange poème de la part du tueur avec quatre paragraphes.",
					"Quels étaient leurs titres ?",
				],
				choices: [
					"Le prétentieux, la rancunière, le sournois, le message des astres",
					"Le traître, l'arrogant, le mégalomane, la voie des dieux",
					"La menteuse, l'oublié, l'orgueilleux, le chemin de la vérité",
				],
				image: null,
			},
			{
				id: 4,
				question: [
					"La menteuse.",
					"Cette piste nous avait permis de remonter jusqu'à une malle.",
					"Qu'y avait-il dedans ?",
				],
				choices: [
					"La vidéo de l'un des meurtres du tueur, l'estomac de sa dernière victime, Rebecca Dumont",
					"Un médaillon appartenant à Rebecca Dumont, la dernière victime, sa rate et l'enregistrement de ses derniers mots, un papier crypté",
					"Un mot du tueur destiné aux enquêteurs",
				],
				image: "assets/quiz/box2_malle_quiz_question_5.jpg",
			},
			{
				id: 5,
				question: [
					"L'oublié.",
					"Une victime a été révélée avec cette piste : Xavier Monrency.",
					"Comment l'avez-vous retrouvé ?",
				],
				choices: [
					"En superposant les grilles, on coloriait les blancs pour avoir le nom de la victime",
					"En décodant la grille, grâce au site du fan du tueur, qui montrait un décryptage de l'alphabet du tueur.",
				],
				image: "assets/quiz/box2_lettres_cryptees_quiz_question_6.jpg",
			},
			{
				id: 6,
				question: ["L'orgueilleux.", "Qui était l'orgueilleux et pourquoi ?"],
				choices: [
					"Raphaëlle Sanchez, la policière de la Detective Box est en première ligne. Elle essaie de coincer le tueur",
					"Charles Garraud, car il avait voulu faire comme le tueur au Tarot",
				],
				image: null,
			},
			{
				id: 7,
				question: [
					"On a reçu un message crypté du tueur à la fin de chaque piste.",
					"Qu'a-t-on retrouvé grâce à ces messages ?",
				],
				choices: [
					"Une adresse, qui menait jusqu'à une planque sordide du tueur, avec de nouvelles cartes de tarot",
					"Un message de moquerie du tueur, qui dévoile cependant des éléments de son identité",
					"Le lieu du prochain meurtre",
				],
				image: "assets/quiz/box2_la_source_quiz_question_8.jpg",
			},
			{
				id: 8,
				question: ["Qu'apprend-on de l'interrogatoire de Charles Garraud ?", "Cochez toutes les bonnes réponses."],
				multi: true,
				choices: [
					"Garraud discutait avec le tueur sur un forum par messages privés",
					"Le tueur ne s'est jamais arrêté pendant toutes ces années",
					"Il a tué pendant des années dans toute l'Europe",
					"Garraud donne des papiers aux enquêteurs pendant son interrogatoire.",
				],
				image: "assets/quiz/box2_interrogatoire_quiz_question_9.jpg",
			},
		],
		answers: [
			{
				id: 1,
				answer: "Le tueur au Tarot",
				explanation: [
					"Le tueur, suspecté d'avoir commis trois meurtres en 1992, 1993 et 1998, est connu sous le nom du tueur au Tarot.",
					"Ce nom fait référence à la demi-carte qu'il laisse à côté de ses victimes après avoir envoyé la première à la police.",
					"En 2023, un nouveau corps a été découvert, faisant ressurgir l'affaire.",
					"Au cours de vos enquêtes, vous avez découvert que le meurtre de 1998 n'était pas lié au tueur au Tarot.",
					"Cependant, vous avez identifié une victime qui n'avait pas été reliée à lui jusqu'à présent.",
				],
				image: "assets/quiz/box2_victimesbox1_quiz_reponse_2.jpg",
			},
			{
				id: 2,
				answer: "Un meurtrier actuellement en prison, copycat qui s'est fait passer pour le tueur au Tarot",
				explanation: [
					"Charles Garraud était un imitateur du tueur au Tarot.",
					"Vous avez découvert qu'il se serait rendu à sa place sous la pression du vrai tueur.",
				],
				image: "assets/quiz/box2_garraud_quiz_reponse_2.jpg",
			},
			{
				id: 3,
				answer: "La menteuse, l'oublié, l'orgueilleux, le chemin de la vérité",
				explanation: [
					"Le poème possédait bien quatre paragraphes et quatre pistes.",
					"Les trois premières nous ramenaient à des victimes du tueur, la dernière piste nous dirigeait vers une de ses planques.",
				],
				image: "assets/quiz/box2_poem_quiz_reponse_4.jpg",
			},
			{
				id: 4,
				answer:
					"Un médaillon appartenant à Rebecca Dumont, la dernière victime, sa rate et l'enregistrement de ses derniers mots, un papier crypté",
				explanation: [
					"La malle contenait la rate de Rebecca Dumont, ainsi que ses derniers mots laissant entendre qu'elle regrettait de ne pas avoir fait quelque chose pour le tueur.",
					"De plus, nous avons découvert un message crypté qui nous a permis de localiser la planque du tueur.",
					"Enfin, un médaillon a également été découvert dans la malle.",
					"Nous allons vous le transmettre dans cette box.",
				],
				image: "assets/quiz/box2_malle_quiz_reponse_5.jpg",
			},
			{
				id: 5,
				answer: "En superposant les grilles, on coloriait les blancs pour avoir le nom de la victime",
				explanation: [
					"En superposant les grilles, il était possible de retrouver l'emplacement de l'oublié.",
					"Nous avons découvert un indice, une lettre transcrite du tueur, sur le site du fan qui suggérait de « garder les vides ».",
					"L'alphabet découvert sur le site était en effet utilisé pour décoder les lettres.",
					"Cependant, ces dernières avaient déjà été déchiffrées sur le site du fan.",
				],
				image: "assets/quiz/box2_lettresdecryptees_quiz_response-6.jpg",
			},
			{
				id: 6,
				answer: "Charles Garraud, car il avait voulu faire comme le tueur au Tarot",
				explanation: [
					"Charles Garraud est l'orgueilleux, il a tué Nicolas Chaussée pour imiter le tueur.",
					"Le vrai tueur n'avait pas apprécié son intervention dans son « Grand Œuvre » et l'avait forcé à se rendre à sa place, en tuant sa mère et en le menaçant d'être le prochain.",
				],
				image: "assets/quiz/box2_lettre_garraud_quiz_reponse_7.jpg",
			},
			{
				id: 7,
				answer: "Une adresse, qui menait jusqu'à une planque sordide du tueur, avec de nouvelles cartes de tarot",
				explanation: [
					"Les messages permettaient de trouver une planque du tueur.",
					"Les cartes de tarot que nous avons récoltées là-bas vous sont envoyées dans cette nouvelle box.",
					"Elles laissent présager qu'il y a plus de meurtres que ceux qu'on connaissait jusque-là.",
				],
				image: "assets/quiz/box2_planque_quiz_reponse_8.png",
			},
			{
				id: 8,
				multi: true,
				answer: [
					"Garraud discutait avec le tueur sur un forum par messages privés",
					"Le tueur ne s'est jamais arrêté pendant toutes ces années",
					"Il a tué pendant des années dans toute l'Europe",
					"Garraud donne des papiers aux enquêteurs pendant son interrogatoire.",
				],
				explanation: [
					"Il s'agit de deux papiers brillants étranges et des lettres de correspondances avec un de ses fans.",
				],
				image: "assets/quiz/box2_origami_quiz_reponse_9.jpg",
			},
		],
	},

	// --- BOX 3 --- //

	box3: {
		status: false,
		questions: [
			{
				id: 1,
				question: ["Quelle était la signature visible du tueur au Tarot ?"],
				choices: [
					"Il enlève des organes en suivant l'ordre des cartes de tarot",
					"Il enlève des organes selon l'homme zodiacal",
					"Il enlève des organes d'après les cartes de tarot qu'il laisse",
				],
				image: "assets/quiz/box3_organes_quiz_question_1.jpg",
			},
			{
				id: 2,
				question: ["La sélection des victimes se fait à partir d'un livre.", "Quel est le nom de l'auteur ?"],
				choices: ["Alberto Gilles", "Agathe Rigo", "Stella Louiseberg"],
				image: null,
			},
			{
				id: 3,
				question: ["Quel est le point commun des victimes que l'on peut trouver dans le livre ?"],
				choices: [
					"Les victimes ont toutes Lilith, la lune noire en balance dans leur thème astral",
					"Les victimes sont toutes ascendantes cancer",
					"Les victimes ont toutes une conjonction lune-saturne le jour de leur mort",
				],
				image: null,
			},
			{
				id: 4,
				question: ["Qu'a-t-on retrouvé dans la planque du tueur à Fouras ?"],
				choices: [
					"Une rate dans une malle avec un médaillon",
					"Un réfrigérateur renfermant les organes des victimes ainsi que des photos de Lauren",
					"Les armes du crime, trois couteaux de marque japonaise",
				],
				image: null,
			},
			{
				id: 5,
				question: ["Qui le tueur a-t-il enlevé ?"],
				choices: ["Céline Valluy", "Lauren Fraser", "Tim Lonewood"],
				image: null,
			},
			{
				id: 6,
				question: ["Quelle moitié de carte de tarot se trouvait sur le corps de Mason Reynolds ?"],
				choices: ["Le Diable", "Le Pape", "La Maison Dieu"],
				image: null,
			},
		],
		answers: [
			{
				id: 1,
				answer: "Il enlève des organes selon l'homme zodiacal",
				explanation: [
					"Il enlève des organes en suivant le schéma de l'homme zodiacal, selon le signe astrologique de la victime.",
					"Vous l'avez découvert en reconstituant l'origami que vous avait donné Garraud.",
				],
				image: null,
			},
			{
				id: 2,
				answer: "Stella Louiseberg",
				explanation: [
					"Dans les messages privés du forum donné par Charles Garraud, on apprend que le tueur choisit ses victimes selon la théorie d'un livre",
					"« Lilith et la guérison des maux »",
					"écrit par Stella Louiseberg.",
				],
				image: "assets/quiz/box3_lilith_quiz_reponse_2.jpg",
			},
			{
				id: 3,
				answer: "Les victimes ont toutes Lilith, la lune noire, en balance dans leur thème astral",
				explanation: [
					"D'après la théorie de Lilith équilibrée qui inspire le tueur, les personnes présentant Lilith en balance ont plus de chance d'être de bonnes donneuses d'organes pour les greffes.",
					"Les victimes que nous avons retrouvées avaient toutes ce point commun.",
				],
				image: "assets/quiz/box3_balance_quiz_reponse_3.jpg",
			},
			{
				id: 4,
				answer: "Un réfrigérateur renfermant les organes des victimes ainsi que des photos de Lauren",
				explanation: [
					"Il y avait en effet un réfrigérateur avec tous les organes des victimes du tueur et des photos de Lauren, avec des notes qui semblaient suivre ses progrès.",
					"Sur le forum, le tueur dit à Garraud que les cartes de tarot représentent une expression de sa colère, un jeu qu'on lui a imposé trop longtemps",
				],
				image: "assets/quiz/box3_notes_Lauren_quiz_reponse_4.png",
			},
			{
				id: 5,
				answer: "Lauren Fraser",
				explanation: [
					"Le tueur a enlevé Lauren, la profileuse.",
					"Nous comptons sur vous pour la retrouver avant qu'il ne lui arrive quelque chose.",
				],
				image: "assets/quiz/box3_photo_lauren_quiz_reponse_5.jpg",
			},
			{
				id: 6,
				answer: "Le pape",
				explanation: [
					"Le pape était la demi-carte posée sur le corps de Mason.",
					"Nous avions reçu l'autre moitié par avance, comme d'habitude.",
					"Et nous avons reçu deux nouvelles demi-cartes, accompagnées d'une carte de vœux du tueur, je vous laisse regarder..",
				],
				image: "assets/quiz/box3_pape_quiz_reponse_6.jpg",
			},
		],
	},
};
