//Documentation
//https://threejs.org/manual/#en/primitives
import * as THREE from "three"
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//Setup canvas render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup scene dan camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,0,40);
camera.lookAt(0,0,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,5,5);
controls.update();

// Sun
var geometry = new THREE.SphereGeometry(2,10,10);
var material = new THREE.MeshPhongMaterial({color: 0xffff00});
var sun = new THREE.Mesh(geometry, material);
sun.position.set(0,0,10);
sun.scale.set(3,3,3);
scene.add(sun);

// Earth
var earthGeo = new THREE.SphereGeometry(2,10,10);
var earthMat = new THREE.MeshPhongMaterial({color: 0x0000ff});
var earth = new THREE.Mesh(earthGeo, earthMat);
sun.add(earth);
earth.position.set(7,0,0);
earth.scale.set(0.5,0.5,0.5);

// Moon
var moonGeo = new THREE.SphereGeometry(2,10,10);
var moonMat = new THREE.MeshPhongMaterial({color: 0xffffff});
var moon = new THREE.Mesh(moonGeo, moonMat);
earth.add(moon);
moon.position.set(5,0,0);
moon.scale.set(0.5,0.5,0.5);

// Plane 
var planeGeo = new THREE.PlaneGeometry(500,500);
var planeMat = new THREE.MeshPhongMaterial({color: 0x008000});
var plane = new THREE.Mesh(planeGeo, planeMat); 
plane.position.set(0,-1,0);
scene.add(plane);

//Ambient Light
// var ambientLight = new THREE.AmbientLight(0xff0000);
// scene.add(ambientLight);

//Hemisphere Light
var hemiSphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 0.5);
scene.add(hemiSphereLight);

//Directional Light
var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0,10,10);
directionalLight.target.position.set(sun.position);
scene.add(directionalLight);

//Point Light
var pointLight = new THREE.PointLight(0xFFFF11, 150);
var pointLightHelper = new THREE.PointLightHelper(pointLight);
sun.add(pointLight);
scene.add(pointLightHelper);

//Spot Light
var spotLight = new THREE.SpotLight(0xFF1111, 250);
moon.add(spotLight);
earth.add(spotLight.target);


// loop animate
function animate() {
    renderer.setClearColor(0x000000);
    plane.rotation.x = 5;
    sun.rotation.z += 0.01;
    earth.rotation.z += 0.02;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);