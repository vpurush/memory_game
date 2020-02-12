export const GetImages = jest.fn(() => {
    return Promise.resolve([
        'url1',
        'url2',
        'url3',
        'url4',
        'url5',
        'url6',
        'url7',
        'url8',
        'url9',
        'url10',
        'url11',
        'url12'
    ])
});

export default {
    GetImages: GetImages
};