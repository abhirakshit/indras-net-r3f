import {useControls} from "leva";
export default function GlassMaterial() {
    const {color, roughness, metalness, opacity, ior, transmission, thickness, clearcoat, specularIntensity} = useControls('Glass Props', {
        color: "#fff",
        roughness: {
            value: .1,
            min: 0,
            max: 1,
            step: 0.01
        },
        metalness: {
            value: 0.1,
            min: 0,
            max: 1,
            step: 0.01
        },
        opacity: {
            value: 0.1,
            min: 0,
            max: 10,
            step: 0.01
        },transmission: {
            value: 0.8,
            min: 0,
            max: 1,
            step: 0.01
        },ior: {
            value: 1.7,
            min: 1,
            max: 5,
            step: 0.1
        },thickness: {
            value: 1,
            min: 1,
            max: 10,
            step: 1
        },specularIntensity: {
            value: 1,
            min: 1,
            max: 10,
            step: 1
        },clearcoat: {
            value: .7,
            min: 0,
            max: 1,
            step: 0.1
        },
    }, {collapsed: true})
    return <meshPhysicalMaterial
        attach="material"
        color= {color}
        roughness={roughness}
        metalness={metalness}
        opacity={opacity}
        transmission={transmission}
        ior={ior}
        thickness={thickness}
        specularIntensity={specularIntensity}
        clearcoat={clearcoat}
    />
}