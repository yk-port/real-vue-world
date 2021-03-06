<template>
  <div>
    <!-- $route.params.id -->
    <h1>Showing event {{ event.title }}</h1>
  </div>
</template>

<template>
  <div>
    <div class="event-header">
      <!-- idを取得するときは→の方法でもいける $route.params.id -->
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map"><h2>Location</h2></BaseIcon>
    <address>{{ event.location }}</address>
    <h2>Event details</h2>
    <p>{{ event.description }}</p>
    <h2>
      Attendees
      <span class="badge -fill-gradient">{{ event.attendees.length }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
// 別ファイルからaxiosインスタンスを呼び出す方法
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data() {
    return {
      event: {}
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>

<style lang="scss" scoped></style>
