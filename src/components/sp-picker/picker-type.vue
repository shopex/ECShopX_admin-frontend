<script>
import { PickerImage } from './pickers'

function resolvePicker (type) {
  switch (type) {
    case 'pickerImage':
      return PickerImage
    default:
      throw new Error(`picker: ${type} not registered`)
    // break
  }
}

export default {
  functional: true,

  render (h, ctx) {
    const { type } = ctx.props.value
    const data = {
      ...ctx.data,
      value: ctx.data.attrs.value
    }
    console.log(`picker type data:`, data)
    return h(resolvePicker(type), data, ctx.children)
  },

  resolvePickerConfig (type) {
    const Picker = resolvePicker(type)
    return Picker.config || {}
  }
}
</script>
