from fastapi import Header, HTTPException, Depends
from typing import Dict
from utils.jwt_utils import decode_jwt

async def get_current_user(authorization: str = Header(None)) -> Dict:
    """Extract and validate user from Authorization header."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")
    
    token = authorization.split(" ")[1]
    
    try:
        decoded = decode_jwt(token)
        return decoded
    except Exception as e:
        print(f"Token validation failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid or expired token")

def get_current_user_id(current_user: Dict = Depends(get_current_user)) -> int:
    """Extract user ID from the current user token."""
    return int(current_user["userId"])
