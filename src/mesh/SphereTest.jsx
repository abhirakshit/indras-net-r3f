import React, {useEffect, useRef} from 'react';
import {Physics, RigidBody} from '@react-three/rapier';
import {Clone, useGLTF, PivotControls, Sparkles} from "@react-three/drei";
import * as THREE from 'Three';
import {useFrame} from "@react-three/fiber";

function Sphere() {
    return (
        <RigidBody type="fixed">
            {/*<Collider args={[5]} type="ball">*/}
            <mesh>
                <sphereGeometry args={[5, 32, 32]}/>
                <meshBasicMaterial color="skyblue" transparent opacity={0.5} side={THREE.DoubleSide}/>
            </mesh>
            {/*</Collider>*/}
        </RigidBody>
    );
}

function Cube() {
    const projectileRef = useRef()
    useFrame((state, delta) => {
        const angle = state.clock.elapsedTime
        // console.log(Math.sin(angle) * 8)
        // projectileRef.current.position.x = Math.sin(angle) * 4
        // console.log(projectileRef.current)
    })
    useEffect(() => {
        const forceDirection = new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        console.log('impulse', projectileRef.current)
        projectileRef.current.addForce({ x: 0, y: 2, z: 0 })
    }, []);
    return (

        <RigidBody position={ [ 1.5, 2, 0 ] } ref={projectileRef}>
            <mesh castShadow>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </RigidBody>

        // <RigidBody type="fixed" position={[0, 0, 0]} ref={projectileRef}>
        //     {/*<Collider args={[1, 1, 1]} type="cuboid">*/}
        //     <mesh>
        //         <boxGeometry args={[1, 1, 1]}/>
        //         <meshStandardMaterial color="red"/>
        //     </mesh>
        //     {/*</Collider>*/}
        // </RigidBody>
    );
}


export default function SphereTest() {
    return (
        <>
            <Physics debug>
                <pointLight position={[0,0,0]} intensity={100} color="red"/>
                <Sphere/>
                <Cube/>
            </Physics>
        </>
    );
}

