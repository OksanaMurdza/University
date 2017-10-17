import React, {Component} from 'react'

import './../../../scss/index.scss'

class Bezier extends Component {
    
    constructor(props) {
        super(props);
        
        this.canvas = props;
        this.bezierArray = [];
    }
    
    getBezierBasis(i, n, t) {
        const f = ( n ) => n <= 1 ? 1: n * f (n - 1);
        let res = f(n) / (f(i) * f(n - i)) * Math.pow(t, i) * Math.pow(1 - t, n - i);
        
        return res;
    }
    
    setBezierCurve(arr) {
        for (let step = 0.01, t = 0, ind; t < step + 1; t += step) {
            t > 1 ? t = 1 : null;
            ind = this.bezierArray.length;
            this.bezierArray[ind] = [0, 0];
            
            for (let b, i = 0; i < arr.length; i++) {
                b = this.getBezierBasis(i, arr.length - 1, t);
                this.bezierArray[ind][0] += arr[i][0] * b;
                this.bezierArray[ind][1] += arr[i][1] * b;
            }
        }
    }
    
    mirrorByX(arr, height) {
        for (let i = 0; i < arr.length; i++) {
            arr[i][0] = height - arr[i][0];
        }
        return arr;
    }
    
    mirrorByY(arr, width) {
        for (let i = 0; i < arr.length; i++) {
            arr[i][1] = width - arr[i][1];
        }
        return arr;
    }
    
    drawBezierLine(bezier) {
        let b = {
            arr: bezier.arr,
            scale: bezier.scale || 1,
            shiftX: bezier.shiftX || 0,
            shiftY: bezier.shiftY || 0
        };
        this.setBezierCurve(b.arr);
        for (let i = 0; i < this.bezierArray.length - 1; i++) {
            this.canvas.moveTo((this.bezierArray[i][0] + b.shiftX) * b.scale,
                (this.bezierArray[i][1] + b.shiftY) * b.scale);
            this.canvas.lineTo((this.bezierArray[i + 1][0] + b.shiftX) * b.scale,
                (this.bezierArray[i + 1][1] + b.shiftY) * b.scale);
            this.canvas.stroke();
        }
    }
    
    drawMethod( props ) {
        switch (props) {
            case 'bezier':
                let bezier = new Bezier(document.getElementById('bezier').getContext('2d'));
    
                bezier.drawBezierLine({
                    arr: [[30,70], [300,-70], [270,180], [200,170], [250, 100], [300, 80], [380, 80]],
                });
            break;
            
            case 'scaling':
                let scaling = new Bezier(document.getElementById('scaling').getContext('2d'));
                scaling.drawBezierLine({
                    arr: [[30,70], [300,-70], [270,180], [200,170], [250, 100], [300, 80], [380, 80]],
                    scale: 2
                });
            break;
            
            case 'shift':
                let shift = new Bezier(document.getElementById('shift').getContext('2d'));
                shift.drawBezierLine({
                    arr: [[30,70], [300,-70], [270,180], [200,170], [250, 100], [300, 80], [380, 80]],
                    shiftX: 50
                });
            break;
            
            case 'mirror':
                let mirror = new Bezier(document.getElementById('mirror').getContext('2d'));
                    mirror.drawBezierLine({
                        arr: mirror.mirrorByX([[30,70], [300,-70], [270,180], [200,170], [250, 100], [300, 80], [380, 80]],
                            document.getElementById('mirror').height),
                        shiftX: 150
                    });
            break;
    
            case 'rotate':
                document.getElementById('rotate').getContext('2d').rotate(30 * Math.PI / 180);
                let rotate = new Bezier(document.getElementById('rotate').getContext('2d'));
                rotate.drawBezierLine({
                    arr: [[30,70], [300,-70], [270,180], [200,170], [250, 100], [300, 80], [380, 80]],
                    // shiftX: 100,
                    // shiftY: -50
        
                });
            break;
            
            default:
                return;
        }
    }
    
    
    componentDidMount() {
        'bezier_scaling_shift_mirror_rotate'.split('_').map((item) => this.drawMethod(item))
    }
    
  
    render() {
        return (
            <div className="wrapper">
                <div className="right">
                    <div className="item">
                        <h1>Bezier std </h1>
                        <canvas className = "block1" height="300" width="400" id="bezier"></canvas>
                    </div>
                    <div className="item">
                        <h1>Bezier scaled 1:2</h1>
                        <canvas height="300" width="400" id="scaling"></canvas>
                    </div>
                    <div className="item">
                        <h1>Bezier shifted</h1>
                        <canvas height="300" width="400" id="shift"></canvas>
                    </div>
                </div>
                <div className="left block1">
                    <div className="item">
                        <h1>Bezier mirrored </h1>
                        <canvas className = "block1" height="300" width="400" id="mirror"></canvas>
                    </div>
                    <div className="item">
                        <h1>Bezier rotated </h1>
                        <canvas className = "block1" height="300" width="400" id="rotate"></canvas>
                    </div>
                </div>
            </div>
        )
    }
}


export default (Bezier);