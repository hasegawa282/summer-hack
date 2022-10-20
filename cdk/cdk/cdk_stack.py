
import aws_cdk.aws_apigatewayv2_alpha as apigwv2
import aws_cdk.aws_cloudfront as cf
import aws_cdk.aws_cloudfront_origins as origins
import aws_cdk.aws_s3 as s3
from aws_cdk import Stack, CfnOutput, Duration
from constructs import Construct


class CdkStack(Stack):
    def __init__(
            self,
            scope: Construct,
            app_prefix: str,
            construct_id: str,
            **kwargs):
        super().__init__(scope, construct_id, **kwargs)

        # Main web site
        # 保護者用のページを格納するs3バケット
        guardian_bucket = s3.Bucket(
            self,
            'webpage-guardian-bucket',
            bucket_name=f'{app_prefix}-guardian-webpage-bucket',
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL)
        # 保育士用のページを格納するs3バケット
        childminder_bucket = s3.Bucket(
            self,
            'webpage-childminder-bucket',
            bucket_name=f'{app_prefix}-childminder-webpage-bucket',
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL)
        # Tags.of(bucket).add('CmBillingGroup', app_prefix)
        # APIgateway
        httpapi = apigwv2.HttpApi(
            self,
            'httpapi',
            api_name=f'{app_prefix}-httpapi',
            create_default_stage=True)
        CfnOutput(
            self,
            'httpapi-api-endpoint',
            value=httpapi.api_endpoint,
            export_name=f'{app_prefix}-httpapi-api-endpoint')
        CfnOutput(
            self,
            'httpapi-http-api-id',
            value=httpapi.http_api_id,
            export_name=f'{app_prefix}-httpapi-http-api-id')
        # Tags.of(httpapi).add('CmBillingGroup', app_prefix)

        # [TODO] 今は全くキャッシュしない設定にしているため、後々修正が必要
        cache_policy = cf.CachePolicy(
            self,
            'cache_policy',
            cookie_behavior=cf.CacheCookieBehavior.all(),
            default_ttl=Duration.seconds(1),
            min_ttl=Duration.seconds(1),
            max_ttl=Duration.seconds(1),
            query_string_behavior=cf.CacheQueryStringBehavior.all()
        )
        # CloudFront
        # 保護者用のs3をcloudfrontでディストリビューション
        guardian_distribution = cf.Distribution(
            self,
            'guardian-distribution',
            default_behavior=cf.BehaviorOptions(
                cache_policy=cf.CachePolicy.CACHING_DISABLED,
                viewer_protocol_policy=cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,  # noqa: E501
                origin=origins.S3Origin(guardian_bucket)),
            comment=app_prefix,
            default_root_object='index.html',
            error_responses=[
                cf.ErrorResponse(
                    http_status=403,
                    response_page_path='/index.html',
                    response_http_status=200
                )
            ])
        guardian_distribution.add_behavior(
            path_pattern='/api/*',
            origin=origins.HttpOrigin(
                f'{httpapi.api_id}.execute-api.ap-northeast-1.amazonaws.com'),
            allowed_methods=cf.AllowedMethods.ALLOW_ALL,
            cache_policy=cache_policy,
            viewer_protocol_policy=cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS)
        CfnOutput(
            self,
            'cloudfront-guardian-domain-name',
            value=guardian_distribution.domain_name,
            export_name=f'{app_prefix}-distribution-guardian-domain-name')

        # 保育士用のs3をcloudfrontでディストリビューション
        childminder_distribution = cf.Distribution(
            self,
            'childminder-distribution',
            default_behavior=cf.BehaviorOptions(
                cache_policy=cf.CachePolicy.CACHING_DISABLED,
                viewer_protocol_policy=cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,  # noqa: E501
                origin=origins.S3Origin(childminder_bucket)),
            comment=app_prefix,
            default_root_object='index.html',
            error_responses=[
                cf.ErrorResponse(
                    http_status=403,
                    response_page_path='/index.html',
                    response_http_status=200
                )
            ])
        childminder_distribution.add_behavior(
            path_pattern='/api/*',
            origin=origins.HttpOrigin(
                f'{httpapi.api_id}.execute-api.ap-northeast-1.amazonaws.com'),
            allowed_methods=cf.AllowedMethods.ALLOW_ALL,
            cache_policy=cache_policy,
            viewer_protocol_policy=cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS)
        CfnOutput(
            self,
            'cloudfront-childminder-domain-name',
            value=childminder_distribution.domain_name,
            export_name=f'{app_prefix}-distribution-childminder-domain-name')
