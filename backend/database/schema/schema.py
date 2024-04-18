def individual_serial(user) -> dict:
    return{
        "id": str(user["_id"]),
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "email": user["email"],
        "password": user["password"]
    }

def list_serial(users) -> list:
    return [individual_serial(user) for user in users]


def individual_schedule(user) -> dict:
    return{
        'id': str(user["_id"]),
        'name': user["name"],
        'email':user["email"],
        'mobilenumber':user["mobilenumber"],
        'description': user["description"],
        'date': user["date"]   
    }
def list_user_schedule(users) -> list:
    return [individual_schedule(user) for user in users]