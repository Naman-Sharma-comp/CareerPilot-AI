from career.recommender import CareerRecommender


skills = [
    "python",
    "sql",
    "fastapi",
    "docker"
]


results = CareerRecommender.recommend(skills)


print("\n========== CAREER RECOMMENDATIONS ==========")

for result in results:

    print(f"\nCareer: {result['career']}")
    print(f"Match Score: {result['score']}%")
    print(f"Matched Skills: {result['matched_skills']}")