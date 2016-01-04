var test = require('tape');
var DataJoiner = require('../index');

test('Basic test', function basicTest(t) {
  var joiner = DataJoiner({
    keyFn: function getId(datum) {
      return datum.id;
    }
  });

 joiner.update([
    {
      id: 'a',
      val: 1
    },
    {
      id: 'b',
      val: 2
    }
  ]);

  t.deepEqual(
    joiner.enter(),
    [
      {
        id: 'a',
        val: 1
      },
      {
        id: 'b',
        val: 2
      }
    ],
    'Enter selection is correct after first update.'
  );

  t.deepEqual(
    joiner.exit(), [], 'Exit selection is correct after first update.'
  );


  joiner.update([
    {
      id: 'b',
      val: 2
    },
    {
      id: 'c',
      val: 3
    },
    {
      id: 'd',
      val: 4
    }
  ]);

  t.deepEqual(
    joiner.enter(),
    [
      {
        id: 'c',
        val: 3
      },
      {
        id: 'd',
        val: 4
      }
    ],
    'Enter selection is correct after second update.'
  );

  t.deepEqual(
    joiner.exit(),
    [
      {
        id: 'a',
        val: 1
      }
    ],
    'Exit selection is correct after second update.'
  );  

  t.end();
});
