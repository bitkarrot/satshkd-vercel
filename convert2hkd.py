import json

# TODO: convert this to node.js conversion

path = "./public/"

def convert():
    try:
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
            i['btchkd_rate'] = float(whole_price)*7.75
            
        print(jlist[len(jlist)-1])

        with open(path + 'static/hkd_historical', 'w') as output:
            output.write(json.dumps(jlist))
        output.close()
       
    except Exception as e:
        print("Exception" + e)

if __name__ == "__main__":

    convert()
