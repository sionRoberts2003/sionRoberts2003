import numpy as np
import ConvolutionalLayer


class NeuralNetwork:
    def __init__(self, bias):
        self.synapticWeights = np.random.random((81, 1))
    def sigmoid(self, x):
        return 1/(1+np.exp(-(x-1)))
    def sigmoidDerivative(self, x):
        return x * (1-x)
    def training(self, trainingInputs, trainingOutputs, trainingItterations):
        for itteration in range(trainingItterations):
            outputs = self.think(trainingInputs, False)
            error = trainingOutputs - outputs
            adjustments = np.dot(trainingInputs.T, error * (self.sigmoidDerivative(outputs)))
            self.synapticWeights += adjustments
            #print(error)
            #shame
    def think(self, inputs, show):
        inputs = inputs.astype(float)
        p = np.dot(inputs, self.synapticWeights)
        p = np.dot(p, 0.5)
        if show:
            print(p)
        output = self.sigmoid(p+7.5)
        return output
    
if __name__ == "__main__":
    possibilities = ["Is an O", "Is an X"]
    trainingArray = []
    Conv = ConvolutionalLayer.Convolution()
    for i in range(40):
        trainingArray.append(Conv.Map("X.png")[0])
    for i in range(41):
        trainingArray.append(Conv.Map("number.png")[0])
    
    inputs = np.array(trainingArray)
    outputs = np.array([Conv.Map("X.png")[0] + [1]]).T
    NN = NeuralNetwork(0)
    NN.training(inputs, outputs, 100000)
    #while True:
    print(possibilities[int(round(float(NN.think(Conv.Map("test.png")[0], True))))])
    print(NN.think(Conv.Map("test.png")[0], True))
    print(NN.think(Conv.Map("Wrong.png")[0], True))
    