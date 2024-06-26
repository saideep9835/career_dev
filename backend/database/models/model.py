from pydantic import BaseModel,validator,EmailStr,constr,Field
from datetime import datetime
from typing import Optional,Dict, Any
import re

class User(BaseModel):
    firstName: str
    lastName:str
    email: EmailStr
    password: constr(min_length=8, max_length=30)

    @validator('firstName', 'lastName')
    def name_validation(cls, value):
        if not all(char.isalpha() or char.isspace() for char in value):
            raise ValueError('Name must contain only alphabets and spaces')
        return value

    @validator('password')
    def password_validation(cls, value):
        if len(value) < 8 or len(value) > 30:
            raise ValueError('Password must be at least 8 characters long and at least 25 characters')
        if not re.search('[a-zA-Z]', value):
            raise ValueError('Password must contain at least one alphabet')
        if not re.search('[0-9]', value):
            raise ValueError('Password must contain at least one number')
        if not re.search('[!@#$%^&*(),.?":{}|<>]', value):
            raise ValueError('Password must contain at least one special character')
        return value

class Login(BaseModel):
    email: EmailStr
    password: constr(min_length=8, max_length=30)
class Question(BaseModel):
    question: str

class Call(BaseModel):
    name: str
    email: EmailStr
    mobilenumber: str
    description: str = None
    date: str = None
class Update_Call(BaseModel):
    name: Optional[str]
class CareerPath(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    core_data: Dict[str, Any]
    metadata: Optional[Dict[str, Any]] = {}