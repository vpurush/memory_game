import request from 'request';
import Constants from '../constants';

const GetImages = (noOfImages) => {
    return new Promise((resolve, reject) => {
        request({
            url: Constants.URL.IMAGE_SOURCE,
            method: 'GET'
        }, (err, response, body) => {
            if (err){
                reject(err)
            }

            // console.log("body", body);
            const imageList = JSON.parse(body);
            const imageURLList = imageList.map(i => {
                let imgId = i.id;
                return `${Constants.URL.IMG_URL_PREFIX}${imgId}/200/300`
            });
            resolve(imageURLList.slice(0, noOfImages));
        });
    });
}

export default {
    GetImages
}