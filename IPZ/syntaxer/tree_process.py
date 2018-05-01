#!/usr/bin/env python
# -*- coding: utf-8 -*-

from tree_struct import Node


lexem_table = None
current_lexem = None

parse_tree = Node('<signal>')


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

  lexem = current_lexem['lexem']
  code = current_lexem['code']
  
  curr_node = Node('<program>')


  if code != 407:
    print '!!! ERROR !!!'
  else:
    #  PROGRAM
    curr_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))    
    # procedure_identifier
    next_lexem()

    if procedure_identifier(curr_node):
      next_lexem()
      if current_lexem['code'] != 59:
        print '!!! ERROR !!! NOT FOUNG ;'
        return False
      else:
        next_lexem()
        if block(curr_node):
          return False
        if current_lexem['code'] != 46:
          print '!!! ERRRO NOT FOUND .'
          return False
        else:
          curr_node.view()

    else:
      print '!!! ERROR !!! not ident'

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
  current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
  node.add(current_node)
  return True

def block(node):
  global current_lexem
  global statements_stack

  current_node = Node('<block>')
  
  if declarations(current_node):
    return True
  
  if current_lexem['lexem'] != 'BEGIN':
    return True

  current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
  next_lexem()

  if statements_list(current_node):
    return True

  if current_lexem['lexem'] != 'END':
    return True

  else:
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    node.add(current_node)
    next_lexem()


def declarations(node):
  global current_lexem
  
  current_node = Node('<declarations>')

  if label_declarations(current_node):
    return True

  node.add(current_node)



def label_declarations(node):
  global current_lexem

  current_node = Node('<label_declarations>')

  if current_lexem['lexem'] == 'LABEL':
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    next_lexem()

    if unsigned_integer(current_node):
      return True

    if label_list(current_node):
      return True

    if current_lexem['code'] != 59:
      print 'ERROR ; in label declaration'
      return True
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    node.add(current_node)
    next_lexem()

  elif current_lexem['lexem'] == 'BEGIN':
    current_node.add(Node('<empty>'))
    node.add(current_node)
    return False

  else:
    return True
    

def statements_list(node):
  global statements_stack
  
  current_node = Node('<statements_list>')
  if not statement(current_node):
    statements_list(current_node)
    node.add(current_node)
  else:
    return True

  return False


def statement(node):
  global current_lexem

  current_node = Node('statement')

  if not unsigned_integer(current_node):
    if current_lexem['lexem'] != ':':
      return True
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    next_lexem()
    if statement(current_node):
      return True
    node.add(current_node)
    return False

  if current_lexem['lexem'] == 'GOTO':
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    next_lexem()
    if unsigned_integer(current_node):
      return True
    if current_lexem['lexem'] != ';':
      return True
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    # ;
    next_lexem()
    node.add(current_node)
    return False

  if not condition_statement(current_node):
    if current_lexem['lexem'] != 'ENDIF':
      return True
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    next_lexem()
    if current_lexem['lexem'] != ';':
      return True
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    node.add(current_node)
    return False

  if current_lexem['lexem'] == ';':
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
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
  current_node = Node('<incomplete_condition_statement>')


  if current_lexem['lexem'] != 'IF':
    return True
  current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
  next_lexem()
  if condition_expression(current_node):
    return True

  if current_lexem['lexem'] != 'THEN':
    return True
  current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
  next_lexem()
  if statements_list(current_node):
    return True

  node.add(current_node)
  return False

def alternative_part(node):
  global current_lexem

  current_node = Node('<incomplete_condition_statement>')

  if current_lexem['lexem'] == 'ELSE':
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    next_lexem()
    if statements_list(current_node):
      return True
  else:
    next = take_next_item()
    if next['lexem'] == 'END':
      # empty
      return False
  node.add(current_node)
  return False

def condition_expression(node):
  current_node = Node('<condition_expression>')
  if variable_identifier(current_node):
    return True
  next_lexem()
  if current_lexem['lexem'] != '=':
    return True
  current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
  next_lexem()
  if unsigned_integer(current_node):
    return True
  node.add(current_node)
  return False

def variable_identifier(node):
  global current_lexem
  current_node = Node('<variable_identifier>')
  print current_lexem
  if not identifier(current_node):
    return True
  node.add(current_node)
  return False


def parse(stack):
  global lexem_table
  global current_lexem

  lexem_table = stack
  current_lexem = lexem_table.pop()

  program(current_lexem)


def unsigned_integer(node):
  global current_lexem
  current_node = Node('<unsigned_integer>')

  # const
  if current_lexem['code'] < 501 or current_lexem['code'] > 1000:
    return True
  else:
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    node.add(current_node)
    next_lexem()

def label_list(node):
  global current_lexem

  current_node = Node('<label_list>')

  if current_lexem['lexem'] == ',':
    current_node.add(Node({'lexem': current_lexem['lexem'], 'code': current_lexem['code']}))
    next_lexem()
    if unsigned_integer(current_node):
      print 'ERROR net unsigned_integer'
      return True
    if label_list(current_node):
      return True
    node.add(current_node)
  else:
    if not unsigned_integer(current_node):
      print 'ERROR , in label list!'
      return True
    else:
      # print next_item
      current_node.add(Node('<empty>'))
      node.add(current_node)
      print 'label_list <empty>'

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
