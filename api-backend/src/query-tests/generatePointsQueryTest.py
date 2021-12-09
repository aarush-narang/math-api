import matplotlib.pyplot as plt
import numpy as np
import requests
import json
from scipy.interpolate import make_interp_spline

"""
This query shows an application of the "generatePoints" query and how the request is sent and parsed.
"""
def polynomial():
    length = 200 # number of points returned
    eq = [25, -10, 5] # coefficients of the equation in ascending order of power
    spread = 700 # relative distance the points will be from the line
    minX = -20 # minimum x value
    maxX = 20 # maximum x value
    graphType = 'poly'

    x = np.linspace(minX, maxX, length)
    y = 5*x**2 - 10*x + 25
    plt.figure(figsize = (12, 6))

    plt.plot(x, y) # plot the line
    plt.title('Testing Equation Plotting: Polynomials') # labels
    plt.xlabel('x-values')
    plt.ylabel('y-values')
    plt.grid(alpha =.6, linestyle ='--') # grid

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """

    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ generatePoints(spread: {spread}, length: {length}, equation: {eq}, minX: {minX}, maxX: {maxX}, graphType: {graphType}) {{ xvalues yvalues }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    points = res['data']['generatePoints']
    xvals = points['xvalues']
    yvals = points['yvalues']

    plt.scatter(xvals, yvals)
    plt.show()

def log():
    length = 100 # number of points returned
    eq = [1, 2, 3, 100, 5] # coefficients of the equation
    spread = 3 # relative distance the points will be from the line
    minX = -30 # minimum x value
    maxX = 1000 # maximum x value
    graphType = 'log'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Log Function') # labels
    plt.xlabel('x-values')
    plt.ylabel('y-values')
    plt.grid(alpha =.6, linestyle ='--') # grid

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """

    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ generatePoints(spread: {spread}, length: {length}, equation: {eq}, minX: {minX}, maxX: {maxX}, graphType: {graphType}) {{ xvalues yvalues }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    points = res['data']['generatePoints']
    xvals = points['xvalues']
    yvals = points['yvalues']

    x = np.array(xvals)
    y = (eq[0] * (np.log((eq[2] * x) + eq[3]) / np.log(eq[1]))) + eq[4] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def logistic():
    length = 100 # number of points returned
    eq = [100, 1, 1, -2] # coefficients of the equation
    spread = 20 # relative distance the points will be from the line
    minX = -100 # minimum x value
    maxX = 100 # maximum x value
    graphType = 'logistic'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Logistic Function') # labels
    plt.xlabel('x-values')
    plt.ylabel('y-values')
    plt.grid(alpha =.6, linestyle ='--') # grid

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """

    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ generatePoints(spread: {spread}, length: {length}, equation: {eq}, minX: {minX}, maxX: {maxX}, graphType: {graphType}) {{ xvalues yvalues }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    points = res['data']['generatePoints']
    xvals = points['xvalues']
    yvals = points['yvalues']

    x = np.array(xvals)
    y = eq[0] / (eq[1] + (eq[2] * np.exp(eq[3] * x))) # finds y values from x values. this may give an overflow warning because the value can get very large/small

    # spline = make_interp_spline(x, y) # makes graph curvy
    # newX = np.linspace(x.min(), x.max(), 600)
    # newY = spline(newX)

    plt.plot(x, y) # plot line. this line will look rigid, but you can use the commented code above to make it curvy; however, the commented code above will not make it in the shape of a logistic function properly
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

# more examples will be added soon!

if __name__ == '__main__':
    # polynomial()
    log()
    # logistic()