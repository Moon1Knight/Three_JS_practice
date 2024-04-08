// import * as THREE from 'three';
// import React, { useEffect } from 'react';

// const My3dComp = () => {
//     useEffect(() => {
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer();
//         renderer.setSize(window.innerWidth , window.innerHeight);
//         document.body.appendChild(renderer.domElement);

//         const geometry = new THREE.BoxGeometry();
//         const material = new THREE.MeshNormalMaterial({color:0xE6B5E1});
//         const cube = new THREE.Mesh(geometry, material);
//         scene.add(cube);

//         camera.position.z = 5;

//         const animate = function () {
//             requestAnimationFrame(animate)

//             cube.rotation.x += 0.001;
//             cube.rotation.y += 0.01;
//             // cube.rotation.z += 0.01;


//             renderer.render(scene, camera)
//         };
//         animate();
//             return () => {
//                 renderer.domElement.remove();
//                 renderer.dispose();
//                 geometry.dispose();
//                 material.dispose();
//             };
        
//     }, []);

//     return null;
// }

// export default My3dComp;


import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const My3dComp = () => {
    const containerRef = useRef(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial({ color: 0xE6B5E1 }));

    useEffect(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        scene.add(cube);
        camera.position.z = 5;

        const handleMouseMove = (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(distance));
            cube.lookAt(pos);
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.001;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            renderer.domElement.remove();
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} />;
};

export default My3dComp;
