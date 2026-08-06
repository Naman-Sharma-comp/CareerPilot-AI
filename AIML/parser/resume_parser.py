import fitz

class ResumeParser:
    def __init__(self, pdf_path):
        self.pdf_path = pdf_path

    def extract_text(self):
        text = ""

        try:
            document = fitz.open(self.pdf_path)
            for page in document:
                text += page.get_text()
            document.close()    
            return text
        except Exception as e:
            print("Error:",e)
            return ""