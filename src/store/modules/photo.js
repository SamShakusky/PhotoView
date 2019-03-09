import axios from 'axios';

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
    temp: [],
  },
    
  /* eslint-disable no-param-reassign */
  mutations: {
    getPhotos: (state, payload) => {
      state.temp = payload;
    },
    addPhoto: (state, newPhoto) => {
      state.temp = [...state.temp, newPhoto];
    },
    deletePhoto: (state, filteredList) => {
      state.temp = filteredList;
    },
  },
  /* eslint-enable no-param-reassign */
  
  actions: {
    getPhotos: (context) => {
      axios.get('/api/photo/')
        .then((res) => {
          context.commit('getPhotos', res.data);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
    addPhoto: (context, payload) => {
      const { description } = payload;
      
      axios.post('/api/photo/', {
        description,
      })
        .then((res) => {
          context.commit('addPhoto', res.data);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
    deletePhoto: (context, payload) => {
      const { id } = payload;
      
      axios.delete(`/api/photo/${id}`)
        .then(() => {
          const filteredList = context.state.temp.filter(photo => photo.id !== id);
          context.commit('deletePhoto', filteredList);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
  },
};

export default photoModule;
