import requests
import json

"""
This query shows an application of the "getStats" query and how the request is sent and parsed.
"""
def main():
    values = [1, 1, 1, 2, 4, 10, 14, 15, 17, 24, 24, 24, 24, 24, 24, 24, 35, 35, 35, 35, 51, 56, 59]


    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """
    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ getStats(values: {values}){{ mean median q1 q3 iqr popsd sampsd skewness max min }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    res = res['data']['getStats']

    print(res)
    

if __name__ == '__main__':
    main()