import json

from working import syntaxProcess

filename = 'input'

with open(filename) as fs:
    while True:
       result = syntaxProcess(fs.read(1))
       if result != None:
           print json.dumps(result, indent = 4)
        # print result
           break
