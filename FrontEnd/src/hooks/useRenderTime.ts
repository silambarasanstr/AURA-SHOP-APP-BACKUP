import { useEffect, useRef } from 'react';
export function useRenderTime(componentName: string) {
  const startTime = useRef(performance.now());
  useEffect(() => {
    const duration = performance.now() - startTime.current;
    console.log(`⚡ ${componentName}: ${duration.toFixed(2)}ms`);
  });
}