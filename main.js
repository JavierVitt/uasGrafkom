import * as THREE from "three";
import { Player, PlayerController, ThirdPersonCamera } from "./player.js";
import { darkObj, fbx, obj, objLamp, SMDModel } from "./environment.js";


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
        this.renderer.setClearColor(0x555555, 1);
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
        directionalLight.shadow.mapSize.width = 2048; // Increase for sharper shadows
        directionalLight.shadow.mapSize.height = 2048; // Increase for sharper shadows
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 100; //ubah ke 0 aja kl ga jalan/lag
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.near = -100;
        directionalLight.shadow.camera.far =100;
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

// new obj('./non-player asset/Park2/', 'bench_res.obj', 'bench_res.mtl', 1, 1, 1, 0, 0, 0, 0, -4.65, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'bench_res.obj', 'bench_res.mtl', 1, 1, 1, 5, 0, 0, 0, 4.65, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'acaciaTree.obj', 'acaciaTree.mtl', 0.01, 0.01, 0.01, 2.5, 0, 10, 0, 0, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'tire swing.obj', 'tire swing.mtl', 0.2, 0.2, 0.2, 2.5, 0, 0, 0, 4.67, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'tire swing.obj', 'tire swing.mtl', 0.2, 0.2, 0.2, 2.5, 0, 0, 0, 4.67, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 10, 0, 0, 0, 4.7, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 10, 0, 5, 0, 4.7, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 10, 0, -5, 0, 4.7, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, -4, 0, 0, 0, 4.7, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, -4, 0, 5, 0, 4.7, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, -4, 0, -5, 0, 4.7, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 5, 0, 6, 0, 0, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 5, 0, -7.3, 0, 0, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 0, 0, 6, 0, 0, 0, Main.scene);
// new obj('./non-player asset/Park2/', 'o5950.obj', 'o5950.mtl', 1.3, 1, 1.5, 0, 0, -7.3, 0, 0, 0, Main.scene);
// new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 10, 0, 7, 0, 0, 0, Main.scene, 10);
// new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -5, 0, 7, 0, 0, 0, Main.scene, 10);
// new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 10 , 0, -7, 0, 0, 0, Main.scene, 10);
// new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -5, 0, -7, 0, 0, 0, Main.scene, 10);
// new fbx('./non-player asset/grasses/', 'grass_03.fbx', 1.3, 1, 1.5, -4, 0, 5, 0, 4.7, 0, Main.scene);
// var smd = new SMDModel('./non-player asset/Park2/', 'kappa_pond_bg.smd',5,5,5, 2,5,5, 0, 0, 0, Main.scene);

//----------------------------------ARSITEKTUR TAMAN --------------------------------------------------------

var vertices = [];
for (let i = 0; i < 360; i++) {
    var angleInRadians = (i * Math.PI) / 180;
    var newX = 2.8 + Math.cos(angleInRadians) * 20; // X-coordinate remains the same
    var newY = 0; // Rotate around X-axis
    var newZ = 0 + Math.sin(angleInRadians) * 20; // Translate along Z-axis
    vertices.push(newX);
    vertices.push(newY);
    vertices.push(newZ);
}

for (let i = 0; i < 360; i++) {
    if (i % 6 == 0) {
        // new obj('./non-player asset/Park2/', 'tree_obj.obj', 'tree_mtl.mtl', 0.01, 0.02, 0.01, vertices[i*3], vertices[i*3+1]-0.01, vertices[i*3+2], 0, 0, 0, Main.scene);
    }
}
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, 0, 0, 8, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, 0, 0, -8, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, 0, 0, 4, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, 0, 0, -4, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -4, 0, 4, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -4, 0, -4, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -8, 0, 4, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -8, 0, -4, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -8, 0, 8, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -8, 0, -8, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -4, 0, 8, 0, 1.52, 0, Main.scene);
new obj('./non-player asset/Park2/', 'beergarden_bench.obj', 'beergarden_bench.mtl', 0.5, 0.8, 0.7, -4, 0, -8, 0, 1.52, 0, Main.scene);

new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 1, 0, 0, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 3, 0, 7, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, 3, 0, -7, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -7, 0, 11, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -7, 0, -11, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -17, 0, -2, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -17, 0, 2, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -14, 0, -2, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -14, 0, 2, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -11, 0, -2, 0, 0, 0, Main.scene, 20);
new objLamp('./non-player asset/Park2/', 'streetLamp.obj', 'streetLamp.mtl', 0.2, 0.2, 0.2, -11, 0, 2, 0, 0, 0, Main.scene, 20);

var torigate = new darkObj('./non-player asset/Park2/', 'Tori_02.obj', 'Tori_02.mtl', 0.017, 0.005, 0.01, -20, 0, 0, 0, 1.55, 0, Main.scene, 50);
new obj('./non-player asset/Park2/', 'pizza1.obj', 'pizza1.mtl', 1.2, 1.2, 1.2, 0, 0.8, -4.8, 0, 0, 0, Main.scene);

new obj('./non-player asset/Park2/', 'Minion.obj', 'Minion.mtl', 0.5, 0.5, 0.5, 3, 0, 0, 0, 0, 0, Main.scene);

//----------------------------------END OF ARSITEKTUR TAMAN--------------------------------------------------

//Set lampu light


// var vertices = [];
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
//         var bambu =  new fbx('./non-player asset/Park1/Bamboo/', 'BlackBamboo.fbx', 0.03, 0.03, 0.03, vertices[i*3], vertices[i*3+1], vertices[i*3+2], 0, 0, 0, Main.scene);
//     }
// }

const material = new THREE.MeshPhysicalMaterial({
    color: 0x00ff00,     // Warna hijau
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
}
requestAnimationFrame(animate);
