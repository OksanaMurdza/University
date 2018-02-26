import json

from working import lexicProcess

# filename = 'commentTestTrue'
# filename = 'commentTestFalse'  
# filename = 'unknowSymbolFalse'
# filename = 'delimsTrue'
filename = 'idnTrue'
# filename = 'inputFile'



with open(filename) as fs:
    while True:
       result = lexicProcess(fs.read(1))
       if result != None:
           print json.dumps(result, indent = 4)
        # print result 
           break
