let scene, camera, renderer, cube, cone, light, cylinder, sphere, torus, speed, speed2;

const objects = [cube, cone, light, cylinder, sphere, torus];

let createCube = function () {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: '#8AC'
    }); // greenish blue
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = 2;
};
speed = 0.1;
speed2 = 0.05;
let createCone = function () {
    const radius = 0.7;
    const height = 1;
    const radialSegments = 30;
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    const material = new THREE.MeshLambertMaterial({
        color: '#8AC'
    });
    cone = new THREE.Mesh(geometry, material);
    scene.add(cone);
    cone.position.x = -4;
}

let createSphere = function () {
    const radius = 0.6;

    const widthSegments = 24;

    const heightSegments = 16;

    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshToonMaterial({
        color: '#8AC'
    });

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphere.position.x = -4;
    sphere.position.y = 3;
}

let createCylinder = function () {
    const radiusTop = 0.5;

    const radiusBottom = 0.5;

    const height = 1;

    const radialSegments = 50;

    const geometry = new THREE.CylinderGeometry(
        radiusTop, radiusBottom, height, radialSegments);
    const material = new THREE.MeshPhongMaterial({
        color: '#8AC',
        wireframe: true,
    });

    cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.position.x = 4;
    cylinder.position.y = 1.5;

}

let createTorus = function () {
    const radius = 0.6;

    const tubeRadius = 0.2;

    const radialSegments = 8;

    const tubularSegments = 24;

    const geometry = new THREE.TorusGeometry(
        radius, tubeRadius,
        radialSegments, tubularSegments);
    const material = new THREE.MeshPhongMaterial({
        color: '#8AC',
        wireframe: true,
    });

    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    torus.position.x = 0;
    torus.position.y = -1.5;
}


// set up the environment - 
// initiallize scene, camera, objects and renderer
let init = function () {
    // 1. create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(000000);

    // 2. create an locate the camera       
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
        1, 1000);
    camera.position.z = 5;



    // 3. create an locate the object on the scene           
    createCube();
    createCone();
    createCylinder();
    createSphere();
    createTorus();

    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(-5, 5, 5);
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    ambient.position.set(0, 10, 0);
    const point = new THREE.PointLight(0xffffff, 1, 100);
    point.position.set(5, 5, 5);
    const hemis = new THREE.HemisphereLight(0xffffff, '#FFFFFF', 0.8);
    hemis.position.set(0, 10, 0);
    const spot = new THREE.SpotLight(0xffffff, 1, 50);
    spot.position.set(0, 5, 5);

    const lights = [dir, ambient, point, hemis, spot];
    lights.forEach((light) => {
        scene.add(light);
    });

    lights.forEach((light) => {
        light.visible = false;
    });
    lights[0].visible = true;

    const drop = document.getElementById('light');
    drop.addEventListener('change', (e) => {
        const selected = e.target.value;
        lights.forEach((light) => {
            light.visible = false;
        });
        lights[selected].visible = true;
    });

    // 4. create the renderer     
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

};



// main animation loop - calls 50-60 in a second.
let mainLoop = function () {

    if (sphere.position.x > 5) {
        speed = speed * -1;
    } else if (sphere.position.x < -5) {
        speed = speed * -1;
    }
    if (torus.position.y > 3) {
        speed2 = speed2 * -1;
    } else if (torus.position.y < -3) {
        speed2 = speed2 * -1;
    }
        cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;
    cone.rotation.z += 0.01;
    cylinder.rotation.x -= 0.01;
    cylinder.rotation.y -= 0.01;
    cylinder.rotation.z -= 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;
    torus.rotation.x -= 0.01;
    torus.rotation.y -= 0.01;
    torus.rotation.z -= 0.01;

    // objects.forEach((obj) => {
    //     obj.rotation.x += 0.01;
    // });
    
    torus.position.y += speed2;

    sphere.position.x += speed;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};
init();
mainLoop();