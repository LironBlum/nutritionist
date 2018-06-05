Object.defineProperty(global, '__stack', {
  get(){
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    const err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    const stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get(){
    return __stack[1].getLineNumber();
  }
});

Object.defineProperty(global, '__func', {
  get(){
    return __stack[1].getFunctionName();
  }
});






