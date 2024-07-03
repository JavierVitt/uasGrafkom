import * as THREE from "three";
import { Player, PlayerController, ThirdPersonCamera } from "./player.js";
import { fbx, obj } from "./environment.js";
import { importedObjects } from "./shared.js";
import { loadedObjectCounter } from "./shared.js";
import { countObjectToLoad } from "./shared.js";

class Main {
    static WindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    static getPlayer() {
        return this.player;
    }
    static init() {
        var canvReference = document.getElementById("canvas");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvReference });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.shadowMap.enabled = true;
        const loader = new THREE.TextureLoader();


        window.addEventListener('resize', () => {
            Main.WindowResize();
        }, false);

        //Plane
        const textureGround = loader.load('https://tse2.mm.bing.net/th/id/OIP.sJ6OJZFKB9tit_yzlAtbZgHaHa?rs=1&pid=ImgDetMain');
        textureGround.colorSpace = THREE.SRGBColorSpace
        textureGround.wrapS = THREE.RepeatWrapping;
        textureGround.wrapT = THREE.RepeatWrapping;
        textureGround.receiveShadow = true;
        textureGround.castShadow = true;
        const timesToRepeatHorizontally = 60;
        const timesToRepeatVertically = 60;
        textureGround.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);

        const geometry = new THREE.PlaneGeometry(100, 100)
        const material = new THREE.MeshPhongMaterial({
            map: textureGround
        });
        var plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = - Math.PI / 2;
        plane.receiveShadow = true;
        plane.castShadow = true;
        this.scene.add(plane);

        
        // var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
        // plane.rotation.x = - Math.PI / 2;
        // plane.receiveShadow = true;
        // plane.castShadow = true;
        // this.scene.add(plane);

        //Ambient Light
        var ambientLight = new THREE.AmbientLight(0xDDEEFF, 0.75);
        this.scene.add(ambientLight);

        //Directional Light
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(3, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 20;
        directionalLight.shadow.camera.bottom = -20;
        directionalLight.shadow.camera.left = - 20;
        directionalLight.shadow.camera.right = 20;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 40;
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // this.scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

        this.scene.add(directionalLight.target);

        // ThirdPersonCamera
        this.player = new Player(
            new ThirdPersonCamera(
                this.camera, new THREE.Vector3(-5, 2, 0), new THREE.Vector3(0, 0, 0)
            ),
            new PlayerController(),
            this.scene,
            10
        );
        var temp = new THREE.Vector3(0, 0, 0);






        // var tree = new obj('./non-player asset/Park2/acaciaTree.obj', 0, 0, 0, 1, 0, 0, 0);
        // this.scene.add(tree.mesh);
        // this.scene.add(this.mesh);
        // this.mesh.castShadow = true;
        // this.mesh.receiveShadow = true;
        // this.mesh.position.set(3,0,0);

    }
    static render(dt) {
        this.player.update(dt);
        this.renderer.render(this.scene, this.camera);
    }


}

var clock = new THREE.Clock();
Main.init();

// console.log("player position: ", Main.getPlayer().mesh);

