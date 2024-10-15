<template>
  <component :is="type" v-bind="{ ...props.props, ...$attrs }" v-on="events">
    <template v-if="isValidArray(children)">
      <u-model-comp
        @change="onChange"
        v-bind="child"
        v-for="(child, index) in children"
        :key="`${String(uid)}-${index}`"
      />
    </template>
    <u-model-comp v-else-if="isValidPlainObject(children)" @change="onChange" v-bind="children" />
    <span v-else-if="isString(children)" v-html="children"></span>

    <template #[slotName]="data" v-for="(val, slotName, index) in slots" :key="`${String(uid)}-${slotName}-${index}`">
      <component v-if="isVueComponent(val)" :is="val" @change="onChange" />
      <u-model-comp v-else-if="isValidPlainObject(val)" @change="onChange" v-bind="val" />
      <u-model-comp v-else-if="isFunction(val)" @change="onChange" v-bind="val(data)" />
      <span v-else-if="isString(val)" v-html="val"></span>
    </template>
  </component>
</template>

<script setup lang="ts">
import { isString, isFunction } from 'lodash'
import { StructCompEmits, StructCompProps } from './types'
import {
  defineAsyncComponent,
  getCurrentInstance,
  onActivated,
  onBeforeMount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated
} from 'vue'
import { isValidArray, isValidPlainObject, isVueComponent } from '@/core'

const UModelComp = defineAsyncComponent(() => import('./model-comp.vue'))

defineOptions({
  inheritAttrs: false,
  name: 'UStructComp'
})
const instance = getCurrentInstance()
const props = withDefaults(defineProps<StructCompProps>(), {})
const emits = defineEmits<StructCompEmits>()

props.hooks?.beforeCreate && isFunction(props.hooks.beforeCreate) && props.hooks.beforeCreate.call(instance)
props.hooks?.created && isFunction(props.hooks.created) && props.hooks.created.call(instance)

props.hooks?.beforeMount &&
  isFunction(props.hooks.beforeMount) &&
  onBeforeMount(() => props.hooks?.beforeMount.call(instance))
props.hooks?.mounted && isFunction(props.hooks.mounted) && onMounted(() => props.hooks?.mounted.call(instance))
props.hooks?.unmounted && isFunction(props.hooks.unmounted) && onUnmounted(() => props.hooks?.unmounted.call(instance))

props.hooks?.beforeUpdate &&
  isFunction(props.hooks.beforeUpdate) &&
  onBeforeUpdate(() => props.hooks?.beforeUpdate.call(instance))
props.hooks?.updated && isFunction(props.hooks.updated) && onUpdated(() => props.hooks?.updated.call(instance))

props.hooks?.activated && isFunction(props.hooks.activated) && onActivated(() => props.hooks?.activated.call(instance))
props.hooks?.deactivated &&
  isFunction(props.hooks.deactivated) &&
  onDeactivated(() => props.hooks?.deactivated.call(instance))

props.hooks?.renderTracked &&
  isFunction(props.hooks.renderTracked) &&
  onRenderTracked((...args: any[]) => props.hooks?.renderTracked.call(instance, ...args))
props.hooks?.renderTriggered &&
  isFunction(props.hooks.renderTriggered) &&
  onRenderTriggered((...args: any[]) => props.hooks?.renderTriggered.call(instance, ...args))

onErrorCaptured((err, vm, info) => {
  console.error(`${props.type}-${instance?.uid}：`, err, vm, info)
  if (props.hooks?.errorCaptured && isFunction(props.hooks?.errorCaptured))
    props.hooks?.errorCaptured.call(instance, err, vm, info)
  return false // 阻止错误向上传播
})
</script>
