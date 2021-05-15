import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

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
    events: [],
    eventsTotal: 0,
    event: {},
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      return EventService.getEvents(perPage, page)
        .then((response) => {
          commit('SET_EVENT_TOTAL', parseInt(response.headers['x-total-count']))
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => console.log('There was an error:', error.response))
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then((response) => commit('SET_EVENT', response.data))
          .catch((error) => console.log('There was an error:', error.response))
      }
    },
  },
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
