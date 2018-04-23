import json
from working import lexic_process
from helper import print_table, create_stack


# filename = 'input'
# filename = 'commentTestFalse'
# filename = 'commentTestTrue'
# filename = 'delimsTrue'
filename = './tests/inputFile'
# filename = 'unknowSymbolFalse'



with open(filename) as fs:
  while True:
    currentChar = fs.read(1)
    result = lexic_process(currentChar)
    if result != None:
      # print_table(result)
      stack = create_stack(result)
      print stack.pop()
      break

