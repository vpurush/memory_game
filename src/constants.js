const devConfig = {
    URL:{
        IMAGE_SOURCE: 'https://picsum.photos/v2/list',
        IMG_URL_PREFIX: 'https://picsum.photos/id/'
    }
}

const prodConfig = devConfig;

export default process.env.NODE_ENV == 'development' ? devConfig : prodConfig;