import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FrontSide, Material, PointLight } from 'three'
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js"
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//loaders
const textureloader = new THREE.TextureLoader()
const fontloader = new FontLoader()
//texture






/**
 * Lights
 */


/**
 * Materials
 */
 const pointsMaterial=new THREE.PointsMaterial({size:0.01,
    sizeAttenuation:true,
    color: "rgb(80, 180, 147)"
    })


/**
 * Objects
 */

const pointsGeometry=new THREE.BufferGeometry()
const count=8000;
const pointsPositions= new Float32Array(count*3)
for (let i=0;i<count*3;i++){
    pointsPositions[i]=(Math.random()-0.5)*15
}
const mat= new THREE.PointsMaterial({size:0.005})
pointsGeometry.setAttribute('position',new THREE.BufferAttribute(pointsPositions, 3))
const points=new THREE.Points(pointsGeometry,pointsMaterial)
scene.add(points)


// const dounat=new THREE.Points(
//     new THREE.TorusBufferGeometry( 0.7, 0.2 , 16, 100),
//     pointsMaterial
// )
// scene.add(dounat)
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
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#191A20')

/**
 * Animate
 */
 let mouseX=0;
 let mouseY=0;
document.addEventListener('mousemove',(event)=>{
   
mouseX=event.clientX
mouseY=event.clientY
})
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

//dounat
// dounat.rotation.y=elapsedTime   
points.rotation.y=elapsedTime*0.1

if (mouseX>0)
{
points.position.x=(mouseX-mouseX*0.000008*elapsedTime)*0.00009
points.position.y=-(mouseY-mouseY*0.000008*elapsedTime)*0.00009
}




    
    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()