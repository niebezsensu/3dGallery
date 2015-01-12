if (THREE === undefined) {
	var THREE = {};
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 12;
camera.position.x = 0;
camera.position.y = 3.5;

camera1.position.z = 20;
camera1.position.x = 0;


const DIF = 0.02;
const WI = 2.5;
const HI = 2.2;

var map1 = THREE.ImageUtils.loadTexture('img/1.jpg');
var map2 = THREE.ImageUtils.loadTexture('img/2.jpg');
var map3 = THREE.ImageUtils.loadTexture('img/3.jpg');
var map4 = THREE.ImageUtils.loadTexture('img/4.jpg');
var map5 = THREE.ImageUtils.loadTexture('img/5.jpg');
var map6 = THREE.ImageUtils.loadTexture('img/6.jpg');
var map7 = THREE.ImageUtils.loadTexture('img/7.jpg');
var map8 = THREE.ImageUtils.loadTexture('img/8.jpg');
var map9 = THREE.ImageUtils.loadTexture('img/9.jpg');

var img1 = new THREE.MeshBasicMaterial({
	map: map1,
	needsUpdate: true
});
var img2 = new THREE.MeshBasicMaterial({
	map: map2,
	needsUpdate: true
});
var img3 = new THREE.MeshBasicMaterial({
	map: map3,
	needsUpdate: true
});
var img4 = new THREE.MeshBasicMaterial({
	map: map4,
	needsUpdate: true
});
var img5 = new THREE.MeshBasicMaterial({
	map: map5,
	needsUpdate: true
});
var img6 = new THREE.MeshBasicMaterial({
	map: map6,
	needsUpdate: true
});
var img7 = new THREE.MeshBasicMaterial({
	map: map7,
	needsUpdate: true
});
var img8 = new THREE.MeshBasicMaterial({
	map: map8,
	needsUpdate: true
});
var img9 = new THREE.MeshBasicMaterial({
	map: map9,
	needsUpdate: true
});

var plane1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img1);
var plane2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img2);
var plane3 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img3);
var plane4 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img4);
var plane5 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img5);
var plane6 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img6);
var plane7 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img7);
var plane8 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img8);
var plane9 = new THREE.Mesh(new THREE.PlaneBufferGeometry(WI, HI), img9);

plane1.position.x = 6;
plane1.position.z = 0;
plane1.userData = {
	z: plane1.position.z,
	x: plane1.position.x
}

plane2.position.x = 4.566;
plane2.position.z = 3.892;
plane2.userData = {
	z: plane2.position.z,
	x: plane2.position.x
}

plane3.position.x = 0.948;
plane3.position.z = 5.924;
plane3.userData = {
	z: plane3.position.z,
	x: plane3.position.x
}

plane4.position.x = -3.122;
plane4.position.z = 5.124;
plane4.userData = {
	z: plane4.position.z,
	x: plane4.position.x
}

plane5.position.x = -5.700;
plane5.position.z = 1.872;
plane5.userData = {
	z: plane5.position.z,
	x: plane5.position.x
}

plane6.position.x = -5.552;
plane6.position.z = -2.274;
plane6.userData = {
	z: plane6.position.z,
	x: plane6.position.x
}

plane7.position.x = -2.750;
plane7.position.z = -5.332;
plane7.userData = {
	z: plane7.position.z,
	x: plane7.position.x
}

plane8.position.x = 1.368;
plane8.position.z = -5.842;
plane8.userData = {
	z: plane8.position.z,
	x: plane8.position.x
}

plane9.position.x = 4.830;
plane9.position.z = -3.558;
plane9.userData = {
	z: plane9.position.z,
	x: plane9.position.x
}

scene.add(plane1);
scene.add(plane2);
scene.add(plane3);
scene.add(plane4);
scene.add(plane5);
scene.add(plane6);
scene.add(plane7);
scene.add(plane8);
scene.add(plane9);

var planes = new THREE.Object3D();

