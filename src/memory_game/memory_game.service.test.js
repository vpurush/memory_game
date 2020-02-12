import React from 'react';
import '../testSetup';

jest.mock('request', () => {
  return jest.fn((options, callback) => {
    const body = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ]
    console.log("called")
    callback(null, null, JSON.stringify(body));
  })
});
import MemoryGameService from './memory_game.service';

test('GetImages method must return list of images', (done) => {
  MemoryGameService.GetImages(2).then((images) => {
    console.log("iamges", images)
    expect(images.length).toEqual(2);
    done();
  });
});