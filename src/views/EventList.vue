<template>
  <div>
    <h1>Event listing</h1>
    <router-link :to="{ name: 'event-show', params: { id: 1 } }">
      <EventCard />
    </router-link>
  </div>
</template>

<script>
import { EventCard } from '@/components'

export default {
  components: {
    EventCard
  }
}
</script>

<style lang="scss" scoped></style>
