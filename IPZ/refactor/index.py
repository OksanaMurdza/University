import json
from working import lexic_process
from helper import print_table


filename = 'input'
# filename = 'commentTestFalse'
# filename = 'commentTestTrue'
# filename = 'delimsTrue'
# filename = 'inputFile'
# filename = 'unknowSymbolFalse'



with open(filename) as fs:
  while True:
    currentChar = fs.read(1)
    result = lexic_process(currentChar)
    if result != None:
      # print json.dumps(result, indent=4, sort_keys=True)
      print_table(result)
      break

