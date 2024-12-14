import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PlantInfo3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(400, 400);

    // Create a more complex 3D object - a stylized plant-like geometry
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.3,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    const plantModel = new THREE.Mesh(geometry, material);
    scene.add(plantModel);

    // Lighting for holographic effect
    const ambientLight = new THREE.AmbientLight(0x00ffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera positioning
    camera.position.z = 7;

    // Orbit Controls for slow rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      scene.remove(plantModel);
      geometry.dispose();
      material.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-4xl mx-auto bg-gray-800 bg-opacity-50 rounded-2xl overflow-hidden shadow-2xl border border-cyan-500 border-opacity-30">
        <div className="flex">
          {/* Left Side - 3D Holographic Model */}
          <div className="w-1/2 flex items-center justify-center p-6 bg-gray-900 bg-opacity-60">
            <canvas 
              ref={canvasRef} 
              className="w-full aspect-square rounded-xl"
            />
          </div>

          {/* Right Side - Plant Information */}
          <div className="w-1/2 p-6 text-cyan-100">
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-cyan-300 mb-2 tracking-wide">Rasna</h2>
                <p className="text-sm text-cyan-100 opacity-80">
                  <span className="font-semibold text-cyan-200">Scientific Name:</span> Alpinia Galanga
                </p>
              </div>

              <div className="border-b border-cyan-700 pb-4">
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Botanical Profile</h3>
                <p className="text-cyan-100 opacity-90 leading-relaxed">
                  A rhizomatous plant with profound medicinal heritage, native to tropical ecosystems. 
                  Characterized by aromatic roots and potent phytochemical compositions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-1">Category</h3>
                  <p className="text-cyan-100 opacity-90">Ayurvedic Botanical</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-1">Region</h3>
                  <p className="text-cyan-100 opacity-90">Tropical Zones</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">Therapeutic Compounds</h3>
                <ul className="space-y-1 text-cyan-100 opacity-90">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 mr-2 rounded-full"></span>
                    Joint Pain Mitigation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 mr-2 rounded-full"></span>
                    Digestive Optimization
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 mr-2 rounded-full"></span>
                    Anti-inflammatory Response
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantInfo3D;