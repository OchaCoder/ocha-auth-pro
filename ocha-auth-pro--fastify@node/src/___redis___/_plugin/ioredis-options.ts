export const ioredisOptions = () => {
  const options = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,

    socketTimeout: 2000,

    connectTimeout: 1000,

    retryStrategy: (attempt: number) => {
      const retryDuration = 1000
      const retryMessage = `:: 🔄 [REDIS::CONNECTION_RETRY] :: Connection attempt #${attempt} in progress — will retry for ${retryDuration}ms.`
      console.log(`${new Date().toISOString() + retryMessage}`)
      // let elapsed = 0
      // const interval = setInterval(() => {
      //   elapsed += 1000
      //   const logRetrying = `:: 🔄 [REDIS::CONNECTION_RETRY] :: Still retrying... [${elapsed}/${retryDuration}ms]`
      //   console.log(`${new Date().toISOString() + logRetrying}`)
      //   if (elapsed >= retryDuration) clearInterval(interval)
      // }, 1000)
      return retryDuration
    },

    enableOfflineQueue: false, // Controls what happens when Redis is completely down.

    maxRetriesPerRequest: 1,
  }
  return options
}
