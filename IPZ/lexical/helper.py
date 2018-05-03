take_acii_code = lambda char: None if not char else ord(char)

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def find_duplicate_lexem(array,lexem): 
    for item in array:
        if str(lexem) == str(item['name']):
            return item['code']
        return None



def array_without_duplicate(array):
    seen = set()
    newArray = []

    for item in array:
        t = tuple(item.items())
        if t not in seen:
            seen.add(t)
            newArray.append(item)

    return newArray

def print_table(data):
  tokens = data['tokens']

  # print error
  # for error in ErrorArray:
      # printError(error['line'], error['pos'], error['name'])

  print bcolors.HEADER, 'line  pos  code  name\n----------------------', bcolors.ENDC

  # print loop
  for token in tokens:
      print '{:4} {:4} {}{:5}{}  {}{}{}'.format(token['line'], token['pos'], bcolors.BOLD, token['code'], bcolors.ENDC, bcolors.OKBLUE, token['name'], bcolors.ENDC)

def print_error(msg, c, local):
  currLine = local['line']
  currPos = local['pos']

  print '{}ERROR:{} {} \'{}\' on position {}{}, {}{}'.format(bcolors.FAIL, bcolors.ENDC, msg, c, bcolors.BOLD, currLine, currPos, bcolors.ENDC)

def create_stack(data):
    stack = []
    tokens = data['tokens']

    for token in tokens:
        stack_item = {
            'lexem': token['name'],
            'code': token['code'],
            'line': token['line'],
            'pos': token['pos']
        }
        stack.append(stack_item)

    return stack[::-1]

    
