import React from 'react';
import '../testSetup';
import { shallow } from 'enzyme';
jest.mock('./memory_game.service.js');

import MemoryGame from './memory_game.component';
import MemoryGameService from './memory_game.service';


test('startNewGame method must invoke GetImages method in the service', () => {
    const memoryGameInstance = shallow(<MemoryGame></MemoryGame>).instance();
    memoryGameInstance.startNewGame();
    expect(MemoryGameService.GetImages).toHaveBeenCalled();
});

test('shuffleArray method should return a new array of same length', () => {
    const memoryGameInstance = shallow(<MemoryGame></MemoryGame>).instance();
    const arr = [4,5,6,7];
    const arrLen = arr.length;

    const shuffledArr = memoryGameInstance.shuffleArray(arr);
    expect(shuffledArr.length).toEqual(arrLen);
});

test('generateCards method should generate requisite no. of cards', () => {
    const memoryGameInstance = shallow(<MemoryGame></MemoryGame>).instance();
    const images = ["url1", "url2", "url3", "url4", "url5"];
    const cards = memoryGameInstance.generateCards(9, images);
    expect(cards.length).toEqual(9);
});

test('generateCards method throws error when there isnt enough images', () => {
    const memoryGameInstance = shallow(<MemoryGame></MemoryGame>).instance();
    const images = ["url1"];
    expect(() => {
      memoryGameInstance.generateCards(9, images);
    }).toThrow();
});


