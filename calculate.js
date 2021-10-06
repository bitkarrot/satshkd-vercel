const axios = require('axios')

module.exports = {
    bfx: async function() {
        const btcDataURL = "https://api-pub.bitfinex.com/v2/ticker/tBTCUSD"
        const response = await axios.get(btcDataURL)
        const data = response.data
        console.log(data[6])

        const satDenominator = 100000000
        const hkdrate = 0.1287
        btcLastPrice = data[6]
        const sathkd = Math.round((1 / btcLastPrice) * satDenominator * hkdrate)
        console.log("bitfinex last price: ", btcLastPrice, "current satHKD: ", sathkd)
        return data
    },

    get10yr: function(lang) {
        console.log("get10yr language: ", lang)
        return true
    }

}