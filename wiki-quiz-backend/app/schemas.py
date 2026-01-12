from pydantic import BaseModel, HttpUrl

class GenerateQuizRequest(BaseModel):
    url: HttpUrl
