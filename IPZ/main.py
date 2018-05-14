#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys, getopt

sys.path.append('./lexical')
sys.path.append('./syntaxer')

from lexical import lexical
from syntaxer import syntaxer

argument_list = sys.argv[1:]

if not len(argument_list):
  raise getopt.error('path is required! (-h or --help)')
  sys.exit(2)


for arg in argument_list:
  if arg in ['-l', '--lexer']:
    lexical('inputFile', True)
  elif arg in ['-s', '--syntaxer']:
    syntaxer(lexical('inputFile'))
  elif arg in ['-h', '--help']:
    print " -l, --lexer start lexer \n -s, --syntaxer start syntax \n -h, --help show help "
  

  