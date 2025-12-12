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
    """Parse CSV and update Subject + StudyPlan for each row."""
    import json

    try:
        text_content = content.decode("utf-8")
        csv_reader = csv.DictReader(io.StringIO(text_content))

        processed = 0
        updated = 0
        failed = 0

        from repositories.admin_repository import AdminRepository
        repo = AdminRepository()

        for row in csv_reader:
            processed += 1

            try:
                subject_code = row.get("subject_code")
                name = row.get("name")
                credits = row.get("credits")
                program_code = row.get("program_code")
                prereq_text = row.get("prereq_rules", "").strip()

                # 1️⃣ parse JSON safely
                try:
                    prereq_rules = json.loads(prereq_text) if prereq_text else None
                except json.JSONDecodeError:
                    print(f"Invalid JSON prereq_rules in subject {subject_code}")
                    failed += 1
                    continue

                # 2️⃣ update Subject table
                if name or credits:
                    repo.update_subject(
                        subject_code,
                        name if name else repo.get_subject_details(subject_code, program_code)["name"],
                        int(credits) if credits else repo.get_subject_details(subject_code, program_code)["credits"]
                    )

                # 3️⃣ update StudyPlan prereqs
                if prereq_rules is not None:
                    repo.update_studyplan_prereqs(
                        subject_code,
                        program_code,
                        prereq_rules
                    )

                updated += 1

            except Exception as e:
                print(f"Error processing row {row}: {str(e)}")
                failed += 1

        return {
            "processed": processed,
            "created": 0,      # CSV does NOT create new subjects for ahora
            "updated": updated,
            "failed": failed,
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
