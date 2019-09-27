function callbackWrapper(entries, observer, callback) {
  entries.forEach(entry => {
    callback(entry)
  });
};


const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
}

function observer(callback) {
  return new IntersectionObserver(function(entries, observer) {
    callbackWrapper(entries, observer, callback)
  }, {});
}

export { observer };
