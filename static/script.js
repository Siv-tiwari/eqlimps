import { GLTFLoader } from './GLTFLoader.js';
import { OrbitControls } from './OrbitControls.js';
import { CSS3DRenderer } from './CSS3DRenderer.js';
import { CSS3DObject } from './CSS3DRenderer.js';

let scene, camera, renderer, hlight, modle, directional_light, light, light2, light3, light4, controls, canvas;
canvas = document.getElementById('scene');


// laoding manager and handling the progress bar
const loadingManager = new THREE.LoadingManager();
const progress_bar = document.getElementById('progress-bar');
const progress_bar_container = document.querySelector('.progress_bar-container');

loadingManager.onStart = function (url, item, total) {      // call when loading process is started
    console.log('started loading');
}

loadingManager.onProgress = function (url, loaded, total) {   // return the loading progress of our scene
    console.log('on progress');
    progress_bar.value = (loaded / total) * 100;        // calculating the percentage of the loading file and putting it as a value of our progress bar
}

loadingManager.onLoad = function () {         // call when loading process is finished
    console.log('loading finished');
    progress_bar_container.style.display = 'none';      // removing our progress bar after the scene loaded
}



function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Camera
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000);
    var angle = 168;
    var radius = 500;
    // camera.rotation.y = 45/180* Math.PI;
    // camera.position.x = 200;
    // camera.position.y = 100;
    // camera.position.z = 1000;

    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.position.y = 100;
    camera.setFocalLength(2000);



    // lightning
    hlight = new THREE.AmbientLight(0x404040, 100);
    scene.add(hlight);

    // directional_light = new THREE.DirectionalLight(0xffffff,10);
    // directional_light.position.set(0,1,0);
    // directional_light.castShadow = true;
    // scene.add(directional_light);

    // light = new THREE.PointLight(0xc4c4c4,10);
    // light.position.set(0,300,500);
    // scene.add(light);

    // light2 = new THREE.PointLight(0xc4c4c4,10);
    // light2.position.set(500,100,0);
    // scene.add(light2);

    // light3 = new THREE.PointLight(0xc4c4c4,10);
    // light3.position.set(0,100,-500);
    // scene.add(light3);

    // light4 = new THREE.PointLight(0xc4c4c4,10);
    // light4.position.set(-500,300,0);
    // scene.add(light4);


    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth , window.innerHeight);
    canvas.appendChild(renderer.domElement);


    // control
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.update();

    // button_control
    let btn = document.getElementById('interact_button');
    let img = document.getElementById('interact_image');
    let heading = document.getElementById('interact_heading');
    btn.addEventListener("click", function () {
        if (controls.enabled == true) {
            controls.enabled = false;
            img.src = "assets/interact.png";
            heading.textContent = "Click to Interact"
        }
        else {
            controls.enabled = true;
            img.src = "assets/cross.png";
            heading.textContent = "Click to Dismiss"
        }
    });

    // const canvas = renderer.domElement;
    // const width = canvas.clientWidth;
    // const height = canvas.clientHeight;
    // const cards = document.querySelector('.cards');
    // cards.style.width = width;



    // loading model to the canvas
    let loader = new GLTFLoader(loadingManager);
    loader.load('../glb_file/scene.glb', function (gltf) {
        modle = gltf.scene.children[0];
        // car.rotation.set(2,3,0.1)
        modle.position.x = -3.5;
        modle.position.y = 0.01
        modle.scale.set(0.5, 0.5, 0.5);
        scene.add(gltf.scene);
        animate();
    });
}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();

let cards, navbar, models, footer, canvas_aspect, width, height;
// changing camera aspect and renderer size when the window resize  
window.addEventListener('resize', function () {
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth , this.window.innerHeight);

    // getting canvas updated width and height
    canvas_aspect = renderer.domElement;
    width = canvas_aspect.clientWidth;
    height = canvas_aspect.clientHeight;

    // updating sections widht and height accroding to the cavnas
    cards = document.querySelector('.cards');
    navbar = document.querySelector('.navbar');
    models = document.querySelector('.models_section');
    footer = document.querySelector('.footer_div');

    cards.style.width = width + "px";
    navbar.style.width = width + "px";
    models.style.width = width + "px";
    footer.style.width = width + "px";
});
