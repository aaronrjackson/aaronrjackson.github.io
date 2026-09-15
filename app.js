// Marks the nav link for whichever section is currently in view.
// Progressive enhancement: with no JS the nav still works as plain anchors.

(function () {
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) {
    byId[a.getAttribute('href').slice(1)] = a;
  });

  var ids = Object.keys(byId);
  var lastId = ids[ids.length - 1];
  var visible = {};

  // The detection band below is a thin strip near the top of the viewport. If
  // the last section is short, scrolling to the very bottom of the page can
  // leave that band sitting past its end, so it never registers as
  // intersecting and the previous section stays stuck as "active" forever.
  // Force the last link active once there's no more room left to scroll.
  function nearBottom() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  }

  function update() {
    var current = null;
    if (nearBottom()) {
      current = lastId;
    } else {
      // topmost section that is currently intersecting wins
      Object.keys(visible).forEach(function (id) {
        if (!visible[id]) return;
        if (!current || visible[id] < visible[current]) current = id;
      });
    }
    links.forEach(function (a) {
      a.removeAttribute('aria-current');
    });
    if (current && byId[current]) {
      byId[current].setAttribute('aria-current', 'true');
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        visible[id] = entry.isIntersecting ? entry.boundingClientRect.top : 0;
        if (!entry.isIntersecting) delete visible[id];
      });
      update();
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  ids.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // The observer alone won't re-fire from scrolling within an already-settled
  // intersection state, so also recheck on scroll (rAF-throttled) to catch
  // the near-bottom case above as soon as it becomes true.
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }, { passive: true });
})();

// Light/dark toggle. The initial data-theme attribute (if any) was already set
// by an inline script in <head>, before paint; this just wires up the button.
(function () {
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    var explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return mql.matches ? 'dark' : 'light';
  }

  // aria-checked drives the slider's position and the knocked-out icon color;
  // see the .theme-toggle rules in style.css.
  function render() {
    btn.setAttribute('aria-checked', currentTheme() === 'dark' ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    render();
  });

  // Follow the OS setting live, but only while the viewer hasn't chosen explicitly.
  mql.addEventListener('change', function () {
    if (!document.documentElement.getAttribute('data-theme')) render();
  });

  render();
})();
