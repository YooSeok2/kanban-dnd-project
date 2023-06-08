const isTouchScreen =
  typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const startEventName = isTouchScreen ? 'touchstart' : 'mousedown';
const moveEventName = isTouchScreen ? 'touchmove' : 'mousemove';
const endEventName = isTouchScreen ? 'touchend' : 'mouseup';

const getDelta = (startEvent: MouseEvent | TouchEvent, moveEvent: MouseEvent | TouchEvent) => {
  if (isTouchScreen) {
    const se = startEvent as TouchEvent;
    const me = moveEvent as TouchEvent;

    return {
      deltaX: me.touches[0].pageX - se.touches[0].pageX,
      deltaY: me.touches[0].pageY - se.touches[0].pageY,
    };
  }

  const se = startEvent as MouseEvent;
  const me = moveEvent as MouseEvent;

  return {
    deltaX: me.pageX - se.pageX,
    deltaY: me.pageY - se.pageY,
  };
};

export type DropItem = {
  droppableId: string;
  index: number;
};

export type DropEvent = {
  source: DropItem;
  destination?: DropItem;
};

export default function registDND(onDrop: (event: DropEvent) => void) {
  const handlerStart = (se: MouseEvent | TouchEvent) => {
    const item = (se.target as HTMLElement).closest('dnd-item');
    // item 자체가 없거나 현재 이벤트중인 item이 있을 경우 반환
    if (!item || item.classList.contains('moving')) return;
    
  }
}