function callbackWrapper(entries, observer, callback) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.intersectionRatio === 1) {
      callback(entry)
    }
  });
};


const options = {
  root: null,
  rootMargin: '25px',
  threshold: 1.0,
}

function observer(callback) {
  return new IntersectionObserver(function(entries, observer) {
    callbackWrapper(entries, observer, callback)
  }, options);
}

export { observer };
