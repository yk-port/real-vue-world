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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
  }
}
</script>

<style scoped>
</style>
