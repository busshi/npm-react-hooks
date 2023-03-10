import { useEffect } from 'react';

/**
 * Utility to listen for click outside of a list of refs.
 *
 * @example
 * useListenForOutsideClick([ref1, ref2], () => {
 *   console.log('clicked outside of ref1 and ref2');
 * });
 */

export const useListenForOutsideClick = (
  refs: (HTMLElement | null)[],
  onClickOutside: () => void
) => {
  useEffect(() => {
    const callBack = (event: MouseEvent | TouchEvent) => {
      const clickedOutside = !refs.some(ref =>
        ref?.contains(event.target as Node)
      );
      if (clickedOutside) {
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', callBack);
    document.addEventListener('touchstart', callBack);

    return () => {
      document.removeEventListener('mousedown', callBack);
      document.removeEventListener('touchstart', callBack);
    };
  }, [refs]);
};
