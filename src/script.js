import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import ThreeGlobe from 'three-globe';
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('assets/img/map.jpg')
const cross = textureLoader.load('assets/img/cross.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.75, 64, 64)
const particlesGeometry = new THREE.BufferGeometry
const particlesCnt = 3000

const posArray = new Float32Array(particlesCnt * 3)

for(let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
//material.roughness = 0.2
material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: cross,
    transparent: true
})

// Mesh
const sphere = new THREE.Mesh(geometry, material)
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(sphere, particlesMesh)

// Lights

//Light 1

const pointLight = new THREE.PointLight(0xffa935, 1)
pointLight.position.x = 2.75
pointLight.position.y = 1.5
pointLight.position.z = 3
pointLight.intensity = 7
scene.add(pointLight)

// const light = gui.addFolder('Light')

// light.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
// light.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
// light.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
// light.add(pointLight, 'intensity').min(0).max(10).step(0.01)

// const lightColor = {
//     color: 0xff0000
// }

// light.addColor(lightColor, 'color')
//     .onChange(() => {
//         pointLight.color.set(lightColor.color)
//     })

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

//Light 2

// const pointLight2 = new THREE.PointLight(0xff0000, 2)
// pointLight2.position.set(-1.1, 0.47, 0.5)
// pointLight2.intensity = 4.9

// scene.add(pointLight2)

// const light1 = gui.addFolder('Light 1')

// light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

//Light 3

// const pointLight3 = new THREE.PointLight(0x147ca7, 2)
// pointLight3.position.set(0.67, -0.72, 0.5)
// pointLight3.intensity = 5

// scene.add(pointLight3)

// const light2 = gui.addFolder('Light 2')

// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// const light2Color = {
//     color: 0xff0000
// }

// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color)
//     })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// document.addEventListener('mousemove', onDocumentMouseMove)

// let mouseX = 0
// let mouseY = 0

// let targetX = 0
// let targetY = 0

// const windowHalfX = window.innerWidth / 2
// const windowHalfy = window.innerHeight / 2

// function onDocumentMouseMove(event) {
//     mouseX = (event.clientX - windowHalfX)
//     mouseY = (event.clientY - windowHalfy)
// }

const clock = new THREE.Clock()

const tick = () =>
{
    // targetX = mouseX * .001
    // targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .2 * elapsedTime

    // sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    // sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    //sphere.position.z += -.01 * (targetY - sphere.rotation.x)

    particlesMesh.rotation.y = -.1 * elapsedTime

    // if (mouseX !== 0) {
    //     particlesMesh.rotation.x = mouseY * 0.00008
    //     particlesMesh.rotation.y = mouseX * 0.00008
    // }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()