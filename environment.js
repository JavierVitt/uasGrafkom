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
            .load(MTL, (materials) => {

                materials.preload();

                new OBJLoader()
                    .setMaterials(materials)
                    .setPath(path)
                    .load(OBJ, (object) => {

                        // Traverse the object and set shadow properties
                        object.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });

                        sceneFromMain.add(object);
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

export class animatedFBX {
    constructor(path, FBXFile, scalar, x, y, z, rotX, rotY, rotZ, sceneFromMain, animationPath, animationFile) {
        this.animations = {};  // Store animations
        this.mixer = null;  // Animation mixer
        this.clock = new THREE.Clock();  // Clock for animation
        this.loadModelAnimated(path, FBXFile, scalar, x, y, z, rotX, rotY, rotZ, sceneFromMain, animationPath, animationFile);
    }

    loadModelAnimated(path, FBXFile, scalar = 0.01, x, y, z, rotX, rotY, rotZ, sceneFromMain, animationPath, animationFile) {
        var loader = new FBXLoader();
        loader.setPath(path);
        loader.load(FBXFile, (fbx) => {
            fbx.scale.setScalar(scalar);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            this.mesh = fbx;
            this.mesh.rotation.y += Math.PI / 2;
            this.mesh.position.set(x, y, z);
            this.mesh.rotation.x = rotX;
            this.mesh.rotation.y = rotY;
            this.mesh.rotation.z = rotZ;

            this.mixer = new THREE.AnimationMixer(this.mesh);

            // Load default animation
            this.loadAnimation(animationPath, animationFile);

            sceneFromMain.add(this.mesh);
        });
    }

    loadAnimation(path, FBXFile) {
        const loader = new FBXLoader();
        loader.setPath(path);
        loader.load(FBXFile, (fbx) => {
            const clip = fbx.animations[0];
            const action = this.mixer.clipAction(clip);
            action.play();
            this.animations[FBXFile] = {
                clip: clip,
                action: action,
            };
        });
    }

    playAnimation(name) {
        if (this.animations[name]) {
            this.animations[name].action.play();
        }
    }

    stopAnimation(name) {
        if (this.animations[name]) {
            this.animations[name].action.stop();
        }
    }

    update() {
        const delta = this.clock.getDelta();
        if (this.mixer) {
            this.mixer.update(delta);
        }
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
                    .load(OBJ, (object) => {

                        // Traverse the object and set shadow properties
                        object.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });
                        //Cahaya Lampu
                        var spotLight = new THREE.SpotLight(0xFFAA88, 1);
                        spotLight.position.set(x, y + 2.5, z);
                        spotLight.target.position.set(x, y, z);
                        spotLight.angle = Math.PI / 2.2;
                        spotLight.intensity = power / 1.5;
                        spotLight.penumbra = 0.1;
                        spotLight.decay = 0.6;
                        spotLight.distance = 10;
                        spotLight.castShadow = true;

                        sceneFromMain.add(object);
                        sceneFromMain.add(spotLight);
                        sceneFromMain.add(spotLight.target);
                        sceneFromMain.add(object);
                        object.scale.set(radX, radY, radZ);
                        object.position.set(x, y, z);
                        object.rotation.x = rotX;
                        object.rotation.y = rotY;
                        object.rotation.z = rotZ;

                    }, onProgress);
            });
    }
}