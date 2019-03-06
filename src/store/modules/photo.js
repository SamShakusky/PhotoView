// import axios from 'axios';

const photoModule = {
  namespaced: true,
  
  state: {
    data: [
      {
        id: 0,
        post_url: 'https://picsum.photos/1024/768/',
      },
      {
        id: 1,
        post_url: 'https://picsum.photos/768/1024/',
      },
      {
        id: 2,
        post_url: 'https://picsum.photos/768/768/',
      },
      {
        id: 3,
        post_url: 'https://picsum.photos/800/1024/',
      },
      {
        id: 4,
        post_url: 'https://picsum.photos/1024/1024/',
      },
      {
        id: 5,
        post_url: 'https://picsum.photos/1024/768/',
      },
      {
        id: 6,
        post_url: 'https://picsum.photos/1024/768/',
      },
      // {
      //   id: 7,
      //   post_url: 'https://picsum.photos/768/1024/',
      // },
      // {
      //   id: 8,
      //   post_url: 'https://picsum.photos/768/768/',
      // },
      // {
      //   id: 9,
      //   post_url: 'https://picsum.photos/800/1024/',
      // },
      // {
      //   id: 10,
      //   post_url: 'https://picsum.photos/1024/1024/',
      // },
      // {
      //   id: 11,
      //   post_url: 'https://picsum.photos/1024/768/',
      // },
      // {
      //   id: 12,
      //   post_url: 'https://picsum.photos/1024/768/',
      // },
      // {
      //   id: 13,
      //   post_url: 'https://picsum.photos/768/1024/',
      // },
      // {
      //   id: 14,
      //   post_url: 'https://picsum.photos/768/768/',
      // },
      // {
      //   id: 15,
      //   post_url: 'https://picsum.photos/800/1024/',
      // },
      // {
      //   id: 16,
      //   post_url: 'https://picsum.photos/1024/1024/',
      // },
      // {
      //   id: 17,
      //   post_url: 'https://picsum.photos/1024/768/',
      // },
    ],
  },
    
  /* eslint-disable no-param-reassign */
  mutations: {
    getPhotos: (state, payload) => {
      state.data = payload;
    },
  },
  /* eslint-enable no-param-reassign */
  
  actions: {
    // getPhotos: (context) => {
    //   axios.get('https://picsum.photos/list')
    //     .then((res) => {
    //       // context.commit('getPhotos', res.data.slice(0, 8));
    //     })
    //     .catch(err => console.error(err)); // eslint-disable-line no-console
    // },
  },
};

export default photoModule;
