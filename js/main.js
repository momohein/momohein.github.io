// Copy-to-clipboard buttons: <button class="copy-btn" data-copy="#element-id">Copy</button>
document.querySelectorAll('.copy-btn[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var target = document.querySelector(btn.getAttribute('data-copy'));
    if (!target) return;
    function done(msg) {
      btn.textContent = msg;
      setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
    }
    function fallback() {
      var range = document.createRange();
      range.selectNodeContents(target);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      done('Selected');
    }
    try {
      navigator.clipboard.writeText(target.textContent.trim()).then(function () { done('Copied'); }, fallback);
    } catch (e) {
      fallback();
    }
  });
});

// Light / dark switch. The choice is saved so it sticks across pages and visits.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#17110c' : '#7A4A1A');
  }
  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
