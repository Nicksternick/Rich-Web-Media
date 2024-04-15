import * as THREE from 'three';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, 
window.innerWidth /window.innerHeight, 0.1, 1000);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
// Set it's size
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material)
scene.add(cube);

camera.position.z = 5;

// Append the renderer to the document
document.body.appendChild(renderer.domElement);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();