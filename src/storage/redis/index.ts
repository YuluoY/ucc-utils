import redis from 'redis'
import type { RedisClientType, RedisClientOptions } from 'redis'

interface RedisOptions extends RedisClientOptions {
  host: string
  port: number
}

interface RedisToTryCatchResult<T = any> {
  status: boolean
  result?: T
  error?: Error | any
}

class Redis {

  host = 'localhost'                  // 服务器地址
  port = 6379                         // 服务器端口
  client!: RedisClientType             // redis 客户端实例

  constructor(opts: RedisOptions) {
    this.setOptions(opts)
    this._init()
  }

  /**
   * 初始化
   */
  _init()
  {
    this.client = redis.createClient({
      url: `redis://${this.host}:${this.port}`
    })
  }

  /**
   * 设置键值对
   * @param   key     键，支持字符串和对象
   * @param   value   值，当 key 为字符串时，value 为值，当 key 为对象时，value 必须为空
   */
  async set(key: string | { [key: string]: any }, value?: any): Promise<RedisToTryCatchResult | RedisToTryCatchResult[] | undefined>{
    if (typeof key === 'string')
      return await this._toTryCatch<string>(this.client.SET, key, value)
    else if (typeof key === 'object' && !Array.isArray(key) && !Buffer.isBuffer(key))
    {
      const result: RedisToTryCatchResult[] = []
      Object.keys(key).forEach(async (k: string) => result.push(await this._toTryCatch(this.client.SET, k, key[k])))
      return result
    }
  }


  /**
   * 设置配置项
   * @param opts 配置项
   */
  setOptions({ host, port }: RedisOptions): Redis {
    host && (this.host = host)
    port && (this.port = port)
    return this
  }

  /**
   * 连接
   */
  async connect(): Promise<RedisToTryCatchResult> {
    return await this._toTryCatch<RedisClientType>(this.client.connect)
  }

  /**
   * 断开连接
   */
  async disconnect(): Promise<RedisToTryCatchResult> {
      return await this._toTryCatch<RedisClientType>(this.client.disconnect)
  }

  /**
   * 重新创建客户端实例
   * @param opts 配置项 
   */
  recreate(opts: RedisOptions): Redis {
    this.setOptions(opts || {})
    this._init()
    return this
  }

  /**
   * 退出
   */
  async quit(): Promise<RedisToTryCatchResult> {
    return await this._toTryCatch<string>(this.client?.QUIT)
  }

  /**
   * 异常捕获
   * @param fn 执行函数
   */
  async _toTryCatch<T = any>(fn: Function, ...args: any[]): Promise<RedisToTryCatchResult<T>> {
    try{
      return {
        status: true,
        result: await fn(args)
      }
    } catch (error: any) {
      console.log(error)
      return {
        status: false,
        error
      }
    }
  }
}

export default Redis