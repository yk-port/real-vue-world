<template>
  <div>
    <h1>{{ userName }}</h1>
    <!-- <p>This event was created by {{ userName }}</p>
    <p>This event was created by {{ userId }}</p> -->

    <!-- 【3rd step】 -->
    <p>This event was created by {{ user.name }}</p>
    <p>This event was created by {{ user.id }}</p>
    <p>{{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>{{ getEvent(1) }}</p>
    <p>{{ getEventById(2) }}</p>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  // 【1st step】
  // computed: {
  //   userName() {
  //     return this.$store.state.user.name
  //   },
  //   userId() {
  //     return this.$store.state.user.id
  //   }
  // }

  // computed: mapState({
  //   【2nd step】
  //   userName: state => state.user.name,
  //   userId: state => state.user.id,
  //   categories: state => state.categories

  //   【3rd step】
  //   user: 'user',
  //   categories: 'categories'
  // })

  // 【4th step】
  // computed: mapState(['user', 'categories'])

  // 【5th step】
  computed: {
    catLength() {
      return this.$store.getters.catLength
    },

    // 動的にgettersを呼び出す時は、この方法以外でmapGettersを使うと便利
    getEvent() {
      return this.$store.getters.getEventById
    },

    ...mapState(['user', 'categories']),
    ...mapGetters(['getEventById'])
  },

  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 0; i < 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(error => {
          console.log(error)
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 1000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
