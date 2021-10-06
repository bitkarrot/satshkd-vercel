from datetime import date
import json
import yaml
import logging
import requests
#import os

logging.basicConfig(filename='satshkd.log', level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logging.getLogger('satslogger').setLevel(level=logging.WARNING)
logger = logging.getLogger(__name__)


def del_years(d, years):
    """
    Return a date that's `years` years after the date (or datetime)
    object `d`. Return the same calendar date (month and day) in the
    destination year, if it exists, otherwise use the following day
    (thus changing February 29 to March 1).

    """
    try:
        return d.replace(year = d.year - years)
    except ValueError:
        return d + (date(d.year + years, 1, 1) - date(d.year, 1, 1))


# generate 10 year historical prices based on today's date
def get_10year(lang):
    #  path = '/home/bitkarrot/satshkd/static/hkd_historical'
    path = './public/static/hkd_historical'
    filep = open(path)
    historical = json.load(filep)
    hist_entries = []

    datelist = []
    years = list(range(1,11))
    for i in years:
        adate = str(del_years(date.today(), i))
        datelist.append(adate)

    for entry in historical:
        if entry['date'] in datelist:
            hist_entries.append(entry)
    hist_entries.reverse()

    final_list = []
    today_sats = get_bitfinex_rate()

    i = 1
    text_array = []
    if lang == 'zh-cn' or lang == 'zh-hk':
        text_array.append('年前')
        text_array.append('年前')
    elif lang =='en':
        text_array.append("year ago")
        text_array.append("years ago")


    for entry in hist_entries:
        year = entry['date']
        rawsat = entry['sathkd_rate']
        sats = "{:,}".format(rawsat)
        percentage = -100 * (rawsat - today_sats)/rawsat
        strp = "{:.3f}".format(percentage) + "%"
        # print(f'year: {year} sats: {sats} percent: {strp}')
        if i == 1:
            aset = {'year' : f"{i} {text_array[0]}", 'sats': sats + " sats", 'percent': strp}
        else:
            aset = {'year' : f"{i} {text_array[1]}", 'sats': sats + " sats", 'percent': strp}
        final_list.append(aset)
        i = i + 1
    return final_list


def get_bitfinex_rate():
    try:
        path = "./"
        rates_file = path + 'rates.yml'

        with open(rates_file, 'rb') as f:
            doc = yaml.load(f, Loader=yaml.FullLoader)
            sort_file = yaml.dump(doc, sort_keys=True)
        f.close()

        hkdrate = doc['hkdrate']

        satDenominator = 100000000
        btcDataURL =  "https://api-pub.bitfinex.com/v2/ticker/tBTCUSD"

        '''
        cmd = "wget " + btcDataURL
        print("command: " + cmd)
        ret = os.system(cmd)
        print('returned value: ', ret)
        '''

        btcRates = requests.get(btcDataURL).json()
        btcLastPrice = btcRates[6]

        sathkd = round((1/btcLastPrice)*satDenominator*hkdrate)
        # print(f'bitfinex last price: {btcLastPrice}, current sat rate: {sathkd}')
        return sathkd

    except Exception as e: 
        print("Exception" + e )
        logger.info(e)



# initial test
# rate = get_bitfinex_rate()
# print(f'getting bitfinex rate - initial test: {rate}')


lang = 'zh-cn'
lang = 'zh-hk'
lang = 'en'
final = get_10year(lang)
print(final)

