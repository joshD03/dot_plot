from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI() # Instantiate FastAPI


origins = ['https://localhost:3000'] # list of allowed origins

# Allows preflight checking to see a request can actually be made.
app.add_middleware( 
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Ping" : "pong"}
