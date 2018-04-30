#!/usr/bin/env python
# -*- coding: utf-8 -*-

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

  take_next_item()

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
          print 'block'
          return False
        if current_lexem['code'] != 46:
          print '!!! ERRRO NOT FOUND .'
          return False
        else:
          print 'all ok'

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
  global current_lexem

  if declarations():
    return True
  
  if current_lexem['lexem'] != 'BEGIN':
    return True
  next_lexem()


  if statements_list():
    return True

  # next_lexem()
  # временно
  if current_lexem['lexem'] != 'END':
    return True

  else:
    next_lexem()


def declarations():
  global current_lexem

  if label_declarations():
    return True



def label_declarations():
  global current_lexem

  if current_lexem['lexem'] == 'LABEL':
    next_lexem()

    if unsigned_integer():
      return True

    if label_list():
      return True

    if current_lexem['code'] != 59:
      print 'ERROR ; in label declaration'
      return True
    else:
      next_lexem()
      return False
  
  elif current_lexem['lexem'] != 'BEGIN':
    print 'ERROR!! MISS BEGIN IN BLOCK'
    return True
  

  # debug
  if current_lexem['lexem'] == 'BEGIN':
    print '<empty> in label_declarations'


def statements_list():
  if not statement():
    statements_list()
  else:
    if current_lexem['lexem'] != 'END':
      return True

def statement():
  global current_lexem

  if not unsigned_integer():
    if current_lexem['lexem'] != ':':
      print 'ERROR!!! Miss : in statement 2'
      return True
    next_lexem()
    if statement():
      return True
    
    return False

  if current_lexem['lexem'] == 'GOTO':
    next_lexem()
    if unsigned_integer():
      return True
    if current_lexem['lexem'] != ';':
      print 'ERROR!!! Miss ; in statement 1'
      return True
    next_lexem()
    return False
  
  # elif condition_statement():
  #   if current_lexem['lexem'] != 'ENDIF':
  #     return True
  #   next_lexem()
  #   if current_lexem['lexem'] != ';':
  #     return True

  elif current_lexem['lexem'] == ';':
    next_lexem()
    return False

  return True


def condition_statement():
  return False


def parse(stack):
  global lexem_table
  global current_lexem

  lexem_table = stack
  current_lexem = lexem_table.pop()

  program(current_lexem)


def unsigned_integer():
  global current_lexem

  # const
  if current_lexem['code'] < 501 or current_lexem['code'] > 1000:
    return True
  else:
    next_lexem()

def label_list():
  global current_lexem


  if current_lexem['lexem'] == ',':
    next_lexem()
    if unsigned_integer():
      print 'ERROR net unsigned_integer'
      return True
    if label_list():
      return True
  else:
    if not unsigned_integer():
      print 'ERROR , in label list!'
      return True
    else:
      # print next_item
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
