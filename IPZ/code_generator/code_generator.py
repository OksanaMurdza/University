from tree_struct import get_gramm_rule

labels_store = []

def code_gen(ast):
  res = ast.get_node()
  rule = res['rule']
  print '-----'
  print res
  print '-----'

  # <signal_program> || <declarations>
  if rule in [1, 4]:
    code_gen(res['child'][0])

  # <program>
  if rule == 2:
    code_gen(res['child'][2])

  
  # <block>
  if rule == 3:
    code_gen(res['child'][0])
    code_gen(res['child'][2])

  # label_declarations
  if rule == 5:
    code_gen(res['child'][1])
    code_gen(res['child'][2])

  # unsigned_integer
  if rule == 6:
    child = get_child(res)
    labels_store.append(child['value']['lexem'])



  # label_list
  if rule == 7:
    child = get_child(res)
    if child['value'] != '<empty>':
      code_gen(res['child'][1])
      code_gen(res['child'][2])
    elif child['value'] == '<empty>':
      code_gen(res['child'][0])

  if rule == 0:
    pass


def get_child(node):
  return node['child'][0].get_node()