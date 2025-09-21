import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

// Lazy load Three.js components
const Canvas = lazy(() =>
  import('@react-three/fiber').then((module) => ({ default: module.Canvas }))
);
const OrbitControls = lazy(() =>
  import('@react-three/drei').then((module) => ({
    default: module.OrbitControls,
  }))
);

const Canvas3DFallback = ({ className = '', height = '400px' }) => (
  <div className={`w-full ${className}`} style={{ height }}>
    <Skeleton className='w-full h-full rounded-lg' />
  </div>
);

const Canvas3D = ({
  children,
  className = '',
  height = '400px',
  camera = { position: [0, 0, 5] },
  enableControls = true,
  ...props
}) => {
  return (
    <Suspense
      fallback={<Canvas3DFallback className={className} height={height} />}
    >
      <div className={`w-full ${className}`} style={{ height }}>
        <Canvas
          camera={camera}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          {...props}
        >
          <Suspense fallback={null}>
            {/* Default lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {/* Controls */}
            {enableControls && (
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
              />
            )}

            {children}
          </Suspense>
        </Canvas>
      </div>
    </Suspense>
  );
};

export default Canvas3D;
