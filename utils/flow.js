exports.SerialFlow = function(result) {
    var Co = function(result) {
        var self = this;
        self.fnArray = [];
        self.context = {
            result: (typeof(context) == 'object') ? result : {}
        };
    };
    Co.prototype.push = function(fn/*, ...args*/) {
        var args = arguments && arguments.length && Array.prototype.slice.call(arguments, 1) || [];
        var self = this;
        var argArray = args;
        self.fnArray.push({
            fn: fn,
            argArray: argArray
        });
    };
    Co.prototype.run = function(end) {
        var self = this;
        (function loop(i, argArray) {
            var obj = self.fnArray[i];
            if (!obj) {
                return end && end(null, self.context.result);
            }
            if (i === 0 || (Array.isArray(obj.argArray) && obj.argArray.length > 0)) {
                obj.argArray.push(next);
                obj.fn.apply(self.context, obj.argArray);
            }
            else {
                argArray.push(next);
                obj.fn.apply(self.context, argArray);
            }
            function next(/*...args*/) {
                var args = arguments && arguments.length && Array.prototype.slice.call(arguments) || [];
                var err = args.shift();
                if (err) {
                    return end && end(err, self.context.result);
                }
                if (typeof(setImmediate) == 'function') {
                    setImmediate(function() {
                        return loop(++i, args);
                    });
                }
                else {
                    return loop(++i, args);
                }
            }
        })(0);
    };
    return new Co(result);
}
