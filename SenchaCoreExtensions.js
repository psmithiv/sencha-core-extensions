Ext.onReady(function() {
    Ext.Class.registerPreprocessor('privates', function(cls, data, hooks, fn) {
        var instance = cls,
            privates = data.privates;

        for(var member in privates) {
            if(typeof(privates[member]) === 'function') {
                function createClosure() {
                    var mbr = member,
                        dta = data;

                    if(instance.prototype[mbr]) {
                        console.log('PRIVATES ERROR: Method ' + instance.prototype.$className + '.' + mbr + '() all ready exists and can not be overridden by ' + instance.$className + '.' + mbr + '().')
                    } else {
                        console.log('PRIVATES DEBUG: Creating private method ' + instance.$className + '.' + mbr + '()');

                        instance.prototype[mbr] = function() {
                            var execute = false;

                            instance.prototype[mbr].$owner = this;
                            instance.prototype[mbr].$name = mbr;

                            executeLoop: for(var i in dta) {
                                if(dta[i] === arguments.callee.caller) {
                                    execute = true;
                                    break executeLoop;
                                }
                            }

                            if(execute) {
                                return privates[mbr].apply(this, arguments);
                            } else {
                                console.log('PRIVATES ERROR: ' + dta.$className + '.' + mbr + '() is private and can not be called from ' + arguments.callee.caller);
                            }
                        }
                    }
                }

                createClosure();
            } else {
                instance.prototype[member] = privates[member];
            }
        }

        //delete data.privates;

        if (fn) {
            fn.call(this, cls, data, hooks);
        }
    }, false, 'after', 'extend');

    Ext.Class.registerPreprocessor('protecteds', function(cls, data, hooks, fn) {
        var instance = cls,
            protecteds = data.protecteds;

        for(var member in protecteds) {
            if(typeof(protecteds[member]) === 'function') {
                function createClosure() {
                    var mbr = member,
                        dta = data;

                    if(instance.prototype.privates && instance.prototype.privates[mbr]) {
                        console.log('PROTECTEDS ERROR: ' + instance.$className + '.' + mbr + '() is private and can not be overridden by ' + instance.$className + '.' + mbr + '()');
                    } else if(instance.prototype.publics && instance.prototype.publics[mbr]) {
                        console.log('PROTECTEDS ERROR: ' + instance.$className + '.' + mbr + '() is public and can not be overridden by a protected method');
                    } else {
                        console.log('PROTECTEDS DEBUG: Creating protected method ' + instance.$className + '.' + mbr + '()');

                        instance.prototype[mbr] = function() {
                            var execute = false;

                            instance.prototype[mbr].$owner = this;
                            instance.prototype[mbr].$name = mbr;

                            if(arguments.callee.caller.$name === 'callParent') {
                                execute = true;
                            } else {
                                executeLoop: for(var i in dta) {
                                    if(dta[i] === arguments.callee.caller) {
                                        execute = true;
                                        break executeLoop;
                                    }
                                }
                            }

                            if(execute) {
                                return protecteds[mbr].apply(this, arguments);
                            } else {
                                console.log('PROTECTEDS ERROR: ' + dta.$className + '.' + mbr + '() is protected and can not be called from outside of it\'s class instance.');
                            }
                        }
                    }
                }

                createClosure();
            } else {
                instance.prototype[member] = protecteds[member];
            }
        }

        //delete data.protecteds;

        if (fn) {
            fn.call(this, cls, data, hooks);
        }
    }, false, 'after', 'privates');
});