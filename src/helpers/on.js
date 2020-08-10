/* eslint-disable consistent-return, func-names, no-var, prefer-arrow-callback, vars-on-top */

/**
 * Plain JavaScript event delegation. Add a handler for whenever an element's
 * children trigger a specified event.
 * @see https://bdadam.com/blog/plain-javascript-event-delegation.html
 * @param  {String}    parentSelector
 * @param  {String}    eventName
 * @param  {String}    childSelector
 * @param  {Function}  fn
 * @return {Boolean}
 */
export default function on(parentSelector, eventName, childSelector, fn) {
  var parent = document.querySelector(parentSelector);

  if (!parent) {
    return false;
  }

  parent.addEventListener(eventName, function (event) {
    var possibleTargets = parent.querySelectorAll(childSelector);
    var target = event.target;

    for (var i = 0, l = possibleTargets.length; i < l; i += 1) {
      var el = target;
      var p = possibleTargets[i];

      while (el && el !== parent) {
        if (el === p) {
          return fn.call(p, event);
        }

        el = el.parentNode;
      }
    }
  });

  return true;
}

// Example:
// on('body', 'click', '.product', function(e) {
//   console.log(e.target);
// });
