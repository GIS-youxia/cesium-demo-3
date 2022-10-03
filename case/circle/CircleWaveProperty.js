
import * as Cesium from 'cesium';
import source from './wave.glsl'

export class CircleWaveProperty {
    constructor(options) {
        this.options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
        this._definitionChanged = new Cesium.Event();
        this._color = options.color;
        this.duration = Cesium.defaultValue(options.duration, 1e3);
        this.count = Cesium.defaultValue(options.count, 2);
        if (this.count <= 0) this.count = 1;
        this.gradient = Cesium.defaultValue(options.gradient, 0.1);
        if (this.gradient < 0) this.gradient = 0;
        else if (this.gradient > 1) this.gradient = 1;
        this._time = performance.now();
    }

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    get color() {
        return this._color;
    }

    static get type() {
        return "CircleWaveProperty"
    }

    getType() {
        return CircleWaveProperty.type;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        //Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
        result.color = this._color;
        result.time = (performance.now() - this._time) / this.duration;
        result.count = this.count;
        result.gradient = 1 + 10 * (1 - this.gradient);
        return result;
    }

    equals (other) {
        return this === other ||
            (other instanceof CircleWave &&
                Cesium.Property.equals(this._color, other._color))
    };
}


Cesium.Material._materialCache.addMaterial(CircleWaveProperty.type, {
    fabric: {
        type: CircleWaveProperty.type,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            time: 1,
            count: 1,
            gradient: 0.1
        },
        source: source
    },
    translucent: true
});
