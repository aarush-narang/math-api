import requests
import json

"""
This query shows an application of the "generateDataset" query and how the request is sent and parsed.
"""
def main():
    min = 1
    max = 100
    length = 10
    usefloat = 'true' # boolean has to be in string because GraphQL can't interpret python's True
    precision = 4

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """
    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ generateDataset(min: {min}, max: {max}, length: {length}, float: {usefloat}, precision: {precision}) {{ values }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    res = res['data']['generateDataset']

    print(res)
    

if __name__ == '__main__':
    main()