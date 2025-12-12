from fastapi import APIRouter, Depends
from services.admin_service import AdminService

router = APIRouter(prefix="/admin")

service = AdminService()


@router.get("/subjects/search")
def search_subjects(query: str):
    return service.search_subjects(query)


@router.get("/subjects/{code}")
def get_subject(code: str, program: str):
    """
    program = código SIA del programa actual
    ej: program=2A74
    """
    return service.get_subject(code, program)


@router.put("/subjects/{code}")
def update_subject(code: str, program: str, body: dict):
    """
    Modifica:
    - name
    - credits
    - prereq_rules (JSONB)
    
    SOLO dentro del programa seleccionado
    """
    return service.update_subject(program, code, body)
