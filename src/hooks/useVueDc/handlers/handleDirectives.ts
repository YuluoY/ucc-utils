import { isBoolean, isFunction, isPlainObject } from 'lodash'
import { getCurrentInstance, ref } from 'vue'
import { ModelCompProps } from '../types'

interface IHandleDirectivesOpts {
  uid?: string
  instance?: any
}

/**
 * 处理指令
 */
export default function handleDirectives(this: ModelCompProps, opts: IHandleDirectivesOpts = {}) {
  const { uid, instance = getCurrentInstance() } = opts
  const vif = ref(true)
  const vshow = ref(true)
  let prevDisplay = ''

  if (isPlainObject(this.directives)) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.directives!.hasOwnProperty('v-if')) {
      if (isFunction(this.directives!['v-if'])) vif.value = this.directives!['v-if'].call(instance)
      else if (isBoolean(this.directives!['v-if'])) vif.value = this.directives!['v-if']
    }
  }

  /**
   * 刷新组件的v-if状态
   * @param {boolean}     val     新状态值
   * @param {number}      time    延迟时间，单位毫秒
   */
  const onRefresh = (val: boolean, time: number = 0) => setTimeout(() => (vif.value = val ?? !vif.value), time)

  /**
   * 切换组件的v-show状态
   * @param {boolean}     val     新状态值
   */
  const onShow = (val: boolean) => {
    vshow.value = val ?? !vshow.value
    const el = document.querySelector(`[data-uid="${uid}"]`) as HTMLElement
    if (!el) return
    if (vshow.value) el.style.display = prevDisplay
    else {
      prevDisplay = el.style.display
      el.style.display = 'none'
    }
  }

  return {
    vif,
    vshow,
    onRefresh,
    onShow
  }
}
