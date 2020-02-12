import React from 'react';
import '../testSetup';
import { shallow } from 'enzyme';
jest.mock('./memory_game.service.js');

import MGPallet from './mg_pallet.component';


test('getPalletRows method must return three rows', () => {
    const mgPalletInstance = shallow(<MGPallet cards={[]} updateCards={jest.fn()}></MGPallet>).instance();

    const cards = [1,2,3,4,5,6];
    const rows = mgPalletInstance.getPalletRows(cards);
    expect(rows.length).toEqual(3);
});


test('onLoadCardImage method set hasImageLoaded property', () => {
  const cardsProp = [{
    id:1
  }];
  const mgPalletInstance = shallow(<MGPallet cards={cardsProp} updateCards={jest.fn()}></MGPallet>).instance();

  expect(cardsProp[0].hasImageLoaded).toEqual(undefined);
  mgPalletInstance.onLoadCardImage(1);
  expect(cardsProp[0].hasImageLoaded).toEqual(true);
});

test('revealCard method set isFaceUp property', () => {
  const cardsProp = [{
    id:1
  }];
  const mgPalletInstance = shallow(<MGPallet cards={cardsProp} updateCards={jest.fn()}></MGPallet>).instance();

  expect(cardsProp[0].isFaceUp).toEqual(undefined);
  mgPalletInstance.revealCard(1);
  expect(cardsProp[0].isFaceUp).toEqual(true);
});

test('revealCard method set matchFound property', () => {
  const cardsProp = [{
    id:1,
    img: 'img1'
  },
  {
    id:2,
    img: 'img1'
  }];
  const mgPalletInstance = shallow(<MGPallet cards={cardsProp} updateCards={jest.fn()}></MGPallet>).instance();

  expect(cardsProp[0].matchFound).toEqual(undefined);
  mgPalletInstance.revealCard(1);
  mgPalletInstance.revealCard(2);
  expect(cardsProp[0].matchFound).toEqual(true);
});