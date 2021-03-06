<template>
  <div>
    <h1>Event listing</h1>
    <router-link :to="{ name: 'event-show', params: { id: 1 } }">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </router-link>
  </div>
</template>

<script>
import { EventCard } from '@/components'

// 直接axiosを呼び出す方法
// import axios from 'axios'

// 別ファイルからaxiosインスタンスを呼び出す方法
import EventService from '@/services/EventService.js'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    // 直接axiosを呼び出す方法
    // axios
    //   .get('http://localhost:3000/events')

    // 別ファイルからaxiosインスタンスを呼び出す方法
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>

<style lang="scss" scoped></style>
