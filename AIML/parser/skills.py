SKILLS = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "FastAPI",
    "SQL",
    "MongoDB",
    "Docker",
    "Git",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "HTML",
    "CSS"
]

def extract_skills_from_text(text):
    skills_database = [
        "Python",
        "Java",
        "C++",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "FastAPI",
        "SQL",
        "MongoDB",
        "Docker",
        "Git",
        "AWS",
        "Linux",
        "REST API",
        "Machine Learning",
        "NLP",
        "TensorFlow",
        "PyTorch"
    ]

    text_lower = text.lower()

    found_skills = []

    for skill in skills_database:
        if skill.lower() in text_lower:
            found_skills.append(skill)

    return found_skills

