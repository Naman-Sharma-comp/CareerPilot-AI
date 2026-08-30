import json
from semantic.matcher import SemanticMatcher
class CareerRecommender:

    career_profiles = {

        "Backend Developer": [
            "python",
            "sql",
            "fastapi",
            "docker",
            "rest api"
        ],

        "AI/ML Engineer": [
            "python",
            "machine learning",
            "tensorflow",
            "pytorch",
            "sql"
        ],

        "Data Scientist": [
            "python",
            "sql",
            "machine learning",
            "pandas",
            "numpy"
        ],

        "DevOps Engineer": [
            "docker",
            "linux",
            "aws",
            "git",
            "kubernetes"
        ]
    }
    @staticmethod
    def recommend(skills):

        matcher = SemanticMatcher()

        results = []

        for career, required_skills in CareerRecommender.career_profiles.items():

            matches = matcher.find_matches(
            skills,
            required_skills,
            threshold=0.70
        )

            matched_required = {}

            for match in matches:
                required_skill = match["required_skill"]

                if(
                    required_skill not in matched_required or match["score"] > matched_required[required_skill]["score"]):
                
                    matched_required[required_skill] = match
                    matched = list(matched_required.keys())

            missing = [
                skill
                for skill in required_skills
                if skill not in matched_required
            ]

            score = (
                len(matched) / len(required_skills)
              ) * 100

            if score >= 80:
                readiness = "Highly Suitable"

            elif score >= 60:
                readiness = "Suitable"

            elif score >= 40:
                readiness = "Partially Suitable"

            else:
                readiness = "Needs Development"

            if score >= 80:
                explanation = (
                f"You have a strong match for {career}. "
                f"Your skills cover most of the required skills."
            )

            elif score >= 60:
                explanation = (
                f"You have a good foundation for {career}. "
                f"Develop the missing skills to become more job-ready."
            )

            elif score >= 40:
                explanation = (
                f"You have some relevant skills for {career}, "
                f"but several important skills still need development."
            )

            else:
                explanation = (
                f"You currently have limited skill coverage for {career}. "
                f"Focus on the missing skills before pursuing this career path."
            )

            results.append({
            "career": career,
            "score": round(score, 2),
            "readiness": readiness,
            "explanation": explanation,
            "matched_skills": matched,
            "semantic_matches": list(matched_required.values()),
            "missing_skills": missing
            })

        results.sort(
            key=lambda x: x["score"],
            reverse=True
      )

        return results
    
    @staticmethod
    def save(results, filename="career_recommendations.json"):

        with open(filename, "w") as file:
            json.dump(results[:3], file, indent=4)

        print(f"\nCareer recommendations saved to {filename}")

    @staticmethod
    def best_match(results):
        if not results:
            return None

        return results[0]    
    