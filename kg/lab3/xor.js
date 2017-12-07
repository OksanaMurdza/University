function methodXOR(ctx, pol) {
    var yCur = pol[0][1];
    var yMax = pol[0][1];
    for (var i = 1; i < pol.length - 1; i++) {
        if (pol[i][0] < yCur) {
            yCur = pol[i][1];
        }
        if (pol[i][0] > yMax) {
            yMax = pol[i][1];
        }
    }
    while (yCur < yMax) {
        var xBuf = [];
        for (var i = 0; i < pol.length - 1; i++) {
            if ((pol[i][1] <= yCur && yCur < pol[i + 1][1]) || (pol[i][1] > yCur && yCur >= pol[i + 1][1])) {
                var x = (((yCur - pol[i][1]) * (pol[i + 1][0] - pol[i][0])) / (pol[i + 1][1] - pol[i][1])) + pol[i][0];
                xBuf.push(Math.ceil(x));
            }
        }
        xBuf.sort(function (a, b) {
            return a - b;
        });
        for (var i = 0; i < xBuf.length - 1; i += 2) {
            for (var j = xBuf[i]; j < xBuf[i + 1]; ++j) {
                drawPoint(j, yCur, ctx);
            }
        }
        yCur++;
    }
}