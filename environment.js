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
        this.mesh = new THREE.Mesh(
            new new OBJLoader().load(filepath)
        );
        this.scene.add(this.mesh);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.position.set(x, y, z);
        this.mesh.scale.set(scale, scale, scale);
        this.mesh.rotation.set(rotx, roy, rotz);
    }
}