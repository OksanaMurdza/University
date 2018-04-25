import json
import os

from helper import take_acii_code

idn_token = ''
num_token = ''

with open(os.path.dirname(os.path.realpath(__file__)) + '/dictionary.json', 'r') as fs:
    dictionary = json.load(fs)

def process_idn(char):
  global idn_token

  acii = take_acii_code(char)

  if char.isalpha() or char.isdigit():
    idn_token += char
  elif char in dictionary['delimeters'] or acii in dictionary['spaces'] or not char:
    buffer = idn_token
    idn_token = ''
    return buffer
  else:
    idn_token = ''
    return False
  
  return None
  

def process_num(char):
  global num_token

  acii = take_acii_code(char)

  if char.isdigit():
    num_token += char

  elif char in dictionary['delimeters'] or acii in dictionary['spaces'] or not char:
    buffer = num_token
    num_token = ''
    return buffer
  else:
    num_token = ''
    return False

  return None
  

