import graphene
from .controller.classifier import analyze_prompt_complexity
import json

class AnalyzeResult(graphene.ObjectType):
    success = graphene.Boolean(default_value=True)
    query_type = graphene.String()
    url = graphene.String()

class Query(graphene.ObjectType):
    analyze = graphene.Field(AnalyzeResult, prompt=graphene.String(required=True))

    def resolve_analyze(self, info, prompt):
        result = analyze_prompt_complexity(prompt)
        print(result)
        # result_json = result_json.replace('\n', '').replace('json','').replace('```', '')
        # result = json.loads(result_json)
        if 'classification' not in result:
            return AnalyzeResult(success=False)

        query_type = result['classification']
        if query_type == 'COMPLEX':
            return AnalyzeResult(success=True, query_type=query_type)
        elif result['classification'] == 'SIMPLE':
            url = result['google_search_url']
            return AnalyzeResult(success=True, query_type=query_type, url=url)
        return AnalyzeResult(success=False)

schema = graphene.Schema(query=Query)