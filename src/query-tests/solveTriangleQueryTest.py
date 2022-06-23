import requests
import json

"""
This query shows an application of the "solveTriangle" query and how the request is sent and parsed.
"""
def main():
    s1 = 4
    s2 = 'null' # null has to be used in strings because GraphQL can't interpret None
    s3 = 'null'
    a1 = 'null'
    a2 = 60
    a3 = 60

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """
    
    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ solveTriangle(sides: [{s1}, {s2}, {s3}], angles: [{a1}, {a2}, {a3}]) {{ sides angles area perimeter semiPerimeter heights medians name }} }}'}, headers={'X-API-Key': '1234'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    res = res['data']['solveTriangle']

    print(res)
    

if __name__ == '__main__':
    main()