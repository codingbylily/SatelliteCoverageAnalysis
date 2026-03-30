//import {accessToken} from "./js/CesiumConfig";
import {
  Ion,
  Viewer,
  Terrain,
  createOsmBuildingsAsync,
  Cartesian3,
  Math,
  PinBuilder,
  Color,
  VerticalOrigin,
} from "cesium";
import * as Cesium from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";

// Your access token can be found at: https://cesium.com/ion/tokens.
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMWZhZDg0Ny1kNGJjLTQxODMtYTU3My03NzBhYjcxMDhmYWIiLCJpZCI6NDAwNTYzLCJpYXQiOjE3NzMwMzAxNjN9.VeypxW7O3wbmAqHxknligxEN1ntPr5LwRxTv71drks8';


// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  animation: true,
  timeline: true,
  terrain: Cesium.Terrain.fromWorldTerrain()
});


// set clock to a time inside your CZML availability and pause playback
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601('2012-03-15T10:20:00Z');
viewer.clock.multiplier = 0;
viewer.clock.shouldAnimate = false;


// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);

//zooms to an entity that we have added
viewer.zoomTo(viewer.entities);

//create bases
//you can use geojson.io to create a geojson that contains the location data for each base
//you can import the geojson by uploading it to your cesium library as well
//include some other options

//I chose to keep the bases seperate so that I can edit them indivually for maximum customization abilities.

const pinBuilder = new Cesium.PinBuilder();

//add first base
const Base1 = viewer.entities.add({
  name: "BaseOne",
  position: Cesium.Cartesian3.fromDegrees(
    -137.4860289734494,
    60.76828050550881,
  ),
  billboard: {
    image: pinBuilder.fromText("1", Cesium.Color.BLACK, 48).toDataURL(),
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});
const BaseTwo = viewer.entities.add({
  name: "Base 2",
  position: Cesium.Cartesian3.fromDegrees(
    -132.9990568112458,
    69.42529650249594,
  ),
  billboard: {
    image: pinBuilder.fromText("2", Cesium.Color.BLACK, 48).toDataURL(),
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

const BaseThree = viewer.entities.add({
  name: "Base 3",
  position: Cesium.Cartesian3.fromDegrees(
    -61.45380609213797,
    82.28029380155519,
  ),
  billboard: {
    image: pinBuilder.fromText("3", Cesium.Color.BLACK, 48).toDataURL(),
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

const BaseFour = viewer.entities.add({
  name: "Base 4",
  position: Cesium.Cartesian3.fromDegrees(
    -61.56609279445419,
    66.60276721268559,
  ),
  billboard: {
    image: pinBuilder.fromText("4", Cesium.Color.BLACK, 48).toDataURL(),
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

const BaseFive = viewer.entities.add({
  name: "Base 5",
  position: Cesium.Cartesian3.fromDegrees(
    -63.89063069327206,
    59.484172969805854,
  ),
  billboard: {
    image: pinBuilder.fromText("5", Cesium.Color.BLACK, 48).toDataURL(),
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

const BaseSix = viewer.entities.add({
  name: "Base 6",
  position: Cesium.Cartesian3.fromDegrees(-52.6351036187651, 47.51364950726975),
  billboard: {
    image: pinBuilder.fromText("6", Cesium.Color.BLACK, 48).toDataURL(),
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

//import example data of satellite paths from czml file 

import czml_example_satellite from './data/example_satellite_data.czml';
const czml_satellite = JSON.parse(czml_example_satellite);

let satelliteDataSource = null;

async function loadOrShowSatellites() {
  if (satelliteDataSource) {
    satelliteDataSource.show = true;
    viewer.zoomTo(satelliteDataSource);
    viewer.camera.flyHome(0);
    return;
  }
  satelliteDataSource = await Cesium.CzmlDataSource.load(czml_satellite);
  viewer.dataSources.add(satelliteDataSource);
  viewer.zoomTo(satelliteDataSource);
  viewer.camera.flyHome(0);
}

//link satellites to button 
//viewers can click button to view sample satellite data
document.getElementById('load-satellites').addEventListener('click', loadOrShowSatellites);


//load satellite and drone tracking data
import czmlExampleSatelliteAndDrone from './data/tracking.czml';
import droneUrl from './data/CesiumDrone.glb';
const czml_satellite_drone = JSON.parse(czmlExampleSatelliteAndDrone);

let satelliteTracker, drone;
let satelliteStopTime, droneStopTime, startTime;

Cesium.CzmlDataSource.load(czml_satellite_drone).then(ds => {
  viewer.dataSources.add(ds);

  satelliteTracker = ds.entities.getById('Satellite/ISS');
  drone = ds.entities.getById('CesiumDrone');

  if (satelliteTracker) satelliteTracker.viewFrom = new Cesium.Cartesian3(-300, 20, 100);
  if (drone) {
    drone.viewFrom = new Cesium.Cartesian3(-50, 0, 5);
    if (drone.model) {
      drone.model.uri = droneUrl;
      drone.model.minimumPixelSize = drone.model.minimumPixelSize || 64;
      drone.model.maximumScale = drone.model.maximumScale || 20000;
    }
  }

  const satPos = satelliteTracker && satelliteTracker.position;
  const satAvail = satPos && (satPos.availability || satelliteTracker.availability);
  if (satAvail) {
    startTime = satAvail.start;
    satelliteStopTime = satAvail.stop;
  } else {
    startTime = viewer.clock.startTime || Cesium.JulianDate.now();
    satelliteStopTime = viewer.clock.stopTime || Cesium.JulianDate.addDays(startTime, 1, new Cesium.JulianDate());
  }

  const drPos = drone && drone.position;
  const drAvail = drPos && (drPos.availability || drone.availability);
  droneStopTime = drAvail ? drAvail.stop : satelliteStopTime;

  document.getElementById('track-satellite').addEventListener('click', () => {
    viewer.clock.stopTime = satelliteStopTime;
    viewer.clock.currentTime = startTime;
    viewer.clock.multiplier = 30;
    if (viewer.timeline) viewer.timeline.zoomTo(startTime, satelliteStopTime);
    viewer.trackedEntity = satelliteTracker;
  });

  document.getElementById('track-drone').addEventListener('click', () => {
    viewer.clock.stopTime = droneStopTime;
    viewer.clock.currentTime = startTime;
    viewer.clock.multiplier = 1;
    if (viewer.timeline) viewer.timeline.zoomTo(startTime, droneStopTime);
    viewer.trackedEntity = drone;
  });
});


// call after DOM ready
function initTrackingControls() {
  const select = document.getElementById('trk-frame');
  if (!select) return;

  function setTrackingFrame(frame) {
    if (satelliteTracker) satelliteTracker.trackingReferenceFrame = frame;
    if (drone) drone.trackingReferenceFrame = frame;

    const tracked = viewer.trackedEntity;
    if (tracked) {
      viewer.trackedEntity = undefined;
      viewer.trackedEntity = tracked;
    }
  }

  select.addEventListener('change', (e) => {
    const val = e.target.value;
    const frame =
      val === 'AUTODETECT' ? Cesium.TrackingReferenceFrame.AUTODETECT :
      val === 'INERTIAL'   ? Cesium.TrackingReferenceFrame.INERTIAL   :
      val === 'VELOCITY'   ? Cesium.TrackingReferenceFrame.VELOCITY   :
                            Cesium.TrackingReferenceFrame.ENU;
    setTrackingFrame(frame);
  });
}

// ensure DOM is ready before wiring controls
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTrackingControls);
} else {
  initTrackingControls();
}