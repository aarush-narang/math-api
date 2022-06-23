import requests
import json

"""
This query shows an application of the "getPercentile" query and how the request is sent and parsed.
"""
def main():
    min = 84.77
    max = 100
    sd = 9
    mean = 80

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """
    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ getPercentile(min: {min}, max: {max}, sd: {sd} mean: {mean}){{ zscores percentile }} }}'}, headers={'X-API-Key': '1234'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    res = res['data']['getPercentile']

    print(res)
    

if __name__ == '__main__':
    main()