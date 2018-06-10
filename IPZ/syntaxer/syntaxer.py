import sys
sys.path.append('../lexical')

from lexical import lexical
from tree_process import parse
from tree_struct import Node

def syntaxer(lexem_table, show = False):
  res = parse(lexem_table)
  parsed_tree = res['parsed_tree']
  if show:
    parsed_tree.view()
  return res
