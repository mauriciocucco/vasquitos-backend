import cron from 'node-cron'

export const healthCheck = () => {
  // Schedule tasks to be run on the server.
  cron.schedule('*/10 * * * *', function () {
    console.log('Health check running every 10 minutes')
  })
}
