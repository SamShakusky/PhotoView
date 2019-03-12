import axios from 'axios';

const photoModule = {
  namespaced: true,
  
  state: {
    data: [],
  },
    
  /* eslint-disable no-param-reassign */
  mutations: {
    getPhotos: (state, payload) => {
      state.data = payload;
    },
    addPhoto: (state, newPhoto) => {
      state.data = [...state.data, newPhoto];
    },
    deletePhoto: (state, filteredList) => {
      state.data = filteredList;
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
      const { url, description } = payload;
      
      axios.post('/api/photo/', {
        url, description,
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
          const filteredList = context.state.data.filter(photo => photo.id !== id);
          context.commit('deletePhoto', filteredList);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
  },
};

export default photoModule;