// new obj('./non-player asset/Park2/', 'bench_res.obj', 'bench_res.mtl', 1, 1, 1, 0, 0, 0, 0, -4.65, 0, Main.scene);
new obj('./non-player asset/Park2/', 'bench_res.obj', 'bench_res.mtl', 1, 1, 1, 5, 0, 0, 0, 4.65, 0, Main.scene);
new obj('./non-player asset/Park2/', 'acaciaTree.obj', 'acaciaTree.mtl', 0.01, 0.01, 0.01, 2.5, 0, 10, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'tire swing.obj', 'tire swing.mtl', 0.2, 0.2, 0.2, 2.5, 0, 0, 0, 4.67, 0, Main.scene);
new obj('./non-player asset/Park2/', 'tire swing.obj', 'tire swing.mtl', 0.2, 0.2, 0.2, 2.5, 0, 0, 0, 4.67, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 10, 0, 0, 0, 4.7, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 10, 0, 5, 0, 4.7, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 10, 0, -5, 0, 4.7, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, -4, 0, 0, 0, 4.7, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, -4, 0, 5, 0, 4.7, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, -4, 0, -5, 0, 4.7, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 5, 0, 6, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 5, 0, -7.3, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 0, 0, 6, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 0, 0, -7.3, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 10, 0, 7, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -5, 0, 7, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 10 , 0, -7, 0, 0, 0, Main.scene);
new obj('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -5, 0, -7, 0, 0, 0, Main.scene);
// new fbx('./non-player asset/grasses/', 'grass_03.fbx', 1.3, 1, 1.5, -4, 0, 5, 0, 4.7, 0, Main.scene);

var vertices = [];
// for (let i = 0; i < 360; i++) {
//     var angleInRadians = (i * Math.PI) / 180;
//     var newX = 2.8 + Math.cos(angleInRadians) * 5; // X-coordinate remains the same
//     var newY = 0; // Rotate around X-axis
//     var newZ = 0 + Math.sin(angleInRadians) * 5; // Translate along Z-axis
//     vertices.push(newX);
//     vertices.push(newY);
//     vertices.push(newZ);
// }
// for (let i = 0; i < 360; i++) {
//     if(i%10 == 0){
//         new fbx('./non-player asset/Park1/Bamboo/', 'BlackBamboo.fbx', 0.03, 0.03, 0.03, vertices[i*3], vertices[i*3+1], vertices[i*3+2], 0, 0, 0, Main.scene);
//     }
// }


//------------------------------------------------------------------------------------- collision--------------------------------------------------------------------------------------------
// ini array yang bakal ngestore semua mesh yang bakal dicari colliionnya, tidak termasuk player.
var collisions = [];
// print(window.collisions);

function calculateAndPushCollisionPoints(mesh, scale, type = 'collision') {

    var playerMesh = Main.getPlayer().mesh;
    var player = new THREE.Box3().setFromObject(playerMesh);
    
    var existingMin = player.min.clone();
    var existingMax = player.max.clone();

    existingMin.z = -0.3;
    existingMax.z = 0.3;

    player.set(existingMin, existingMax);
    const playerHelper = new THREE.Box3Helper(player, 0xffff00);
    Main.scene.add(playerHelper);

    // Compute the bounding box after scale, translation, etc.
    var bbox = new THREE.Box3().setFromObject(mesh);
    const helper = new THREE.Box3Helper(bbox, 0xffff00);
    Main.scene.add(helper);
    // akses min dan max x,y,z dari bounding box
    var bounds = {
        type: type,
        xMin: bbox.min.x,
        xMax: bbox.max.x,
        yMin: bbox.min.y,
        yMax: bbox.max.y,
        zMin: bbox.min.z,
        zMax: bbox.max.z,
        canMoveXLess: true,
        canMoveXMore: true
    };
    collisions.push(bounds);
}

var isBoxSet = false;

function generateBox(){
    if (loadedObjectCounter == countObjectToLoad) {
        isBoxSet = true;
        for (let i = 0; i < importedObjects.length; i++) {
            calculateAndPushCollisionPoints(importedObjects[i], 1);
        }
        console.log("importedObjects:")
        console.log(importedObjects);
        console.log("collisions:", collisions);
    }
}

var playerPosition;
/**
 * Collision detection for every solid object.
 */
function detectCollisions() {
    // Get the user's current collision area.

    var bounds = {
        xMin: playerPosition.x -0.3,
        xMax: playerPosition.x +0.3,
        yMin: playerPosition.y -0.3,
        yMax: playerPosition.y +0.3,
        zMin: playerPosition.z -0.3,
        zMax: playerPosition.z +0.3,
    };

    // Run through each object and detect if there is a collision.
    for (var index = 0; index < collisions.length; index++) {
        // console.log("collisions[index].canMoveXLess: ",collisions[index].canMoveXLess);
        // console.log("canMoveXLess", Main.player.canMoveXLess);
        if ((bounds.xMin <= collisions[index].xMax && bounds.xMax >= collisions[index].xMin) &&
            (bounds.yMin <= collisions[index].yMax && bounds.yMax >= collisions[index].yMin) &&
            (bounds.zMin <= collisions[index].zMax && bounds.zMax >= collisions[index].zMin)) {
            // We hit a solid object! Stop all movements.
            // console.log("Collision detected!");
            // console.log("bounds.xMax = ", bounds.xMax);
            // console.log("collisions[index].xMax = ", collisions[index].xMax);
            // console.log("bounds.xMin = ", bounds.xMin);
            // console.log("collisions[index].xMin = ", collisions[index].xMin);
            // console.log("canMoveLess = ", Main.player.canMoveXLess);
            if (bounds.xMin <= collisions[index].xMax) {
                
                if(bounds.xMin >= collisions[index].xMin){
                    collisions[index].canMoveXLess = false;
                    Main.player.canMoveXLess = false;
                    console.log("kanan")
                }
            }

            if(bounds.xMax >= collisions[index].xMin){
                if(bounds.xMax <= collisions[index].xMax){
                    collisions[index].canMoveXMore = false;
                    Main.player.canMoveXMore = false;
                    console.log("kiri")
                }
            }
            
            
        }

        if (collisions[index].canMoveXLess == false) {
            if ((bounds.xMin <= collisions[index].xMax && bounds.xMax >= collisions[index].xMin) &&
                (bounds.yMin <= collisions[index].yMax && bounds.yMax >= collisions[index].yMin) &&
                (bounds.zMin <= collisions[index].zMax && bounds.zMax >= collisions[index].zMin)) {
                // We hit a solid object! Stop all movements.
                // console.log("Collision detected!");

                if (bounds.xMin <= collisions[index].xMax) {//Bener
                    // playerPosition.x = collisions[index].xMax;
                    // console.log("1");
                    // console.log("nubrukkk")
                    Main.player.canMoveXLess = false;
                    collisions[index].canMoveXLess = false;
                    continue;
                }

            }
            else {
                // console.log("no collision");
                collisions[index].canMoveXLess = true;
                Main.player.canMoveXLess = true;
            }
        }
        
        
        // if(bounds.xMin <= collisions[index].xMax && bounds.xMax >= collisions[index].xMin) 
            
            
        // if(bounds.yMin <= collisions[index].yMax && bounds.yMax >= collisions[index].yMin)


        // if(bounds.zMin <= collisions[index].zMax && bounds.zMax >= collisions[index].zMin)) {
        
        
        // }            
        
        
        
    }
}

// function detectCollisions() {
//     const playerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
//     playerBB.setFromObject(Main.getPlayer().mesh);


// }



// console.log(importedObjects.length);

// console.log(importedObjects);
// console.log(collisions);


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function animate() {
    if(isBoxSet == false){
        generateBox();
    }
    // Detect collisions.
    
    // console.log(Main.player.canMoveXLess)
    Main.render(clock.getDelta());


    requestAnimationFrame(animate);
    playerPosition = Main.getPlayer().mesh.position;
    // console.log(playerPosition);
    if (collisions.length > 0) {
        detectCollisions();
    }
}
requestAnimationFrame(animate);
