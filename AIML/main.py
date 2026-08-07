from parser.resume_parser import ResumeParser
from parser.cleaner import TextCleaner
from parser.extractor import ResumeExtractor

resume = ResumeParser("data/sample_resume.pdf")

text = resume.extract_text()

clean_text = TextCleaner.clean(text)

print("-------------")

print("NAME")

print(ResumeExtractor.extract_name(clean_text))

print("-------------")

print("EMAIL")

print(ResumeExtractor.extract_email(clean_text))

print("-------------")

print("PHONE")

print(ResumeExtractor.extract_phone(clean_text))

print("-------------")

print("SKILLS")

print(ResumeExtractor.extract_skills(clean_text))