const data = {
	"scenes": [
		{
			"id": "0-302_planque_celine_cave_1",
			"name": "Avancer",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        }
      ],
			"faceSize": 512,
			"initialViewParameters": {
				"yaw": 1.863384881271351,
				"pitch": 0.5602749024474694,
				"fov": 1.490862480678256
			},
			"linkHotspots": [
				{
					"yaw": 1.1570737633087145,
					"pitch": 0.7376406343956639,
					"rotation": 0,
					"target": "1-302_planque_celine_cave_2"
        }
      ],
			"infoHotspots": [
				{
					"yaw": 0.04250921632663207,
					"pitch": 0.9385917136255681,
					"title": "<span class='watch' id='see3'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": 2.6679257899507567,
					"pitch": -0.006164162979196419,
					"title": "<span class='watch' id='see6'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": 2.4530003827839266,
					"pitch": 0.4432499934892338,
					"title": "<span class='watch' id='see5'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": -1.5461014272815596,
					"pitch": 0.30826523266316563,
					"title": "<span class='watch' id='see7'>Voir plus près</span>",
					"text": ""
        }
      ]
    },
		{
			"id": "1-302_planque_celine_cave_2",
			"name": "Avancer",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        }
      ],
			"faceSize": 512,
			"initialViewParameters": {
				"yaw": 1.589183332270684,
				"pitch": 0.18882014371156508,
				"fov": 1.490862480678256
			},
			"linkHotspots": [
				{
					"yaw": -1.3032722652399524,
					"pitch": 0.9100219806543919,
					"rotation": 0,
					"target": "0-302_planque_celine_cave_1"
        },
				{
					"yaw": 2.835192565008338,
					"pitch": 0.5780441483217569,
					"rotation": 0,
					"target": "2-302_planque_celine_cave_3"
        }
      ],
			"infoHotspots": [
				{
					"yaw": 1.6367211298773165,
					"pitch": 0.40008964732660246,
					"title": "<span class='watch' id='see4'>Voir plus près</span>",
					"text": ""
        }
      ]
    },
		{
			"id": "2-302_planque_celine_cave_3",
			"name": "Avancer",
			"levels": [
				{
					"tileSize": 256,
					"size": 256,
					"fallbackOnly": true
        },
				{
					"tileSize": 512,
					"size": 512
        }
      ],
			"faceSize": 512,
			"initialViewParameters": {
				"yaw": 1.9345754791371297,
				"pitch": 0.34050253693426313,
				"fov": 1.490862480678256
			},
			"linkHotspots": [
				{
					"yaw": -0.5034514365019689,
					"pitch": 0.9676436221241431,
					"rotation": 0,
					"target": "1-302_planque_celine_cave_2"
        }
      ],
			"infoHotspots": [
				{
					"yaw": 1.5420188960494023,
					"pitch": 0.24832707855773606,
					"title": `<a id='board' href='${import.meta.env.BASE_URL}fouilles/cave/assets/board.jpg' class='watch' target='_blank'>Voir plus près</a>`,
					"text": ""
        }
      ]
    }
  ],
	"name": "Lieu de fouille",
	"settings": {
		"mouseViewMode": "drag",
		"autorotateEnabled": false,
		"fullscreenButton": false,
		"viewControlButtons": false
	}
}
export default data