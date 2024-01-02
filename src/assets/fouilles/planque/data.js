const data = {
	"scenes": [
		{
			"id": "0-103_planque_grnier_1",
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
				"yaw": 3.0527901907468165,
				"pitch": 0.6758886881009261,
				"fov": 1.4599726663201706
			},
			"linkHotspots": [
				{
					"yaw": 2.9855938185488196,
					"pitch": 0.6267400046949234,
					"rotation": 0,
					"target": "1-103_planque_grnier_2"
        }
      ],
			"infoHotspots": []
    },
		{
			"id": "1-103_planque_grnier_2",
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
				"yaw": 1.1606694777218394,
				"pitch": 0.7655744881500617,
				"fov": 1.4599726663201706
			},
			"linkHotspots": [{
					"yaw": 1.685593818548819,
					"pitch": 2.6267400046949234,
					"rotation": 0,
					"target": "0-103_planque_grnier_1"
					}
				],
			"infoHotspots": [
				{
					"yaw": 0.97,
					"pitch": 0.12,
					"title": "<span id='see1' class='watch'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": 1.15,
					"pitch": 0.02,
					"title": "<span id='see2' class='watch'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": 1.375,
					"pitch": -0.323,
					"title": "<span id='see5' class='watch'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": 1.6,
					"pitch": -0.22,
					"title": "<span id='see4' class='watch'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": 1.9,
					"pitch": -0.1,
					"title": "<span id='see3' class='watch'>Voir plus près</span>",
					"text": ""
        },
				{
					"yaw": 2.497577384108462,
					"pitch": 0.1575297144897796,
					"title": "<span id='see6' class='watch'>Voir plus près</span>",
					"text": ""
        }
      ]
		}
	],
	"name": "Project Title",
	"settings": {
		"mouseViewMode": "drag",
		"autorotateEnabled": false,
		"fullscreenButton": false,
		"viewControlButtons": false
	}
};

export default data