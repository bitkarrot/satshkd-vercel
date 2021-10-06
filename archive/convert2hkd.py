import json
import requests
import logging

logging.basicConfig(filename='rates.log', level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logging.getLogger('rateslogger').setLevel(level=logging.WARNING)
logger = logging.getLogger(__name__)

path = "./"

def convert():
    try:
        # grab file from original site
        r = requests.get("http://usdsat.com/historical")
        with open(path + "static/historical", "wb") as f: 
            f.write(r.content)
        f.close()
        
        # convert to hkd
        my_file = open(path + 'static/historical', 'rt')
        lines = my_file.read()
        my_file.close()
        jlist = json.loads(lines)
        
        print(len(jlist))

        
        # we don't need exact rate for historical
        # just a ball park rate is sufficient for the amts
        for i in jlist:
            print(i)
            price = i['usdsat_rate']
            i['sathkd_rate'] = int(price/7.75)
            whole_price = i['btcusd_rate']
            i['btchkd_rate'] = whole_price*7.75
            


        print(jlist[len(jlist)-1])
        logger.info(jlist[len(jlist)-1])

        with open(path + 'static/hkd_historical', 'w') as output:
            output.write(json.dumps(jlist))
        output.close()
       
    except Exception as e:
        print("Exception" + e)
        logger.info(e)
        logger.info("Something unexpected occurred!")



if __name__ == "__main__":

    convert()
