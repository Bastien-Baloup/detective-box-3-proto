import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import useApi from '../../utils/hooks/useApi.js'
import { DataContext } from '../../utils/context/fetchContext'
import Cross from '../../assets/icons/Icon_Cross-white.svg'

const InterrogatoireInterractif = ({ onClose }) => {
	const { updateEvent } = useApi()
	const { actionToggleDataEvent } = useContext(DataContext)
	const [step, setStep] = useState(0)
	const token = localStorage.getItem('token')
	const data = [
		// id 0 - intro
		{
			text: [
				'*Lauren va chercher Tim*',
				'LAUREN : Tim ? Tu peux venir quelques minutes ?',
				'TIM : Ouais qu’est-ce qu’il y a ?',
				'LAUREN : Nos enquêteurs voulaient voir quelques points de l’enquête avec toi.',
				'TIM : Ah ? Ok, ok j’arrive',
				'*Lauren et Tim vont dans un bureau et Tim s’assied pour faire face à l’ordinateur*',
				'TIM : Vous vouliez savoir quoi ?'
			],
			choices: [
				{
					label: "Salut Tim, ça va ? On voulait juste te poser quelques questions, si c'est ok pour toi ?",
					target: 1
				}
			]
		},
		// id 1 - reponse intro
		{
			text: [
				"(Tim est d'apparence calme, il tapote légèrement du doigt sur le bureau)",
				"Euh... oui, qu'est-ce que vous voulez savoir ?"
			],
			choices: [
				{
					label:
						"on nom est Timothée Lombardo, tu as 28 ans. Ancien hacker, tu as évité la prison grâce au boulot que t'as proposé Raphaëlle à la Détective Box, il y a 4 ans, c'est bien ça ?",
					target: 2
				}
			]
		},
		// id 2 - identite Tim
		{
			text: [
				'(Tim soupire et regarde la caméra)',
				"Oui, c'est bien ça.",
				'Son regard dévie et il croise les bras)',
				"Mais c'est loin tout ça, j'ai quitté le milieu."
			],
			choices: [
				{
					label: "(brusque) On sait que c'est toi derrière le hacking des caméras, Tim ! Pourquoi t'as fait ça ?",
					target: 3
				},
				{
					label:
						'(calme) En voulant débloquer les caméras qui sont toujours en boucle, on a remonté le hacking des casseurs et le nom "LONEWOOD" est apparu. Est-ce que tu pourrais nous en dire plus ?',
					target: 4
				}
			]
		},
		// id 3 - brusque 1
		{
			text: [
				'(Tim est clairement sur la défensive et l’air un peu inquiet)',
				'Quoi ? Mais de quoi vous parlez ? ',
				"C'est quoi ce délire, pourquoi vous m’agressez ?"
			],
			choices: [
				{
					label:
						'(Direct) Ton nom apparaît clairement dans le hacking du système de sécurité du casino de ton père par La Horde, ça peut pas être un hasard. Dis-nous ce que tu sais, Tim.',
					target: 5
				},
				{
					label:
						'(Brusque) Mais arrête de te foutre de nous, on a trouvé ton nom en voulant débloquer les caméras de sécurité : LONEWOOD',
					target: 6
				}
			]
		},
		// id 4 - calme 1
		{
			text: [
				'(Tim se triture les doigts)',
				'Je ne comprends pas...',
				"Je n'ai rien fait de mal, je vous jure !",
				"C'est fini ces conneries pour moi. Demandez à mes collègues, elles me connaissent bien !"
			],
			choices: [
				{
					label:
						"(Impatient) Ce serait pas la première fois qu'un membre de votre équipe fait des bêtises... Surtout en ce qui te concerne. Alors arrête de tourner autour du pot et dis-nous ce que tu sais sur le hacking de La Horde.",
					target: 5
				},
				{
					label:
						'(Compatissant) Je sais que tu fais tout pour être clean maintenant. Mais mets-toi à notre place, ça ne peut pas être une coïncidence.',
					target: 7
				}
			]
		},
		// id 5 - direct/impatient
		{
			text: [
				'(Tim est gêné... et un peu penaud)',
				'Et merde... je le savais, je me disais bien que la méthode me paraissait familière'
			],
			choices: [
				{
					label: '(Doux) Comment ça la méthode te paraissait familière ?',
					target: 8
				},
				{
					label: '(Aggressif) Ah ! Donc tu avoues !',
					target: 9
				}
			]
		},
		// id 6 - brusque 2
		{
			text: [
				'(Tim est choqué)',
				'Mais quelle enfoirée !',
				"(Il s'énerve)",
				"Je savais que j'aurais dû reprendre le nom de mon père quand j'ai quitté le game"
			],
			choices: [
				{
					label: '(Aggressif) Ah ! Donc tu avoues !',
					target: 9
				},
				{
					label:
						"(Curieux) Comment ça reprendre le nom de ton père ? Lonewood c'est ton nom de hacker ? Tu dis que tu t'es fait piégé ?",
					target: 10
				}
			]
		},
		// id 7 - compatissant 1
		{
			text: [
				'(Tim respire fort et a le regard fuyant)',
				"Quelqu'un a dû me piéger, c'est évident !",
				"Pourquoi j'aurais fait ça au Casino de mon père ?",
				"Ca n'a aucun sens !"
			],
			choices: [
				{
					label:
						"(Incrédule) D'après ce que j'ai compris, tu détestes ton père et son attrait pour l'argent. Ca pourrait être un moyen pour toi de mettre un coup de pieds dans la fourmillière.",
					target: 11
				},
				{
					label: '(Compatissant) Te piéger ? Tu as une idée de qui pourrait vouloir faire ça ?',
					target: 12
				}
			]
		},
		// id 8 - doux
		{
			text: [
				"(Tim baisse les yeux vers le sol, inspire un bon coup, puis les relève pour regarder l'écran)",
				"Il y a quelques temps, j'ai été contacté par quelqu'un sur le dark Web.",
				"Un hacker, de l'époque où j'étais encore du côté obscur de la force... il m'a demandé quelle serait ma méthode pour craquer un système de sécurité TUNI.",
				"C'est le système qu'utilise mon père donc autant vous dire que je le connais par coeur... alors je lui ai expliqué."
			],
			choices: [
				{
					label: "(Perplexe) Tu détestes ton père à ce point ? C'est pour ça que tu n'utilises pas le nom Lombardo ?",
					target: 11
				},
				{
					label: '(En colère) Alors ça te rend complice Tim ! Pourquoi avoir fait ça ?',
					target: 13
				}
			]
		},
		// id 9 - aggressif
		{
			text: [
				"(Tim s'énerve)",
				"Mais je n'avoue rien du tout ! C'est juste qu'il y a quelques mois j'ai été contacté par un ancien camarade hacker.",
				"Il m'a demandé des conseils pour hacker un système de sécurité TUNI.",
				"C'est le même que celui de mon père alors je le connais bien.",
				"(Il croise les bras et s'enfonce dans sa chaise)",
				"Mais je l'ai envoyé balader !"
			],
			choices: [
				{
					label:
						"(Las) Ok, on te croit Tim. Du coup tu penses que c'est pour se venger qu'il a mis ton nom dans le hacking ? Une idée de qui ça pourrait être ?",
					target: 12
				},
				{
					label: '(Agacé) Arrête avec tes mensonges Tim. Ca ne prend plus.',
					target: 14
				}
			]
		},
		// id 10 - Curieux
		{
			text: [
				"(Tim s'agite sur son siège et évite le regard)",
				"Oui... oui c'est ça, j'ai été piégé !",
				'Quelle autre explication ?'
			],
			choices: [
				{
					label: '(Agacé) Arrête avec tes mensonges Tim. Ca ne prend plus.',
					target: 14
				},
				{
					label:
						"(Perplexe) Mmh peut-être que c'était quelqu'un qui te connaissait à l'époque et qui a voulu se venger de quelque chose que tu lui as fait... une idée de qui ça pourrait être ?",
					target: 12
				}
			]
		},
		// id 11 - Incrédule/Perplexe
		{
			text: [
				"(Sourcils froncés, Tim a les mains posés à plat sur la table et regarde la caméra d'un air résigné)",
				"Ce n'est pas tant mon père que je déteste mais le système capitaliste dans lequel il se complait.",
				"Et oui, c'est l'une des raisons pour lesquelles je n'utilise pas mon nom de naissance.",
				"LONEWOOD c'est l'identité que je me suis créée en tant que hacker.",
				"J'imagine que je l'ai gardée en souvenir de cette époque.",
				"Je déteste le système, ça n'a jamais changé.",
				'(Il lève le ton)',
				"Mais je ne savais pas qu'ils allaient cibler le Bella Fortuna, je vous le jure !",
				"Ce système est utilisé par plein d'autres casinos !"
			],
			choices: [
				{
					label: "(Compréhensif) On te croit, Tim. Tu as une idée de l'identité de ce hacker qui t'as contacté ?",
					target: 15
				},
				{
					label:
						"(Méprisant) Mouais tu parles. Quoi qu'il en soit tu es responsable de tout ces casses. Rends-toi utile et peut-être que ça t'évitera la prison : qui est ce hacker qui t'as contacté ?",
					target: 15
				}
			]
		},
		// id 12 - Mauvaise FIn
		{
			text: [
				'(Tim triture la manche de son sweat-shirt et répond en regardant vers le sol)',
				'Non, aucune je suis désolé.'
			],
			choices: [
				{
					label: "(Soupir) Ok, bon, merci quand même. On va retrouver ces ordures, ne t'inquiète pas !",
					target: -1
				},
				{
					label: '(Agacé) Bon, Tim, ça suffit. Dis-nous la vérité, on voit bien que tu mens !',
					target: 15
				}
			]
		},
		// id 13 - Bonne Fin 2
		{
			text: [
				'(Tim soupire)',
				"Parce que ce hacker qui m'a demandé ce service.",
				"C'est mon ex, Ellie Levyn.",
				"C'est moi qui l'ai quitté... je ne sais pas, j'imagine que je me suis dit que ça nous rendait quitte.",
				"(D'un ton amer)",
				'Je me suis trompé manifestement.'
			],
			choices: [
				{
					label: "Ok, Tim. Merci. On va la retrouver ne t'en fais pas !",
					target: -2
				}
			]
		},
		// id 14 - Agacé
		{
			text: [
				'(Tim baisse la tête)',
				'Ok, ok. je lui ai donné les infos...',
				'(Il regarde à nouveau la caméra, il a les larmes aux yeux)',
				"Je suis désolé d'avoir menti, je ne veux pas aller en prison, j'ai un bon job avec la Détective Box, je m'entends bien avec l'équipe, c'est la première fois que j'arrive à m'intégrer quelque part..."
			],
			choices: [
				{
					label: '(En colère) Alors ça te rend complice Tim ! Pourquoi avoir fait ça ?',
					target: 13
				},
				{
					label: "(Perplexe) Tu détestes ton père à ce point ? C'est pour ça que tu n'utilises pas le nom Lombardo ?",
					target: 11
				}
			]
		},
		// id 15 - Bonne fin
		{
			text: [
				'(Tim soupire)',
				"C'est mon ex, Ellie Levyn.",
				"On ne s'est pas quittés en bon terme et je vois que ça ne s'arrangera pas."
			],
			choices: [
				{
					label: "Ok, Tim. Merci. On va la retrouver ne t'en fais pas !",
					target: -2
				}
			]
		}
	]

	const renderText = (data) => {
		const text = data.map((el, i) => {
			return (
				<p className='modal-objectif__subtitle' key={i}>
					{el}
				</p>
			)
		})
		return text
	}

	const handleChoice = async (target) => {
		if (target >= 0) {
			setStep(target)
		} else {
			if (target === -1) {
				// mauvaise fin
				await updateEvent(token, 1, 131, 'done')
				await updateEvent(token, 1, 13, 'done')
				actionToggleDataEvent()
			}
			if (target === -2) {
				// bonne fin
				await updateEvent(token, 1, 132, 'done')
				await updateEvent(token, 1, 13, 'done')
				actionToggleDataEvent()
			}
			onClose()
		}
	}

	const renderChoices = (choices) =>
		choices.map((choice, id) => (
			<button type='button' className='modal-objectif__button button--red' key={id} onClick={() => handleChoice(choice.target)}>
				{choice.label}
			</button>
		))
	return (
		<div className='modal-objectif__background'>
			<div className='modal-objectif__box'>
				<button type='button' className='modal-objectif__icon--container'>
					<img className='modal-objectif__icon' src={Cross} onClick={() => onClose(true)} alt='' />
				</button>
				<h2 className='modal-objectif__title'>Interrogatoire de Timothée Lombardo</h2>
				<div>{renderText(data[step].text)}</div>
				<div>{renderChoices(data[step].choices)}</div>
			</div>
		</div>
	)
}

InterrogatoireInterractif.propTypes = {
	onClose: PropTypes.func
}

export default InterrogatoireInterractif
