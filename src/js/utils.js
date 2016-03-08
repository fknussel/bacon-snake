import Bacon from 'baconjs';

export function contains(arr, x) {
  for (var i in arr) {
    if (arr[i].equals(x)) {
      return true;
    }
  }

  return false;
}

export function slidingWindowBy(lengthObs) {
  var self = this;

  return new Bacon.EventStream(function (sink) {
    var buf = [];
    var length = 0;

    lengthObs.onValue(function (n) {
      length = n;
    });

    self.onValue(function (x) {
      buf.unshift(x);
      buf = buf.slice(0, length);
      sink(new Bacon.Next(buf));
    });

    return function () {};
  });
}

export function separateBy(sep, obs) {
  return obs().changes().concat(sep.take(1).flatMap(function () {
    return Bacon.separateBy(sep, obs);
  }));
}
