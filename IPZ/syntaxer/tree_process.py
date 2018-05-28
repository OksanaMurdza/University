from tree_struct import Node, bc


lexem_table = None
current_lexem = None

parse_tree = Node('<signal_program>')

empty_authorized = ['ENDIF', 'END', 'ELSE']
error_stack = []

def add_current_item(current_node):
  global current_lexem

  current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code'], 'line': current_lexem['line'], 'pos': current_lexem['pos']}))


def next_lexem():
  global lexem_table
  global current_lexem

  try:
    current_lexem = lexem_table.pop()
  except:
    pass


def program(node):
  global current_lexem
  global parse_tree

  curr_node = Node('<program>')


  if current_lexem['lexem'] != 'PROGRAM':
    error_print('NOT_FOUND', 'PROGRAM')
    parse_tree.add(curr_node)
    parse_tree.view()
  else:
    add_current_item(curr_node)
    next_lexem()

    if procedure_identifier(curr_node):
      next_lexem()
      if current_lexem['lexem'] != ';':
        error_print('NOT_FOUND', ';')
        parse_tree.add(curr_node)
        return parse_tree
        # parse_tree.view()
        # return False
      else:
        next_lexem()
        if block(curr_node):
          parse_tree.add(curr_node)
          return parse_tree
          # parse_tree.view()
          # return False
        if current_lexem['lexem'] != '.':
          error_print('NOT_FOUND', '.')
          parse_tree.add(curr_node)
          # parse_tree.view()
          # return False
        else:
          add_current_item(curr_node)
          parse_tree.add(curr_node)
          # view all parse tree
          # parse_tree.view()
          return parse_tree
          

    else:
      error_print('NOT_FOUND', 'identifier')
      parse_tree.add(curr_node)
      # parse_tree.view()
      return parse_tree

def procedure_identifier(node):
  current_node = Node('<procedure_identifier>')
  if identifier(current_node):
    node.add(current_node)
    return True

  return False

def identifier(node):
  global current_lexem
  if current_lexem['code'] < 1001:
    # error
    return False
  current_node = Node('<identifier>')
  add_current_item(current_node)
  node.add(current_node)
  return True

def block(node):
  global current_lexem

  current_node = Node('<block>')
  
  if declarations(current_node):
    node.add(current_node)
    return True
  
  if current_lexem['lexem'] != 'BEGIN':
    node.add(current_node)
    error_print('NOT_FOUND', 'BEGIN')
    return True

  add_current_item(current_node)
  next_lexem()

  if statements_list(current_node):
    node.add(current_node)
    return True

  if current_lexem['lexem'] != 'END':
    node.add(current_node)
    error_print('NOT_FOUND', 'END')
    return True

  else:
    add_current_item(current_node)
    node.add(current_node)
    next_lexem()

  


def declarations(node):
  global current_lexem
  
  current_node = Node('<declarations>')

  if label_declarations(current_node):
    node.add(current_node)
    return True

  node.add(current_node)



def label_declarations(node):
  global current_lexem

  current_node = Node('<label_declarations>')

  if current_lexem['lexem'] == 'LABEL':
    add_current_item(current_node)
    next_lexem()

    if unsigned_integer(current_node):
      node.add(current_node)
      error_print('NOT_FOUND', 'unsigned_integer')
      return True

    if label_list(current_node):
      return True

    if current_lexem['code'] != 59:
      node.add(current_node)
      error_print('NOT_FOUND', ';')
      return True

    add_current_item(current_node)
    node.add(current_node)
    next_lexem()

  elif current_lexem['lexem'] == 'BEGIN':
    current_node.add(Node('<empty>'))
    node.add(current_node)
    return False

  else:
    node.add(current_node)
    error_print('NOT_FOUND', 'LABEL')
    return True
    

def statements_list(node):
  global statements_stack
  
  current_node = Node('<statements_list>')
  if not statement(current_node):
    statements_list(current_node)
    node.add(current_node)
    return False
  
  if current_lexem['lexem'] in empty_authorized:
    current_node.add(Node('<empty>'))
    node.add(current_node)
    return False

  error_print('UNEXPECTED')
  node.add(current_node)
  return True

  


def statement(node):
  global current_lexem

  current_node = Node('<statement>')

  if not unsigned_integer(current_node):
    if current_lexem['lexem'] != ':':
      node.add(current_node)
      error_print('NOT_FOUND', ':')
      return True
    add_current_item(current_node)
    next_lexem()
    if statement(current_node):
      return True
    node.add(current_node)
    return False

  if current_lexem['lexem'] == 'GOTO':
    add_current_item(current_node)
    next_lexem()
    if unsigned_integer(current_node):
      return True
    if current_lexem['lexem'] != ';':
      node.add(current_node)
      error_print('NOT_FOUND', ';')
      return True
    add_current_item(current_node)
    # ;
    next_lexem()
    node.add(current_node)
    return False

  if not condition_statement(current_node):
    if current_lexem['lexem'] != 'ENDIF':
      node.add(current_node)
      error_print('NOT_FOUND', 'ENDIF')
      return True

    add_current_item(current_node)
    next_lexem()

    if current_lexem['lexem'] != ';':
      node.add(current_node)
      error_print('NOT_FOUND', ';')
      return True

    add_current_item(current_node)
    node.add(current_node)
    next_lexem()
    return False

  if current_lexem['lexem'] == ';':
    add_current_item(current_node)
    node.add(current_node)
    next_lexem()
    return False

  return True
    

