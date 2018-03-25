import json

from working import lexicProcess
from helper import outTable

filename = 'commentTestTrue'
# filename = 'commentTestFalse'  
# filename = 'unknowSymbolFalse'
# filename = 'delimsTrue'
# filename = 'idnTrue'
# filename = 'inputFile'



with open(filename) as fs:
    while True:
       result = lexicProcess(fs.read(1))
       if result != None:
           outTable(result)
           break
