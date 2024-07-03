import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';



//setup canvas render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;



//setup scene cand camera
var x = 0;
var y = 0;
var z = 10;
var fov = 75;
var lookx = 0;
var looky = 0;
var lookz = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(x, y, z);
camera.lookAt(lookx, looky, lookz);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.enableDamping = true;
controls.update();

const heliview = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
heliview.position.set(0, 10, 10);
heliview.lookAt(0, 0, 0);

//geometry/model
const sphere = new THREE.SphereGeometry(2, 32, 32);
const smallsphere = new THREE.SphereGeometry(0.2, 16, 16);
var suncolor = new THREE.MeshPhongMaterial({ color: 0xffff00 });
var mooncolor = new THREE.MeshPhongMaterial({ color: 0x333333 });
const cone = new THREE.ConeGeometry(1, 1, 64, 64)
const geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ color: 0x000af0 });
var material2 = new THREE.MeshPhongMaterial({ color: 0xff0af0 });
const cube = new THREE.Mesh(geometry, material2);
const conerender = new THREE.Mesh(cone, material);
const sun = new THREE.Mesh(sphere, suncolor);
const moon = new THREE.Mesh(smallsphere, mooncolor);
sun.position.set(10, 15, 10);
conerender.position.set(-3, 0, 1);
conerender.castShadow = true;
conerender.receiveShadow = true;
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(conerender);
conerender.add(cube);
cube.position.set(5, 0, 0);
cube.add(moon);
moon.position.set(0, 0, 1);
scene.add(sun);



//plane/ground
var planeGeo = new THREE.PlaneGeometry(40, 40);
var planeMat = new THREE.MeshPhongMaterial({ color: 0x5555 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.set(0, 0, 90);
plane.receiveShadow = true;
scene.add(plane);



//ambient/light/shader

var pointLight = new THREE.PointLight(0xFFFFAA, 15, 100, 2);
var pointLightHelper = new THREE.PointLightHelper(pointLight);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
sun.add(pointLightHelper);
sun.add(pointLight);


var spotLight = new THREE.SpotLight(0xFF1111, 250, 100, 10);
moon.add(spotLight);
cube.add(spotLight.target);
spotLight.castShadow = true;
var spotLightHelper = new THREE.SpotLightHelper(spotLight);
moon.add(spotLightHelper);


var sunlight = new THREE.DirectionalLight(0xffffff);
sunlight.position.set(7.5, 12, 7.5);
sunlight.target.position.set(10, 15, 10);
sunlight.castShadow = true;
sunlight.shadow.camera.top = 50;
sunlight.shadow.camera.bottom = -10;
sunlight.shadow.camera.left = -12;
sunlight.shadow.camera.right = 12;
scene.add(sunlight);


var hemisphereLight = new THREE.HemisphereLight(0xffeeee, 0xbbaaaa, 0.2);
scene.add(hemisphereLight);


// var ambientLight = new THREE.AmbientLight(0xffddaa);
// scene.add(ambientLight);


var clock = new THREE.Clock();
//loop animate

function animate() {
    renderer.setClearColor(0xCCCAFC);
    conerender.rotation.z += 0.02;
    cube.rotation.x += 0.02;
    
    renderer.render(scene, camera);
    console.log(clock.getElapsedTime());
    if (clock.getElapsedTime() > 2 && clock.getElapsedTime() < 5) {
        renderer.render(scene, heliview);
        heliview.lookAt(0, 0, (clock.getElapsedTime()-2)*4);
    }
    else if (clock.getElapsedTime() > 5) {
        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);


    const delta = clock.getDelta();

}
requestAnimationFrame(animate);

