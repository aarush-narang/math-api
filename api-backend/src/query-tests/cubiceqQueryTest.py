import requests
import json

"""
This query shows an application of the "solveCubic" query and how the request is sent and parsed.
"""
def main():
    y = 0
    a = 1
    b = 5
    c = -18
    d = -72

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """
    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ solveCubic(y: {y}, a: {a}, b: {b} c: {c}, d: {d}){{ roots yIntercept }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    res = res['data']['solveCubic']

    print(res)
    

if __name__ == '__main__':
    main()