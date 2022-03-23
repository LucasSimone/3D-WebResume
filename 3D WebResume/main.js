import './style.css'

import * as THREE from 'three';

//Imports that are not needed
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//The controls for orbiting the center
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.update();
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'



//The main scene that holds all objects and camera
const scene = new THREE.Scene();

//The camera what the user sees in the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);

//Tells renderer where to render
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas-background'),
});

//Set the pixel ratio and size to the screen ratio and size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Move camera along the z so its not in the center of the scene
camera.position.setZ(3.2);


//Add the torusKnot in the center of the scene
const torusGeo = new THREE.TorusKnotGeometry( 1, 0.25, 250, 7, 2 ,3 );
const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xF8F8FF, wireframe:true } );
let torusKnot = new THREE.Mesh( torusGeo, torusMaterial );
scene.add( torusKnot );


//Center sphere that cards are added to when we scroll we rotate this sphere and cards move with it
const centreGeo = new THREE.SphereGeometry( 0, 32, 16 );
const centreMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
const centrePoint = new THREE.Mesh( centreGeo, centreMaterial );

//center Ring that the sphere is added to we also rotate this to give to cool effect and not just rotating horizontally
const ringGeo = new THREE.RingGeometry( 0, 0, 0 );
const rinngMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
const ringPoint = new THREE.Mesh( ringGeo, rinngMaterial );
ringPoint.rotation.y = 1.5708;
ringPoint.add(centrePoint);
scene.add( ringPoint );

//These are the images for the cards that display the reaume information
const aboutImg = new THREE.TextureLoader().load('assests/About.png');
const aboutText = new THREE.MeshBasicMaterial({ map: aboutImg,  side: THREE.DoubleSide});

const skillImg = new THREE.TextureLoader().load('assests/Skills.png');
const skillText = new THREE.MeshBasicMaterial({ map: skillImg,  side: THREE.DoubleSide});

const expImg = new THREE.TextureLoader().load('assests/Experience.png');
const expText = new THREE.MeshBasicMaterial({ map: expImg,  side: THREE.DoubleSide});

const proImg = new THREE.TextureLoader().load('assests/Projects.png');
const proText = new THREE.MeshBasicMaterial({ map: proImg,  side: THREE.DoubleSide});

// The actual cards
var card1 = makeCard(1.65,0,2,0,Math.PI,skillText);
var card2 = makeCard(1.65,0,-2,Math.PI,Math.PI,proText);
var card3 = makeCard(1.65,2,0,1.5708,0,expText);
var card4 = makeCard(1.65,-2,0,-1.5708,0,aboutText);


//This is the picture of me for the cylinder texture
const meImg = new THREE.TextureLoader().load('assests/squareMe.jpg');
const meTexture = new THREE.MeshBasicMaterial({ map: meImg,  side: THREE.DoubleSide});
//This is the cylinder that gets added to the card
const cylGeo = new THREE.CylinderGeometry( 0.25, 0.25, 0.01, 100 );
const cylinder = new THREE.Mesh( cylGeo, meTexture );
cylinder.position.z = 0;
cylinder.position.y = 0.5;
cylinder.position.x = 0.5;
cylinder.rotation.x = 1.5708;
cylinder.rotation.y = 1.5708;
card4.add( cylinder );


//Function for making cards to reduce code
function makeCard(size, positionX, positionZ, rotationY, rotationZ, cardMat){

    const cardGeo = new THREE.PlaneGeometry( size, size );
    //const cardMat = new THREE.MeshBasicMaterial( {color: 0xDCDCDC, side: THREE.DoubleSide} );
    const card = new THREE.Mesh( cardGeo, cardMat );
    card.position.x = positionX;
    card.position.z = positionZ;
    card.rotation.y = rotationY;
    card.rotation.z = rotationZ;
    centrePoint.add( card );

    return card;
}


//This is the code for loading a model into the scene if i need it later
/*
    var model;
    const loader = new GLTFLoader()
    loader.load(
        'commodore_pet_2001/scene.gltf',
        function (gltf) {
            gltf.scene.traverse(function (child) {

            })
            model = gltf;
            scene.add(model.scene)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )



//These are lights that are used to illuminate models
// const light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
// light.position.set( 0, 50, 0 );
// scene.add( light );
//
// const ambLight = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
// scene.add( ambLight );

*/


