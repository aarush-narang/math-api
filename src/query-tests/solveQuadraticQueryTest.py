import requests
import json

"""
This query shows an application of the "solveQuadratic" query and how the request is sent and parsed.
"""
def main():
    # real rational roots
    a1 = 1
    b1 = 4
    c1 = 4
    # imaginary roots
    a2 = 1
    b2 = -4
    c2 = 5

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.

    This quadratic solver can return real, rational roots
    """
    res1 = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ solveQuadratic(a: {a1}, b: {b1}, c: {c1}){{ roots vertex yIntercept }} }}'}, headers={'X-API-Key': '1234'}).content.decode())
    if(res1.get('errors')): return print(res1['errors']) # make sure to catch errors

    res1 = res1['data']['solveQuadratic']

    print(res1)

    """
    As well as imaginary roots
    """
    res2 = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ solveQuadratic(a: {a2}, b: {b2}, c: {c2}){{ roots vertex yIntercept }} }}'}, headers={'X-API-Key': '1234'}).content.decode())
    if(res2.get('errors')): return print(res2['errors']) # make sure to catch errors

    res2 = res2['data']['solveQuadratic']

    print(res2)
    

if __name__ == '__main__':
    main()