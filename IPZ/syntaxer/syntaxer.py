import sys
sys.path.append('../lexical')

from lexical import lexical
from tree_process import parse

def syntaxer(lexem_table):
  parse(lexem_table)