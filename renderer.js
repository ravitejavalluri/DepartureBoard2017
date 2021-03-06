// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
(function() {
  route = require('./route');

  $('#destination').html(route.destination);
  $('#destination-sub').html(route.destinationSub);
  $('#route-color-bar').css('background-color', route.color);
  $('#route-name').html(route.name);
  $('#route-name-sub').html(route.nameSub);
  $('#platform-number').html(route.platformNumber);

  times = require('./times');

  var $firstRow = $('<tr></tr>');
  $firstRow.append(times[0].map(function(element) { return element.domElement(); }));

  var $secondRow = $('<tr></tr>');
  $secondRow.append(times[1].map(function(element) { return element.domElement(); }));

  $('#times-body').append($firstRow);
  $('#times-body').append($secondRow);

  function bilingualLabels() {
    $('.bilingual').each(function(index, element) {
      $element = $(element);

      // 空なら日本語出す
      var blank = $element.text() === '';
      if (blank) {
        var japanese = $element.data('japanese');
        $element.html(japanese);
        return;
      }

      // 日本語を出してたら英語出す
      var displayingJapanese = $element.text() === $element.data('japanese');
      if (displayingJapanese) {
        var english = $element.data('english');
        $element.html(english);
        return;
      }

      // 日本語出す
      var text = $element.data('japanese');
      $element.html(text);
    });
  }

  function repaint() {
    bilingualLabels();
  }

  repaint();
  setInterval(repaint, 5000);
}());
