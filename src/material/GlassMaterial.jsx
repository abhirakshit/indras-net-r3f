export default function GlassMaterial() {
    return <meshPhysicalMaterial
        attach="material"
        // color="blue"
        roughness={0.0}
        metalness={0.0}
        opacity={0.1}
        transmission={.8}
        ior={1.7}
        thickness={1}
        specularIntensity={0}
        clearcoat={.7}
    />
}