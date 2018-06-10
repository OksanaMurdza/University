from helper import bcolors


def error_handle(f):
  def wrapper(ast):
    try:
      return f(ast)
    except NameError as error:
      error_type = error[0]
      error_object = error[1]

      if error_type == 'NOT_DEFINED_LABEL':
         print 'Code Generator: {}Error:{} label <{}{}{}> {} is not defined!{}'.format(
            bcolors.FAIL,
            bcolors.ENDC,
            bcolors.WARNING,
            error_object,
            bcolors.ENDC,
            bcolors.FAIL,
            bcolors.ENDC,
            )
  return wrapper



