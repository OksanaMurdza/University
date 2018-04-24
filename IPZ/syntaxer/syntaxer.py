import sys
sys.path.append('../lexical')

from lexical import lexical
from tree_process import parse

lexem_table = lexical('inputFile')

# print lexem_table
parse(lexem_table)

