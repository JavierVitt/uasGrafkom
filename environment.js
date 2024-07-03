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
                                child.receiveShadow = false;
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

export class darkObj {
    constructor(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain, luma) {
        this.loadObj(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain, luma);
    }
    loadObj(path, OBJ, MTL, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain, luma) {
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
                                // Subtly increase the emissive property to brighten the object without changing its texture
                                // Use a very subtle emissive color that complements the original material
                                child.material.emissive = new THREE.Color(0x222222); // A very dark shade as a base for the brightening effect

                                // Adjust the emissiveIntensity for a subtle brightening effect
                                child.material.emissiveIntensity = 0.1; // Keep it low to ensure the effect is subtle

                                // Ensure the material is updated to reflect changes
                                child.material.needsUpdate = true;
                                child.castShadow = true;
                                child.receiveShadow = false;
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

class SMDLoader extends THREE.Loader {
    constructor(manager) {
        super(manager);
    }

    load(url, onLoad, onProgress, onError) {
        const loader = new THREE.FileLoader(this.manager);
        loader.setPath(this.path);
        loader.load(url, (text) => {
            try {
                const object = this.parse(text);
                onLoad(object);
            } catch (error) {
                if (onError) onError(error);
            }
        }, onProgress, onError);
    }

    parse(text) {
        const lines = text.split('\n');
        const vertices = [];
        const indices = [];
        const mesh = new THREE.BufferGeometry();

        let isReadingTriangles = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line === 'triangles') {
                isReadingTriangles = true;
                continue;
            }

            if (line === 'end') {
                isReadingTriangles = false;
                continue;
            }

            if (isReadingTriangles) {
                const parts = line.split(/\s+/);

                if (parts.length === 3) {
                    indices.push(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
                } else if (parts.length === 4) {
                    vertices.push(parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2]));
                }
            }
        }

        if (vertices.length === 0 || indices.length === 0) {
            console.error('Failed to parse vertices or indices from SMD file.');
            return null;
        }

        mesh.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        mesh.setIndex(indices);

        console.log('Vertices:', vertices);
        console.log('Indices:', indices);

        return new THREE.Mesh(mesh, new THREE.MeshStandardMaterial({ color: 0x555555 }));
    }
}

export class SMDModel {
    constructor(path, SMDFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain) {
        this.loadSMD(path, SMDFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain);
    }

    loadSMD(path, SMDFile, radX, radY, radZ, x, y, z, rotX, rotY, rotZ, sceneFromMain) {
        const loader = new SMDLoader();
        loader.setPath(path);
        loader.load(SMDFile, (object) => {
            if (object) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.scale.set(radX, radY, radZ);
                object.position.set(x, y, z);
                object.rotation.x = rotX;
                object.rotation.y = rotY;
                object.rotation.z = rotZ;

                sceneFromMain.add(object);
                console.log('SMD model added to the scene');
            } else {
                console.error('Failed to load SMD model');
            }
        }, undefined, (error) => {
            console.error('An error occurred while loading the SMD model:', error);
        });
    }
}