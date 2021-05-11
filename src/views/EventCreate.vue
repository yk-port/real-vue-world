<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event is created by {{ user.id }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['user', 'categories']),
}
</script>

<style lang="scss"></style>
