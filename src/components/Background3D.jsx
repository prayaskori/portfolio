import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6c3aed, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa78bfa, 2, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.5, 100);
    pointLight2.position.set(-20, -10, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x7c3aed, 1, 80);
    pointLight3.position.set(0, -20, 10);
    scene.add(pointLight3);

    // Materials
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });

    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      metalness: 0.3,
      roughness: 0.2,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });

    // Geometries
    const geometries = [
      new THREE.TorusGeometry(2, 0.6, 16, 40),
      new THREE.OctahedronGeometry(1.8, 0),
      new THREE.IcosahedronGeometry(2, 0),
      new THREE.TorusKnotGeometry(1.5, 0.5, 80, 16),
      new THREE.DodecahedronGeometry(1.6, 0),
      new THREE.ConeGeometry(1.5, 3, 6),
      new THREE.TetrahedronGeometry(2, 0),
      new THREE.BoxGeometry(2, 2, 2),
    ];

    const materials = [wireframeMat, glassMat, edgeMat];
    const meshes = [];

    // Create floating objects scattered around the scene
    for (let i = 0; i < 30; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const mat = materials[Math.floor(Math.random() * materials.length)].clone();
      
      // Vary opacity slightly
      mat.opacity = 0.06 + Math.random() * 0.14;
      
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40 - 10
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.4 + Math.random() * 1.8;
      mesh.scale.set(scale, scale, scale);

      // Store animation data
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    // Mouse tracking for parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Handle resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax camera movement
      camera.position.x = mouse.x * 3;
      camera.position.y = -mouse.y * 3;
      camera.lookAt(scene.position);

      // Animate meshes
      meshes.forEach((mesh) => {
        const d = mesh.userData;
        mesh.rotation.x += d.rotSpeedX;
        mesh.rotation.y += d.rotSpeedY;
        mesh.rotation.z += d.rotSpeedZ;
        mesh.position.y = d.baseY + Math.sin(elapsedTime * d.floatSpeed + d.floatOffset) * 1.5;
      });

      // Animate lights
      pointLight1.position.x = Math.sin(elapsedTime * 0.3) * 25;
      pointLight1.position.y = Math.cos(elapsedTime * 0.2) * 20;
      pointLight2.position.x = Math.cos(elapsedTime * 0.4) * 20;
      pointLight2.position.z = Math.sin(elapsedTime * 0.3) * 15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      meshes.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
