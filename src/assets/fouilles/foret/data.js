const data = {
	"scenes": [
		{
			"id": "0-chapelle",
			"name": "chapelle",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"yaw": 1.6696751796065215,
				"pitch": 0.05091235810384234,
				"fov": 1.474131124386153
			},
			"linkHotspots": [{
				"yaw": -0.2530743279408245,
				"pitch": 0.1258739972812599,
				"orientation": 0,
				"target": "04"
        }],
			"infoHotspots": [
				{
					"yaw": -2.053123093304669,
					"pitch": 0.1300334998843723,
					"title": `<span>Inscription</span>`,
					"text": `<span><a target=_blank href='${import.meta.env.BASE_URL}fouilles/foret/plaque.jpg'>Observer de plus près</a></span>`
        }
      ]
    },
		{
			"id": "04",
			"name": "Sortir du dolmen",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -1.2771871094871088,
					"pitch": 0.14379540730882034,
					"rotation": 0,
					"target": "01"
        },
				{
					"yaw": -2.996442678128684,
					"pitch": 0.06255362030082878,
					"rotation": 0,
					"target": "06"
        },
				{
					"yaw": 0.3276828311720319,
					"pitch": 0.18375534636838609,
					"rotation": 0,
					"target": "11"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -1.2719907363353276,
					"pitch": -0.060869570426106634,
					"title": `<span id='see1' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig1' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.3522955104640122,
					"pitch": -0.10465235661252059,
					"title": `<span id='see3' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig3' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -2.9894110759813017,
					"pitch": -0.0853269672810466,
					"title": `<span id='see2' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig2' class='dig'><img src=${import.meta.env.BASE_URL}fouilles/foret/'img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "01",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"yaw": -0.7042820524463611,
				"pitch": 0.02982317890486641,
				"fov": 1.474131124386153
			},
			"linkHotspots": [
				{
					"yaw": -2.217500285140547,
					"pitch": 0.08881213691349465,
					"rotation": 0,
					"target": "05"
        },
				{
					"yaw": -1.1770145350382446,
					"pitch": 0.07122280835986672,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": 0.08564366446219118,
					"pitch": 0.15321544599339632,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": 1.3556520383414234,
					"pitch": 0.14307521308065319,
					"rotation": 0,
					"target": "06"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -2.2190079096443576,
					"pitch": -0.0754420925088457,
					"title": `<span id='see4' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig4' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.1618756929208018,
					"pitch": -0.15055087049849014,
					"title": `<span id='see5' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig5' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.0991414790134506,
					"pitch": -0.10885446312326863,
					"title": `<span id='see6' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig6' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 1.3626228366074127,
					"pitch": -0.06843002640631823,
					"title": `<span id='see7' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig7' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "05",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -2.687858564829554,
					"pitch": 0.07003229516727139,
					"rotation": 0,
					"target": "08"
        },
				{
					"yaw": 2.8179606298647757,
					"pitch": 0.17423383147547256,
					"rotation": 0,
					"target": "09"
        },
				{
					"yaw": -1.9413829797373587,
					"pitch": 0.1722064230770517,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -0.2137464247951860,
					"pitch": 0.2843143866134443,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": 0.9278425742961609,
					"pitch": 0.36397575220796696,
					"rotation": 0,
					"target": "12"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -2.6835901456439952,
					"pitch": -0.23298581901103255,
					"title": `<span id='see8' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig8' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 2.8107226236781315,
					"pitch": -0.05167697629200774,
					"title": `<span id='see9' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig9' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.932707027546547,
					"pitch": 0.026245301106142094,
					"title": `<span id='see10' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig10' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -0.38374642479518606,
					"pitch": 0.08431438661344437,
					"title": `<span id='see11' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig11' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.9184331807098971,
					"pitch": 0.10828677340312787,
					"title": `<span id='see12' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig12' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "08",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": 0.9585446354905489,
					"pitch": 0.4240865363431947,
					"rotation": 0,
					"target": "10"
        },
				{
					"yaw": 2.8229854083178054,
					"pitch": 0.3092417436091708,
					"rotation": 0,
					"target": "14"
        },
				{
					"yaw": -1.9732607055449698,
					"pitch": 0.27750022479273007,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": -0.3791792075193072,
					"pitch": 0.2511807603776681,
					"rotation": 0,
					"target": "07"
        }
      ],
			"infoHotspots": [
				{
					"yaw": 0.9389823935066186,
					"pitch": 0.16485702351919862,
					"title": `<span id='see13' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig13' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 2.8386484567356653,
					"pitch": 0.07922784304537345,
					"title": `<span id='see14' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig14' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.9354618866549362,
					"pitch": 0.07803797845272342,
					"title": `<span id='see15' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig15' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -0.40351681328700373,
					"pitch": 0.01894094315434991,
					"title": `<span id='see16' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig16' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "10",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"yaw": 0.8319764994277516,
				"pitch": 0.1358300900572793,
				"fov": 1.474131124386153
			},
			"linkHotspots": [
				{
					"yaw": -0.8554988188721975,
					"pitch": 0.16968215151135269,
					"rotation": 0,
					"target": "12"
        },
				{
					"yaw": 0.17005047465355894,
					"pitch": 0.12011571418416267,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": 0.809737412346049,
					"pitch": 0.2105069939571056,
					"rotation": 0,
					"target": "02"
        },
				{
					"yaw": -2.800904789470735,
					"pitch": 0.06129275662478939,
					"rotation": 0,
					"target": "11"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -0.8320062572081,
					"pitch": -0.046153740125626896,
					"title": `<span id='see17' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig17' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.1803789858206546,
					"pitch": -0.05478984903348305,
					"title": `<span id='see18' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig18' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.7802155660756682,
					"pitch": 0.007029071664458542,
					"title": `<span id='see19' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig19' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -2.804276851829247,
					"pitch": -0.13046676990729011,
					"title": `<span id='see20' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig21' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "12",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -0.7503587177640068,
					"pitch": 0.056379594949822476,
					"rotation": 0,
					"target": "13"
        },
				{
					"yaw": 0.272360462047299,
					"pitch": 0.20243981217411822,
					"rotation": 0,
					"target": "02"
        },
				{
					"yaw": 1.3218721663173039,
					"pitch": 0.12476046255557094,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": -1.930844280340036,
					"pitch": 0.1570077759459494,
					"rotation": 0,
					"target": "15"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -0.7199642744947656,
					"pitch": -0.17714615761612862,
					"title": `<span id='see22' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig22' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.3141416770702925,
					"pitch": -0.01983623592324335,
					"title": `<span id='see23' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig23' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 1.343390665111329,
					"pitch": -0.08790267558482157,
					"title": `<span id='see24' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig24' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.9384426073408498,
					"pitch": -0.08886039803384804,
					"title": `<span id='see25' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig25' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "13",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -0.248169399350898,
					"pitch": 0.12985311230125163,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -1.4099789986291569,
					"pitch": 0.24191200357764586,
					"rotation": 0,
					"target": "03"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -0.2511810173118292,
					"pitch": -0.10524257644138046,
					"title": `<span id='see26' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig26' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.3840500270069214,
					"pitch": 0.019370535251546528,
					"title": `<span id='see27' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig27' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "03",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": 0.0884724497068401,
					"pitch": 0.12187077734581564,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": 1.3699028774753401,
					"pitch": 0.18870732899849507,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -2.206106735495661,
					"pitch": 0.0952885968673165,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": 2.237888978253552,
					"pitch": 0.16771456166847898,
					"rotation": 0,
					"target": "15"
        }
      ],
			"infoHotspots": [
				{
					"yaw": 0.11176229950946137,
					"pitch": -0.14934108654806266,
					"title": `<span id='see28' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig28' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 1.355498620713421,
					"pitch": -0.03969305556628022,
					"title": `<span id='see29' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig29' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -2.2092802669492553,
					"pitch": -0.07433013069281813,
					"title": `<span id='see30' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig30' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 2.226989133383719,
					"pitch": -0.06108119050789185,
					"title": `<span id='see31' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig31' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "02",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": 0.3325745593543239,
					"pitch": 0.18232501275511304,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -2.9895862780477156,
					"pitch": -0.08287451857889039,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": -1.2829436735726887,
					"pitch": 0.15242739851043297,
					"rotation": 0,
					"target": "15"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -1.2719907363353276,
					"pitch": -0.060869570426106634,
					"title": `<span id='see1' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig1' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.3522955104640122,
					"pitch": -0.10465235661252059,
					"title": `<span id='see3' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig3' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -2.9894110759813017,
					"pitch": -0.0853269672810466,
					"title": `<span id='see2' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig2' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "09",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": 0.09592975290801675,
					"pitch": 0.10813031928533157,
					"rotation": 0,
					"target": "06"
        },
				{
					"yaw": 1.3607203184615297,
					"pitch": 0.1476132144206126,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -2.2091558280449846,
					"pitch": 0.10110975242377407,
					"rotation": 0,
					"target": "09"
        },
				{
					"yaw": -1.176111725501876,
					"pitch": 0.026626425076020865,
					"rotation": 0,
					"target": "06"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -2.2190079096443576,
					"pitch": -0.0754420925088457,
					"title": `<span id='see4' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig4' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.1618756929208018,
					"pitch": -0.15055087049849014,
					"title": `<span id='see5' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig5' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.0991414790134506,
					"pitch": -0.10885446312326863,
					"title": `<span id='see6' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig6' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 1.3626228366074127,
					"pitch": -0.06843002640631823,
					"title": `<span id='see7' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig7' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "07",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -0.35337955440260416,
					"pitch": 0.30331107435593196,
					"rotation": 0,
					"target": "06"
        },
				{
					"yaw": 0.9530212581486293,
					"pitch": 0.36624949649327654,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": 2.832515542839703,
					"pitch": 0.2535179878029208,
					"rotation": 0,
					"target": "16"
        },
				{
					"yaw": -2.684806809947414,
					"pitch": 0.1152703505996655,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -1.9534866137781375,
					"pitch": 0.2689720908799096,
					"rotation": 0,
					"target": "09"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -2.6835901456439952,
					"pitch": -0.23298581901103255,
					"title": `<span id='see8' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig8' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 2.8107226236781315,
					"pitch": -0.05167697629200774,
					"title": `<span id='see9' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig9' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.932707027546547,
					"pitch": 0.026245301106142094,
					"title": `<span id='see10' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig10' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -0.38374642479518606,
					"pitch": 0.08431438661344437,
					"title": `<span id='see11' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig11' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.9184331807098971,
					"pitch": 0.10828677340312787,
					"title": `<span id='see12' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig12' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "06",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -0.32485639034964464,
					"pitch": 0.3281424581850896,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": 0.9366107257018008,
					"pitch": 0.4061324825293475,
					"rotation": 0,
					"target": "09"
        },
				{
					"yaw": 2.8545916435440635,
					"pitch": 0.33878135828844336,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -1.9760251728433662,
					"pitch": 0.3154826622609601,
					"rotation": 0,
					"target": "09"
        }
      ],
			"infoHotspots": [
				{
					"yaw": 0.9389823935066186,
					"pitch": 0.16485702351919862,
					"title": `<span id='see13' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig13' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 2.8386484567356653,
					"pitch": 0.07922784304537345,
					"title": `<span id='see14' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig14' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.9354618866549362,
					"pitch": 0.07803797845272342,
					"title": `<span id='see15' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig15' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -0.40351681328700373,
					"pitch": 0.01894094315434991,
					"title": `<span id='see16' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig16' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "16",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -0.8487457364891995,
					"pitch": 0.14939286328243817,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": 0.18721401714703845,
					"pitch": 0.15268179229926915,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": 0.7868941296497063,
					"pitch": 0.19942219054134647,
					"rotation": 0,
					"target": "09"
        },
				{
					"yaw": -2.8046926644215233,
					"pitch": 0.11033852057867755,
					"rotation": 0,
					"target": "06"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -0.8320062572081,
					"pitch": -0.046153740125626896,
					"title": `<span id='see17' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig17' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.1803789858206546,
					"pitch": -0.05478984903348305,
					"title": `<span id='see18' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig18' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.7802155660756682,
					"pitch": 0.007029071664458542,
					"title": `<span id='see19' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig19' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -2.804276851829247,
					"pitch": -0.13046676990729011,
					"title": `<span id='see20' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig21' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "11",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": 0.09910693721970532,
					"pitch": 0.155139616083094,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": 1.3665214334095097,
					"pitch": 0.17421614090209658,
					"rotation": 0,
					"target": "02"
        },
				{
					"yaw": 2.2384928105488306,
					"pitch": 0.21359213043008118,
					"rotation": 0,
					"target": "15"
        },
				{
					"yaw": -2.2132477515709112,
					"pitch": 0.13803353547345054,
					"rotation": 0,
					"target": "09"
        }
      ],
			"infoHotspots": [
				{
					"yaw": 0.10228191629041916,
					"pitch": -0.1363504680263432,
					"title": `<span id='see28' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig28' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`

        },
				{
					"yaw": 1.3696049288863144,
					"pitch": -0.051667355276256544,
					"title": `<span id='see12' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig12' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
				},
				{
					"yaw": 2.2437640602700215,
					"pitch": -0.05098096978103328,
					"title": `<span id='see3' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig3' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`

        },
				{
					"yaw": -2.209282494741595,
					"pitch": -0.0734035089533549,
					"title": `<span id='see23' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig23' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`


        }
      ]
    },
		{
			"id": "15",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{


					"yaw": -0.7388219945581458,
					"pitch": 0.07337477795278069,
					"rotation": 0,
					"target": "09"
        },
				{
					"yaw": 0.3141416770702925,
					"pitch": 0.1583623592324335,
					"rotation": 0,
					"target": "07"
        },
				{
					"yaw": 1.343390665111329,
					"pitch": 0.08790267558482157,
					"rotation": 0,
					"target": "03"
        },
				{
					"yaw": -1.9384426073408498,
					"pitch": 0.08886039803384804,
					"rotation": 0,
					"target": "02"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -0.7199642744947656,
					"pitch": -0.17714615761612862,
					"title": `<span id='see22' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig22' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 0.3141416770702925,
					"pitch": -0.01983623592324335,
					"title": `<span id='see23' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig23' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": 1.343390665111329,
					"pitch": -0.08790267558482157,
					"title": `<span id='see24' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig24' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.9384426073408498,
					"pitch": -0.08886039803384804,
					"title": `<span id='see25' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig25' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    },
		{
			"id": "14",
			"name": "Avancer dans cette direction",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        },
				{
					"tileSize": 512,
					"size": 1024
        }
      ],
			"faceSize": 1024,
			"initialViewParameters": {
				"pitch": 0,
				"yaw": 0,
				"fov": 1.5707963267948966
			},
			"linkHotspots": [
				{
					"yaw": -0.2511809334280777,
					"pitch": 0.11138372090478654,
					"rotation": 0,
					"target": "11"
        },
				{
					"yaw": -1.4340703269867277,
					"pitch": 0.22647188128373763,
					"rotation": 0,
					"target": "14"
        }
      ],
			"infoHotspots": [
				{
					"yaw": -0.2511810173118292,
					"pitch": -0.10524257644138046,
					"title": `<span id='see26' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig26' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        },
				{
					"yaw": -1.3840500270069214,
					"pitch": 0.019370535251546528,
					"title": `<span id='see27' class='watch'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/eye.png'></span>`,
					"text": `<span id='dig27' class='dig'><img src='${import.meta.env.BASE_URL}fouilles/foret/img/shovel.png'>Creuser</span>`
        }
      ]
    }
  ],
	"name": "Fouille de forêt",
	"settings": {
		"mouseViewMode": "drag",
		"autorotateEnabled": false,
		"fullscreenButton": false,
		"viewControlButtons": false
	}
}
export default data