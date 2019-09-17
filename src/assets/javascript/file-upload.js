  function readBlob(files, outputId) {
    
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start =  0;
    var stop = file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt, outputId) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        document.getElementById("selectedOutput").value = evt.target.result;
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  }