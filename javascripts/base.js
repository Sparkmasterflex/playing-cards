(function() {
  var add_card_number, create_card, flip_card, get_template;

  $(function() {
    var suits;
    suits = ['heart', 'spade', 'club', 'diamond'];
    return create_card({
      suit: suits[Math.floor(Math.random() * 3)],
      number: 2 + Math.floor(Math.random() * 9)
    });
  });

  create_card = function(attrs) {
    return get_template('card', attrs).done(function(card) {
      var $card, i, _i, _ref;
      $('.container').append(card);
      $card = $(".value-" + attrs.number);
      add_card_number($card, attrs);
      for (i = _i = 1, _ref = attrs.number; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        get_template(attrs.suit, {
          klass: "body-" + i
        }).done(function(template) {
          return $card.append(template);
        });
      }
      return $('a.flip-transform').click(flip_card);
    });
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

  /*===================
          EVENTS
  ===================
  */


  flip_card = function(e) {
    $(e.target).parents('.flip').toggleClass('face-down');
    return false;
  };

}).call(this);
