$ ->
  suits = ['heart', 'spade', 'club', 'diamond']
  create_card {suit: suits[Math.floor(Math.random() * 3)], number: 2 + Math.floor(Math.random() * 9)}



create_card = (attrs) ->
  get_template('card', attrs).done (card) ->
    $('.container').append card
    $card = $(".value-#{attrs.number}")
    add_card_number $card, attrs
    for i in [1..attrs.number]
      get_template(attrs.suit, {klass: "body-#{i}"}).done (template) ->
        $card.append template
    $('a.flip-transform').click flip_card


add_card_number = ($card, attrs) ->
  for i in [1..2]
    klass = if i == 1 then 'top' else 'bottom'
    num = """
      <div class="number #{klass}">
        <span>#{attrs.number}</span>
      </div>
    """
    $card.append $(num)
    get_template(attrs.suit).done (template) ->
      $card.find('.number').append template


get_template = (name, data) ->
  d = $.Deferred()
  $.get "/templates/#{name}.html", (response) ->
    template = Handlebars.compile(response)
    d.resolve template(data)

  d.promise()


###===================
        EVENTS
===================###
flip_card = (e) ->
  $(e.target).parents('.flip').toggleClass 'face-down'
  false