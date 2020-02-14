/**
 * This functionality allows timeouts to be used with React hooks, this is the work of Dan Abramov.
 * How it works, and the problems it solves are described here:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
import React, { useState, useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
