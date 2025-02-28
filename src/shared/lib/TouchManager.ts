type OnStartCallback = (cb: { startX?: number; startY?: number }) => void;
type OnMoveCallback = (cb: { deltaX?: number; deltaY?: number }) => void;

class TouchManager {
  el: HTMLElement;
  pushed: boolean;
  _startX: number;
  _startY: number;
  deltaX: number;
  deltaY: number;
  _cbStart: OnStartCallback;
  _cb: OnMoveCallback;

  constructor(el: HTMLElement, cb?: OnMoveCallback, cbStart?: OnStartCallback) {
    this.el = el;
    this._cb = cb;
    this._cbStart = cbStart;

    document.addEventListener('pointermove', this._onMove);
    this.el.addEventListener('pointerdown', this._onStart);
    document.addEventListener('pointerup', this._onEnd);
    document.addEventListener('pointercancel', this._onEnd);
  }

  destroy() {
    document.removeEventListener('mousemove', this._onMove);
    this.el.removeEventListener('pointerdown', this._onStart);
    document.removeEventListener('pointerup', this._onEnd);
    document.removeEventListener('pointercancel', this._onEnd);
  }

  _onMove = (e: PointerEvent) => {
    if (!this.pushed) return;

    this.deltaX = e.screenX - this._startX;
    this.deltaY = e.screenY - this._startY;

    if (this._cb) this._cb({ deltaX: this.deltaX, deltaY: this.deltaY });
  };

  _onStart = (e: PointerEvent) => {
    if (e.target !== e.currentTarget) return;

    this.pushed = true;
    this._startX = e.screenX;
    this._startY = e.screenY;

    if (this._cbStart) this._cbStart({ startX: this._startX, startY: this._startY });
  };

  _onEnd = () => {
    this.pushed = false;
  };
}

export { TouchManager };
