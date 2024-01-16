import React, {useEffect, useRef} from 'react';
// import {BackSide, FrontSide } from 'three';
import * as THREE from 'Three';
import {Physics, RigidBody, RapierRigidBody} from "@react-three/rapier";
import {Sparkles, Wireframe} from "@react-three/drei";


function Projectile() {
    const rigidBody = useRef();

    useEffect(() => {
        console.log('er', rigidBody.current)
        if (rigidBody.current) {
            // A one-off "push"
            // rigidBody.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);

            // // A continuous force
            // rigidBody.current.addForce({ x: 0, y: 10, z: 0 }, true);
            //
            // // A one-off torque rotation
            // rigidBody.current.applyTorqueImpulse({ x: 0, y: 10, z: 0 }, true);
            //
            // // A continuous torque
            // rigidBody.current.addTorque({ x: 0, y: 10, z: 0 }, true);
        }
    }, []);
    return (
        <RigidBody colliders="ball" ref={rigidBody}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[.05, 64, 64]}/>
                <meshMatcapMaterial/>
            </mesh>
        </RigidBody>
    )
}

function SphereA() {
    const sphereA = useRef()
    const jump = () => {
        console.log('jimo', sphereA.current)
        // sphereA.current.applyImpulse({ x: 0, y: 40, z: 0 })
    }
    return (
        <RigidBody colliders="ball" ref={sphereA} gravityScale={0}>
            <mesh onClick={jump}>
                <sphereGeometry args={[1, 32, 32]}/>
                <meshNormalMaterial side={THREE.FrontSide} transparent={true} opacity={0.3}/>
                <Wireframe/>
            </mesh>
        </RigidBody>
    );
}

function SphereB() {
    return (
        <RigidBody colliders="ball" gravityScale={0}>
            <mesh>
                <sphereGeometry args={[0.9, 32, 32]}/>
                <meshNormalMaterial side={THREE.BackSide} transparent={true} opacity={0.3}/>
                <Wireframe/>
            </mesh>
        </RigidBody>
    );
}

export default function HollowSphere() {
    return (
        <>
            <SphereA>
                {/*<Sparkles count={100} scale={2} size={2} speed={0.4}/>*/}
                <SphereB>
                    <Projectile/>
                </SphereB>
            </SphereA>
            {/*<SphereB>*/}
            {/*    <Projectile/>*/}
            {/*</SphereB>*/}
        </>
    );
}