//This loads the galaxy video and sets it as the scene background
const video = document.querySelector('#video');
const texture = new THREE.VideoTexture( video );
scene.background = texture;

//This is a function that makes crappy 3d tries from when i was playing around with THREE
/*
function makeTree(){

    //make random x and z
    var x = Math.floor(Math.random()*160) + 15;
    x *= Math.round(Math.random()) ? 1 : -1;

    var z = Math.floor(Math.random()*160) + 15;
    z *= Math.round(Math.random()) ? 1 : -1;

    const cylinderGeometry= new THREE.CylinderGeometry( 0.5, 1, 8, 10, 10 );
    const cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0xffa500, wireframe: true} );
    const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.position.setY(4);
    cylinder.position.setX(x);
    cylinder.position.setZ(z);
    scene.add( cylinder );

    const dodeGeometry= new THREE.DodecahedronGeometry( 3.5 , 1);
    const dodeMaterial = new THREE.MeshBasicMaterial( {color: 0x9acd32, wireframe: true} );
    const dode = new THREE.Mesh( dodeGeometry, dodeMaterial );
    dode.position.setY(9);
    dode.position.setX(x);
    dode.position.setZ(z);
    scene.add( dode );
}

*/

//This is the event listener for when the mousewheel is scrolled
window.addEventListener('wheel', function(event)
{
    if (event.deltaY < 0){

        //Rotates the sphere and ring 180/12 for every mouse wheel scroll
        ringPoint.rotation.z -= (Math.PI) / 12;
        centrePoint.rotation.y -= (Math.PI / 2) / 12;

        if(ringPoint.rotation.z == Math.PI * -1){
            scene.remove(torusKnot);
            const torusGeoNew = new THREE.TorusKnotGeometry( 1, 0.25, 250, 7, 2, 3 );
            torusKnot = new THREE.Mesh( torusGeoNew, torusMaterial );
            scene.add(torusKnot);
        }

        //cool rotation on diagonal
        //ringPoint.rotation.y -= (Math.PI / 2) / 12;
    }
    else if (event.deltaY > 0){

        //Rotates the sphere and ring 180/12 for every mouse wheel scroll
        ringPoint.rotation.z += (Math.PI) / 12;
        centrePoint.rotation.y += (Math.PI / 2) / 12;
        //cool rotation on diagonal
        //ringPoint.rotation.y += (Math.PI / 2) / 12;
    }
});


//Reload the page when window is resized to make sure things have the right dimensions
window.onresize = onWindowResize;
function onWindowResize() {

    window.location.href = window.location.href;
    // camera.aspect = window.innerWidth / window.innerHeight;
    //
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);

}


//This moves the camera depending on the mouse postion to give the cards more life
let mouseX = 0;
let mouseY = 0;
//Get the mouse position everytime the mouse is moved
document.addEventListener('mousemove', e => {
    mouseX = ( event.clientX - window.innerWidth / 2 ) / 2;
    mouseY = ( event.clientY - window.innerHeight / 2 ) / 2;
});


//The render function to move camera and show updates on screen
function render() {

    //Check if the camera hasnt reached movement limit
    if(camera.position.x < 0.05 && camera.position.x > -0.05){
        let adj = ( mouseX - camera.position.x ) * .000005;
        //check to see if next camera adjutment will put it over the movement limit
        if(camera.position.x + adj > -0.05 && camera.position.x + adj < 0.05){
	           camera.position.x += ( mouseX - camera.position.x ) * .000003;}}
    //Check if the camera hasnt reached movement limit
    if(camera.position.y < 0.05 && camera.position.y > -0.05){
        let adj = ( - mouseY - camera.position.y ) * .000005;
        //check to see if next camera adjutment will put it over the movement limit
        if(camera.position.y + adj > -0.05 && camera.position.y + adj < 0.05){
	           camera.position.y += ( - mouseY - camera.position.y ) * .000003;}}

    //Have camera look at scene from now position
	camera.lookAt( scene.position );
    //render the update
	renderer.render( scene, camera );
}

//Animate function
animate();
function animate() {
    requestAnimationFrame( animate );

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.005;
    torusKnot.rotation.z += 0.001;

    render();
    //renderer.render( scene, camera );
}
