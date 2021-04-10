from flask import abort, jsonify, render_template, request
from app import app

@app.route('/')
def hello():
    return "Hello World!"