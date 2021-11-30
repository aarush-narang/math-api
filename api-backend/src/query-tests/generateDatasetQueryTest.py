import requests
import json

"""
This query shows an application of the "generatePoints" query and how the request is sent and parsed.
"""
def main():
    min = 1
    max = 100
    length = 100
    usefloat = True
    precision = 4

    

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """
    res = requests.get('http://localhost:3001/graphql', data={'query': f'{{ generateDataset(min: {min}, max: {max}, length: {length}, float: {usefloat}, precision: {precision}) {{ values }} }}'}) 
    res = json.loads(res.content.decode())['data']['generateDataset']

    roots = res['roots']
    print(roots)
    


if __name__ == '__main__':
    main()