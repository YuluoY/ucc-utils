import { defineAsyncComponent, defineComponent, h } from 'vue'

export default function useVueDC(props: any) {
  const ModelComp = defineComponent({
    render() {
      return h(
        defineAsyncComponent(() => import('./model-comp.vue')),
        props
      )
    }
  })
  return {
    ModelComp
  }
}
