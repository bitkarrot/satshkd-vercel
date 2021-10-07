const csv = require('csv-parser');
const fs = require('fs');

// this script is to convert the downloaded data 
// 1. get data from site
// bitfinex daily close data: https://www.investing.com/crypto/bitcoin/btc-usd-historical-data
// 2. save as BTC_USD_Bitfinex_HistoricalData.csv
// 3. convert to the format of historical. using convertformat()
// check result. 

// 4. pipe result to new_history, concatenate to historical,
// use mergefiles(), check result

// new file is named historical_merged. copy over the public/static/historical
// convert historical to hkd_historical using other script


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
            var new_json = JSON.stringify(data)
            console.log(new_json)
                // append this to the historical data file. 
            fs.writeFileSync("./archive/new_history", new_json)
                // write to regular csv file: 
                // csvWriter.writeRecords(data).then(() => console.log('CSV file written'))
        })
}

function mergefiles() {
    // merge two files together
    const newhistory = fs.readFileSync('./archive/new_history', { encoding: 'utf8' })
    let newh = JSON.parse(newhistory).reverse()
        //console.log(newh)
    const historical = "./public/static/historical"
    const histcontent = fs.readFileSync(historical, { encoding: 'utf8' })
    let hist = JSON.parse(histcontent)

    const result = JSON.stringify(hist.concat(newh))
    console.log(result)
    fs.writeFileSync("./archive/historical_merged", result)
}


//convertformat()
// run 1st before 2nd command

mergefiles()