const systemStore = {
  namespaced: true,
  state: {
    logo: '',
    versionMode: ''
  },
  mutations: {
    setSystemLogo(state, { logo }) {
      state.logo = logo
    },
    setVersionMode(state, { versionMode }) {
      state.versionMode = versionMode
    }
  }
}

export default systemStore
