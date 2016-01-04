function DataJoiner(opts) {
  var selection = [];
  var enterSel;
  var exitSel;
  var keyFn;

  if (opts) {
    keyFn = opts.keyFn;
  }

  if (!keyFn) {
    keyFn = function identity(x) {
      return x;
    };
  }

  function datumIsNotInSelection(datum) {
    var key = keyFn(datum);
    for (var i = 0; i < selection.length; ++i) {
      if (key === keyFn(selection[i])) {
        return false;
      }
    }
    return true;
  }

  function update(updatedData) {
    // Enter: data in updateData that are not in selection.
    enterSel = updatedData.filter(datumIsNotInSelection);
    // Exit: data in selection that are not in updatedData.
    exitSel = selection.filter(datumIsNotInUpdatedData);

    selection = updatedData;

    function datumIsNotInUpdatedData(datum) {
      var key = keyFn(datum);
      for (var i = 0; i < updatedData.length; ++i) {
        if (key === keyFn(updatedData[i])) {
          return false;
        }
      }
      return true;
    }
  }

  function enter() {
    return enterSel;
  }

  function exit() {
    return exitSel;
  }

  return {
    update: update,
    enter: enter,
    exit: exit
  };
}

module.exports = DataJoiner;
