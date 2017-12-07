/*
 * Класс заливалки канвы для разных браузеров (заливка вручную)
 */
function CanvasFloodFiller()
{
    // Ширина и высота канвы
    var _cWidth = -1;
    var _cHeight = -1;

    // Заменяемый цвет
    var _rR = 0;
    var _rG = 0;
    var _rB = 0;
    var _rA = 0;

    // Цвет закраски
    var _nR = 0;
    var _nG = 0;
    var _nB = 0;
    var _nA = 0;

    var _data = null;

    /*
     * Получить точку из данных
     **/
    var getDot = function(x, y)
    {
        // Точка: y * ширину_канвы * 4 + (x * 4)
        var dstart = (y * _cWidth * 4) + (x * 4);
        var dr = _data[dstart];
        var dg = _data[dstart + 1];
        var db = _data[dstart + 2];
        var da = _data[dstart + 3];

        return {r: dr, g: dg, b: db, a: da};
    }

    /*
     * Пиксель по координатам x,y - готовый к заливке?
     **/
    var isNeededPixel = function(x, y)
    {
        var dstart = (y * _cWidth * 4) + (x * 4);
        var dr = _data[dstart];
        var dg = _data[dstart + 1];
        var db = _data[dstart + 2];
        var da = _data[dstart + 3];

        return (dr == _rR && dg == _rG && db == _rB && da == _rA);
    }

    /*
     * Найти левый пиксель, по пути закрашивая все попавшиеся
     **/
    var findLeftPixel = function(x, y)
    {
        // Крутим пикселы влево, заодно красим. Возвращаем левую границу.
        // Во избежание дубляжа и ошибок, findLeftPixel НЕ красит текущий
        // пиксел! Это сделает обязательный поиск вправо.
        var lx = x - 1;
        var dCoord = (y * _cWidth * 4) + (lx * 4);

        while (lx >= 0 && _data[dCoord] == _rR && _data[dCoord + 1] == _rG &&
            _data[dCoord + 2] == _rB && _data[dCoord + 3] == _rA)
        {
            _data[dCoord] = _nR;
            _data[dCoord + 1] = _nG;
            _data[dCoord + 2] = _nB;
            _data[dCoord + 3] = _nA;

            lx--;
            dCoord -= 4;
        }

        return lx + 1;
    }

    /*
     * Найти правый пиксель, по пути закрашивая все попавшиеся
     **/
    var findRightPixel = function(x, y)
    {
        var rx = x;
        var dCoord = (y * _cWidth * 4) + (x * 4);

        while (rx < _cWidth && _data[dCoord] == _rR && _data[dCoord + 1] == _rG &&
            _data[dCoord + 2] == _rB && _data[dCoord + 3] == _rA)
        {
            _data[dCoord] = _nR;
            _data[dCoord + 1] = _nG;
            _data[dCoord + 2] = _nB;
            _data[dCoord + 3] = _nA;

            rx++;
            dCoord += 4;
        }

        return rx - 1;
    }

    /*
     * Эффективная (строчная) заливка
     **/
    var effectiveFill = function(cx, cy)
    {
        var lineQueue = new Array();

        var fx1 = findLeftPixel(cx, cy);
        var fx2 = findRightPixel(cx, cy);

        lineQueue.push({x1: fx1, x2: fx2, y: cy});

        while (lineQueue.length > 0)
        {
            var cLine = lineQueue.shift();
            var nx1 = cLine.x1;
            var nx2 = cLine.x1;
            var currx = nx2;

            // Сперва для первого пиксела, если верхний над ним цвет подходит,
            // пускаем поиск левой границы.
            // Можно искать вверх?
            if (cLine.y > 0)
            {
                // Сверху строка может идти левее текущей?
                if (isNeededPixel(cLine.x1, cLine.y - 1))
                {
                    // Ищем в том числе влево
                    nx1 = findLeftPixel(cLine.x1, cLine.y - 1);
                    nx2 = findRightPixel(cLine.x1, cLine.y - 1);
                    lineQueue.push({x1: nx1, x2: nx2, y: cLine.y - 1});
                }

                currx = nx2;
                // Добираем недостающее, ищем только вправо, но пока не
                // доползли так или иначе далее края текущей строки
                while (cLine.x2 >= nx2 && currx <= cLine.x2 && currx < (_cWidth - 1))
                {
                    currx++;

                    if (isNeededPixel(currx, cLine.y - 1))
                    {
                        // Сохраняем найденный отрезок
                        nx1 = currx;
                        nx2 = findRightPixel(currx, cLine.y - 1);
                        lineQueue.push({x1: nx1, x2: nx2, y: cLine.y - 1});
                        // Прыгаем далее найденного
                        currx = nx2;
                    }
                }
            }

            nx1 = cLine.x1;
            nx2 = cLine.x1;
            // Те же яйца, но можно ли искать вниз?
            if (cLine.y < (_cHeight - 1))
            {
                // Снизу строка может идти левее текущей?
                if (isNeededPixel(cLine.x1, cLine.y + 1))
                {
                    // Ищем в том числе влево
                    nx1 = findLeftPixel(cLine.x1, cLine.y + 1);
                    nx2 = findRightPixel(cLine.x1, cLine.y + 1);
                    lineQueue.push({x1: nx1, x2: nx2, y: cLine.y + 1});
                }

                currx = nx2;
                // Добираем недостающее, ищем только вправо, но пока не
                // доползли так или иначе далее края текущей строки
                while (cLine.x2 >= nx2 && currx <= cLine.x2 && currx < (_cWidth - 1))
                {
                    currx++;

                    if (isNeededPixel(currx, cLine.y + 1))
                    {
                        // Сохраняем найденный отрезок
                        nx1 = currx;
                        nx2 = findRightPixel(currx, cLine.y + 1);
                        lineQueue.push({x1: nx1, x2: nx2, y: cLine.y + 1});
                        // Прыгаем далее найденного
                        currx = nx2;
                    }
                }
            }

        }   // while (main loop)
    }

    /*
     * void floodFill(CanvasContext2D canvasContext, int x, int y)
     * Выполняет заливку на канве
     * canvasContext - контекст
     * int x, y - координаты точки заливки
     * color - цвет заливки
     */
    this.floodFill = function(canvasContext, x, y, color)
    {
        _cWidth = canvasContext.canvas.width;
        _cHeight = canvasContext.canvas.height;

        _nR = color.r;
        _nG = color.g;
        _nB = color.b;
        _nA = color.a;

        var idata = canvasContext.getImageData(0, 0, _cWidth, _cHeight);
        var pixels = idata.data;
        _data = pixels;

        var toReplace = getDot(x, y);
        _rR = toReplace.r;
        _rG = toReplace.g;
        _rB = toReplace.b;
        _rA = toReplace.a;

        // Всё зависнет к известной матери если цвета совпадают
        if (_rR == _nR && _rG == _nG && _rB == _nB && _rA == _nA)
            return;

        effectiveFill(x, y);

        canvasContext.putImageData(idata, 0, 0);
    }
}