planes.add(plane1);
planes.add(plane2);
planes.add(plane3);
planes.add(plane4);
planes.add(plane5);
planes.add(plane6);
planes.add(plane7);
planes.add(plane8);
planes.add(plane9);
scene.add(planes);


scene.fog = new THREE.FogExp2(0x111111, 0.05);

const SPEED0 = window.innerWidth / 2;

var mouse = {
	x: 0
};

document.addEventListener('mousemove', function(e) {
	mouse.x = e.clientX || e.pageX;
}, false);

var raf;
var clickedOnce = false;
var clickedTwice = false;
var moveCatToCenter = false;
var moveCatBack = false;

var caf;
var projector = new THREE.Projector();
var mouseVector = new THREE.Vector3();
var cat1;
var stage = 0;
var rotationTemp = 1;
var containerWidth = renderer.domElement.clientWidth;
var containerHeight = renderer.domElement.clientHeight;
var intersects;


var vector = new THREE.Vector3();
		var raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();
renderer.domElement.addEventListener('click', function(e) {

	if (stage === 0) {
		rotationTemp = 0;
		stage = 1;
	}	else if (stage === 1) {
		

		vector.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0.5); // z = 0.5 important!

		vector.unproject(camera);

		raycaster.set(camera.position, vector.sub(camera.position).normalize());
		intersects = raycaster.intersectObjects(planes.children, true);

console.log(intersects);
console.log(planes.children);

		moveCatToCenter = true;
		cat1 = intersects[0].object;
		
		stage = 2;
	} else if (stage === 2) {
		moveCatBack = true;
		stage = 3;
	} else if (stage === 3) {
		stage = 0;
		rotationTemp = 1;
	}
	return;


	//	mouseVector.x = 2 * (e.clientX / containerWidth) - 1;
	// mouseVector.y = 1 - 2 * (e.clientY / containerHeight);




}, false);

var speed = 0;

function animateScene() {


	var speed = (mouse.x - SPEED0) * 0.00005 * rotationTemp;
	if (!clickedOnce) {
		camera.lookAt(scene.position);


		planes.rotation.y += speed;

		plane1.rotation.y -= speed;
		plane2.rotation.y -= speed;
		plane3.rotation.y -= speed;
		plane4.rotation.y -= speed;
		plane5.rotation.y -= speed;
		plane6.rotation.y -= speed;
		plane7.rotation.y -= speed;
		plane8.rotation.y -= speed;
		plane9.rotation.y -= speed;
	}
}


var catSize = 0;



var catAnimation = function(givenCat) {
	// givenCat.translate
	 console.log(givenCat.position.x);
	 console.log(plane1);
	// console.log(givenCat.position.z);
	givenCat.scale.x += 0.05;
	givenCat.scale.y += 0.05;

	if (givenCat.position.x > 0) {
		givenCat.position.x -= 0.1;
		// givenCat.position.set(0, 0, 0);
		
	}
	
	//intersects[0].object.position.x -= 0.1;
	if (givenCat.position.z > 0) {
		givenCat.position.z -= 0.1;
		
	}
//givenCat.matrixWorldNeedsUpdate = true;
	if (givenCat.position.x <= 0 && givenCat.position.z <= 0) {
		return false;
	}
	return true;
}

var catBackAnimation = function(givenCat) {
	givenCat.scale.x = 1;
	givenCat.scale.y = 1;
	givenCat.position.x = givenCat.userData.x;
	givenCat.position.z = givenCat.userData.z;
	return false;
}

var render = function() {
	raf = requestAnimationFrame(render);

	animateScene();


	if (moveCatToCenter) {
		// console.log('qwe')
	//	moveCatToCenter = catAnimation(cat1.object);
	 moveCatToCenter = catAnimation(cat1);
	} else if (moveCatBack) {
	//	moveCatBack = catBackAnimation(cat1.object);
		moveCatBack = catBackAnimation(cat1);
	}



	renderer.render(scene, camera);

};

render();