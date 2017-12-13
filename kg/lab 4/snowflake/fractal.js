W = 550;
H = 510;

function init(){

    main_canvas = document.getElementById("imageView");
    mcontext = main_canvas.getContext('2d');
    var container = main_canvas.parentNode;
    canvas = document.createElement('canvas');
    canvas.id = "imageTemp";
    canvas.width = W;
    canvas.height = H;
    container.appendChild(canvas);
    context = canvas.getContext("2d");

    context.beginPath();
    context.stroke();
    context.closePath();

    fractal([50,150],  [500,150], 5);
    fractal([270,490], [50,150],  5);
    fractal([500,150], [270,490], 5);

};

function fractal(A, B, depth){
    if (depth < 0){
        return null;
    }
    var C = divide(add(multiply(A, 2), B), 3);
    var D = divide(add(multiply(B, 2), A), 3);
    var F = divide(add(A, B), 2);
    var V1 = divide(minus(F, A), length(F, A));
    var V2 = [V1[1], -V1[0]];
    var E = add(multiply(V2, Math.sqrt(3) / 6 * length(B, A)), F);

    DrawLine(A, B, "black");

    if (depth != 0){
        for (var i = 0; i < 10; i++)
            DrawLine(C, D, "white");
    }

    fractal(A, C, depth-1);
    fractal(C, E, depth-1);
    fractal(E, D, depth-1);
    fractal(D, B, depth-1);

};

function multiply(v, num){
    return [v[0]*num, v[1]*num];
};

function divide(v, num){
    return [v[0]/num, v[1]/num];
};

function add(a, b){
    return [a[0]+b[0], a[1]+b[1]];
};

function minus(a, b){
    return [a[0]-b[0], a[1]-b[1]];
};

function length(a, b){
    return Math.sqrt(Math.pow(a[0] - b[0],2) +
                     Math.pow(a[1] - b[1],2));
};

function DrawLine(a, b, c){
    context.beginPath();
    context.strokeStyle = c;
    context.moveTo(a[0], a[1]);
    context.lineTo(b[0], b[1]);
    context.stroke();
    context.closePath();
};