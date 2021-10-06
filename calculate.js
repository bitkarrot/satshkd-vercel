const axios = require('axios')
const fs = require('fs');

module.exports = {
    bfx: async function() {
        const btcDataURL = "https://api-pub.bitfinex.com/v2/ticker/tBTCUSD"
        const response = await axios.get(btcDataURL)
        const data = response.data
            //console.log(data[6])

        const satDenominator = 100000000
        const hkdrate = 0.1287 // approximate rate
        btcLastPrice = data[6]
        const sathkd = Math.round((1 / btcLastPrice) * satDenominator * hkdrate)
            //console.log("bitfinex last price: ", btcLastPrice, "current satHKD: ", sathkd)
        return sathkd
    },

    get10yr: async function() {
        console.log("get10yr")
        try {
            // const content = await fs.readFile('./public/static/hkd_historical')
            const content = fs.readFileSync('./public/static/hkd_historical', { encoding: 'utf8' })

            const historical = JSON.parse(content)
            hist_entries = []
            let datelist = []

            // get all the years you need from 1 - 10
            for (let i = 1; i < 11; i++) {
                const y = new Date(new Date().setFullYear(new Date().getFullYear() - i)).toISOString().slice(0, 10)
                datelist.push(y)
            }
            for (let j = 0; j < historical.length; j++) {
                const hdate = historical[j]['date']
                if (datelist.includes(hdate)) {
                    hist_entries.push(historical[j])
                }
            }
            //  console.log(hist_entries)
            let final_list = []
            let today_sats = await this.bfx()
            for (var v = 0; v < hist_entries.length; v++) {
                const date = new Date(hist_entries[v]['date'])
                year = date.getFullYear();
                rawsat = hist_entries[v]['sathkd_rate']
                percentage = (-100 * ((rawsat - today_sats) / rawsat)).toFixed(3)
                final_list.push({ "year": date.toLocaleDateString(), "sats": rawsat.toLocaleString("en-US"), "percent": percentage });
            }
            return final_list.reverse()
        } catch (error) {
            console.error("Error trying to read file ", error)
        }
    }

}