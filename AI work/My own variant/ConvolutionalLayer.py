from PIL import Image
import numpy as np
import random

class Convolution:
    def __init__(self):
        kernal1 = [[-1, -1, -1],
                   [-1, 8, -1],
                   [-1, -1, -1]]
        kernal2 = [[1, 2, 1], 
                   [0, 0, 0],
                   [-1, -2, -1]]
        kernal3 = [[-1, 0, 1],
                   [-2, 0, 2],
                   [-1, 0, 1]]
        kernal4 = [[1, 0, -1],
                   [2, 0, -2],
                   [1, 0, -1]]
        kernal5 = [[-1, -2, -1], 
                   [0, 0, 0],
                   [1, 2, 1]]
        kernal6 = [[0, 1, 0], 
                   [-1, 5, -1],
                   [-1, -1, 0]]
        self.Kernals = [kernal1, kernal2, kernal3, kernal4, kernal5, kernal6]
        self.Kernals2 = [kernal1]
    def Map(self, picture):
        #set out the combination of stages for the convolutional layer
        layer = 0
        self.picture = self.translate(picture)
        pictures = self.convolution([self.picture], self.Kernals, layer, False)
        pictures = self.ReLU(pictures)
        pictures = self.pooling(pictures)
        pictures = self.pooling(pictures)
        pictures = self.convolution(pictures, self.Kernals, layer, False)
        pictures = self.ReLU(pictures)
        pictures = self.pooling(pictures)
        layer += 1
        
        #pictures = self.pooling(pictures)
        
        #
        return self.finalise(np.array(pictures).reshape(1, (len(pictures[0])**2) * len(pictures)))
    def finalise(self, pictures):
        Flattened = []
        for i in pictures[0]:
            Flattened.append(round(i))
        return Flattened
    def translate(self, picture):
        picture = Image.open(picture).convert('LA')
        w, h = picture.size
        picture = picture.getdata()
        picture = np.asarray(picture).T
        picture = np.divide(picture[0], 255)
        orderedPicture = picture.reshape(w, h)
        orderedPicture = np.add(orderedPicture, -1)
        return np.dot(orderedPicture, -1)
    def convolution(self, pictures, Kernals, layer, modded):
        New_outputs = []
        TotalArray = []
        for picture in pictures:
            for kernal in Kernals:
                output = []
                for y in range(int(len(kernal)/2), len(picture) - int(len(kernal)/2)):
                    output.append([])
                    for x in range(int(len(kernal)/2), len(picture[y]) - int(len(kernal)/2)):
                        Scan = []
                        for Ky in range(len(kernal)):
                            for Kx in range(len(kernal[Ky])):
                                PositionX = -1 + Kx
                                PositionY = -1 + Ky
                                Scan.append(picture[y + PositionY][x + PositionX]*kernal[Ky][Kx])
                        output[y-1].append(sum(Scan))
                New_outputs.append(np.array(output))
        if not modded:
            return New_outputs
        else:
            Total = New_outputs[0]
            for i in range(1, len(New_outputs)):
                Total = np.add(Total, New_outputs[i])
            
            
    def ReLU(self, pictures):
        outputs = []
        for picture in pictures:
            for y in range(len(picture)):
                for x in range(len(picture[y])):
                    if picture[y][x] < 0:
                        picture[y][x] = 0
            outputs.append(picture)
        return outputs
    def pooling(self, pictures):
        step = 2
        outputs = []
        for picture in pictures:
            frame = []
            for y in range(int(len(picture)/step)):
                frame.append([])
                for x in range(int(len(picture)/step)):
                    pool = []
                    Py = (y * step)+1
                    Px = (x * step)+1
                    for Sy in range(step):
                        for Sx in range(step):
                            pool.append(picture[Py-Sy][Px-Sx])
                    frame[y].append(max(pool))
            outputs.append((frame))
        return outputs
                    
if __name__ == "__main__":
    Conv = Convolution()
    print(len(Conv.Map("test.png")))
    print((Conv.Map("test.png")))
    
    