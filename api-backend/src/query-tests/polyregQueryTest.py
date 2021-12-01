import requests
import json

"""
This query shows an application of the "getPolyReg" query and how the request is sent and parsed.
"""
def main():
    x = [1, 2, 3, 4, 5]
    y = [1, 2, 3, 4, 5]
    highestDegree = 1


    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """
    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ getPolyReg(x: {x}, y: {y}, highestDegree: {highestDegree}){{ coefficients equation scores }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    res = res['data']['getPolyReg']

    print(res)
    

if __name__ == '__main__':
    main()