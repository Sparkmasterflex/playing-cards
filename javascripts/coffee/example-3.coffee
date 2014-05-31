$ ->
  $('button.flip-cards').click flip_cards
  suits = ['heart', 'spade', 'club', 'diamond']
  $.each suits, (i, suit) ->
    create_card {suit: suit, number: 1 + Math.floor(Math.random() * 13)}

create_card = (attrs) ->
  get_template('card', attrs).done (card) ->
    $('.container').append card
    $card = $(".#{attrs.suit}.value-#{attrs.number}")
    add_card_number $card, attrs
    if attrs.number < 11
      for i in [1..attrs.number]
        get_template(attrs.suit, {klass: "body-#{i}"}).done (template) ->
          $card.append template
    else
      $card.append "<div class='body-1'><span class='font-36'>#{face_card(attrs.number)}</span></div>"


add_card_number = ($card, attrs) ->
  for_span = if 1 < attrs.number < 11 then attrs.number else face_card(attrs.number)
  for i in [1..2]
    klass = if i == 1 then 'top' else 'bottom'
    num = """
      <div class="number #{klass}">
        <span>#{for_span}</span>
      </div>
    """
    $card.append $(num)
    get_template(attrs.suit).done (template) ->
      $card.find('.number').append template

face_card = (val) ->
  face = switch val
    when 1 then "A"
    when 11 then "J"
    when 12 then "Q"
    when 13 then "K"
    else
      "n/a"


get_template = (name, data) ->
  d = $.Deferred()
  $.get "/templates/#{name}.html", (response) ->
    template = Handlebars.compile(response)
    d.resolve template(data)

  d.promise()


###===================
        EVENTS
===================###
flip_cards = (e) ->
  $('.flip').toggleClass 'face-down'
  false