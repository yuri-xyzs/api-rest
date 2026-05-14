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

if __name__ == '__main__':
    result = deleteUserById(11)
    print(result.status_code)
    print(result.json())