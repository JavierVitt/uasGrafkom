import * as THREE from "three";
import { Player, PlayerController, ThirdPersonCamera } from "./player.js";
import { animatedFBX, fbx, obj, objLamp } from "./environment.js";


class Main {
    static WindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
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
        // const textureGround = loader.load('https://tse2.mm.bing.net/th/id/OIP.sJ6OJZFKB9tit_yzlAtbZgHaHa?rs=1&pid=ImgDetMain');
        // textureGround.colorSpace = THREE.SRGBColorSpace
        // textureGround.wrapS = THREE.RepeatWrapping;
        // textureGround.wrapT = THREE.RepeatWrapping;
        // textureGround.receiveShadow = true;
        // textureGround.castShadow = true;
        // const timesToRepeatHorizontally = 60;
        // const timesToRepeatVertically = 60;
        // textureGround.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);

        const geometry = new THREE.PlaneGeometry(60, 60)
        const material = new THREE.MeshPhongMaterial({
            color: 0x444aa22,
            // map: textureGround
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

        //Cahaya Langit
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

        const thirdPersonCamera = new ThirdPersonCamera(this.camera, new THREE.Vector3(-5, 2, 0), new THREE.Vector3(0, 0, 0));

        // Then create the PlayerController instance with the ThirdPersonCamera instance
        const playerController = new PlayerController(thirdPersonCamera);
        // ThirdPersonCamera
        this.player = new Player(thirdPersonCamera, playerController, this.scene, 10);







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

new obj('./non-player asset/Park2/', 'bench_res.obj', 'bench_res.mtl', 1, 1, 1, 0, 0, 0, 0, -4.65, 0, Main.scene);
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
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 10, 0, 7, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -5, 0, 7, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 10, 0, -7, 0, 0, 0, Main.scene, 10);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -5, 0, -7, 0, 0, 0, Main.scene, 20);
new fbx('./non-player asset/Park1/Garden Lamp/', 'GardenLamp1.fbx', 0.13, 0.13, 0.13, 4, 0.5, 3, 0, 0, 0, Main.scene);
new fbx('./non-player asset/grasses/', 'grass_03.fbx', 1.3, 1, 1.5, -4, 0, 5, 0, 4.7, 0, Main.scene);
var npc = new animatedFBX('./resources/Action Adventure Pack/', 'CH46_nonPBR.fbx', 0.01, 4.8, 0.2, -0.5, 0, -20.5, 0, Main.scene, './resources/Action Adventure Pack/', 'SitMirror.fbx')
var npc2 = new animatedFBX('./resources/Action Adventure Pack/', 'CH46_nonPBR.fbx', 0.01, 4.8, 0.2, 0.5, 0, -20.5, 0, Main.scene, './resources/Action Adventure Pack/', 'SitMirror.fbx');

//Set lampu light
// var PointLight = new THREE.PointLight(0xFFAA66, 20, 10, Math.PI / 2.2, 0.1, 0.6);
// PointLight.position.set(4, 0.7, 3);
// PointLight.castShadow = true;
// var PointLightHelper = new THREE.PointLightHelper(PointLight);
// PointLight.add(PointLightHelper);
// this.scene.add(PointLight);
// this.scene.add(PointLight.target);


var vertices = [];
for (let i = 0; i < 360; i++) {
    var angleInRadians = (i * Math.PI) / 180;
    var newX = 2.8 + Math.cos(angleInRadians) * 5; // X-coordinate remains the same
    var newY = 0; // Rotate around X-axis
    var newZ = 0 + Math.sin(angleInRadians) * 5; // Translate along Z-axis
    vertices.push(newX);
    vertices.push(newY);
    vertices.push(newZ);
}
for (let i = 0; i < 360; i++) {
    if (i % 10 == 0) {
        var bambu = new fbx('./non-player asset/Park1/Bamboo/', 'BlackBamboo.fbx', 0.03, 0.03, 0.03, vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2], 0, 0, 0, Main.scene);
    }
}

const material = new THREE.MeshPhysicalMaterial({
    color: 0xff00dd,     // Warna hijau
    transparent: true,   // Menandakan bahwa material ini transparan
    opacity: 0.5,        // Menentukan tingkat transparansi, dari 0 (benar-benar transparan) hingga 1 (sepenuhnya opak)
    transmission: 1.0,   // Untuk membuat material seperti kaca
    roughness: 1.0,      // Halus
    ior: 1.7,            // Indeks bias
    thickness: 0.5       // Ketebalan objek kaca
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
Main.scene.add(cube);



function animate() {
    Main.render(clock.getDelta());
    requestAnimationFrame(animate);
    npc.update();
    npc2.update();
    console.log(Main.player.mesh.position.x, Main.player.mesh.position.y, Main.player.mesh.position.z);
}
requestAnimationFrame(animate);
