from pydantic import BaseModel,validator,EmailStr,constr
from datetime import datetime
from typing import Optional
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