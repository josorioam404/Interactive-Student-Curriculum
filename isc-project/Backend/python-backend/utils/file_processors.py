from fastapi import UploadFile, HTTPException
import io
import json
import csv
from typing import Dict

async def process_curriculum_file(file: UploadFile) -> Dict:
    """Process uploaded curriculum file (CSV or JSON)."""
    try:
        content = await file.read()
        filename = file.filename or "unknown"
        
        if filename.lower().endswith('.csv'):
            result = process_csv_curriculum(content, filename)
        elif filename.lower().endswith('.json'):
            result = process_json_curriculum(content, filename)
        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type. Only CSV and JSON are allowed."
            )
        
        return {
            "success": True,
            "message": f"Archivo {filename} procesado correctamente",
            "recordsProcessed": result["processed"],
            "recordsCreated": result["created"],
            "recordsUpdated": result["updated"],
            "recordsFailed": result["failed"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        return {
            "success": False,
            "message": f"Error procesando archivo: {str(e)}",
            "recordsProcessed": 0,
            "recordsCreated": 0,
            "recordsUpdated": 0,
            "recordsFailed": 0
        }

def process_csv_curriculum(content: bytes, filename: str) -> Dict:
    """Parse and process CSV curriculum file."""
    try:
        text_content = content.decode('utf-8')
        csv_reader = csv.DictReader(io.StringIO(text_content))
        
        records = list(csv_reader)
        processed = len(records)
        created = processed
        updated = 0
        failed = 0
        
        return {
            "processed": processed,
            "created": created,
            "updated": updated,
            "failed": failed
        }
        
    except Exception as e:
        print(f"Error parsing CSV: {str(e)}")
        raise

def process_json_curriculum(content: bytes, filename: str) -> Dict:
    """Parse and process JSON curriculum file."""
    try:
        text_content = content.decode('utf-8')
        records = json.loads(text_content)
        
        if not isinstance(records, list):
            raise ValueError("JSON must be an array of objects")
        
        processed = len(records)
        created = processed
        updated = 0
        failed = 0
        
        return {
            "processed": processed,
            "created": created,
            "updated": updated,
            "failed": failed
        }
        
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {str(e)}")
        raise ValueError(f"Invalid JSON format: {str(e)}")
    except Exception as e:
        print(f"Error processing JSON: {str(e)}")
        raise
