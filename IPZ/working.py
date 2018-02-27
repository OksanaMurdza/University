import json

from typeChecker import processIdnToken, processNumToken
from helper import findDuplicateLexem, arrayWithoutDuplicateItem, takeAsciiCode, printErrort

with open('dictionary.json', 'r') as fs:
    dictionary = json.load(fs)


currentPosition = 1
currentLine = 1
state = "s"

tokens = []
delimeters = []
idns = []
const = []



def lexicProcess(char):

    # global var
    global state
    
    global currentPosition
    global currentLine

    global tokens
    global delimeters
    global idns
    global const

    if state == 'ws' and not takeAsciiCode(char) in dictionary['spaces']:
        state = 's'

    if state == 's':
        # take delimeters 
        if char in dictionary['delimeters']:
            tokenProcess(char, 'delimeters')

        elif takeAsciiCode(char) in dictionary['spaces']:
            state = 'ws'
        
        # take ind
        elif char.isalpha():
            state = 'idn'
            processIdnToken(char)

        # take num
        elif char.isdigit():
            state = 'num'
            processNumToken(char)

        # take comment (*<text>*)
        elif char == '(':
            state = 'bcom'

             # return branch
        elif not char:
            return {
                'tokens': tokens,
                'idns': idns,
                'delimeters': delimeters,
                'const': const
            }

        # unknow symbol :c
        else:
            printErrort(currentLine, currentPosition, char)

    elif state == 'idn':
        res = processIdnToken(char)
        if res != None:
            tokenProcess(res, 'idn')
            state = 's'

    elif state == 'num':
        res = processNumToken(char)
        if type(res) is dict:
            state = 'idn'

        elif res != None:
            tokenProcess(res, 'num')
            state = 's'

    elif state == 'bcom':
        if char != '*':
            printErrort(currentLine, currentPosition, char)
            state = 's'
        else:
            state = 'com'

    elif state == 'com':
        if not char:
            printErrort(currentLine, currentPosition)            
            state = 's'
        elif char == '*':
            state = 'ecom'
        

    elif state == 'ecom':
        if char == ')':
            state = 's'
            return None
        elif char == '*':
            state = 'ecom' 
        elif not char:
            printErrort(currentLine, currentPosition)
            state = 's'
        else:
            state = 'com'

    currentPosition += 1

    if takeAsciiCode(char) == 10:
        currentPosition = 1
        currentLine += 1

    return None



def tokenProcess(lexem, type):
    global delimeters
    global idns
    global const

    code = None
    if type == 'delimeters':
        code = takeAsciiCode(lexem)
        delimeters.append({'lexem': lexem, 'code': code})

    elif type == 'idn':
        # reserved words
        for index, string in enumerate(dictionary['reserved']):
            if string == lexem.upper():
                code = 401 + index
        # take idn
        if code == None:
            # if we know lexem code
            code = findDuplicateLexem(idns, lexem)
            # calculate new lexem
            if code == None:
                code = 1001 + len(arrayWithoutDuplicateItem(idns))

            idns.append({'name': lexem, 'code': code})

    elif type == 'num':
        # if const code must not be uniq
        code = findDuplicateLexem(const, lexem)
        if code == None:
            code = 501 + len(arrayWithoutDuplicateItem(const))

        # if const code must be uniq
        # code = len(const)
        const.append({'name': lexem, 'code': code})

    

        
    tokens.append({'line': currentLine, 'code': code, 'name': lexem, 'pos': currentPosition - len(lexem)})
            