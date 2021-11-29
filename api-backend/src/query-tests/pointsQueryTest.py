import matplotlib.pyplot as plt
import numpy as np
import requests
import json

def main():
    length = 200 # number of points returned
    eq = [25, -10, 5] # coefficients of the equation in ascending order of power
    spread = 1200 # relative distance the points will be from the line
    minX = -20 # minimum x value
    maxX = 20 # maximum x value

    x = np.linspace(minX, maxX, length)
    y = 5*x**2 - 10*x + 25 
    plt.figure(figsize = (12, 6))

    plt.plot(x, y) # plot the line
    plt.title('Testing equation plotting') # labels
    plt.xlabel('x-values')
    plt.ylabel('y-values')
    plt.grid(alpha =.6, linestyle ='--') # grid

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """

    vals = requests.get('http://localhost:3001/graphql', data={'query': f'{{ generatePoints(spread: {spread}, length: {length}, equation: {eq}, minX: {minX}, maxX: {maxX}) {{ xpoints ypoints }} }}'}) 
    vals = json.loads(vals.content.decode())

    points = vals['data']['generatePoints']
    xvals = points['xpoints']
    yvals = points['ypoints']
    plt.scatter(xvals, yvals)

    plt.show()

if __name__ == '__main__':
    main()