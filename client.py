import requests as req
import dotenv, os, json

# Carregando o dotenv
dotenv.load_dotenv()

# Valores
PORT = os.getenv("PORT")
DEFAULT_PATH ='http://127.0.0.1'
PATH=f'{DEFAULT_PATH}:{PORT}'

# Funções úteis
def create_json_file(name, content):
    with open(file=name, mode='w', encoding='utf-8') as file:
        file.write(json.dumps(content, indent=4, ensure_ascii=False))

# Funções de rota
def userFindAll():
    try:
        result = req.get(f'{PATH}/clients')
        return result
    except Exception as err:
        return {"result": None, "error": str(err)}

def userFindById(id):
    try:
        result = req.get(f'{PATH}/clients/{id}')
        return result
    except Exception as err:
        return {"Result" : None, "erros": str(err)}
    
def userCreate(user : dict):
    try:
        result = req.post(f'{PATH}/clients',json=user)
        return result
    except Exception as err:
        return {"Result" : None, "erros": str(err)}

def userUpdateById( body : dict, id : int ):
    try:
        result = req.put(f'{PATH}/clients/id/{id}',json=body)
        return result
    except Exception as err:
        return {"Result" : None, "erros": str(err)}

def deleteUserById( id : int ):
    try:
        result = req.delete(url=f'{PATH}/clients/id/{id}')
        return result
        
    except Exception as err:
        return {"Result": None, "erros" : str(err)}




opts = ['userFindAll', 'userFindById', 'userCreate', 'userUpdateById', 'deleteUserById']

def menu(opts):
    refac_opts = []
    size = len(opts) - 1
    for index_opt in range (0,size):
        refac_opts.append(f'[{ index_opt + 1 }] {opts[index_opt]}')
    return refac_opts

refac = menu(opts=opts)

print(f"""
What is your choice?
{'\n'.join(refac)}""")
choice = str(input("Your choice: "))