idn_lexem = ''
num_lexem = ''

def processIdnToken(char):
    global idn_lexem
    global num_lexem

    if char.isalpha() or char.isdigit():
        idn_lexem += char
    else:
        res = idn_lexem
        idn_lexem = ''
        num_lexem = ''
        return res

    return None


def processNumToken(char):
    global num_lexem
    global idn_lexem

    if char.isdigit():
        num_lexem += char

    elif char.isalpha():
        num_lexem += char
        idn_lexem = num_lexem
        num_lexem = ''        
        return {'status': False}
    else:
        res = num_lexem
        num_lexem = ''
        return res

    return None
