<template>
  <div class="bg-white h-full px-10 py-10 relative flex flex-col justify-center">
    <div v-loading="true" />
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      code:''
    }
  },
  async mounted() {
    this.init()
  },
  methods: {
    init() {
      let { code } = this.$route.query
      this.code = code
      if (!this.code) {
        this.$message({
          message: '登录失败，缺失code！',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      this.handleLogin()
    },
    async handleLogin() {
      try {
        const { token } = await this.$api.auth.shunyunLogin({ code: this.code })
        if (token) {
          const tokenArray = token.split('.')
          const { menu_type } = JSON.parse(atob(tokenArray[1]))
          this.$store.commit('system/setVersionMode', { versionMode: menu_type })
          this.$store.commit('user/setToken', { token })
          this.$store.commit('user/setLoginType', { login_type: 'admin' })
          this.$message.success('登录成功')
          await this.$store.dispatch('user/fetchAccessMenus')
          await this.$store.dispatch('user/fetchAccountInfo')
          // this.$router.push('/')
          setTimeout(() => {
            window.location.href = '/'
            // this.$router.push('/')
          }, 700)
        }
      } catch (error) {
        // console.error('登录失败:', error)
        // this.$message.error(error.message || '登录失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
