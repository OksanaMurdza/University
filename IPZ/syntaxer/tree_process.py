lexem_table = None
current_lexem = None

def next_lexem():
  global lexem_table
  global current_lexem

  try:
    current_lexem = lexem_table.pop()
  except:
    pass

def program(node):
  global current_lexem

  lexem = current_lexem['lexem']
  code = current_lexem['code']

  if code != 407:
    print '!!! ERROR !!!'
  else:
    # procedure_identifier
    next_lexem()

    if procedure_identifier():
      next_lexem()
      if current_lexem['code'] != 59:
        print '!!! ERROR !!! NOT FOUNG ;'
        return False
      else:
        next_lexem()
        # block
        if block():
          return False
        if current_lexem['code'] != 46:
          print '!!! ERRRO NOT FOUND .'
          return False

    else:
      print '!!! ERROR !!! not ident'

def procedure_identifier():
  if identifier():
    return True

  return False

def identifier():
  global current_lexem
  if current_lexem['code'] < 1001:
    # error
    return False

  return True

def block():
  return False

def parse(stack):
  global lexem_table
  global current_lexem

  lexem_table = stack
  current_lexem = lexem_table.pop()

  program(current_lexem)


    