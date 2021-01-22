const handler = {
  get: function (target, name) {
    console.log("GETTER [target: %o, name: %o, returns: %o]\n", target, name, target[name]);
    return target[name];
  },
  set: function (target, name, value) {
    console.log("SETTER [target: %o, name: %o, value: %o]\n", target, name, value);
    if (name in target) {
      target[name] = value;
      return true;
    }
    return false;
  }
};

const obj = {
  schedule: {
    1: {
      1: { a: 1, b: 1 }
    },
    2: {
      1: { a: 2, b: 2 },
      2: { a: 3, b: 3 }
    },
  }
};

const p = new Proxy(obj, handler);

console.log(p);
console.log('----');
console.log(p.schedule);
console.log('----');
console.log(p.schedule[2]);
console.log('----');
console.log(p.schedule[2][2]);
console.log('----');
p.schedule[2][2].b = 'aa';
console.log('----');
