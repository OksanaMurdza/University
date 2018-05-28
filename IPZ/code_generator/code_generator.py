from helpers import error_handle
from tree_struct import get_gramm_rule

labels_store = []
condition = []
label_flag = False


@error_handle
def code_gen(ast):
  global labels_store
  global label_flag

  res = ast.get_node()
  rule = res['rule']

  # signal-program
  if rule == 1:
    code_gen(res['child'][0])

  # program
  if rule == 2:
    # procedure-identifier
     procedure_identifier = code_gen(res['child'][1])
     code_gen(res['child'][2])

  # block
  if rule == 3:
    code_gen(res['child'][0])
    code_gen(res['child'][2])

  # declarations
  if rule == 4:
    code_gen(res['child'][0])

  # label_declarations
  if rule == 5:
    unsig_int = code_gen(res['child'][1])

    # label-list
    code_gen(res['child'][2])

  # unsigned_int 
  if rule == 6:
    unsig_int = get_child(res)
    return unsig_int['value']['lexem']

  # label_list
  if rule == 7:
    child = res['child'][0].get_node()
    if child['value'] != '<empty>':
      unsig = code_gen(res['child'][1])
      labels_store.append(unsig)
      code_gen(res['child'][2])

  # statement-list
  if rule == 8:
    child = res['child'][0].get_node()
    if child['value'] != '<empty>':
      # statemnt
      result = code_gen(res['child'][0])
      return result
      
    return result

  # statement
  if rule == 9:
    child = get_child(res)

    if child['value'] == '<unsigned_integer>':
      label = code_gen(res['child'][0])
      flag_label = pair(label)
      if not label_flag:
        print label
      res = code_gen(res['child'][2])
      return res
    
    elif child['value'] == '<condition_statement>':
      code_gen(res['child'][0])

    elif child['value']['lexem'] == 'GOTO':
      goto_label = code_gen(res['child'][1])
      condition_arr = pair(goto_label)
      return condition_arr
    

  # condition_statement
  if rule == 10:
    # incomplite_condition_statement
    code_gen(res['child'][0])

    # alternative_part
    alternative = code_gen(res['child'][1])
    print alternative

  # incomplite_condition_statement
  if rule == 11:
    # condition_expression
    condition = code_gen(res['child'][1])
    label_flag = True
    # statement-list
    sec_child = code_gen(res['child'][3])
    print condition
    print sec_child

    
  # condition_expression
  if rule == 12:
    variable = code_gen(res['child'][0])
    equal = code_gen(res['child'][2])

    return [variable, equal]    

  # variable_identifier
  if rule == 13:
    return code_gen(res['child'][0])
    

  # identifier
  if rule == 14:
    ident = get_child(res)
    return ident['value']['lexem']
    
  # procedure-identifier
  if rule == 15:
    # identifier
    ident = code_gen(res['child'][0])
    
    return ident

  # alternative_part
  if rule == 16:
    child = res['child'][0].get_node()
    if child['value'] != '<empty>':
      return code_gen(res['child'][1])

  # print res

def get_child(node):
  return node['child'][0].get_node()

def pair(label):
  global condition
  global label_flag
  global labels_store

  if not label_flag:
    return


  if label not in labels_store:
    raise NameError('NOT_DEFINED_LABEL', label)

  if len(condition) < 2:
    condition.append(label)
  
  if len(condition) == 2:
    buff = condition
    condition = [] 
    return buff