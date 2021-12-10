import matplotlib.pyplot as plt
import numpy as np
import requests
import json
from scipy.interpolate import make_interp_spline

"""
These queries shows applications of the "generatePoints" query and how the requests are sent and parsed. There is an example of each type of graph you can generate points for.
"""
def polynomial(): # any polynomial works, ex: 5*x**2 - 10*x + 25 or 5*x**3 + 0*x**2 - 10*x + 25. As shwon in the second example, 0 can be used as a coefficient. In this case, 0 is in the x^2 value
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

def log(): # [a, b, c, d, e] => f(x) = a*log_b(cx + d) + e
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

def logistic(): # [a, b, c, d] => f(x) = a / b + c * e^(d * x)
    length = 100 # number of points returned
    eq = [1000, 1, 100, -1] # coefficients of the equation
    spread = 200 # relative distance the points will be from the line
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
    x = np.linspace(x.min(), x.max(), length*100) # create many points to make the line as accurate as possible
    y = eq[0] / (eq[1] + (eq[2] * np.exp(eq[3] * x))) # finds y values from x values. this may give an overflow warning because the value can get very large/small

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def sin(): # [a, b, c, d] => f(x) = a * sin(b * x + c) + d
    length = 200 # number of points returned
    eq = [1, 1, 0, 0] # coefficients of the equation
    spread = 0 # relative distance the points will be from the line
    minX = 0 # minimum x value
    maxX = 10 # maximum x value
    graphType = 'sin'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Sin Function') # labels
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

    x = np.linspace(minX, maxX*(1.1), length*50) # in order to not make line jagged, hundreds to thousands of points are needed
    y = (eq[0] * np.sin(eq[1] * (x + eq[2]))) + eq[3] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def cos(): # [a, b, c, d] => f(x) = a * cos(b * x + c) + d
    length = 200 # number of points returned
    eq = [1, 1, 0, 0] # coefficients of the equation
    spread = 0 # relative distance the points will be from the line
    minX = 0 # minimum x value
    maxX = 10 # maximum x value
    graphType = 'cos'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Cos Function') # labels
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

    x = np.linspace(minX, maxX*(1.1), length*50) # in order to not make line jagged, hundreds to thousands of points are needed
    y = (eq[0] * np.cos(eq[1] * (x + eq[2]))) + eq[3] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def tan(): # [a, b, c, d] => f(x) = a * tan(b * x + c) + d
    # this might return less points than you want because some points could have y values in the thousands
    length = 100 # number of points returned
    eq = [1, 1, 0, 0] # coefficients of the equation
    spread = 0 # relative distance the points will be from the line
    minX = 0 # minimum x value
    maxX = 30 # maximum x value
    graphType = 'tan'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Tan Function') # labels
    plt.xlabel('x-values')
    plt.ylabel('y-values')
    plt.grid(alpha =.6, linestyle ='--') # grid

    plt.ylim(-200, 200) # limits to the x and y axis are needed to properly show the graph
    plt.xlim(minX, maxX)

    """
    Below is an example on how you can create a request with GraphQL. The example is URLEncoded but, as shown in server.js, you can also send requests in JSON. 
    See https://graphql.org/learn/serving-over-http/ for more details.
    """

    res = json.loads(requests.get('http://localhost:3001/graphql', data={'query': f'{{ generatePoints(spread: {spread}, length: {length}, equation: {eq}, minX: {minX}, maxX: {maxX}, graphType: {graphType}) {{ xvalues yvalues }} }}'}).content.decode())
    if(res.get('errors')): return print(res['errors']) # make sure to catch errors

    points = res['data']['generatePoints']
    xvals = points['xvalues']
    yvals = points['yvalues']

    x = np.linspace(minX, maxX*(1.1), length*100000) # in order to not make line jagged, hundreds to thousands of points are needed
    y = (eq[0] * np.tan(eq[1] * (x + eq[2]))) + eq[3] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def asin(): # [a, b, c, d] => f(x) = a * asin(b * x + c) + d
    length = 100 # number of points returned
    eq = [1000, 0.001, 0, 0] # coefficients of the equation.
    spread = 400 # relative distance the points will be from the line
    minX = -1/eq[1] # minimum x value
    maxX = 1/eq[1] # maximum x value
    graphType = 'asin'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Arcsin Function') # labels
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

    x = np.linspace(minX, maxX, length*100) # in order to not make line jagged, hundreds to thousands of points are needed
    y = (eq[0] * np.arcsin(eq[1] * (x + eq[2]))) + eq[3] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def acos(): # [a, b, c, d] => f(x) = a * acos(b * x + c) + d
    length = 100 # number of points returned
    eq = [1000, 0.001, 0, 0] # coefficients of the equation.
    spread = 400 # relative distance the points will be from the line
    minX = -1/eq[1] # minimum x value
    maxX = 1/eq[1] # maximum x value
    graphType = 'acos'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Arccos Function') # labels
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

    x = np.linspace(minX, maxX, length*100) # in order to not make line jagged, hundreds to thousands of points are needed
    y = (eq[0] * np.arccos(eq[1] * (x + eq[2]))) + eq[3] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def atan(): # [a, b, c, d] => f(x) = a * atan(b * x + c) + d
    length = 100 # number of points returned
    eq = [100, 1, 0, 0] # coefficients of the equation.
    spread = 50 # relative distance the points will be from the line
    minX = -100 # minimum x value
    maxX = 100 # maximum x value
    graphType = 'ATAN'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Arctan Function') # labels
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

    x = np.linspace(minX, maxX, length*100) # in order to not make line jagged, hundreds to thousands of points are needed
    y = (eq[0] * np.arctan(eq[1] * (x + eq[2]))) + eq[3] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()

def expo(): # [a, b, c, d, e] => f(x) = a * b ^ (c * x + d) + e
    length = 100 # number of points returned
    eq = [0.01, 2, 1, 0, 0] # coefficients of the equation.
    spread = 300 # relative distance the points will be from the line
    minX = -10 # minimum x value
    maxX = 17 # maximum x value
    graphType = 'expo'

    plt.figure(figsize = (12, 6))
    plt.title('Testing Equation Plotting: Exponential Function') # labels
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

    x = np.linspace(minX, maxX+1, length*100) # in order to not make line jagged, hundreds to thousands of points are needed
    y = (eq[0] * (eq[1]**(eq[2] * (x + eq[3])))) + eq[4] # finds y values from x values

    plt.plot(x, y) # plot line
    plt.scatter(xvals, yvals) # plot the points
    plt.show()



if __name__ == '__main__':
    # polynomial()
    # log()
    # logistic()
    # sin()
    # cos()
    # tan()
    # asin()
    # acos()
    # atan()
    expo()