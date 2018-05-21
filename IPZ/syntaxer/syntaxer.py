import sys
sys.path.append('../lexical')

from lexical import lexical
from tree_process import parse
from tree_struct import Node

def syntaxer(lexem_table, show = False):
  res = parse(lexem_table)
  if show:
    res.view()
    
  return res
