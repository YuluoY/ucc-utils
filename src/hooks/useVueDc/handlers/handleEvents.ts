import { isEmpty, isFunction, isPlainObject } from 'lodash'
import { ModelCompProps } from '../types'

interface IHandleEventsResult {
  newEvents: Record<string, any>
}

export default function handleEvents(this: ModelCompProps): IHandleEventsResult {
  const newEvents = {} as IHandleEventsResult['newEvents']
  if (isPlainObject(this.events) && !isEmpty(this.events)) {
    for (const key in this.events) {
      // eslint-disable-next-line no-prototype-builtins
      if (!this.events.hasOwnProperty(key)) continue
      const event = this.events[key]
      newEvents[key] = isFunction(event) ? event.bind(this) : event
    }
  }

  return {
    newEvents
  }
}
