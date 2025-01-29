import { useEffect, useRef } from 'react';

export function useDebounce<A extends any[]>(
	callback: (...args: A) => void,
	wait: number,
) {
	const argsRef = useRef<A>(null);
	const timeout = useRef<ReturnType<typeof setTimeout>>(null);
	const callbackRef = useRef(callback);
	
	function cleanup() {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
	}
	
	useEffect(() => cleanup(), []);
	
	useEffect(() => {
		return () => {
			cleanup()
		}
	});
	
	return function debouncedCallback(...args: A) {
		argsRef.current = args;
		
		cleanup();
		callbackRef.current = callback;
		
		timeout.current = setTimeout(() => {
			if (argsRef.current) {
				callbackRef.current(...argsRef.current);
			}
		}, wait);
	};
}
