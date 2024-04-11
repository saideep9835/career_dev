from fastapi import APIRouter, HTTPException, Depends,status,Request
from database.models.model import User
from database.models.model import Login,Question
from database.config.config_data import collection_name
from database.schema.schema import list_serial
from bson import ObjectId
from jose import JWTError, jwt
from datetime import datetime, timedelta,timezone
from passlib.context import CryptContext
from openai import OpenAI
import os
router=APIRouter()


secret_key = os.getenv('SECRET_KEY')
api = os.getenv('API_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 250
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
client = OpenAI(api_key=api)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=0)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)
    return encoded_jwt

@router.get("/")
async def get_users():
    users = list_serial(collection_name.find())
    return users
@router.post("/SignUp")
async def create_user(user:User):
    existing_user = collection_name.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
   
     # Hash the password
    hashed_password = get_password_hash(user.password)
    
    # Insert user into database
    user_data = dict(user)
    user_data["password"] = hashed_password
    result = collection_name.insert_one(user_data)
    # print(result.inserted_id)
    user_id = str(result.inserted_id)

    # Generate JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email, "id": user_id}, expires_delta=access_token_expires)
    
    return {"message": "User Registered Successfully", "token": access_token}
@router.post("/login")
async def login_user(user:Login):
    existing_user = collection_name.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid Credentials")
    
    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid Credentials")
    
    # Generate JWT token
    user_id = str(existing_user["_id"])
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email, "id": user_id}, expires_delta=access_token_expires)
    
    return {"message": "User Logged In Successfully", "token": access_token}
@router.get("/protected")
async def protected_route(request: Request):
    token = request.headers.get("Authorization")
    if token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=401, detail="Not authenticated")
        # You can add additional logic here to verify the user
        return {"message": f"Welcome, {user_email}!"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Not authenticated")
@router.post("/get_answer")
async def get_answer(question: Question):
    # print(f"Question: {question.question}")
    if question.question == "":
        raise HTTPException(status_code=401, detail="Not authenticated")
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question.question},
        ],
        max_tokens=50
    )
    if response.choices[0].message.content is None:
        raise HTTPException(status_code=402, detail = "You must provide a question.")
    return {"answer": response.choices[0].message.content}