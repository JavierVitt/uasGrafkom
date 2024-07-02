import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


//https://meet.google.com/yzo-smdt-nvq

//Setup canvas Render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Setup Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0, 5);
// controls.update();

let list = [];

// Black cube
const blackCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const blackCubeMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const blackCube = new THREE.Mesh(blackCubeGeometry, blackCubeMaterial);
blackCube.position.set(0, 0, 0);
scene.add(blackCube)

// Red cube
const redCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const redCubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const redCube = new THREE.Mesh(redCubeGeometry, redCubeMaterial);
redCube.position.set(2, 0, 0);  // set position different from black cube
scene.add(redCube)

list.push(blackCube);   
list.push(redCube);
console.log(list);

// Adding bounding box to our black box
const blackCubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
blackCubeBB.setFromObject(blackCube);

// Adding bounding box to our red box
const redCubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
redCubeBB.setFromObject(redCube);



const onProgress = function (xhr) {

    if (xhr.lengthComputable) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log(percentComplete.toFixed(2) + '% downloaded');

    }

};

new MTLLoader()
    .setPath('resources/Satellite/Satellite/')
    .load('Satelite.mtl', function (materials) {

        materials.preload();

        new OBJLoader()
            .setMaterials(materials)
            .setPath('resources/Satellite/Satellite/')
            .load('Satelite.obj', function (object) {

                earth.add(object);
                object.scale.set(0.3, 0.3, 0.3);
                object.position.set(5, 0, 0);

            }, onProgress);

    });


//plane
var planeGeo = new THREE.PlaneGeometry(40, 40);
var planeMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.set(-90, 0, 0);
plane.position.set(0, -10, 10);
scene.add(plane);

// Ambient Light
var ambientLight = new THREE.AmbientLight(0xff8888);
scene.add(ambientLight);

//Hemisphere Light
var hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.8);
// scene.add(hemisphereLight);

//Directional Light
var directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 20, 10);
directionalLight.target.position.set(0, 0, 0);
// scene.add(directionalLight);
// scene.add(directionalLight.target);

//Point Light
var pointLight = new THREE.PointLight(0xFFFF11, 250);
var pointLightHelper = new THREE.PointLightHelper(pointLight);
// sun.add(pointLight);
// scene.add(pointLightHelper);

//Spot Light
var spotLight = new THREE.SpotLight(0xFF1111, 250, 100, 10);
var spotLightHelper = new THREE.SpotLightHelper(spotLight);

// moon.add(spotLight);

// earth.add(spotLight.target);


// Adding event listener to keyPressed event and changing position of red cube
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 38) { // up
        redCube.position.z -= 1;
    } else if (keyCode == 40) { // down
        redCube.position.z += 1;
    } else if (keyCode == 37) { // left 
        redCube.position.x -= 1;
    } else if (keyCode == 39) { // right
        redCube.position.x += 1;
    }
}

function checkCollision() {
    if (redCubeBB.intersectsBox(blackCubeBB)) {
        blackCube.material.transparent = true;
        blackCube.material.opacity = 0.5;
        blackCube.material.color = new THREE.Color(Math.random * 0xffffff);
    } else {
        blackCube.material.opacity = 1;
    }
}
//Loop animate
function animate() {
    renderer.setClearColor(0x000000);
    checkCollision();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);