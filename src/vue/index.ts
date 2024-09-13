import { App, Plugin } from 'vue'
import components from './components'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(component: T, onBeforeInstall?: (app: App) => void) {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    if (onBeforeInstall) {
      onBeforeInstall(app)
    }
    return app.component((component as any).name, component as Plugin)
  }
  return component as SFCWithInstall<T>
}

export default {
  withInstall,
  components
}
