import numpy as np
import pandas as pd
from PIL import Image

class NN:
    def __init__(self, X_train, Y_train, m):
        self.weights1 = np.random.rand(25, 784) - 0.5
        self.weights2 = np.random.rand(15, 25) - 0.5
        self.weights3 = np.random.rand(26, 15) - 0.5
        
        self.bias1 = np.random.rand(25, 1) - 0.5
        self.bias2 = np.random.rand(15, 1) - 0.5
        self.bias3 = np.random.rand(26, 1) - 0.5
        
        self.m = m
    
    def train(self, X, Y, learning_rate, itterations):
        print("start:")
        for i in range(itterations):
            self.forward_prop(X)
            dW1, dW2, dW3, dB1, dB2, dB3 = self.backprop(X, Y)
            self.update(dW1, dW2, dW3, dB1, dB2, dB3, learning_rate)
            if i%10 == 0:
                print(i, "%")
                pred = self.get_pred()
                print(self.get_accuracy(pred, Y))
        
    def Sigmoid(self, Z, deriv = False):
        if deriv:
            return (1/(1+np.exp(-Z))) * (1 - 1/(1+np.exp(-Z)))
        return 1/(1+np.exp(-Z))
    
    def ReLU(self, Inp, derivative=False):
        if derivative:
            return Inp > 0
        return np.maximum(Inp, 0)
    
    def tanh(self, x, deriv=False):
        if deriv:
            return 1 - np.tanh(x)**2
        return (np.exp(x) - np.exp(-x)) / (np.exp(x) + np.exp(-x))
    
    def forward_prop(self, X):
        self.Z1 = self.weights1.dot(X)+self.bias1
        self.A1 = self.tanh(self.Z1)
        self.Z2 = self.weights2.dot(self.A1)+self.bias2
        self.A2 = self.ReLU(self.Z2)
        self.Z3 = self.weights3.dot(self.A2)+self.bias3
        self.A3 = self.Sigmoid(self.Z3)
        return self.A3
    
    def one_hot(self, Y):
        one_hot_Y = np.zeros((Y.size, Y.max() + 1))
        one_hot_Y[np.arange(Y.size), Y] = 1
        one_hot_Y = one_hot_Y.T
        return one_hot_Y
    
    def backprop(self, X, Y):
        oneY = self.one_hot(Y)
        dE3 = self.A3 - oneY
        dW3 = 1/self.m * dE3.dot(self.A2.T)
        dB3 = 1/self.m * sum(dE3)
        dE2 = self.weights3.T.dot(dE3) * self.ReLU(self.A2, True)
        dW2 = 1/self.m * dE2.dot(self.A1.T)
        dB2 = 1/self.m * sum(dE2)
        dE1 = self.weights2.T.dot(dE2) * self.tanh(self.A1, True)
        dW1 = 1/self.m * dE1.dot(X.T)
        dB1 = 1/self.m * sum(dE1)
        return dW1, dW2, dW3, dB1, dB2, dB3
    
    def update(self, dW1, dW2, dW3, dB1, dB2, dB3, learning_rate):
        self.weights1 = self.weights1 - (learning_rate * dW1)
        self.weights2 = self.weights2 - (learning_rate * dW2)
        self.weights3 = self.weights3 - (learning_rate * dW3)
        
        self.bias1 = self.bias1 - (learning_rate * dB1)
        self.bias2 = self.bias2 - (learning_rate * dB2)
        self.bias3 = self.bias3 - (learning_rate * dB3)
    def get_pred(self):
        return np.argmax(self.A3, 0)
    
    def get_accuracy(self, predictions, Y):
        return np.sum(predictions == Y) / Y.size
    

info = pd.read_csv("handwritten.csv")
info = np.array(info)
np.random.shuffle(info)
data_dev = info[1000:info.shape[0]].T
X_train = data_dev[1:info.shape[1]]/255.
#print(X_train.shape)
Y_train = data_dev[0]


network = NN(X_train, Y_train, info.shape[0])
network.train(X_train, Y_train, 0.1, 100)
#network.forward_prop(X_train)
    