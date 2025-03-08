import graphene

class AnalyzeResult(graphene.ObjectType):
    query_type = graphene.String()
    url = graphene.String()

class Query(graphene.ObjectType):
    analyze = graphene.Field(AnalyzeResult, prompt=graphene.String(required=True))

    def resolve_analyze(self, info, prompt):
        # Here you can add the logic to process the prompt and access another file
        # For demonstration, let's assume the processing is successful and return a URL
        query_type = 'Simple'
        url = "http://example.com/result"
        return AnalyzeResult(query_type=query_type, url=url)

schema = graphene.Schema(query=Query)