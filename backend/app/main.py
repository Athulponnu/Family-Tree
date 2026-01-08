# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from app.db.base import Base
# from app.db.session import engine
# from app.api.v1.users import router as users_router
# # register models
# import app.models

# from app.api.v1.auth import router as auth_router
# from app.api.v1.families import router as families_router
# from app.api.v1.users import router as users_router
# from app.api.v1 import families

# app = FastAPI(title="Family Information Holder API")
# app.include_router(users_router)
# app.include_router(families.router, prefix="/api/v1/families", tags=["Families"])
# Base.metadata.create_all(bind=engine)

# app.add_middleware(
#     CORSMiddleware,
#     # Allow both localhost and 127.0.0.1 for local dev (Vite may use either)
#     allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(auth_router, prefix="/auth", tags=["Auth"])
# app.include_router(users_router, prefix="/users", tags=["Users"])
# app.include_router(families_router, prefix="/families", tags=["Families"])

# @app.get("/")
# def root():
#     return {"status": "API running"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.base import Base
from app.db.session import engine

# register models
import app.models

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.families import router as families_router

app = FastAPI(title="Family Information Holder API")

# --- API ROUTERS (VERSIONED, SINGLE SOURCE OF TRUTH) ---
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(families_router, prefix="/api/v1/families", tags=["Families"])

# --- DB ---
Base.metadata.create_all(bind=engine)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "API running"}
