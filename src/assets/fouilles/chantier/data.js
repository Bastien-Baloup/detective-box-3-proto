let data = {
  scenes: [
    {
      id: "0-101---chantier1",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        yaw: -2.0970650171548577,
        pitch: 0.1965167589275314,
        fov: 1.6043139301811329,
      },
      linkHotspots: [
        {
          yaw: -2.0569714577339084,
          pitch: 0.29869767693818794,
          rotation: 0,
          target: "1-101---chantier2",
        },
      ],
      infoHotspots: [],
    },
    {
      id: "1-101---chantier2",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        yaw: -2.4696946953054084,
        pitch: 0.4345491728199118,
        fov: 1.6043139301811329,
      },
      linkHotspots: [
        {
          yaw: -1.4024016245774789,
          pitch: 0.42139698148870863,
          rotation: 0,
          target: "3-101---chantier4",
        },
        {
          yaw: 0.02472870426926832,
          pitch: 1.0713402827404757,
          rotation: 0,
          target: "0-101---chantier1",
        },
        {
          yaw: 1.3222924736466393,
          pitch: 0.35628165947469626,
          rotation: 0,
          target: "2-101---chantier3",
        },
      ],
      infoHotspots: [],
    },
    {
      id: "2-101---chantier3",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 2.742115293649091,
          pitch: 0.6080798966479488,
          rotation: 0,
          target: "1-101---chantier2",
        },
      ],
      infoHotspots: [
        {
          yaw: -0.13389822092458203,
          pitch: 0.538844185694952,
          title:
            "<a href='#' id='lien-malle'>Voir plus près</a>",
          text: "",
        },
      ],
    },
    {
      id: "3-101---chantier4",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        yaw: -2.754342926368384,
        pitch: 0.3831908044606376,
        fov: 1.6043139301811329,
      },
      linkHotspots: [
        {
          yaw: 0.35221623346236086,
          pitch: 0.5926822060589938,
          rotation: 0,
          target: "1-101---chantier2",
        },
      ],
      infoHotspots: [],
    },
  ],
  name: "Lieu de fouille",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: false,
    fullscreenButton: false,
    viewControlButtons: false,
  },
};

export default data;
