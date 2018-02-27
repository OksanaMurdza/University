class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'




def findDuplicateLexem(array,lexem): 
    for item in array:
        if str(lexem) == str(item['name']):
            return item['code']
        return None



def arrayWithoutDuplicateItem(array):
    seen = set()
    newArray = []

    for item in array:
        t = tuple(item.items())
        if t not in seen:
            seen.add(t)
            newArray.append(item)

    return newArray


takeAsciiCode = lambda char: None if not char else ord(char)


def printErrort(currLine, currPos, symbol = ''):
    print '{}ERROR:{}  on position {}{}, {}{}  {}{}{}'.format(bcolors.FAIL, bcolors.ENDC, bcolors.BOLD, currLine, currPos,  bcolors.ENDC, bcolors.FAIL, symbol ,bcolors.ENDC)

def outTable(data):
    print bcolors.HEADER, 'line  pos  code  name\n----------------------', bcolors.ENDC

    tokenData = finalLexicalChecker(data['tokens'])
    # print loop
    for token in tokenData:
        print '{:4} {:4} {}{:5}{}  {}{}{}'.format(token['line'], token['pos'], bcolors.BOLD, token['code'], bcolors.ENDC, bcolors.OKBLUE, token['name'], bcolors.ENDC)
        pass


finalLexicalChecker = lambda data: filter(errorCatcher, data)


def errorCatcher(string):
    code = string['code']
    name = string['name']

    # check IDN
    if code >= 1000:
        if name[0].isdigit():
            # TODO create new error out
            print string
            return False

    return string