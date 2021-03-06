<template>
  <div>
    <!-- $route.params.id -->
    <h1>Showing event {{ event.title }}</h1>
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
