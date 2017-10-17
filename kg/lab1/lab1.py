#Import all definitions from tkinter

from Tkinter import *
import time


PIXEL_SIZE = 5
HEIGHT = 500
WIDTH = 800

class RasterizationAlgorithms:
    coord = {
        "B": [[(0, 0),(100, 100)]]
    } 

    def DDA(self, x1, y1, x2, y2):
        t1=time.clock()
        dx = abs(x2 - x1)
        dy = abs(y2 - y1)
        if dx >= dy:
            steps = dx
        else:
            steps = dy
        # steps = dx if dx >= dy else dy
        dx = (x2 - x1) / steps
        dy = (y2 - y1) / steps

        x, y = x1, y1
        points = [[x, y], [x2, y2]]
        for i in range(steps - 1):
            x += dx
            y += dy
            points.append([round(x), round(y)])
        self.draw(points)
        t2=time.clock()
        print("DDA:")
        print(t2-t1)


    def Bresenham(self, x1, y1, x2, y2):
        t1=time.clock()
        # Setup initial conditions
        dx = x2 - x1
        dy = y2 - y1
        # Determine how steep the line is
        is_steep = abs(dy) > abs(dx)
        # Rotate line
        if is_steep:
            x1, y1 = y1, x1
            x2, y2 = y2, x2
        # Swap start and end points if necessary
        if x1 > x2:
            x1, x2 = x2, x1
            y1, y2 = y2, y1

        # Recalculate differentials
        dx = x2 - x1
        dy = y2 - y1

        # Calculate error
        error = int(dx / 2.0)
        ystep = 1 if y1 < y2 else -1

        # Iterate over bounding box generating points between start and end
        y = y1
        points = []
        for x in range(x1, x2 + 1):
            coord = (y, x) if is_steep else (x, y)
            points.append(coord)
            error -= abs(dy)
            if error < 0:
                y += ystep
                error += dx
        self.draw(points)
        t2=time.clock()
        print("Bresenham:")
        print(t2-t1)
        
    def circle_Bresenham(self, xc, yc, radius):
        t1=time.clock()
        x = 0
        y = radius
        delta = 1 - 2 * radius
        error = 0
        points = []
        while (y >= 0):
            points.append((xc + x, yc + y))
            points.append((xc + x, yc - y))
            points.append((xc - x, yc + y))
            points.append((xc - x, yc - y))
            error = 2 * (delta + y) - 1
            if (delta < 0) and (error <= 0):
                x += 1
                delta += 2 * x + 1
                continue
            error = 2 * (delta - x) - 1
            if delta > 0 and error > 0:
                y -= 1
                delta += 1 - 2 * y
                continue
            x += 1
            delta += 2 * (x - y)
            y -= 1
        self.draw(points)
        t2=time.clock()
        print("Circle Bresenham:")
        print(t2-t1)

    def Wu(self, x1, y1, x2, y2):
        t1=time.clock()
        def _fpart(x):
            return x - int(x)

        def _rfpart(x):
            return 1 - _fpart(x)

        points = []
        dx, dy = x2 - x1, y2 - y1
        x, y = x1, y1

        if dy == 0:
            points.append([round(x), round(y1)])
            while abs(x) < abs(x2):
                x += 1
                points.append([round(x), round(y1)])

        elif dx == 0:
            points.append([round(x1), round(y)])
            while abs(y) < abs(y2):
                y += 1
                points.append([round(x1), round(y)])
        else:
            grad = dy / dx
            intery = y1 + _rfpart(x1) * grad

            def draw_endpoint(x, y):
                xend = round(x)
                yend = y + grad * (xend - x)
                px, py = int(xend), int(yend)
                points.append([px, py])
                points.append([px, py + 1])
                return px

            xstart = draw_endpoint(x1, y1)
            xend = draw_endpoint(x2, y2)

            for x in range(xstart, xend):
                y = int(intery)
                points.append([x, y])
                points.append([x, y + 1])
                intery += grad
        self.draw(points)
        t2=time.clock()
        print("Wu:")
        print(t2-t1)


    def draw(self, coords):
        for point in coords:
            self.canvas.create_rectangle(PIXEL_SIZE * point[0], PIXEL_SIZE * point[1],
                                         PIXEL_SIZE * point[0] + PIXEL_SIZE, PIXEL_SIZE * point[1] + PIXEL_SIZE,
                                         fill="black", tag="graph")

    def clean(self):
        self.canvas.delete("graph")

    def callback(self, func_name):
        if func_name == "elipse_Bresenham":
            return lambda func_name=func_name: getattr(self, func_name)(85, 60, 15, 5)
        if func_name != "circle_Bresenham":
            def func():
                for letter, lines in self.coord.items():
                    for line in lines:
                        if letter == "o":
                            getattr(self, "circle_Bresenham")(line[0][0], line[0][1], line[1][0])
                        else:
                            t1=time.clock()
                            getattr(self, func_name)(line[0][0], line[0][1], line[1][0], line[1][1])            
            return func
        return lambda func_name=func_name: getattr(self, func_name)(85, 60, 15)
    

    def __init__(self):
        window = Tk()
        window.title("lab1 gk")
        self.canvas = Canvas(window, width=WIDTH, height=HEIGHT, bg="white")
        self.canvas.pack(side = 'bottom')
        frame = Frame(window, bg="light blue")
        frame.pack(side = "left")
        dda_btn = Button(frame,         text="       DDA      ", command=self.callback("DDA"))
        dda_btn.grid(row=1, column=1)
        bres_btn = Button(frame,        text="    Bresenham   ", command=self.callback("Bresenham"))
        bres_btn.grid(row=1, column=3)
        wu_btn = Button(frame,          text="       Wu       ", command=self.callback("Wu"))
        wu_btn.grid(row=1, column=6)
        circle_bres_btn = Button(frame, text="Circle Bresenham", command=self.callback("circle_Bresenham"))
        circle_bres_btn.grid(row=1, column=4)
        clear_btn = Button(frame,       text="      Clear     ", command=self.clean)
        clear_btn.grid(row=1, column=7)
        window.mainloop()

if __name__ == "__main__":
    RasterizationAlgorithms()
