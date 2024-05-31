import * as THREE from "three";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';

export class obj {
    constructor(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain){
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

export class fbx{
    constructor(path, FBXFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain){
        this.loadModel(path, FBXFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain);
    }
    
    loadModel(path, FBXFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain){
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
            this.mesh.rotation.y += Math.PI/2;

            this.mixer = new THREE.AnimationMixer(this.mesh);            
        });

    }
}