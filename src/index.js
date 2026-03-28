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
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1M2I2Mzg3Zi01YzljLTRiOWUtYjAwYy05MTUwMmIxYzVlMzEiLCJpZCI6NDAwNTYzLCJpYXQiOjE3NzQ0OTU0MDJ9.7tRMZnxSxO_TJqOzPBk0hm1sJcsotocBcqUfYCwjjgU";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

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