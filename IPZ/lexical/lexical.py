import json
import os 

from working import lexic_process
from helper import print_table, create_stack


# filename = 'input'
# filename = 'commentTestFalse'
# filename = 'commentTestTrue'
# filename = 'delimsTrue'
filename = './tests/inputFile'
# filename = 'unknowSymbolFalse'



def lexical(filename):
  path_filename = os.path.dirname(os.path.realpath(__file__)) + '/tests/{}'.format(filename)
  stack = None
  with open(path_filename) as fs:
    while True:
      currentChar = fs.read(1)
      result = lexic_process(currentChar)
      if result != None:
        # print_table(result)
        stack = create_stack(result)
        break

  return stack

