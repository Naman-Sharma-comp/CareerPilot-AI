from parser.resume_parser import ResumeParser
from parser.cleaner import TextCleaner
from parser.extractor import ResumeExtractor
from parser.skills import extract_skills_from_text
from ats.scorer import ATSScorer
from analysis.skill_gap import SkillGapAnalyzer
from analysis.recommendation import SkillRecommendation
from analysis.report import ATSReport
from career.recommender import CareerRecommender
from analysis.learning_roadmap import LearningRoadmap

resume = ResumeParser("data/sample_resume.pdf")

text = resume.extract_text()

clean_text = TextCleaner.clean(text)

skills = ResumeExtractor.extract_skills(clean_text)

with open("data/job_description.txt", "r", encoding="utf-8") as file:
    job_description = file.read()

jd_skills = extract_skills_from_text(job_description)

result = ATSScorer.calculate_score(
    skills,
    jd_skills
)

gap = SkillGapAnalyzer.analyze(
    result["matched"],
    result["missing"]
)
recommendations = SkillRecommendation.recommend(
    gap["priority_skills"]
)

career_results = CareerRecommender.recommend(skills)

best_career = CareerRecommender.best_match(career_results)


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

print(skills)

print("\n========== ATS RESULT ==========")

print("ATS SCORE:", result["score"], "%")

print("\nMATCHED SKILLS:")
print(result["matched"])

print("\nMISSING SKILLS:")
print(result["missing"])

print("\n========== SKILL GAP ANALYSIS ==========")

print("MATCHED SKILLS:", gap["matched_skills"])
print("MISSING SKILLS:", gap["missing_skills"])

print("TOTAL MATCHED:", gap["total_matched"])
print("TOTAL MISSING:", gap["total_missing"])

print("PRIORITY SKILLS:", gap["priority_skills"])


print("\n========== SKILL RECOMMENDATIONS ==========")

for recommendation in recommendations:
    print(recommendation)

report = ATSReport.generate(
    result["score"],
    gap["matched_skills"],
    gap["missing_skills"],
    gap["priority_skills"],
    recommendations
)
ATSReport.save(report)

print("\n========== FINAL ATS REPORT ==========")

print(f"\nATS SCORE: {result['score']} %")

print("\nMATCHED SKILLS:")
for skill in result["matched"]:
    print(f"- {skill}")

print("\nMISSING SKILLS:")
for skill in result["missing"]:
    print(f"- {skill}")

print("\nPRIORITY SKILLS:")
for skill in gap["priority_skills"]:
    print(f"- {skill}")

print("\nRECOMMENDATIONS:")
for skill, recommendation in recommendations.items():
    print(f"- {skill.upper()}: {recommendation}")

print("\n======================================")


print("\n========== CAREER RECOMMENDATIONS ==========")

for result in career_results[:3]:

    print(f"\nCareer: {result['career']}")
    print(f"Match Score: {result['score']}%")
    print(f"Readiness: {result['readiness']}")
    print(f"Why: {result['explanation']}")

    print("Semantic Matches:")
    for match in result["semantic_matches"]:
        print(f"- {match['user_skill']} " f"-> {match['required_skill']}" f" (Similarity: {match['score']})")

    print("Matched Skills:")
    for skill in result["matched_skills"]:
        print(f"- {skill}")

    print("Missing Skills:")
    for skill in result["missing_skills"]:
        print(f"- {skill}")

print("\n======= BEST CAREER MATCH =======")
if best_career:
    print(f"Best Career Match: {best_career['career']}")
    print(f"Match Score: {best_career['score']}%")
    print(f"Readiness: {best_career['readiness']}")
    print(f"Why: {best_career['explanation']}")

CareerRecommender.save(career_results)

# ================= LEARNING ROADMAP =================

if best_career:
    roadmap = LearningRoadmap.generate(
        gap["missing_skills"],
        gap["priority_skills"],
        best_career["career"]
    )

    print("\n========== LEARNING ROADMAP ==========")

    for index, item in enumerate(roadmap, start=1):
        print(f"\n{index}. {item['skill']}")
        print(f"Priority: {item['priority']}")
        print(f"Goal: {item['goal']}")
        print(f"Estimated Duration: {item['estimated_duration']}")
        print(f"Reason: {item['reason']}")
        print("Resources:")

        for resource in item["resources"]:
            print(f"- {resource}")
   
