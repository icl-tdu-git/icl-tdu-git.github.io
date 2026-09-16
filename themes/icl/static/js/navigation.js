(() => {
  const button = document.querySelector('.menu-toggle');
  const menu = document.getElementById('navigation');
  const narrow = window.matchMedia('(max-width: 640px)');
  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    menu.hidden = narrow.matches && !open;
  };
  const sync = () => {
    button.hidden = !narrow.matches;
    setOpen(false);
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && narrow.matches) {
      setOpen(false);
      button.focus();
    }
  });
  narrow.addEventListener('change', sync);
  sync();
})();
