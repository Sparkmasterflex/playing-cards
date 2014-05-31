(function() {
  var add_card_number, create_card, face_card, flip_cards, get_template;

  $(function() {
    var suits;
    $('button.flip-cards').click(flip_cards);
    suits = ['heart', 'spade', 'club', 'diamond'];
    return $.each(suits, function(i, suit) {
      return create_card({
        suit: suit,
        number: 1 + Math.floor(Math.random() * 13)
      });
    });
  });

  create_card = function(attrs) {
    return get_template('card', attrs).done(function(card) {
      var $card, i, _i, _ref, _results;
      $('.container').append(card);
      $card = $("." + attrs.suit + ".value-" + attrs.number);
      add_card_number($card, attrs);
      if (attrs.number < 11) {
        _results = [];
        for (i = _i = 1, _ref = attrs.number; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          _results.push(get_template(attrs.suit, {
            klass: "body-" + i
          }).done(function(template) {
            return $card.append(template);
          }));
        }
        return _results;
      } else {
        return $card.append("<div class='body-1'><span class='font-36'>" + (face_card(attrs.number)) + "</span></div>");
      }
    });
  };

  add_card_number = function($card, attrs) {
    var for_span, i, klass, num, _i, _ref, _results;
    for_span = (1 < (_ref = attrs.number) && _ref < 11) ? attrs.number : face_card(attrs.number);
    _results = [];
    for (i = _i = 1; _i <= 2; i = ++_i) {
      klass = i === 1 ? 'top' : 'bottom';
      num = "<div class=\"number " + klass + "\">\n  <span>" + for_span + "</span>\n</div>";
      $card.append($(num));
      _results.push(get_template(attrs.suit).done(function(template) {
        return $card.find('.number').append(template);
      }));
    }
    return _results;
  };

  face_card = function(val) {
    var face;
    return face = (function() {
      switch (val) {
        case 1:
          return "A";
        case 11:
          return "J";
        case 12:
          return "Q";
        case 13:
          return "K";
        default:
          return "n/a";
      }
    })();
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

  /*===================
          EVENTS
  ===================
  */


  flip_cards = function(e) {
    $('.flip').toggleClass('face-down');
    return false;
  };

}).call(this);
