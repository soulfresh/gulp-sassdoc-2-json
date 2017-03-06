SassDocParser = require('../lib/sassDocParser');
fs = require('fs');

describe 'SassDocParser', ->
  beforeEach (done) ->
    @sass = ''
    @parser = new SassDocParser();
    # @data = fs.readFileSync("#{__dirname}/../examples/foo.sass");
    # @parser.parse(@data, (@result) => done() )

    @blocks = [{
      name: 'Button'
      description: '''
      Your standard form button.
      // Everyone loves buttons.
      '''
      states: [
        ':hover - Highlights when hovering.'
        ':disabled - Dims the button.'
      ]
      example: '''

      //   <button>Default</button>
      //   <button class="foo">Foo</button>
      '''
      group: 'buttons'
      index: '1'
      styleDefinition: '''
      button {
        background: 1px solid red;
      }
      '''
    },{
      name: 'Link'
      description: '''

      // Your standard link tag.
      '''
      states: [
        ':hover - Highlights when hovering.'
      ]
      example: '''

      //   <a href="#">Link</a>
      '''
      group: 'buttons'
      index: '1'
      styleDefinition: '''
      a {
        background: 1px solid red;
      }
      '''
    }]

    for block in @blocks
      @sass += """
      // @name #{block.name}
      // @description #{block.description}
      //
      // @state #{block.states[0]}
      // @state #{block.states[1]}
      //
      // @example #{block.example}
      //
      // @group #{block.group}
      // @index #{block.index}
      #{block.styleDefinition}


      """

    @parser.parse(@sass, (@result) => done() )

  it 'should return data.', ->
    expect(@result).toBeDefined()

  it 'should parse all of the blocks.', ->
    expect(@result.length).toEqual(2);

  it 'should parse the name elements.', ->
    expect(@result[0].name).toEqual('Button')
    expect(@result[1].name).toEqual('Link')

  it 'should parse single line descriptions.', ->
    description = @blocks[1].description.replace('// ', '').trim()
    expect(@result[1].description).toEqual("<p>#{description}</p>")

  it 'should parse multiline strings.', ->
    description = @blocks[0].description.replace('// ', '')
    expect(@result[0].description).toEqual("<p>#{description}</p>")

  it 'should parse the group.', ->
    expect(@result[0].group).toEqual(@blocks[0].group)

  it 'should parse the index.', ->
    expect(@result[0].index).toEqual(@blocks[0].index)

