from Tkinter import *
import math

PIXEL_SIZE = 3
HEIGHT = 600
WIDTH = 1000

class RasterizationAlgorithms:
    def Bezier(self, x0, y0, x1, y1, x2, y2, x3, y3):
        points = []
        t = 0.001
        while (t <= 1.0):
            q1 = t * t * t * - 1 + t * t * 3 + t * (-3) + 1
            q2 = t * t * t * 3 + t * t * (-6) + t * 3
            q3 = t * t * t * (-3) + t * t * 3
            q4 = t * t * t
            qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
            qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
            t += 0.001
            points.append((qx, qy))
        self.draw(points)

    def Rotation(self, x0, y0, x1, y1, x2, y2, x3, y3):
        self.i += 13
        points = []
        t = 0.001
        while (t <= 1.0):
            q1 = t * t * t * - 1 + t * t * 3 + t * (-3) + 1
            q2 = t * t * t * 3 + t * t * (-6) + t * 3
            q3 = t * t * t * (-3) + t * t * 3
            q4 = t * t * t
            qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
            qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
            newX = 150 + (qx * math.cos(12 * self.i) - qy * math.sin(10 * self.i))  # (150, 100) - center
            newY = 100 + (qx * math.sin(12 * self.i) + qy * math.cos(10 * self.i))
            t += 0.001
            points.append((newX, newY))
        self.draw(points)

    def Shift(self, x0, y0, x1, y1, x2, y2, x3, y3):
        self.i += 1
        points = []
        t = 0.001
        while (t <= 1.0):
            q1 = t * t * t * - 1 + t * t * 3 + t * (-3) + 1
            q2 = t * t * t * 3 + t * t * (-6) + t * 3
            q3 = t * t * t * (-3) + t * t * 3
            q4 = t * t * t
            qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
            qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
            t += 0.001
            points.append((qx + 15 * self.i, qy))  # shift right on 10*PIXEL_SIzE
        self.draw(points)

    def scalingPlus(self, x0, y0, x1, y1, x2, y2, x3, y3):
        self.i += 1
        points = []
        t = 0.001
        while (t <= 1.0):
            q1 = t * t * t * - 1 + t * t * 3 + t * (-3) + 1
            q2 = t * t * t * 3 + t * t * (-6) + t * 3
            q3 = t * t * t * (-3) + t * t * 3
            q4 = t * t * t
            qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
            qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
            t += 0.001
            points.append((qx * 2 * self.i, qy * 2 * self.i))  # M = 0.2
        self.draw(points)

    def scalingMinus(self, x0, y0, x1, y1, x2, y2, x3, y3):
        self.i += 1
        points = []
        t = 0.001
        while (t <= 1.0):
            q1 = t * t * t * - 1 + t * t * 3 + t * (-3) + 1
            q2 = t * t * t * 3 + t * t * (-6) + t * 3
            q3 = t * t * t * (-3) + t * t * 3
            q4 = t * t * t
            qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
            qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
            t += 0.001
            points.append((qx * 2 * (1.0 - self.i * 0.1), qy * 2 * (1.0 - self.i * 0.1)))  # M = 0.1
        self.draw(points)

    def Reflection(self, x0, y0, x1, y1, x2, y2, x3, y3):
        self.i += 1
        points_X = []
        points_Y = []
        t = 0.001
        while (t <= 1.0):
            q1 = t * t * t * - 1 + t * t * 3 + t * (-3) + 1
            q2 = t * t * t * 3 + t * t * (-6) + t * 3
            q3 = t * t * t * (-3) + t * t * 3
            q4 = t * t * t
            qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
            qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
            t += 0.001
            points_X.append((qx, qy + abs(qy - y0) * 2))  # Ox
            points_Y.append((qx + abs(qx - x3) * 2, qy))  # Oy
        self.draw(points_X)
        self.draw(points_Y)

    def draw(self, coords):
        for point in coords:
            self.canvas.create_rectangle(PIXEL_SIZE * point[0], PIXEL_SIZE * point[1],
                                         PIXEL_SIZE * point[0] + PIXEL_SIZE, PIXEL_SIZE * point[1] + PIXEL_SIZE,
                                         fill="#001126", tag="lab2")

    def clean(self):
        self.i = 0
        self.canvas.delete("lab2")

    def callback(self, func_name):
        if func_name == "Bezier":
            return lambda func_name=func_name: getattr(self, func_name)(10, 80, 40, 10, 80, 10, 140, 80)
        if func_name == "Rotation":
            return lambda func_name=func_name: getattr(self, func_name)(10, 80, 40, 10, 80, 10, 140, 80)  # ?
        if func_name == "Shift":
            return lambda func_name=func_name: getattr(self, func_name)(10, 80, 40, 10, 80, 10, 140, 80)
        if func_name == "scalingPlus":
            return lambda func_name=func_name: getattr(self, func_name)(10, 80, 40, 10, 80, 10, 140, 80)
        if func_name == "scalingMinus":
            return lambda func_name=func_name: getattr(self, func_name)(10, 80, 40, 10, 80, 10, 140, 80)
        if func_name == "Reflection":
            return lambda func_name=func_name: getattr(self, func_name)(10, 80, 40, 10, 80, 10, 140, 80)

    def __init__(self):
        self.i = 0
        window = Tk()
        window.title("Lab_Work Katiuha B. KV-51")
        self.canvas = Canvas(window, width=WIDTH, height=HEIGHT, bg="#edecf1")
        frame = Frame(window)
        frame.pack()
        self.canvas.pack()

        bezier_btn = Button(frame, text="Curve Bezier", bg="#489eba",command=self.callback("Bezier") )
        bezier_btn.grid(row=1, column=1)
        reflection_btn = Button(frame, text="Turn around",bg="#489eba", command=self.callback("Rotation"))
        reflection_btn.grid(row=1, column=2)
        shift_btn = Button(frame, text="Shift right",bg="#489eba", command=self.callback("Shift"))
        shift_btn.grid(row=1, column=3)
        shift_btn = Button(frame, text="Scaling +",bg="#489eba", command=self.callback("scalingPlus"))
        shift_btn.grid(row=1, column=4)
        scal_plus_btn = Button(frame, text="Scaling -",bg="#489eba", command=self.callback("scalingMinus"))
        scal_plus_btn.grid(row=1, column=5)
        reflection_btn = Button(frame, text="Reflection",bg="#489eba", command=self.callback("Reflection"))
        reflection_btn.grid(row=1, column=6)
        scal_minus_btn = Button(frame, text="Clear", bg="#16536e", width="15", command=self.clean)
        scal_minus_btn.grid(row=1, column=7)
        window.mainloop()

if __name__ == "__main__":
    RasterizationAlgorithms()