def condition_statement(node):
  global current_lexem

  current_node = Node('<condition_statement>')

  if incomplete_condition_statement(current_node):
    return True

  if alternative_part(current_node):
    return True

  node.add(current_node)
  return False

def incomplete_condition_statement(node):
  global current_lexem
  current_node = Node('<incomplite_condition_statement>')


  if current_lexem['lexem'] != 'IF':
    node.add(current_node)
    # error_print('NOT_FOUND', 'IF')
    return True
  add_current_item(current_node)
  next_lexem()
  if condition_expression(current_node):
    return True

  if current_lexem['lexem'] != 'THEN':
    node.add(current_node)
    error_print('NOT_FOUND', 'THEN')
    return True
  add_current_item(current_node)
  next_lexem()
  if statements_list(current_node):
    return True

  node.add(current_node)
  return False

def alternative_part(node):
  global current_lexem

  current_node = Node('<alternative_part>')
  
  if current_lexem['lexem'] == 'ELSE':
    add_current_item(current_node)
    next_lexem()
    if statements_list(current_node):
      return True
  else:
    next = take_next_item()
    if current_lexem['lexem'] == 'ENDIF':
      current_node.add(Node('<empty>'))
  node.add(current_node)
  return False

def condition_expression(node):
  current_node = Node('<condition_expression>')
  if variable_identifier(current_node):
    return True
  next_lexem()
  if current_lexem['lexem'] != '=':
    node.add(current_node)
    error_print('NOT_FOUND', '=')
    return True
  add_current_item(current_node)
  next_lexem()
  if unsigned_integer(current_node):
    return True
  node.add(current_node)
  return False

def variable_identifier(node):
  global current_lexem
  current_node = Node('<variable_identifier>')
  if not identifier(current_node):
    node.add(current_node)
    error_print('NOT_FOUND', 'identifier')
    return True
  node.add(current_node)
  return False


def parse(stack):
  global lexem_table
  global current_lexem

  lexem_table = stack
  current_lexem = lexem_table.pop()

  return {
    'parsed_tree': program(current_lexem),
    'errors': error_stack
  }


def unsigned_integer(node):
  global current_lexem
  current_node = Node('<unsigned_integer>')

  # const
  if current_lexem['code'] < 501 or current_lexem['code'] > 1000:
    return True
  else:
    add_current_item(current_node)
    node.add(current_node)
    next_lexem()

def label_list(node):
  global current_lexem

  current_node = Node('<label_list>')

  if current_lexem['lexem'] == ',':
    add_current_item(current_node)
    next_lexem()
    if unsigned_integer(current_node):
      error_print('NOT_FOUND', 'unsigned_integer')
      return True
    if label_list(current_node):
      return True
    node.add(current_node)
  else:
    if not unsigned_integer(current_node):
      error_print('NOT_FOUND')
      return True
    else:
      # print next_item
      current_node.add(Node('<empty>'))
      node.add(current_node)

  # 401 - 500 BEGIN END FOR
  # 501 - 1000 const
  # 1001 - ident

def take_next_item():
  global current_lexem
  global lexem_table

  current = current_lexem
  next_lexem()


  next = current_lexem

  lexem_table.append(next)
  current_lexem = current

  return next


def error_print(err_type, expected = ''):
  global current_lexem
  global error_stack

  pos = current_lexem['pos']
  line = current_lexem['line']
  lexem = current_lexem['lexem']

  
  if lexem in error_stack:
    return

  error_stack.append(lexem)


  if err_type == 'NOT_FOUND':
    print 'Parser: {}Error{} (line {}{}{}, column {}{}{}): `<{}>` expected but "{}" found'.format(
    bc.FAIL,
    bc.ENDC,
    bc.WARNING,
    line,
    bc.ENDC,
    bc.WARNING,
    pos,
    bc.ENDC,
    expected,
    lexem
    )
  
  elif err_type == 'UNEXPECTED':
    print 'Parser: {}Error{} (line {}{}{}, column {}{}{}) Unexpected token `<{}>`'.format(
      bc.FAIL,
      bc.ENDC,
      bc.WARNING,
      line,
      bc.ENDC,
      bc.WARNING,
      pos,
      bc.ENDC,
      lexem
      )
