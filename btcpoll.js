const fs = require('fs')
const axios = require('axios');
const moment = require('moment');

const path = require('path');
const dirPath = path.join(__dirname, ".");
const fileToWrite = dirPath + "/public/historical"
const fileToRead = dirPath + "/public/historical"


// get btc/usd and btc/eur daily rate
async function BTCDaily() {
    let url = "https://api.coingecko.com/api/v3/coins/bitcoin/history?localization=false&date="

    const yesterday = moment().subtract(1, 'days') // YYYY-MM-DD
    const reverse = yesterday.format('DD-MM-YYYY')

    // format is YYYY-MM-DD
    const dbdate = yesterday.format('YYYY-MM-DD')
    let full_url = url + reverse
    let row = {}
    //console.log("db date: ", dbdate)
    //console.log("new date format:  ", reverse, "\n")

    await axios.get(full_url).then(
        async function(response) {
            // console.log("full url: ", full_url)
            const data = await response.data;
            const btcusd = data['market_data']['current_price']['usd']
            const btceur = data['market_data']['current_price']['eur']
            const satsrate = 100000000
            const sateur = parseInt(satsrate / btceur)
            const usdsat = parseInt(satsrate / btcusd)

            row = {
                btcusd_rate: parseInt(btcusd),
                date: dbdate,
                usdsat_rate: usdsat,
                sateur_rate: sateur,
                btceur_rate: parseFloat(btceur).toFixed(2),
            }
            console.log("row data: ", row)
        })
    return row
}

// update file in the target github repo
async function updateFile() {
    const row = await BTCDaily()
    //const row = []

    if (Object.keys(row).length > 0) {
        //console.log("dirpath", dirPath)
        //console.log("dirname", __dirname)
        const original = await fs.readFileSync(fileToRead)
        let orig = JSON.parse(original)
        //console.log(orig[0])
        orig.push(row)
        //console.log(orig[orig.length - 1])
        const new_content = JSON.stringify(orig)
        await fs.writeFileSync(fileToWrite, new_content);
    }
}

module.exports = {

    // start here
    main: async function () {
        console.log("starting btcpoll script for sateur....")
        let result = updateFile();
        console.log(result)
        return true
    }
}


//const res = main()
//console.log('Result from main() : ', res)


