$ ->
  create_card 'heart', 2
  create_card 'spade', 2
  create_card 'club', 2
  create_card 'diamond', 2


  $('select.card-value').change (e) ->
    $('.card').remove()
    create_card 'heart', $(e.target).val()
    create_card 'spade', $(e.target).val()
    create_card 'club', $(e.target).val()
    create_card 'diamond', $(e.target).val()



create_card = (suit, number) ->
  $card = $("<div class='card value-#{number}'></div>")
  $('.container').append $card
  add_card_number $card, {suit: suit, number: number}
  for i in [1..number]
    get_template(suit, {klass: "body-#{i}"}).done (template) ->
      $card.append template


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