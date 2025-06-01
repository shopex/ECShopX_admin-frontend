import bbc from './products/bbc'
import yd from './products/yd'

const PRODUCTS_CONFIG = {
  yd: yd,
  bbc: bbc
}

const DEFAULT_CONFIG = {
  recoder_number: '沪ICP备05002918号',
  ...PRODUCTS_CONFIG[process.env.VUE_APP_PLATFORM]
}

export default DEFAULT_CONFIG
