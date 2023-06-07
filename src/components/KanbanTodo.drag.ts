const isTouchScreen =
  typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const startEventName = isTouchScreen ? 'touchstart' : 'mousedown';
const moveEventName = isTouchScreen ? 'touchmove' : 'mousemove';
const endEventName = isTouchScreen ? 'touchend' : 'mouseup';