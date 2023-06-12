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
    const item = (se.target as HTMLElement).closest<HTMLElement>('dnd-item');
    // item 자체가 없거나 현재 이벤트중인 item이 있을 경우 반환
    if (!item || item.classList.contains('moving')) return;
    // 클릭한 item을 직접 움직일 수 없으니 고스트 아이템을 만들어서 활용한다.
    const ghostItem = item.cloneNode(true) as HTMLElement;
    // 초기 클릭했을 당시 아이템의 위치와 크기를 가져온다.
    const { left, top, width, height } = item.getBoundingClientRect();
    ghostItem.classList.add('ghost');
    ghostItem.style.position = 'fixed';
    ghostItem.style.left = `${left}px`;
    ghostItem.style.top = `${top}px`;
    ghostItem.style.width = `${width}px`;
    ghostItem.style.height = `${height}px`;
    ghostItem.style.pointerEvents = 'none';
    ghostItem.style.border = '2px solid rgb(96 165 250)';
    ghostItem.style.opacity = '0.95';
    ghostItem.style.boxShadow = '0 30px 60px rgba(0, 0, 0, .2)';
    ghostItem.style.transform = 'scale(1.05)';
    ghostItem.style.transition = 'transform 200ms ease, opacity 200ms ease, boxShadow 200ms ease';

    item.classList.add('placeholder');
    item.style.cursor = 'grabbing';

    document.body.appendChild(ghostItem);
    // ghostitem이 아닌 다른 아이템은 밀리거나 할 때 자연스럽게 보이도록 에니메이션 추가
    document.querySelectorAll<HTMLElement>('.dnd-item:not(.ghost)').forEach((item) => {
      item.style.transition = 'all 200ms ease';
    });

    const moveHandler = (me: MouseEvent | TouchEvent) => {
      // touch 이벤트 중 scrollevent가 겹쳐서 발생하지 않도록 방지
      if (me.cancelable) me.preventDefault();
    }
  }
}