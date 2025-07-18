import { useEffect, useRef, useCallback } from 'react';
import { InteractionManager } from 'react-native';

export const usePerformanceOptimization = () => {
  const frameId = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);
  const targetFPS = 60;
  const targetFrameTime = 1000 / targetFPS;

  const optimizedCallback = useCallback((callback: () => void) => {
    const currentTime = Date.now();
    
    if (currentTime - lastFrameTime.current >= targetFrameTime) {
      callback();
      lastFrameTime.current = currentTime;
    } else {
      frameId.current = requestAnimationFrame(() => optimizedCallback(callback));
    }
  }, []);

  const debouncedCallback = useCallback((callback: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }, []);

  const runAfterInteractions = useCallback((callback: () => void) => {
    InteractionManager.runAfterInteractions(() => {
      optimizedCallback(callback);
    });
  }, [optimizedCallback]);

  useEffect(() => {
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return {
    optimizedCallback,
    debouncedCallback,
    runAfterInteractions,
  };
}; 