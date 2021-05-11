import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 1, name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false },
    ],
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: (state) => state.categories.length,
    doneTodos: (state) => state.todos.filter((todo) => todo.done),
    activeTodosCount: (state) => {
      return state.todos.filter((todo) => !todo.done).length
    },
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id)
    },
  },
  modules: {},
})
