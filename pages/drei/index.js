import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

const Experience = () => {

    const cubeRef = useRef()
    const sphereRef = useRef()

    useFrame((_, delta) => {
        cubeRef.current.rotation.y += delta
    })

    return <>
        <Perf />
        <Float speed={4} floatIntensity={2}>
            <Text color="teal"
                fontSize={0.7}
                position-y={2}
                font="./stick-v15-latin-regular.woff"
            >
                T  A  R  U  N     ¯\_()_/¯
            </Text>
        </Float>
        <OrbitControls makeDefault />
        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <PivotControls anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={100}
            fixed={true}>
            <mesh ref={sphereRef} position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html position={[1, 1, 0]}
                    wrapperClass="label"
                    center
                    distanceFactor={8}
                    occlude={[sphereRef, cubeRef]}
                >That&apos;s a sphere 🟡</Html>
            </mesh>
        </PivotControls>
        <TransformControls position-x={2} >
            <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </TransformControls>
        <mesh position-y={-1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.5}
                color="skyblue"
            />
        </mesh>
    </>
}
const DREI = () => {

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: ACESFilmicToneMapping,
                    outputEncoding: sRGBEncoding
                }}
                camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}>
                <Experience />
            </Canvas>
        </div >
    )
}

export default DREI