import Marzipano from "marzipano";
import bowser from "bowser";

const MarzipanoInit = (panoRef, viewerRef, data, placeName) => {
	// Grab elements from DOM.
	const panoElement = panoRef.current;
	const sceneElements = document.querySelectorAll("#sceneList .scene");
	const panoContainer = document.getElementById("fouille");

	// Prevent touch and scroll events from reaching the parent element.
	const stopTouchAndScrollEventPropagation = (element, eventList) => {
		eventList = [
			"touchstart",
			"touchmove",
			"touchend",
			"touchcancel",
			"wheel",
			"mousewheel",
		];
		for (let i = 0; i < eventList.length; i++) {
			element.addEventListener(eventList[i], (event) => {
				event.stopPropagation();
			});
		}
	};

	const createLinkHotspotElement = (hotspot) => {
		// Create wrapper element to hold icon and tooltip.
		const wrapper = document.createElement("div");
		wrapper.classList.add("hotspot");
		wrapper.classList.add("link-hotspot");

		// Create image element.
		const icon = document.createElement("img");
		icon.src =
			`${import.meta.env.BASE_URL}fouilles/${placeName}/img/link.png`;
		icon.classList.add("link-hotspot-icon");

		// Set rotation transform.
		const transformProperties = [
			"-ms-transform",
			"-webkit-transform",
			"transform",
		];
		for (let i = 0; i < transformProperties.length; i++) {
			const property = transformProperties[i];
			icon.style[property] = `rotate(${hotspot.rotation}rad)`;
		}

		// Add click event handler.
		wrapper.onclick = () => {
			switchScene(findSceneById(hotspot.target));
		};

		// Prevent touch and scroll events from reaching the parent element.
		// This prevents the view control logic from interfering with the hotspot.
		stopTouchAndScrollEventPropagation(wrapper);

		// Create tooltip element.
		const tooltip = document.createElement("div");
		tooltip.classList.add("hotspot-tooltip");
		tooltip.classList.add("link-hotspot-tooltip");
		tooltip.innerHTML = findSceneDataById(hotspot.target).name;

		wrapper.appendChild(icon);
		wrapper.appendChild(tooltip);

		return wrapper;
	};

	const createInfoHotspotElement = (hotspot) => {
		// Create wrapper element to hold icon and tooltip.
		const wrapper = document.createElement("div");
		wrapper.classList.add("hotspot");
		wrapper.classList.add("info-hotspot");

		// Create hotspot/tooltip header.
		const header = document.createElement("div");
		header.classList.add("info-hotspot-header");

		// Create image element.
		const iconWrapper = document.createElement("div");
		iconWrapper.classList.add("info-hotspot-icon-wrapper");
		const icon = document.createElement("img");
		icon.src =
			`${import.meta.env.BASE_URL}fouilles/${placeName}/img/info.png`;
		icon.classList.add("info-hotspot-icon");
		iconWrapper.appendChild(icon);

		// Create title element.
		const titleWrapper = document.createElement("div");
		titleWrapper.classList.add("info-hotspot-title-wrapper");
		const title = document.createElement("div");
		title.classList.add("info-hotspot-title");
		title.innerHTML = hotspot.title;
		titleWrapper.appendChild(title);

		// Create close element.
		const closeWrapper = document.createElement("div");
		closeWrapper.classList.add("info-hotspot-close-wrapper");
		const closeIcon = document.createElement("img");
		closeIcon.src =
			`${import.meta.env.BASE_URL}fouilles/${placeName}/img/close.png`;
		closeIcon.classList.add("info-hotspot-close-icon");
		closeWrapper.appendChild(closeIcon);

		// Construct header element.
		header.appendChild(iconWrapper);
		header.appendChild(titleWrapper);
		header.appendChild(closeWrapper);

		// Create text element.
		const text = document.createElement("div");
		text.classList.add("info-hotspot-text");
		text.innerHTML = hotspot.text;

		// Place header and text into wrapper element.
		wrapper.appendChild(header);
		wrapper.appendChild(text);

		// Create a modal for the hotspot content to appear on mobile mode.
		const modal = document.createElement("div");
		modal.innerHTML = wrapper.innerHTML;
		modal.classList.add("info-hotspot-modal");
		panoContainer.appendChild(modal);

		const toggle = () => {
			wrapper.classList.toggle("visible");
			modal.classList.toggle("visible");
		};

		// Show content when hotspot is clicked.
		wrapper.querySelector(".info-hotspot-header").onclick = toggle;

		// Hide content when close icon is clicked.
		modal.querySelector(".info-hotspot-close-wrapper").onclick = toggle;

		// Prevent touch and scroll events from reaching the parent element.
		// This prevents the view control logic from interfering with the hotspot.
		stopTouchAndScrollEventPropagation(wrapper);

		return wrapper;
	};

	const findSceneById = (id) => {
		for (let i = 0; i < scenes.length; i++) {
			if (scenes[i].data.id === id) {
				return scenes[i];
			}
		}
		return null;
	};

	const findSceneDataById = (id) => {
		for (let i = 0; i < data.scenes.length; i++) {
			if (data.scenes[i].id === id) {
				return data.scenes[i];
			}
		}
		return null;
	};

	const switchScene = (scene) => {
		scene.view.setParameters(scene.data.initialViewParameters);
		scene.scene.switchTo();
		updateSceneList(scene);
	};

	const updateSceneList = (scene) => {
		for (let i = 0; i < sceneElements.length; i++) {
			const el = sceneElements[i];
			if (el.getAttribute("data-id") === scene.data.id) {
				el.classList.add("current");
			} else {
				el.classList.remove("current");
			}
		}
	};

	// Detect desktop or mobile mode.
	if (window.matchMedia) {
		const setMode = () => {
			panoContainer.classList.add("desktop");
		};
		const mql = matchMedia("(max-width: 500px), (max-height: 500px)");
		setMode();
		mql.addListener(setMode);
	} else {
		panoContainer.classList.add("desktop");
	}

	// Detect whether we are on a touch device.
	panoContainer.classList.add("no-touch");
	window.ontouchstart = () => {
		panoContainer.classList.remove("no-touch");
		panoContainer.classList.add("touch");
	};

	// Use tooltip fallback mode on IE < 11.
	if (bowser.msie && parseFloat(bowser.version) < 11) {
		panoContainer.classList.add("tooltip-fallback");
	}

	// Viewer options.
	const viewerOpts = {
		controls: {
			mouseViewMode: data.settings.mouseViewMode,
		},
	};

	// Initialize viewer.
	viewerRef.current = new Marzipano.Viewer(panoElement, viewerOpts);
	const viewerChildrens = viewerRef.current._domElement.children;
	for (const element_ of viewerChildrens) {
		if (element_.tagName === "CANVAS") {
			element_.style.left = 0;
			element_.style.top = 0;
		}
	}

	// Create scenes.
	const scenes = data.scenes.map((data) => {
		const urlPrefix =
			`${import.meta.env.BASE_URL}fouilles/${placeName}/tiles`;
		const source = Marzipano.ImageUrlSource.fromString(
			`${urlPrefix}/${data.id}/{z}/{f}/{y}/{x}.jpg`,
			{
				cubeMapPreviewUrl: `${urlPrefix}/${data.id}/preview.jpg`,
			},
		);
		const geometry = new Marzipano.CubeGeometry(data.levels);

		const limiter = Marzipano.RectilinearView.limit.traditional(
			data.faceSize,
			(100 * Math.PI) / 180,
			(120 * Math.PI) / 180,
		);
		const view = new Marzipano.RectilinearView(
			data.initialViewParameters,
			limiter,
		);

		const scene = viewerRef.current.createScene({
			source: source,
			geometry: geometry,
			view: view,
			pinFirstLevel: true,
		});

		// Create link hotspots.
		data.linkHotspots.forEach((hotspot) => {
			const element = createLinkHotspotElement(hotspot);
			scene.hotspotContainer().createHotspot(element, {
				yaw: hotspot.yaw,
				pitch: hotspot.pitch,
			});
		});

		// Create info hotspots.
		data.infoHotspots.forEach((hotspot) => {
			const element = createInfoHotspotElement(hotspot);
			scene.hotspotContainer().createHotspot(element, {
				yaw: hotspot.yaw,
				pitch: hotspot.pitch,
			});
		});

		return {
			data: data,
			scene: scene,
			view: view,
		};
	});

	// Set handler for scene switch.
	scenes.forEach((scene) => {
		const el = document.querySelector(
			`#sceneList .scene[data-id="${scene.data.id}"]`,
		);
		el.onclick = () => switchScene(scene);
	});

	const reset = document.getElementById("reset-lieu");
	if (reset) {
		reset.onclick = () => switchScene(scenes[0]);
	}

	// Display the initial scene.
	switchScene(scenes[0]);
	return () => {
		viewerRef.current.destroy();
	};
};
export default MarzipanoInit;
