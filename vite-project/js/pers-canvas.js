import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');
const sizes = {
    width: 600,
    height: 350,
}

const geometry = new THREE.SphereGeometry(0.5, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: '#00ff40',
    roughness: 0.3,
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 20, 0)
camera.lookAt(0,0, 0)
scene.add(camera)

const light = new THREE.AmbientLight(0xffffff,1, 100 );
light.position.set(0, 10, 10)
light.intensity = 1
scene.add(light)

const gridHelper = new THREE.GridHelper(30);
gridHelper.material.color.set('#ff0000');
scene.add(gridHelper);

const canvas = document.querySelector('.pers-canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(1);
renderer.render(scene, camera);

export function persRenderDots(arr){
    for (let i = 0; i < arr.length - 1; i += 2){
        const dotGeometry = new THREE.SphereGeometry(0.5, 64, 64)
        const dotMaterial = new THREE.MeshStandardMaterial({
            color: '#00ff40',
            roughness: 0.3,
        })
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(arr[i], arr[i+1], 0);
        scene.add(dot);
    }
    renderer.render(scene, camera);
}