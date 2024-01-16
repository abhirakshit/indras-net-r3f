import React, {useEffect, useMemo, useRef} from 'react';
import * as THREE from 'Three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import {Sparkles} from "@react-three/drei";
import GlassMaterial from "../material/GlassMaterial.jsx";
import {RigidBody} from "@react-three/rapier";

export default function MergedSpheres() {
    const bouncingBall = useRef();
    useEffect(() => {
        if (bouncingBall.current)
            bouncingBall.current.applyImpulse({ x: 0, y: 2, z: 10 }, true); //Initial Push
    }, []);

    // Create geometries
    const outerSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const innerSphereGeometry = new THREE.SphereGeometry(.9, 32, 32);
    // Invert normals of the second sphere
    for (let i = 0; i < innerSphereGeometry.attributes.normal.array.length; i++)
        innerSphereGeometry.attributes.normal.array[i] *= -1;

    // Merge geometries
    const mergedGeometry = useMemo(() => {
        return BufferGeometryUtils.mergeGeometries([outerSphereGeometry, innerSphereGeometry], false);
    }, []);

    return (
        <>
            <RigidBody colliders={'hull'} gravityScale={0}>
                <mesh geometry={mergedGeometry}>
                    <meshBasicMaterial side={THREE.DoubleSide} transparent={true} opacity={0.1}/>
                    <Sparkles count={150} scale={.9} size={1} speed={0.2}/>
                    <RigidBody gravityScale={0} ref={bouncingBall} colliders={'ball'}>
                        <mesh>
                            <sphereGeometry args={[0.1, 32, 32]}/>
                            <GlassMaterial/>
                        </mesh>
                    </RigidBody>
                </mesh>
            </RigidBody>
        </>
    );
}

