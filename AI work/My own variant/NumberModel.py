from dense import Dense
from tanh import Tanh
from losses import mse, mse_prime
import numpy as np
from ConvolutionalLayer import Convolution

convolution = Convolution()
CorrectOuputs = [[1, 0, 0, 0, 0, 0, 0, 0, 0],[0, 1, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 1, 0, 0, 0, 0, 0, 0],[0, 0, 0, 1, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 1, 0, 0, 0, 0],[0, 0, 0, 0, 0, 1, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 1, 0, 0],[0, 0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1]]
Inputs = []
Inputs.append(convolution.Map("Number1.png"))
Inputs.append(convolution.Map("Number2.png"))
Inputs.append(convolution.Map("Number3.png"))
Inputs.append(convolution.Map("Number4.png"))
Inputs.append(convolution.Map("Number5.png"))
Inputs.append(convolution.Map("Number6.png"))
Inputs.append(convolution.Map("Number7.png"))
Inputs.append(convolution.Map("Number8.png"))
Inputs.append(convolution.Map("Number9.png"))

X = np.reshape(Inputs, (9, 900, 1))
Y = np.reshape(CorrectOuputs, (9, 9, 1))
network = [
    Dense(900, 16),
    Tanh(),
    Dense(16, 20),
    Tanh(),
    Dense(20, 9),
    Tanh()
    ]

epochs = 20000
learning_rate = 0.1

for e in range(epochs):
    error = 0
    for x, y in zip(X, Y):
        output = x
        for layer in network:
            output = layer.forward(output)
        
        error += mse(y, output)
        
        grad = mse_prime(y, output)
        for layer in reversed(network):
            grad = layer.backward(grad, learning_rate)
    error /= len(X)
    #print(e, error)
while True:
    tests = [convolution.Map("test.png")]#, convolution.Map("Number1.png"), convolution.Map("Number2.png"), convolution.Map("Number3.png")]
    for x in np.reshape(tests, (len(tests), 900, 1)):
            output = x
            for layer in network:
                output = layer.forward(output)
    input(output)