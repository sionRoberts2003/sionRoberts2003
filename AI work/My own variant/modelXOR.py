from dense import Dense
from tanh import Tanh
from losses import mse, mse_prime
import numpy as np

X = np.reshape([[0, 0], [0, 1], [1, 0], [1, 1]], (4, 2, 1))
Y = np.reshape([[0], [1], [1], [0]], (4, 1, 1))
print(X[0])

network = [
    Dense(2, 3),
    Tanh(),
    Dense(3, 2),
    Tanh()
    ]

epochs = 100
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
for x in np.array([[[1], [0]]]):
        output = x
        for layer in network:
            output = layer.forward(output)
        print(output)