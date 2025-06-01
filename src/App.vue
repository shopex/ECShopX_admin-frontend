<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { useTheme } from '@/composables'
export default {
  data() {
    return {
      throttleTimer: null
    }
  },
  computed: {
    ...mapGetters(['isInFrame'])
  },
  mounted() {
    const { updateThemeColor } = useTheme()
    updateThemeColor()
  },
  methods: {}
}
</script>

<style lang="scss"></style>
