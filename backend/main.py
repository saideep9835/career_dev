from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from  database.routes.route import router
from database.config.config_data import client
from pymongo.mongo_client import MongoClient


import sys

app = FastAPI()




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (replace with specific origins as needed)
    allow_credentials=True,
    allow_methods=["*"],   # Allow all methods
    allow_headers=["*"],   # Allow all headers
)



app.include_router(router)

# # @app.get("/")
# # async def root():
# #     return {"message": "Hello World"}

