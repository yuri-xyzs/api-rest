# IMPORTS 
import requests as req
import dotenv, os, json, sys

# Carregando o dotenv
dotenv.load_dotenv()

# Valores
PORT = os.getenv("PORT")
DEFAULT_PATH ='http://127.0.0.1'
PATH=f'{DEFAULT_PATH}:{PORT}'

bye = {"bye":"true"}

# Funções úteis
def create_json_file(name, content):
    with open(file=name, mode='w', encoding='utf-8') as file:
        file.write(json.dumps(content, indent=4, ensure_ascii=False))

def format_index(opts : list) -> list:
    refac_opts = []
    size = len(opts) - 1
    for index_opt in range (0,size):
        refac_opts.append(f'[ { index_opt + 1 } ] {opts[index_opt]}')
    return refac_opts

def menu_terminalClear():
    os.system('cls' if os.name == 'nt' else 'clear')

# Funções de API
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

# Funções de interação

def menu_userFindAll():
    return userFindAll()

def menu_userFindById():
    user_id = input("Digite o ID: ")
    return userFindById(user_id)

def menu_userCreate():
    name = input("Nome: ")
    age = input("Idade: ")
    return userCreate({
        "name": name,
        "age": age
    })

def menu_userUpdateById():
    user_id = input("ID: ")
    name = input("Novo nome: ")
    age = input("Nova idade: ")

    return userUpdateById({
        "name": name,
        "age": age
    }, user_id)

def menu_deleteUserById():
    user_id = input("Digite o ID: ")
    return deleteUserById(user_id)

def menu_deleteUserById():
    return {"Result" : ""}
# Relacionamento entre as funções de API e de interação

interaction_handlers = {
    "clear             " : menu_terminalClear,
    "Find all users    " : menu_userFindAll,
    "Find user by id   " : menu_userFindById,
    "userCreate        " : menu_userCreate,
    "userUpdateById    " : menu_userUpdateById,
    "deleteUserById    " : menu_deleteUserById,
}

def menuMain():
    options = list(interaction_handlers.keys())
    if len(options) < 1:
        return
    while True:
        choice=str(input(f"""Options:
{'\n'.join(format_index(options))}
[ ? ] Sair
-> """))
        if choice == '?' or choice.lower() == 'sair':
            menu_terminalClear()
            print('\33[32mOk, saindo\33[m')
            return bye
        if choice in options:
            return interaction_handlers[choice]()

        if choice.isdigit():
            try:
                index = int(choice)
                if index >= 1 and index <= len(options):
                    return interaction_handlers[options[index - 1]]()
            except Exception as err:
                return err
        else:
            return {"Result":"Option not found"}

def runMenu():
    while True:
        result = menuMain()
        print(result)
        if type(result) == dict:
            print('not status code')
        else:
            print(result.json())
        if result == bye:
            break

if __name__ == '__main__':
    runMenu()