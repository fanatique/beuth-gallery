var util = (function() {

  return {
    getCurrentTimestamp: function() {
      return Math.floor(Date.now() / 1000);
    },
    fadeIn: function(el) {
      el.style.opacity = 0;

      var last = +new Date();
      var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+el.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
        }
      };
      tick();
    },
    trigger: function(eventName, data) {

      data = (typeof data !== 'object') ? {} : data;

      if (window.CustomEvent) {
        var event = new CustomEvent(eventName, {
          detail: data
        });
      } else {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, data);
      }

      document.dispatchEvent(event);
    },
    hasClass: function(el, className) {
      var ret = false;
      if (el.classList)
        ret = el.classList.contains(className);
      else
        ret = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);

      return ret;
    },
    addClass: function(el, className) {
      if (el.classList)
        el.classList.add(className);
      else
        el.className += ' ' + className;
    },
    removeClass: function(el, className) {
      console.log('removeClass');
      if (el.classList)
        el.classList.remove(className);
      else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };
})();
