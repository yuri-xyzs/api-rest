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
def getUsers():
    try:
        result = req.get(f'{PATH}/clients')
        return result.json()
    except Exception as err:
        return {"result": None, "error": str(err)}


def getUSerById(id):
    try:
        result = req.get(f'{PATH}/clients/{id}')
        return result.json()
    except Exception as err:
        return {"Result" : None, "erros": str(err)}
    
def createUser(user : dict):
    result = req.post(f'{PATH}/clients',json=user)
    return result.json()

def alterUser(body : dict, id : int):
    result = req.put(f'{PATH}/clients/id/{id}',json=body)
    return result.json()

if __name__ == '__main__':
    result = alterUser({"name":'soneka',"username":"soneka_serio" },id=1)
    print(f'Valor de createUser: {result}')