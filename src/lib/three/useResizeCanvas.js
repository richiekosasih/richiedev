import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

export const useResizeCanvas = () => {
  const { gl, camera } = useThree();
  const containerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;

        // Update camera aspect ratio
        if (camera.isPerspectiveCamera) {
          camera.aspect = clientWidth / clientHeight;
          camera.updateProjectionMatrix();
        }

        // Update renderer size
        gl.setSize(clientWidth, clientHeight);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      handleResize(); // Initial resize
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [gl, camera]);

  return containerRef;
};
