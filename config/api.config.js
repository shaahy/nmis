const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://192.168.1.156/api/v1' : '/nmis/v1'
}