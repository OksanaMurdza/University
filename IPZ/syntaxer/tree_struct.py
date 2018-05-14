class bc:
  HEADER = '\033[95m'
  OKBLUE = '\033[94m'
  OKGREEN = '\033[92m'
  WARNING = '\033[93m'
  FAIL = '\033[91m'
  ENDC = '\033[0m'
  BOLD = '\033[1m'
  UNDERLINE = '\033[4m'

def getMsgColor(value):
  if value == '<empty>':
    return bc.OKGREEN
  if type(value) is dict:
    return bc.OKBLUE

  return bc.HEADER

class Node:
  def __init__(self, value):
    self.value = value
    self.children = []
    self.parent = None
  def add(self, node):
    assert isinstance(node, Node)
    node.parent = self
    self.children.append(node)
  def view(self, level = 0):
    padding = ''.join('- ' for i in range(level))
    value = self.value

    msgColor = getMsgColor(self.value)
    if type(value) is dict:
      print '{}{}-|{}{}{}{}'.format(bc.OKBLUE, padding, bc.ENDC, msgColor, value['lexem'], bc.ENDC)
    else:
      print '{}{}-|{}{}{}{}'.format(bc.OKBLUE, padding, bc.ENDC, msgColor, value, bc.ENDC)

    for node in self.children:
      node.view(level + 1)



