from fastapi import APIRouter, Depends, HTTPException
from services.admin_service import AdminService
from utils.jwt_utils import decode_jwt

router = APIRouter(prefix="/admin", tags=["Admin"])
admin_service = AdminService()


def require_admin(token: str):
    data = decode_jwt(token)
    if data["role"].lower() != "admin":
        raise HTTPException(403, "Only admins can perform this action")
    return data


@router.get("/subjects/search")
def search_subjects(query: str, auth=Depends(require_admin)):
    return admin_service.search_subjects(query)


@router.get("/subjects/{code}")
def get_subject(code: str, auth=Depends(require_admin)):
    return admin_service.get_subject(code)


@router.put("/subjects/{code}")
def update_subject(code: str, data: dict, auth=Depends(require_admin)):
    return admin_service.update_subject(code, data)

