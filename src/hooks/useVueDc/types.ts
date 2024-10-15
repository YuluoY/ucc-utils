import { Component, ComponentInternalInstance, Reactive, Ref } from 'vue'

export interface ModelCompProvide<T = any> {
  key: string
  value?: T
}

export type ModelCompType = string | Component | Function | null

type LifecycleHookKeys =
  | 'beforeCreate'
  | 'created'
  | 'beforeMount'
  | 'mounted'
  | 'beforeUpdate'
  | 'updated'
  | 'beforeUnmount'
  | 'unmounted'
  | 'activated'
  | 'deactivated'
  | 'errorCaptured'
  | 'renderTracked'
  | 'renderTriggered'

// 定义所有内置指令的键
type DirectiveKeys =
  | 'v-bind'
  | 'v-if'
  | 'v-else'
  | 'v-else-if'
  | 'v-for'
  | 'v-on'
  | 'v-show'
  | 'v-model'
  | 'v-cloak'
  | 'v-pre'
  | 'v-html'
  | 'v-text'
  | 'v-slot'

export interface ModelCompInnerPropsModelValue<T = any> {
  path: string
  value?: T
}

export interface ModelCompInnerProps<T = any> {
  [key: string]: any
  modelValue?: ModelCompInnerPropsModelValue<T>
}

export interface ModelCompProps<T = any> {
  modelValues?: string | Record<string, any>
  namespace?: string

  provide?: ModelCompProvide<T>
  inject?: string | symbol

  type?: ModelCompType
  props?: ModelCompInnerProps
  children?: ModelCompProps<T>[]

  events?: Record<string, Function>
  slots?: Record<string, Function>
  hooks?: Record<LifecycleHookKeys, Function>
  directives?: Record<DirectiveKeys, any>
}

export interface ModelCompEmits {
  (e: 'update:modelValues', value: ModelCompProps['modelValues']): void
  (e: 'change', evt: Event): void
}

export interface ModelCompRootExposes {
  [key: string]: any
}

export interface ModelCompExposes<T = any> {
  $root: Record<string, ModelCompProps['modelValues']>
  uid: string
  instance: ComponentInternalInstance | null
  injectData: Readonly<ModelCompProvide<T>['value']> | null
  modelValue: Readonly<Ref<any>>
  modelValues: Readonly<Reactive<Record<keyof ModelCompProps['modelValues'] | string, any>>>

  setModelValue: (value: any) => void
  setModelValues: (value: Record<keyof ModelCompProps['modelValues'] | string, any>) => void
  setModelValuesByPath: (path: string | string[], value: any) => void
  onRefresh: (val: boolean, timeout?: number) => void
  onShow: (val: boolean) => void
  updateInnerProps: (newProps: keyof ModelCompProps['props']) => void
}

type StructCompExtendsProps = Omit<ModelCompProps, 'modelValues' | 'namespace' | 'provide' | 'inject'>

export interface StructCompProps extends StructCompExtendsProps {
  uid: string
}

export interface StructCompEmits {
  (e: 'change', evt: Event): void
}
