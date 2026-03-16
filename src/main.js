import './index.css';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Check if running in browser
if (typeof window !== 'undefined') {
  initLivePhysicsEngine();
}

function initLivePhysicsEngine() {
  // --- 1. SETUP THREE.JS SCENE ---
  const canvas = document.createElement('canvas');
  canvas.id = 'physics-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1'; 
  canvas.style.pointerEvents = 'none'; 
  document.body.prepend(canvas);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x120a07, 0.02);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 15, 20); 

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xec5b13, 1.5); // Primary brand color
  dirLight.position.set(20, 40, 20);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 100;
  dirLight.shadow.camera.left = -30;
  dirLight.shadow.camera.right = 30;
  dirLight.shadow.camera.top = 30;
  dirLight.shadow.camera.bottom = -30;
  scene.add(dirLight);
  
  const fillLight = new THREE.DirectionalLight(0xbc00ff, 0.8); // Purple neon fill
  fillLight.position.set(-20, 20, -20);
  scene.add(fillLight);

  // --- 2. SETUP CANNON.JS PHYSICS ---
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0); // Earth gravity
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.solver.iterations = 10;

  // Contact Materials
  const defaultMaterial = new CANNON.Material('default');
  const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.3,
      restitution: 0.3
    }
  );
  world.addContactMaterial(defaultContactMaterial);

  // --- 3. SCENE OBJECTS ---
  const objectsToUpdate = [];

  // Floor Physics & Visual
  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body({ mass: 0, material: defaultMaterial });
  floorBody.addShape(floorShape);
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.addBody(floorBody);

  const floorGeometry = new THREE.PlaneGeometry(200, 200);
  const floorMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, 
    metalness: 0.8, 
    roughness: 0.4,
    transparent: true,
    opacity: 0.8 // Let grid show through
  });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  // --- 4. THE VEHICLE ---
  const carChassisMass = 150;
  const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
  const chassisBody = new CANNON.Body({ mass: carChassisMass, material: defaultMaterial });
  chassisBody.addShape(chassisShape);
  chassisBody.position.set(0, 4, 0);
  
  // Visual Chassis
  const chassisGeo = new THREE.BoxGeometry(2, 1, 4);
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0xec5b13, metalness: 0.3, roughness: 0.2 });
  const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
  chassisMesh.castShadow = true;
  scene.add(chassisMesh);
  
  objectsToUpdate.push({ mesh: chassisMesh, body: chassisBody });

  const vehicle = new CANNON.RaycastVehicle({
    chassisBody: chassisBody,
    indexRightAxis: 0,
    indexUpAxis: 1,
    indexForwardAxis: 2
  });

  const wheelOptions = {
    radius: 0.5,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    axleLocal: new CANNON.Vec3(-1, 0, 0),
    chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true
  };

  // Add Wheels layout (front-left, front-right, back-left, back-right)
  wheelOptions.chassisConnectionPointLocal.set(1, 0, -1.2);
  vehicle.addWheel(wheelOptions);
  wheelOptions.chassisConnectionPointLocal.set(-1, 0, -1.2);
  vehicle.addWheel(wheelOptions);
  wheelOptions.chassisConnectionPointLocal.set(1, 0, 1.2);
  vehicle.addWheel(wheelOptions);
  wheelOptions.chassisConnectionPointLocal.set(-1, 0, 1.2);
  vehicle.addWheel(wheelOptions);
  
  vehicle.addToWorld(world);

  // Wheel Visuals
  const wheelBodies = [];
  const wheelVisuals = [];
  const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 20);
  wheelGeo.rotateZ(Math.PI / 2);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.1, roughness: 0.8 });

  for (let i = 0; i < vehicle.wheelInfos.length; i++) {
    const wheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
    wheelMesh.castShadow = true;
    scene.add(wheelMesh);
    wheelVisuals.push(wheelMesh);
  }

  // Update wheel visuals synchronously with Physics
  world.addEventListener('postStep', function () {
    for (let i = 0; i < vehicle.wheelInfos.length; i++) {
      vehicle.updateWheelTransform(i);
      const t = vehicle.wheelInfos[i].worldTransform;
      wheelVisuals[i].position.copy(t.position);
      wheelVisuals[i].quaternion.copy(t.quaternion);
    }
  });


  // --- 5. ADDTIONAL PHYSICS OBJECTS (Obstacles to hit) ---
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x00f2ff }), // Neon blue
    new THREE.MeshStandardMaterial({ color: 0xbc00ff }), // Neon purple
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  ];

  for(let i = 0; i < 30; i++) {
    const bBody = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
        position: new CANNON.Vec3(
            (Math.random() - 0.5) * 30,
            Math.random() * 5 + 1,
            (Math.random() - 0.5) * 30
        )
    });
    // Keep away from spawn center (0,0)
    if(Math.abs(bBody.position.x) < 3 && Math.abs(bBody.position.z) < 3) {
        bBody.position.x += 5;
    }
    world.addBody(bBody);

    const bMesh = new THREE.Mesh(boxGeo, materials[Math.floor(Math.random() * materials.length)]);
    bMesh.castShadow = true;
    bMesh.receiveShadow = true;
    scene.add(bMesh);
    objectsToUpdate.push({ mesh: bMesh, body: bBody });
  }

  // --- 6. CONTROLS ---
  // Using WASD or Arrow Keys
  document.addEventListener('keydown', (event) => {
    const maxSteerVal = 0.5;
    const maxForce = 700;

    switch(event.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        vehicle.applyEngineForce(-maxForce, 2);
        vehicle.applyEngineForce(-maxForce, 3);
        break;
      case 's':
      case 'arrowdown':
        vehicle.applyEngineForce(maxForce, 2);
        vehicle.applyEngineForce(maxForce, 3);
        break;
      case 'a':
      case 'arrowleft':
        vehicle.setSteeringValue(maxSteerVal, 0);
        vehicle.setSteeringValue(maxSteerVal, 1);
        break;
      case 'd':
      case 'arrowright':
        vehicle.setSteeringValue(-maxSteerVal, 0);
        vehicle.setSteeringValue(-maxSteerVal, 1);
        break;
      case ' ':
        vehicle.setBrake(20, 0);
        vehicle.setBrake(20, 1);
        vehicle.setBrake(20, 2);
        vehicle.setBrake(20, 3);
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch(event.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
      case 's':
      case 'arrowdown':
        vehicle.applyEngineForce(0, 2);
        vehicle.applyEngineForce(0, 3);
        break;
      case 'a':
      case 'arrowleft':
      case 'd':
      case 'arrowright':
        vehicle.setSteeringValue(0, 0);
        vehicle.setSteeringValue(0, 1);
        break;
      case ' ':
        vehicle.setBrake(0, 0);
        vehicle.setBrake(0, 1);
        vehicle.setBrake(0, 2);
        vehicle.setBrake(0, 3);
        break;
    }
  });




  // --- 7. RESIZE HANDLER ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // --- 8. ANIMATION LOOP ---
  const clock = new THREE.Clock();
  let oldElapsedTime = 0;

  // Smoothing for camera follow
  const cameraOffset = new THREE.Vector3(0, 12, 16);

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Update Physics World
    world.step(1 / 60, deltaTime, 3);

    // Sync meshes with bodies
    for(const obj of objectsToUpdate) {
        obj.mesh.position.copy(obj.body.position);
        obj.mesh.quaternion.copy(obj.body.quaternion);
    }

    // Camera follow vehicle
    const targetPosition = chassisMesh.position.clone().add(cameraOffset);
    camera.position.lerp(targetPosition, 5 * deltaTime); // Smooth follow
    camera.lookAt(chassisMesh.position);

    // Render Scene
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();
}

// --- 9. UX INTERACTIONS ---
document.addEventListener('DOMContentLoaded', () => {
  // A. Scroll Reveal Animations (Framer Motion CSS style)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Optional: remove class when out of view to trigger animation every time you scroll past
        // entry.target.classList.remove('active'); 
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

  // B. FormSubmit Hijack (Prevent Redirect, show Popup)
  const signalForm = document.getElementById('signal-form');
  if (signalForm) {
    signalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = signalForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'TRANSMITTING...';
      btn.disabled = true;

      try {
        const response = await fetch(signalForm.action, {
          method: 'POST',
          body: new FormData(signalForm),
          headers: {
              'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          alert("🚀 Signal Transmitted Successfully! I will get back to you soon.");
          signalForm.reset();
        } else {
          alert("⚠️ Transmission failed. Please try again.");
        }
      } catch (error) {
          alert("⚠️ Transmission error. Please check your network connection.");
      }
      
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }
});
