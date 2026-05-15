let overlay = null;
let inversionLockedUntil = 0;
let _inversionActive = false;

export function isInversionLocked() {
  return Date.now() < inversionLockedUntil;
}

export function isInversionActive() {
  return _inversionActive;
}

// 1.5s dissolve: fade to black (0.75s) → onMidpoint() → fade back (0.75s)
// Returns a Promise that resolves when the fade-back completes.
export function transitionState(onMidpoint) {
  return new Promise(resolve => {
    const el = getOverlay();
    el.style.transition = 'opacity 0.75s ease';
    el.style.opacity = '1';

    setTimeout(() => {
      if (onMidpoint) onMidpoint();
      el.style.opacity = '0';
      setTimeout(resolve, 750);
    }, 750);
  });
}

// Looking Glass inversion sequence:
//   dissolve to black → onInversionStart() [caller applies inverted state + text]
//   → hold 30s → dissolve to black → onInversionEnd() [caller restores real state]
//   → fade back in
// Lock: inversion cannot re-trigger for 5 minutes after call.
export function triggerInversion(onInversionStart, onInversionEnd) {
  if (isInversionLocked()) return;

  inversionLockedUntil = Date.now() + 5 * 60 * 1000;
  _inversionActive = true;

  const el = getOverlay();
  el.style.transition = 'opacity 0.75s ease';
  el.style.opacity = '1';

  setTimeout(() => {
    el.style.opacity = '0';
    if (onInversionStart) onInversionStart();

    setTimeout(() => {
      el.style.opacity = '1';

      setTimeout(() => {
        _inversionActive = false;
        el.style.opacity = '0';
        if (onInversionEnd) onInversionEnd();
      }, 750);
    }, 30_000);
  }, 750);
}

function getOverlay() {
  if (!overlay) {
    overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: '#000',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '150',
    });
    document.body.appendChild(overlay);
  }
  return overlay;
}
