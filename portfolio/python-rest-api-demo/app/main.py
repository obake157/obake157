from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import Customer
from .schemas import CustomerCreate, CustomerRead

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Python REST API Demo",
    version="1.0.0",
    description="Portfolio API demonstrating Python, FastAPI and PostgreSQL.",
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/customers", response_model=list[CustomerRead])
def list_customers(db: Session = Depends(get_db)):
    return db.scalars(select(Customer).order_by(Customer.id)).all()


@app.post(
    "/customers",
    response_model=CustomerRead,
    status_code=status.HTTP_201_CREATED,
)
def create_customer(payload: CustomerCreate, db: Session = Depends(get_db)):
    customer = Customer(name=payload.name.strip(), email=payload.email.lower())
    db.add(customer)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A customer with this email already exists.",
        )

    db.refresh(customer)
    return customer


@app.get("/customers/{customer_id}", response_model=CustomerRead)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.get(Customer, customer_id)
    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found.",
        )
    return customer
