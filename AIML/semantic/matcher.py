from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim


class SemanticMatcher:

    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

    def similarity(self, text1, text2):

        embedding1 = self.model.encode(
            text1,
            convert_to_tensor=True
        )

        embedding2 = self.model.encode(
            text2,
            convert_to_tensor=True
        )

        score = cos_sim(
            embedding1,
            embedding2
        )

        return float(score.item())

    def find_matches(
        self,
        user_skills,
        required_skills,
        threshold=0.70
    ):

        matches = []

        for user_skill in user_skills:

            for required_skill in required_skills:

                score = self.similarity(
                    user_skill,
                    required_skill
                )

                if score >= threshold:

                    matches.append({
                        "user_skill": user_skill,
                        "required_skill": required_skill,
                        "score": round(score, 4)
                    })

        return matches