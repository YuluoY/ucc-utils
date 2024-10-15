<template>
  <template v-if="vif">
    <u-struct-comp
      v-if="innerProps?.modelValue ?? false"
      :data-uid="uid"
      :data-model="true"
      @change="onChange"
      v-bind="binds"
      v-model="modelValue"
    />
    <u-struct-comp v-else :data-uid="uid" @change="onChange" v-bind="binds" />
  </template>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, getCurrentInstance, readonly, useAttrs } from 'vue'
import { ModelCompEmits, ModelCompExposes, ModelCompProps } from './types'
import { isEmpty, isPlainObject, isString, merge, pick } from 'lodash'
import { handleDeepTransfer, handleDirectives, handleEvents, handleModelValue } from './handlers'

defineOptions({
  name: 'UModelComp'
})
const UStructComp = defineAsyncComponent(() => import('./struct-comp.vue'))
const props = withDefaults(defineProps<ModelCompProps>(), {})
const emits = defineEmits<ModelCompEmits>()
const ctx = { emits }
const innerProps = computed(() => props.props)
const instance = getCurrentInstance()
const uid = instance?.uid + '' || Math.random().toString(36).substring(2, 9)
const namespace = isString(props?.modelValues) ? props.modelValues : (props.namespace ?? uid)

/*
 * 处理provide / inject
 */
const { injectData, $root } = handleDeepTransfer.call(props, { instance, namespace })

/**
 * 处理events事件
 */
const { newEvents } = handleEvents.call(props)

/**
 * 处理modelValues、modelValue
 */
const { modelValue, modelValues, setModelValue, setModelValues, setModelValuesByPath } = handleModelValue.call(props, {
  ctx,
  $root,
  namespace
})

/**
 * 处理directives指令
 */
const { vif, vshow, onRefresh, onShow } = handleDirectives.call(props, { instance, uid })

const binds = computed(() => ({
  ...pick(props, ['type', 'props', 'children', 'slots', 'hooks', 'directives']),
  events: newEvents,
  uid,
  ...useAttrs()
}))

function onChange(evt: Event) {
  emits('change', evt)
}

function updateInnerProps(newProps: keyof ModelCompProps['props']) {
  if (newProps && isPlainObject(newProps) && !isEmpty(newProps)) merge(innerProps.value, newProps)
}

defineExpose<ModelCompExposes>({
  uid,
  $root,
  instance,
  injectData,
  modelValue: readonly(modelValue),
  modelValues: readonly(modelValues),

  onRefresh,
  onShow,
  setModelValue,
  setModelValues,
  setModelValuesByPath,
  updateInnerProps
})
</script>
