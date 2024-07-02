import * as THREE from "three";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class obj {
    constructor(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain) {
        this.loadObj(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain);
    }
    loadObj(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain) {
        //Object
        const onProgress = function (xhr) {

            if (xhr.lengthComputable) {

                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log(percentComplete.toFixed(2) + '% downloaded');

            }

        };
        new MTLLoader()
            .setPath(path)
            .load(MTL, function (materials) {

                materials.preload();

                new OBJLoader()
                    .setMaterials(materials)
                    .setPath(path)
                    .load(OBJ, function (object) {

                        sceneFromMain.add(object);
                        object.castShadow = true;
                        object.receiveShadow = true;
                        object.scale.set(radX, radY, radZ);
                        object.position.set(x, y, z);
                        object.rotation.x = rotX;
                        object.rotation.y = rotY;
                        object.rotation.z = rotZ;

                    }, onProgress);

            });
    }

}

export class fbx {
    constructor(path, FBXFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain) {
        this.loadModel(path, FBXFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain);
    }

    loadModel(path, FBXFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain) {
        var loader = new FBXLoader();
        loader.setPath(path);
        loader.load(FBXFile, (fbx) => {
            fbx.scale.setScalar(0.01);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
                c.scale.set(radX, radY, radZ);
                c.position.set(x, y, z);
                c.rotation.x = rotX;
                c.rotation.y = rotY;
                c.rotation.z = rotZ;
            });
            this.mesh = fbx;
            sceneFromMain.add(this.mesh);
            this.mesh.rotation.y += Math.PI / 2;

            this.mixer = new THREE.AnimationMixer(this.mesh);
        });

    }
}

export class objLamp {
    constructor(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain, power) {
        this.loadObj(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain, power);
    }
    loadObj(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain, power) {
        //Object
        const onProgress = function (xhr) {

            if (xhr.lengthComputable) {

                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log(percentComplete.toFixed(2) + '% downloaded');

            }

        };
        new MTLLoader()
            .setPath(path)
            .load(MTL, function (materials) {

                materials.preload();

                new OBJLoader()
                    .setMaterials(materials)
                    .setPath(path)
                    .load(OBJ, function (object) {

                        //Cahaya Lampu
                        var spotLight = new THREE.SpotLight(0xFFAA88, 1);
                        spotLight.position.set(x, y+2.5, z);
                        spotLight.target.position.set(x, y, z);
                        spotLight.angle = Math.PI / 1.8;
                        spotLight.intensity = power/4;
                        spotLight.penumbra = 0.1;
                        spotLight.decay = 1;
                        spotLight.distance = 100;
                        spotLight.castShadow = true;
                        //brutal
                        var spotLight2 = new THREE.SpotLight(0xFFAA88, 1);
                        spotLight2.position.set(x, y+2.5, z);
                        spotLight2.target.position.set(x, y, z);
                        spotLight2.angle = Math.PI / 2.3;
                        spotLight2.intensity = power;
                        spotLight2.penumbra = 0.1;
                        spotLight2.decay = 1;
                        spotLight2.distance = 5;

                        spotLight2.castShadow = true;

                        sceneFromMain.add(object);
                        sceneFromMain.add(spotLight);
                        sceneFromMain.add(spotLight.target);
                        sceneFromMain.add(spotLight2);
                        sceneFromMain.add(spotLight2.target);
                        object.castShadow = true;
                        object.receiveShadow = true;
                        object.scale.set(radX, radY, radZ);
                        object.position.set(x, y, z);
                        object.rotation.x = rotX;
                        object.rotation.y = rotY;
                        object.rotation.z = rotZ;

                    }, onProgress);

            });
    }

}