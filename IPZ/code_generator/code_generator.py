from tree_struct import get_gramm_rule

def code_gen(ast):
  res = ast.get_node(ast)
  current_lexem = res['value']
  print current_lexem
  if current_lexem == '<signal_program>':
    code_gen(res['child'][0])
  elif current_lexem == '<program>':
    if len(res['child']):
      for i, index in enumerate((res['child'])):
        code_gen(res['child'][i])