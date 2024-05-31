import * as THREE from "three";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export class obj {
    constructor(filepath, x, y, z, scale, rotx, roy, rotz) {
        this.filepath = filepath;
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = scale;
        this.rotx = rotx;
        this.roy = roy;
        this.rotz = rotz;
    };

    loadModel(filepath, x, y, z, scale, rotx, roy, rotz) {

        object.traverse(function (child) {

            if (child.isMesh) child.material.map = texture;

        });

        object.position.y = - 0.95;
        object.scale.setScalar(0.01);
        const loader = new OBJLoader(manager);
        loader.load(filepath, function (obj) {
            object = obj;
        }, onProgress, onError);
        scene.add(object);
        object.position.set(x, y, z);
        object.scale.set(scale, scale, scale);
        object.rotation.set(rotx, roy, rotz);
        render();
    }
}
