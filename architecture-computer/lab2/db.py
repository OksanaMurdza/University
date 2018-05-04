from pymongo import MongoClient


client = MongoClient('mongodb://localhost:27017/')
db = client.laba

comments = db.comments

def insert(data):
  comments.insert_many(data)

def get():
  return comments.find()