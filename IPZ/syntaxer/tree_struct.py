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
  if 'code' in value:
    return  bc.WARNING if value['code'] == 0 else bc.UNDERLINE
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
    print '{}{}-|{}{}{}{}'.format(bc.OKBLUE, padding, bc.ENDC, msgColor, value, bc.ENDC)
    for node in self.children:
      node.view(level + 1)
  # def remove(self):
  #   if (self.parent):
  #     self.parent.children.remove(self)
  #     return self, self.parent
  #   else:
  #     return None

# dic = {'name': 'program', 'code': 12}
# 
# signal = Node(dic)

# program = Node('<program>')

# block = Node('<block>')
# program.add(block)

# signal.add(program)
# print node.value
# print node.children

# newNode = Node('<program>')
# print newNode.value
# print newNode.children

# node.add(newNode)
# node.add(Node('uhhh, blya'))
# print node.value

# node.add(Node('test'))
# node.children[2].add(Node('uhhh'))
# signal.view()
