import graphene
from .controller.classifier import analyze_prompt_complexity
from .controller.carbon_footprint import calculate_carbon_footprint, get_carbon_footprint_meaning
import json

class AnalyzeResult(graphene.ObjectType):
    success = graphene.Boolean(default_value=True)
    query_type = graphene.String()
    url = graphene.String()

class CarbonFootprintResult(graphene.ObjectType):
    success = graphene.Boolean(default_value=True)
    requests = graphene.Int()
    carbon_footprint = graphene.Float()
    meaning = graphene.String()

class Query(graphene.ObjectType):
    analyze = graphene.Field(AnalyzeResult, prompt=graphene.String(required=True))
    calculate_carbon_footprint = graphene.Field(CarbonFootprintResult, requests=graphene.Int(required=True))

    def resolve_analyze(self, info, prompt):
        result_json = analyze_prompt_complexity(prompt)
        result_json = result_json.replace('\n', '').replace('json','').replace('```', '')
        result = json.loads(result_json)
        if 'classification' not in result:
            return AnalyzeResult(success=False)

        query_type = result['classification']
        if query_type == 'COMPLEX':
            return AnalyzeResult(success=True, query_type=query_type)
        elif result['classification'] == 'SIMPLE':
            url = result['google_search_url']
            return AnalyzeResult(success=True, query_type=query_type, url=url)
        return AnalyzeResult(success=False)

    def resolve_calculate_carbon_footprint(self, info, requests):
        total_carbon_footprint = calculate_carbon_footprint(requests)
        meaning = get_carbon_footprint_meaning(total_carbon_footprint)
        return CarbonFootprintResult(success=True, requests=requests, carbon_footprint=total_carbon_footprint, meaning=meaning)

schema = graphene.Schema(query=Query)