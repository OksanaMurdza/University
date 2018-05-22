from tree_struct import get_gramm_rule

labels_store = []
labels_flag = True
labels_id = 1


def error_handle(f):
  def wrapper(ast):
    try:
      return f(ast)
    except Exception as inst:
      # if inst == 'NOT_DEFINED_LABEL':
      # print 'NOT_DEFINED_LABEL'
      pass
  return wrapper


def create_label(name, goto):
  global labels_id

  label_name = '{}_{}'.format(name, labels_id)
  labels_id += 1

  return {
    'label_name': label_name,
    'label_content': "{} :\n\t JMP {}".format(label_name, goto)
  }
  

@error_handle
def code_gen(ast):
  global labels_store
  global labels_flag

  res = ast.get_node()
  rule = res['rule']


  # <signal_program> || <declarations> 
  if rule in [1, 4]:
    code_gen(res['child'][0])

  # <program>
  if rule == 2:
    # -> procedure_identifier
    proc_ident = code_gen(res['child'][1])
    print 'SEGMENT {}'.format(proc_ident)
    # -> block
    code_gen(res['child'][2])

  
  # <block>
  if rule == 3:
    # -> declarations
    code_gen(res['child'][0])
    # -> statements_list    
    code_gen(res['child'][2])

  # <label_declarations>
  if rule == 5:
    # -> unsigned_integer
    code_gen(res['child'][1])
    # -> label_list
    code_gen(res['child'][2])

  # <unsigned_integer>
  if rule == 6:
    child = get_child(res)
    if labels_flag:
      labels_store.append(child['value']['lexem'])
    else:
      return child['value']['lexem']

  # <label_list>
  if rule == 7:
    child = get_child(res)
    if child['value'] != '<empty>':
      # -> unsigned_integer
      code_gen(res['child'][1])
      # -> label-list
      code_gen(res['child'][2])
    elif child['value'] == '<empty>':
      code_gen(res['child'][0])
      labels_flag = False

  # statements_list
  if rule == 8:
    # statement
    unsigned = code_gen(res['child'][0])
    code_gen(res['child'][1])

    return unsigned

  
  # <statement>
  if rule == 9:
    child = get_child(res)
    unsig = ''
    if child['value'] == '<unsigned_integer>':
      # -> unsigned_integer
      unsigned = code_gen(res['child'][0])
      # -> statement
      statement = code_gen(res['child'][2])
      if statement:
        unsig = [unsigned, statement]
    # -> GOTO
    elif type(child['value']) is dict:
      if child['value']['lexem'] == 'GOTO':
        unsig = code_gen(res['child'][1])

    elif child['value'] == '<condition_statement>':
      unsig = code_gen(res['child'][0])

    return unsig

  # <condition_statement>
  if rule == 10:
    # -> incomplite_condition_statement
    if_branch = code_gen(res['child'][0]) 


    # -> alternative_part
    else_branch = code_gen(res['child'][1])

    if_label = create_label('if', if_branch[1])

    if type (else_branch) is list:
      else_label = create_label('else', else_branch[1])

      print "JNE {}".format(else_label['label_name'])
      print "JMP {}".format(if_label['label_name'])

      print if_label['label_content']
      print else_label['label_content']
    else:
      print "JMP {}".format(if_label['label_name'])
      print if_label['label_content']


  # <incomplite_condition_statement>
  if rule == 11:
    # -> condition_expression
    code_gen(res['child'][1])

    # -> statement_list
    res = code_gen(res['child'][3])
    
    if type(res) is list:
      for label in res:
        if not label in labels_store:
          raise Exception('NOT_DEFINED_LABEL')

    
    # else
    # print 'JMP ?{}'.format(res[0])

    # print 'incom{}'.format(res)
    return res

  # <condition_expression> 
  if rule == 12:
    # -> variable_identifier
    var_iden = code_gen(res['child'][0])
    # -> unsigned_integer
    unsig_int = code_gen(res['child'][2])

    # print 'labels_store  ->{}'.format(labels_store)
    print 'cmp {}, {}'.format(var_iden, unsig_int)
    # print 'JNE else_label'
    # print 'next deal'

  # <variable_identifier>
  if rule == 13:
    ident = code_gen(res['child'][0])

    return ident

  # <identifier>
  if rule == 14:
    child = get_child(res)
    ident = child['value']['lexem']
    return ident

  # <alternative_part>
  if rule == 16:
    res = code_gen(res['child'][1])

    return res

  if rule == 0:
    pass

    return ident

  # <alternative_part>
  if rule == 16:
    res = code_gen(res['child'][1])

    return res

  if rule == 0:
    pass


def get_child(node):
  return node['child'][0].get_node()