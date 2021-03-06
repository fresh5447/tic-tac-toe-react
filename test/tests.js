import React from 'react'
import TestUtils from 'react-addons-test-utils'

import { expect } from 'chai'

import App from '../app/components/app.jsx!'
import Game from '../app/components/game.jsx!'
import Square from '../app/components/square.jsx!'

const {
  isCompositeComponent,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = TestUtils


describe("App", () => {

  it("is a composite component", () => {
    const app = renderIntoDocument(<App/>)

    expect(isCompositeComponent(app)).to.be.ok
  })
})

describe("Game", () => {
  let game

  beforeEach(() => {
    game = renderIntoDocument(<Game/>)
  })

  it("is a composite component", () => {
    expect(isCompositeComponent(game)).to.be.ok
  })
})

describe("Square", () => {
  let square
  const player = 'x'

  describe("when empty", () => {
    before(() => {
      square = renderIntoDocument(<Square/>)
    })

    it("is a composite component", () => {
      expect(isCompositeComponent(square)).to.be.ok
    })
  })
})