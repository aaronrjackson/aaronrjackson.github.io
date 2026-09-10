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

  var visible = {};

  function update() {
    var current = null;
    // topmost section that is currently intersecting wins
    Object.keys(visible).forEach(function (id) {
      if (!visible[id]) return;
      if (!current || visible[id] < visible[current]) current = id;
    });
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

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
