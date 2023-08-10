import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');
const sizes = {
    width: 600,
    height: 350,
}
const canvas = document.querySelector('.cam-canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(1);

// const camera = new THREE.PerspectiveCamera(80, sizes.width/sizes.height, 0.1, 100);
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 0, 20)
camera.lookAt(0,0, 0)
scene.add(camera) 
// const controls = new OrbitControls(camera, renderer.domElement);

export function start(){
    
    const light = new THREE.AmbientLight(0xffffff,0.0001, 10000 );
    light.position.set(0, 10, 10)
    light.intensity = 1
    scene.add(light)

    const gridHelper = new THREE.GridHelper(60, 60);
    // const gridHelper = new THREE.GridHelper(30);
    gridHelper.material.color.set('#ff0000');
    gridHelper.rotation.x = Math.PI/2;
    scene.add(gridHelper);
    renderer.render(scene, camera);
}


// const geometry = new THREE.SphereGeometry(0.5, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//     color: '#00ff40',
//     roughness: 0.3,
// })
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)
function clearScene(){
    while (scene.children.length > 0){
        const child = scene.children[0];
        scene.remove(child);
    }
}

export function camRenderDots(arr){
    clearScene();
    start();
    const points = [];
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff40,
        linewidth: 10,
    })
    // arr.length is 8 for here, 4 points
    for (let i = 0; i < arr.length - 1; i += 2){
        const dotGeometry = new THREE.SphereGeometry(0.25, 64, 64)
        const dotMaterial = new THREE.MeshStandardMaterial({
            color: '#00ff40',
            roughness: 0.3,
        })
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(arr[i], arr[i+1], 0);
        scene.add(dot);
    }
    // between 1st and 2nd points
    points.push(new THREE.Vector2(arr[0], arr[1]));
    points.push(new THREE.Vector2(arr[2], arr[3]));
    // between 2nd and 3rd points
    points.push(new THREE.Vector2(arr[2], arr[3]));
    points.push(new THREE.Vector2(arr[4], arr[5]));
    // between 3rd and 4th points
    points.push(new THREE.Vector2(arr[4], arr[5]));
    points.push(new THREE.Vector2(arr[6], arr[7]));
    // between 4th and 1st points
    points.push(new THREE.Vector2(arr[6], arr[7]));
    points.push(new THREE.Vector2(arr[0], arr[1]));

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh)
    renderer.render(scene, camera);
}