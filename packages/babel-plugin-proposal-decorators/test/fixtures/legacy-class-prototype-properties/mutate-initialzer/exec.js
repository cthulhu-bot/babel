function dec(target, name, descriptor){
  expect(target).toBeTruthy();
  expect(name).toBe("prop");
  expect(typeof descriptor).toBe("object");

  let {initializer} = descriptor;
  delete descriptor.initializer;
  delete descriptor.writable;

  let value;
  descriptor.get = function(){
    if (initializer){
      value = '__' + initializer.call(this) + '__';
      initializer = null;
    }
    return value;
  };
}

class Example {
  @dec
  prop = 3;
}

let inst = new Example();

expect(inst.prop).toBe("__3__");
