import * as THREE from "three";
import { Player, PlayerController, ThirdPersonCamera } from "./player.js";
import { fbx, obj } from "./environment.js";


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
        const textureGround = loader.load('https://th.bing.com/th/id/R.ad441b2289f3aaf03298e798f7a09b27?rik=Xd75PT25kV3VrQ&riu=http%3a%2f%2fwww.alldesigncreative.com%2fwp-content%2fuploads%2f2014%2f08%2fgreen-grass-texture.jpg&ehk=xB4eNNZFjaE4NRxhSkEOAI6aQR5n4r9UFpmtOciUU0Q%3d&risl=&pid=ImgRaw&r=0');
        textureGround.colorSpace = THREE.SRGBColorSpace
        const geometry = new THREE.PlaneGeometry(100, 100)
        const material = new THREE.MeshBasicMaterial({
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
    if(i%10 == 0){
        var bambu =  new fbx('./non-player asset/Park1/Bamboo/', 'BlackBamboo.fbx', 0.03, 0.03, 0.03, vertices[i*3], vertices[i*3+1], vertices[i*3+2], 0, 0, 0, Main.scene);
    }
}

function animate() {
    Main.render(clock.getDelta());
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
