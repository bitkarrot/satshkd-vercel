const csv = require('csv-parser');
const fs = require('fs');

// this script is to convert the downloaded data 
// 1. get data from site
// bitfinex daily close data: https://www.investing.com/crypto/bitcoin/btc-usd-historical-data
// 2. save as BTC_USD_Bitfinex_HistoricalData.csv, 
// convert to the format of historical. using convertformat()
// pipe result to new_history, concatenate to historical,
// new file is named historical_merged. copy over the public/static/historical
// convert historical to hkd_historical

function convertformat() {

    const filepath = "./archive/BTC_USD_Bitfinex_HistoricalData.csv"
    let data = []

    fs.createReadStream(filepath, 'utf-8', { headers: true })
        .on('error', () => {
            // handle error
        })
        .pipe(csv())
        .on('data', (row) => {
            //       console.log(row);
            var keys = Object.keys(row)
            var price = row["Price"].replace(',', '')
            let entry = {
                "btcusd_rate": parseFloat(price),
                "date": new Date(row[keys[0]]).toISOString().split('T')[0],
                "usdsat_rate": parseInt((100000000 / parseFloat(price)).toFixed(0))
            }
            data.push(entry)
        })
        .on('end', () => {
            // console.log(data)
            var new_history = JSON.stringify(data)
            console.log(new_history)
            fs.writeFileSync("./archive/new_history", new_history)
            let newh = JSON.parse(new_history).reverse()

            // get original historical data file. concat new dates
            // no logic handled here for date overlap
            const historical = "./public/static/historical"
            const histcontent = fs.readFileSync(historical, { encoding: 'utf8' })
            let hist = JSON.parse(histcontent)

            const result = JSON.stringify(hist.concat(newh))
            console.log(result)
            fs.writeFileSync("./archive/historical_merged", result)
                // delete old historical
            fs.copyFile('./archive/historical_merged', './public/static/historical', (err) => {
                if (err) throw err;
                console.log('./archive/historical_merged was copied to ./public/static/historical');
            });

        })
}


function hkdrate() {
    const hkdusd_rate = 7.75
    const historical = "./public/static/historical"
    const histcontent = fs.readFileSync(historical, { encoding: 'utf8' })
    let hist = JSON.parse(histcontent)

    let hkdData = []
    hist.forEach(function(entry) {
        newEntry = {
            "btcusd_rate": entry['btcusd_rate'],
            "date": entry['date'],
            "usdsat_rate": entry['usdsat_rate'],
            "sathkd_rate": parseInt(entry['usdsat_rate'] / hkdusd_rate).toFixed(0),
            "btchkd_rate": parseFloat(entry['btcusd_rate'] * hkdusd_rate).toFixed(2),
        }
        hkdData.push(newEntry)
    })
    console.log(hkdData)
    const hkdHistorical = JSON.stringify(hkdData)
    fs.writeFileSync("./public/hkd_historical", hkdHistorical)

}

// first run convertformat then run hkdrate
// convertformat()

hkdrate()