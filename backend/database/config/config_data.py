from dotenv import load_dotenv
import os
from pymongo.mongo_client import MongoClient
import pymongo
import sys
from pymongo.server_api import ServerApi
import urllib

load_dotenv()# Load environment variables from .env file

password= os.getenv('PASSWORD')

try:
    client = MongoClient(f"mongodb+srv://saideep:{password}@careerapp.0q3injz.mongodb.net/?retryWrites=true&w=majority&appName=CareerApp")
except pymongo.errors.ConfigurationError:
  print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
  sys.exit(1)

db = client.userdata

collection_name = db["userprofiles"]