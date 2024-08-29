import { Component, VNode, h, resolveComponent } from 'vue'
import { RenderVNodeBase } from './types'

/**
 * 向上追溯父节点
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {Node}                            node            节点
 * @param       {(node: ParentNode) => boolean}   condition       条件
 * @param       {number}                          [max]           最大追溯次数
 * @returns     {ParentNode | null}
 */
export const traceParentNode = (
  node: ParentNode,
  condition: (node: Node) => boolean,
  max: number = 10
): ParentNode | null => {
  if (max <= 0 || node.nodeName === '#document') return null
  if (condition(node)) return node
  return traceParentNode(node?.parentNode as ParentNode, condition, max - 1)
}

/**
 * 渲染虚拟节点
 * ```md
 *  1、对每一个组件配置项进行递归渲染成虚拟节点
 *  2、保证每个组件的插槽可用
 *  3、对于不存在响应式变量的虚拟节点进行静态提升，减少渲染次数
 *  4、对于组件配置项中的事件进行缓存优化
 *  5、使用Fragment将多个虚拟节点合并成一个虚拟节点，减少层级结构
 *  6、支持v-model的简写，且支持多个v-model
 *  7、支持v-if、v-else-if、v-else等多个指令
 *  8、支持一个对象有一个作用域来存储上下文
 *  9、支持对象之间的上下文继承关系，也可以跨对象层级获取上下文
 * ```
 * @param name
 * @param props
 * @param children
 * @returns
 */
export const renderVNode = (
  name: string | Component | VNode,
  props?: Record<string, any>,
  children?: RenderVNodeBase[]
): VNode | null => {
  if (!name) return null
  const _this = this as any
  return (() => {
    const component = typeof name === 'string' ? resolveComponent(name) : name
    return h(component, props, {
      default: () => children?.map((v) => renderVNode(v.name, v.props, v.children))
    })
  }).call(_this)
}
