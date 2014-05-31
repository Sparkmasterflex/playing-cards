(function() {
  var add_card_number, create_card, get_template;

  $(function() {
    create_card('heart', 2);
    create_card('spade', 2);
    create_card('club', 2);
    create_card('diamond', 2);
    return $('select.card-value').change(function(e) {
      $('.card').remove();
      create_card('heart', $(e.target).val());
      create_card('spade', $(e.target).val());
      create_card('club', $(e.target).val());
      return create_card('diamond', $(e.target).val());
    });
  });

  create_card = function(suit, number) {
    var $card, i, _i, _results;
    $card = $("<div class='card value-" + number + "'></div>");
    $('.container').append($card);
    add_card_number($card, {
      suit: suit,
      number: number
    });
    _results = [];
    for (i = _i = 1; 1 <= number ? _i <= number : _i >= number; i = 1 <= number ? ++_i : --_i) {
      _results.push(get_template(suit, {
        klass: "body-" + i
      }).done(function(template) {
        return $card.append(template);
      }));
    }
    return _results;
  };

  add_card_number = function($card, attrs) {
    var i, klass, num, _i, _results;
    _results = [];
    for (i = _i = 1; _i <= 2; i = ++_i) {
      klass = i === 1 ? 'top' : 'bottom';
      num = "<div class=\"number " + klass + "\">\n  <span>" + attrs.number + "</span>\n</div>";
      $card.append($(num));
      _results.push(get_template(attrs.suit).done(function(template) {
        return $card.find('.number').append(template);
      }));
    }
    return _results;
  };

  get_template = function(name, data) {
    var d;
    d = $.Deferred();
    $.get("/templates/" + name + ".html", function(response) {
      var template;
      template = Handlebars.compile(response);
      return d.resolve(template(data));
    });
    return d.promise();
  };

}).call(this);
