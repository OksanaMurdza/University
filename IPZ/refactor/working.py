import json

from typeChecker import process_idn, process_num
from helper import take_acii_code, find_duplicate_lexem, array_without_duplicate, print_error

with open('dictionary.json', 'r') as fs:
    dictionary = json.load(fs)


currPos = 1
currLine = 1
state = 'S'
delimeters = []
tokens = []
idns = []
consts = []
prev_status = False

def lexic_process(char):
  global currPos
  global currLine
  global state
  global prev_status

  acii = take_acii_code(char)


  if state == 'WS' and acii not in dictionary['spaces']:
    state = 'S'
  elif state == 'ERROR' and (acii in dictionary['spaces'] or char in dictionary['delimeters'] or not char):
    state = 'S'

  elif state == 'IDN':
    result = process_idn(char)
    if result == False:
      location = { 'line': currLine, 'pos': currPos }      
      print_error('incorrect defining identifier: ', char, location)
      state = 'ERROR'
    elif result != None:
      token_process(result, 'IDN')
      state = 'S'

  elif state == 'NUM':
    result = process_num(char)
    if result == False:
      location = { 'line': currLine, 'pos': currPos }            
      print_error('incorrect defining number', char, location)
      state = 'ERROR'
    elif result != None:
      token_process(result, 'NUM')
      state = 'S'

  elif state == 'BCOM':
    if char != '*':
      location = { 'line': currLine, 'pos': currPos }            
      print_error('Expected * instead of', char, location)
      state = 'S'
    else:
      state = 'COM'
  
  elif state == 'COM':
    if char == '*':
      state = 'ECOM'
    elif not char:
      location = { 'line': currLine, 'pos': currPos }            
      print_error('Unexpected end of file', char, location)
  
  elif state == 'ECOM':
    if not char:
      location = { 'line': currLine, 'pos': currPos }            
      print_error('Unexpected end of file', char, location)
    elif char == ')':
      prev_status = 'ECOM'
      state = 'S'
      currPos += 1
      return None
    elif char == '*':
      state = 'ECOM'
    else:
      state = 'COM'
    

  if state == 'S':
    if not char:
      return {
        'idns': idns,
        'consts': consts,
        'delimeters': delimeters,
        'tokens': tokens
      }

    elif char.isalpha():
      state = 'IDN'
      process_idn(char)

    elif char.isdigit():
      state = 'NUM'
      process_num(char)

    elif char == '(':
      state = 'BCOM'
    
    elif char == '*' and prev_status == 'ECOM':
      state = 'ECOM'

    elif acii in dictionary['spaces']:
      state = 'WS'

    elif char in dictionary['delimeters']:
      token_process(char, 'DELIMETERS')

    else:
      location = { 'line': currLine, 'pos': currPos }
      print_error('unknown symbol', char, location)

    
  if acii == 10 or acii == 13:
    currPos = 0
    currLine += 1


  currPos += 1
  return None


def token_process(lexem, type):
  global delimeters
  global idns
  global const
  global tokens

  global currPos
  global currLine

  code = None


  if type == 'DELIMETERS':
    code = take_acii_code(lexem)
    delimeters.append({'lexem': lexem, 'code': code})

  elif type == 'IDN':
    # reserved words
    for index, string in enumerate(dictionary['reserved']):
      if string == lexem.upper():
        code = 401 + index
    # take idn
    if code == None:
      # if we know lexem code
      code = find_duplicate_lexem(idns, lexem)
      # calculate new lexem
      if code == None:
        code = 1001 + len(array_without_duplicate(idns))

    idns.append({'name': lexem, 'code': code})

  elif type == 'NUM':
    # if const code must not be uniq
    code = find_duplicate_lexem(consts, lexem)
    if code == None:
      code = 501 + len(array_without_duplicate(consts))

    # if const code must be uniq
    # code = len(const)
    consts.append({'name': lexem, 'code': code})

  
  tokens.append({'line': currLine, 'code': code, 'name': lexem, 'pos':calculate_curr_pos(lexem)})

def calculate_curr_pos(lexem):
  global currPos
  if (len(lexem) == 1):
    return currPos
  else:
    return currPos - len(lexem)