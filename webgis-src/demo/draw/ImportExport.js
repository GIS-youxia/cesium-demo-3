import { saveAs } from 'file-saver'
import { CVT } from './utils'
import * as Cesium from 'cesium'

export class ImportExport {
  constructor(viewer, tools) {
    this._viewer = viewer;
    this._process = {
      "Point": tools.markerTool,
      "LineString": tools.polylineTool,
      "Polygon": tools.polygonTool,
    }
  }

  _coordinates(entity) {
    const time = Cesium.JulianDate;
    let position
    if (entity.position) {
      position = entity.position.getValue(time)
    }
    let positions = entity.positions

    if (position instanceof Cesium.Cartesian3) {
      const coor = CVT.cartesian2Degrees(position, this._viewer)
      return [coor.lon, coor.lat, coor.height]
    } else if (positions instanceof Array) {
      const pts = []
      for (let p of positions) {
        const c = CVT.cartesian2Degrees(p, this._viewer)
        pts.push([c.lon, c.lat, c.height])
      }
      if (this.type === 'POLYLINE') {
        return pts
      } else {
        return [pts]
      }

    }
  }

  getDate() {
    const d = new Date();
    const hours = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds()
    const day = d.getDate();
    const mon = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${year}年${mon}月${day}日${hours}时${min}分${sec}`
  }

  toGeoJson(tool) {
    const { children, type } = tool;

    const json = {
      type: "FeatureCollection",
      name: "graphic",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      features: []
    };

    for (let i = 0; i < children.length; i++) {
      const entity = children[i];
      const itemJson = {
        "type": "Feature",
        "properties": {
        },
        "geometry": {
          "type": type,
          "coordinates": this._coordinates(entity)
        }
      }

      if (entity.userData) {
        itemJson.properties.userData = entity.userData;
      }
      json.features.push(itemJson);
    }

    const blob = new Blob([JSON.stringify(json)], {
      type: ""
    });
    saveAs(blob, type + "_"+this.getDate()+ '.geojson');
  }

  fromGeoJson(text) {
    const json = JSON.parse(text)

    if (json.features.length < 1) return;

    const { type } = json.features[0].geometry;
    const tool = this._process[type]
    if (type === "Point") {
      json.features.forEach(item => {
        const coord = {
          lon: item.geometry.coordinates[0],
          lat: item.geometry.coordinates[1],
          height: item.geometry.coordinates[2]
        };
        const position = Cesium.Cartesian3.fromDegrees(coord.lon, coord.lat, coord.height)
        tool.addMarker(position, item.properties);
      })
    } else if (type === "LineString") {
      json.features.forEach(item => {
        let positions = [];
        for (let c of item.geometry.coordinates[0]) {
          const position = Cesium.Cartesian3.fromDegrees(c[0], c[1], c[2])
          positions.push(position)
        }
        tool.addPolyline(positions);
      })
    } else if (type === "Polygon") {
      json.features.forEach(item => {
        let positions = [];
        for (let c of item.geometry.coordinates[0]) {
          const position = Cesium.Cartesian3.fromDegrees(c[0], c[1], c[2])
          positions.push(position)
        }
        tool.addPolygon(positions);
      })
    }
  }
}
