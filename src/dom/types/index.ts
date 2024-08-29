export interface RenderVNodeBase {
  name: string
  props?: Record<string, any>
  children?: RenderVNodeBase[]
}
