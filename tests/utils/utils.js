module.exports = function (_) {

    var div;

    before(function () {
        div = document.createElement('div');
        div.innerHTML =
            '<div id="container">\
                <p id="item"></p>\
                <button id="button">test</button>\
            </div>';
        document.body.appendChild(div);
    });

    describe('utils', function () {
        it('should find a element', function () {
            var els = _.find('#container');
            Object.prototype.toString.call(els).should.equal('[object Array]');
            els.length.should.equal(1);
            els[0].should.equal(document.getElementById('container'));
        });

        it('should able to copy a array use slice', function () {
            var arr = [1, 2, 3],
                copy = _.slice.call(arr, 0);
            copy.should.not.equal(arr);
            copy.should.eql(arr);
        });

        it('should able check contains', function () {
            var container = _.find('#container')[0],
                item = _.find('#item')[0];

            _.contains(container, item).should.ok;
        });

        it('should able to set and get data', function () {
            var container = _.find('#container')[0];
            _.data(container, 'test', 'test');
            _.data(container, 'test').should.equal('test');
            _.cleanData([container]);
            (_.data(container, 'test') === undefined).should.be.ok;
        });

        it('should able to add & remove event', function (done) {
            var button = _.find('#button')[0],
                handle = function () {
                    _.remove(button, 'click', handle);
                    done();
                };
            _.add(button, 'click', handle);
            button.click();
        });

        it('should able to extend objects', function () {
            var target = _.extend({}, { test: 'test' });
            target.extend = _.extend;
            target.extend({
                hello: 'hello'
            });

            target.should.have.property('test');
            target.should.have.property('hello');
        });

        it('should able to extend from multiple srouces', function () {
            var target = _.extend({}, { test: 'test' }, { hello: 'hello' });
            target.should.have.property('test');
            target.should.have.property('hello');
        });

        it('should able to add & remove class', function () {
            var container = _.find('#container')[0];
            _.addClass(container, 'test');
            container.className.should.equal('test');
            _.removeClass(container, 'test');
            container.className.should.equal('');
        });

        it('should able to check a object', function () {
            _.isObject({}).should.ok;
            _.isObject('hello').should.not.ok;
            _.isObject(new String()).should.ok;
            _.isObject(123).should.not.ok;
            _.isObject(new Number).should.ok;
            _.isObject(function () {}).should.not.ok;
            _.isObject(new Function()).should.not.ok;
            _.isObject([]).should.ok;
        });

        it('should get the right target', function () {
            _.get('a.b.c').should.equal('a.b.c');
            _.get('a.b', 'c.d').should.equal('a.b.c.d');
            _.get('a', '').should.equal('a');
            _.get('a.b', undefined).should.equal('a.b');
            _.get('', 'a.b').should.equal('a.b');
            _.get(undefined, '').should.equal('');
        });

        it('should use $top', function () {
            _.get('a.b.c', '$top.d').should.equal('d');
            _.get('', '$top.a.b').should.equal('a.b');
        });
    });

    after(function () {
        document.body.removeChild(div);
    });

};
