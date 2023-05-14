import asyncio
import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hola")
async def root():
    return {"message": "Hola Mundo"}

@app.post("/prediccion")
async def prueba():
    await asyncio.sleep(5) #tiempo de espera para comprobar que no salta de pagina hasta estar terminada
    return {"message": "Comenzando la prediccion"}

@app.get("/download")
async def download_file():
    return FileResponse("train.csv")    

@app.get("/grafica/{producto}")
async def grafica(valor:int):
    fechas = []
    numero = []

    fechas.append(datetime.date(2021, 5, 15))
    numero.append(35)
    
    fechas.append(datetime.date(2021, 5, 22))
    numero.append(70)
    
    fechas.append(datetime.date(2021, 5, 29))
    numero.append(137)
    
    fechas.append(datetime.date(2021, 6, 5))
    numero.append(274)
    
    fechas.append(datetime.date(2021, 6, 12))
    numero.append(333)
    
    fechas.append(datetime.date(2021, 6, 19))
    numero.append(349)
    
    fechas.append(datetime.date(2021, 6, 26))
    numero.append(328)
    
    fechas.append(datetime.date(2021, 7, 3))
    numero.append(288)
    
    fechas.append(datetime.date(2021, 7, 10))
    numero.append(234)
    
    fechas.append(datetime.date(2021, 7, 17))
    numero.append(131)
    
    fechas.append(datetime.date(2021, 7, 24))
    numero.append(62)

    fechas.append(datetime.date(2021, 7, 31))
    numero.append(32)

    fechas.append(datetime.date(2021, 8, 7))
    numero.append(24)

    return {"fechas": fechas, "numero": numero}