class LearningRoadmap:

    learning_resources = {
        "rest api": [
            "REST API fundamentals",
            "HTTP methods and status codes",
            "API development with FastAPI",
            "API authentication"
        ],

        "aws": [
            "AWS cloud fundamentals",
            "EC2 and deployment",
            "S3",
            "IAM"
        ],

        "linux": [
            "Linux fundamentals",
            "File system and permissions",
            "Linux commands",
            "Process management"
        ]
    }

    learning_duration ={
        
        "rest api": "1-2 weeks",
        "aws": "2-3 weeks",
        "linux": "1 week"
    }

    @staticmethod
    def generate(career, missing_skills, priority_skills):

        roadmap = []

        for skill in missing_skills:

            if skill in priority_skills:
                priority = "High"
                reason = (
                    f"{skill} is a high-priority skill "
                    f"for becoming a {career}."
                )
            else:
                priority = "Medium"
                reason = (
                    f"{skill} is a useful skill "
                    f"for becoming a {career}."
                )

            resources = LearningRoadmap.learning_resources.get(
                skill,
                [f"Learn {skill} fundamentals"]
            )

            duration = LearningRoadmap.learning_duration.get(
                skill,
                "1-2 weeks"
            )
            if skill in priority_skills:
                learning_order = 1
            else :
                learning_order = 2  

            roadmap.append({
                "skill": skill,
                "priority": priority,
                "reason": reason,
                "resources": resources,
                "learning_duration": duration,
                "learning_order": 0 ,
                "goal" : f"become job-ready for {career}"
            })

        roadmap.sort(
            key=lambda x: 0 if x["priority"] == "High" else 1
        )
        for index, item in enumerate(roadmap, start=1):
            item["learning_order"] = index
        return roadmap