import * as THREE from 'three';

export const persPoint1 = document.getElementById('pers-point1').getElementsByTagName('span');
export const persPoint2 = document.getElementById('pers-point2').getElementsByTagName('span');
export const persPoint3 = document.getElementById('pers-point3').getElementsByTagName('span');
export const persPoint4 = document.getElementById('pers-point4').getElementsByTagName('span');

export const persZ1 = document.getElementById('pers-coefficient1')
export const persZ2 = document.getElementById('pers-coefficient2')
export const persZ3 = document.getElementById('pers-coefficient3')
export const persZ4 = document.getElementById('pers-coefficient4')

const scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');
const sizes = {
    width: 600,
    height: 350,
}

// const geometry = new THREE.SphereGeometry(0.5, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//     color: '#00ff40',
//     roughness: 0.3,
// })
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 0, 20)
camera.lookAt(0,0, 0)
scene.add(camera)

const canvas = document.querySelector('.pers-canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(1);

export function start(){
    const light = new THREE.AmbientLight(0xffffff,1, 100 );
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

function clearScene(){
    while (scene.children.length > 0){
        const child = scene.children[0];
        scene.remove(child);
    }
}


export function persRenderDots(){
    clearScene();
    start();
    const points = [];
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff40,
        linewidth: 10,
    })
    const arr = [persPoint1[0].innerHTML, persPoint1[1].innerHTML, 
                 persPoint2[0].innerHTML, persPoint2[1].innerHTML, 
                 persPoint3[0].innerHTML, persPoint3[1].innerHTML, 
                 persPoint4[0].innerHTML, persPoint4[1].innerHTML, ]
    const dotGeometry = new THREE.SphereGeometry(0.25, 64, 64)
    const dotMaterial1 = new THREE.MeshStandardMaterial({
        color: '#ff00a2',
        roughness: 0.3,
    })
    const dotMaterial2 = new THREE.MeshStandardMaterial({
        color: '#ffaa00',
        roughness: 0.3,
    })
    const dotMaterial3 = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
    const dotMaterial4 = new THREE.MeshStandardMaterial({
        color: '#0000ff',
        roughness: 0.3,
    })
    const dot1 = new THREE.Mesh(dotGeometry, dotMaterial1)
    const dot2 = new THREE.Mesh(dotGeometry, dotMaterial2);
    const dot3 = new THREE.Mesh(dotGeometry, dotMaterial3);
    const dot4 = new THREE.Mesh(dotGeometry, dotMaterial4);
    dot1.position.set(arr[0], arr[1], 0);
    dot2.position.set(arr[2], arr[3], 0);
    dot3.position.set(arr[4], arr[5], 0);
    dot4.position.set(arr[6], arr[7], 0);
    scene.add(dot1);
    scene.add(dot2);
    scene.add(dot3);
    scene.add(dot4);
    // arr.length is 8 for here, 4 points
    // for (let i = 0; i < arr.length - 1; i += 2){
    //     const dotGeometry = new THREE.SphereGeometry(0.25, 64, 64)
    //     const dotMaterial = new THREE.MeshStandardMaterial({
    //         color: '#00ff40',
    //         roughness: 0.3,
    //     })
    //     const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    //     dot.position.set(arr[i], arr[i+1], 0);
    //     scene.add(dot);
    // }
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
// export const animate = () =>{
//     // requestAnimationFrame(animate);
//     clearScene();
//     start();
//     const points = [];
//     const lineMaterial = new THREE.LineBasicMaterial({
//         color: 0x00ff40,
//         linewidth: 200,
//     })
//     const arr = [persPoint1[0].innerHTML, persPoint1[1].innerHTML, 
//                  persPoint2[0].innerHTML, persPoint2[1].innerHTML, 
//                  persPoint3[0].innerHTML, persPoint3[1].innerHTML, 
//                  persPoint4[0].innerHTML, persPoint4[1].innerHTML, ]
//     const dotGeometry = new THREE.SphereGeometry(0.05, 64, 64)
//     const dotMaterial1 = new THREE.MeshStandardMaterial({
//         color: '#ff00a2',
//         roughness: 0.3,
//     })
//     const dotMaterial2 = new THREE.MeshStandardMaterial({
//         color: '#ffaa00',
//         roughness: 0.3,
//     })
//     const dotMaterial3 = new THREE.MeshStandardMaterial({
//         color: '#00ff40',
//         roughness: 0.3,
//     })
//     const dotMaterial4 = new THREE.MeshStandardMaterial({
//         color: '#0000ff',
//         roughness: 0.3,
//     })
//     const dot1 = new THREE.Mesh(dotGeometry, dotMaterial1)
//     const dot2 = new THREE.Mesh(dotGeometry, dotMaterial2);
//     const dot3 = new THREE.Mesh(dotGeometry, dotMaterial3);
//     const dot4 = new THREE.Mesh(dotGeometry, dotMaterial4);
//     dot1.position.set(arr[0], arr[1], 0);
//     dot2.position.set(arr[2], arr[3], 0);
//     dot3.position.set(arr[4], arr[5], 0);
//     dot4.position.set(arr[6], arr[7], 0);
//     scene.add(dot1);
//     scene.add(dot2);
//     scene.add(dot3);
//     scene.add(dot4);
//     // the larger perZn.innerHTML, the closer the point is to the camera
//     const distanceToCamera1 = persZ1.innerHTML - camera.position.z;
//     console.log(persZ1.innerHTML)
//     const distanceToCamera2 = persZ2.innerHTML - camera.position.z;
//     const distanceToCamera3 = persZ3.innerHTML - camera.position.z;
//     const distanceToCamera4 = persZ4.innerHTML - camera.position.z;
//     console.log(persZ2.innerHTML)
//     console.log(persZ3.innerHTML)
//     console.log(persZ4.innerHTML)
//     dot1.scale.set(1 + distanceToCamera1 * 0.3, 1 + distanceToCamera1 * 0.3, 1)
//     dot2.scale.set(1 + distanceToCamera2 * 0.3, 1 + distanceToCamera2 * 0.3, 1)
//     dot3.scale.set(1 + distanceToCamera3 * 0.3, 1 + distanceToCamera3 * 0.3, 1)
//     dot4.scale.set(1 + distanceToCamera4 * 0.3, 1 + distanceToCamera4 * 0.3, 1)

//     // between 1st and 2nd points
//     points.push(new THREE.Vector2(arr[0], arr[1]));
//     points.push(new THREE.Vector2(arr[2], arr[3]));
//     // between 2nd and 3rd points
//     points.push(new THREE.Vector2(arr[2], arr[3]));
//     points.push(new THREE.Vector2(arr[4], arr[5]));
//     // between 3rd and 4th points
//     points.push(new THREE.Vector2(arr[4], arr[5]));
//     points.push(new THREE.Vector2(arr[6], arr[7]));
//     // between 4th and 1st points
//     points.push(new THREE.Vector2(arr[6], arr[7]));
//     points.push(new THREE.Vector2(arr[0], arr[1]));

//     const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//     const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
//     scene.add(lineMesh)

//     renderer.render(scene, camera);
// }