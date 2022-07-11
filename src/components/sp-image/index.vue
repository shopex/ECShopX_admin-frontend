<style lang="scss">
.sp-image {
  display: block;
  object-fit: contain;
}
</style>

<script>
import dImage from '@/assets/imgs/default.jpg'
import { isNumber, isString } from '@/utils'
export default {
  name: 'SpImage',
  props: {
    src: String,
    width: [Number, String],
    height: [Number, String]
  },
  render () {
    const { src, width, height } = this
    const _width = isString(width) ? width : `${width}px`
    const _height = isString(height) ? height : `${height}px`
    return (
      <img
        class={'sp-image'}
        src={src || dImage}
        style={{
          width: _width,
          height: _height
        }}
      />
    )
  }
}
</script>
