/* Expandable sections */
(function () {
  function toggle (button, target) {
    var expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    target.hidden = !target.hidden;
  }

  var expanders = document.querySelectorAll('[data-expands]');

  Array.prototype.forEach.call(expanders, function (expander) {
    var target = document.getElementById(expander.getAttribute('data-expands'));

    expander.addEventListener('click', function () {
      toggle(expander, target);
    })
  })
}());

/* Menu button */
(function () {
  var button = document.getElementById('menu-button');
  if (button) {
    var menu = document.getElementById('patterns-list');
    button.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    })
  }
}());

/* Persist navigation scroll point */
(function () {
  window.onbeforeunload = function () {
    var patternsNav = document.getElementById('patterns-nav');
    if (patternsNav) {
      var scrollPoint = patternsNav.scrollTop;
      localStorage.setItem('scrollPoint', scrollPoint);
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('patterns-nav')) {
      if (window.location.href.indexOf('patterns/') !== -1) {
        document.getElementById('patterns-nav').scrollTop = parseInt(localStorage.getItem('scrollPoint'));
      } else {
        document.getElementById('patterns-nav').scrollTop = 0;
      }
    }
  })
}());



/* Enable scrolling by keyboard of code samples */
(function () {
  var codeBlocks = document.querySelectorAll('pre, .code-annotated');

  Array.prototype.forEach.call(codeBlocks, function (block) {
    if (block.querySelector('code')) {
      block.setAttribute('role', 'region');
      block.setAttribute('aria-label', 'code sample');
      if (block.scrollWidth > block.clientWidth) {
        block.setAttribute('tabindex', '0');
      }
    }
  });
}());

/* Switch and persist theme */
(function () {
  var checkbox = document.getElementById('themer');

  function persistTheme(val) {
    localStorage.setItem('darkTheme', val);
  }

  function applyDarkTheme() {
    var darkTheme = document.getElementById('darkTheme');
    darkTheme.disabled = false;
  }

  function clearDarkTheme() {
    var darkTheme = document.getElementById('darkTheme');
    darkTheme.disabled = true;
  }

  function defaultDarkTheme() {
    if (localStorage.getItem('darkTheme') == null) {
      persistTheme('false');
      checkbox.checked = false;
    }

  }

  checkbox.addEventListener('change', function () {
    defaultDarkTheme();
    if (this.checked) {
      applyDarkTheme();
      persistTheme('true');
    } else {
      clearDarkTheme();
      persistTheme('false');
    }
  });

  function showTheme() {
    if (localStorage.getItem('darkTheme') === 'true') {
      applyDarkTheme();
      checkbox.checked = true;
    } else {
      clearDarkTheme();
      checkbox.checked = false;
    }
  }

  function showContent() {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;
  }

  window.addEventListener('DOMContentLoaded', function () {
    defaultDarkTheme();
    showTheme();
    showContent();
  });

}());
