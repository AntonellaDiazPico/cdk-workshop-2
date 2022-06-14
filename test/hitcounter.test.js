"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assertions_1 = require("aws-cdk-lib/assertions");
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const hitcounter_1 = require("../lib/hitcounter");
test('DynamoDB Table Created', () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda')
        })
    });
    // THEN
    const template = assertions_1.Template.fromStack(stack);
    template.resourceCountIs("AWS::DynamoDB::Table", 1);
});
test('Lambda Has Environment Variables', () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda')
        })
    });
    // THEN
    const template = assertions_1.Template.fromStack(stack);
    const envCapture = new assertions_1.Capture();
    template.hasResourceProperties("AWS::Lambda::Function", {
        Environment: envCapture,
    });
    expect(envCapture.asObject()).toEqual({
        Variables: {
            DOWNSTREAM_FUNCTION_NAME: {
                Ref: "TestFunction22AD90FC",
            },
            HITS_TABLE_NAME: {
                Ref: "MyTestConstructHits24A357F0",
            },
        },
    });
});
test('DynamoDB Table Created With Encryption', () => {
    const stack = new cdk.Stack();
    // WHEN
    new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda')
        })
    });
    // THEN
    const template = assertions_1.Template.fromStack(stack);
    template.hasResourceProperties('AWS::DynamoDB::Table', {
        SSESpecification: {
            SSEEnabled: true
        }
    });
});
// validation test
test('read capacity can be configured', () => {
    const stack = new cdk.Stack();
    expect(() => {
        new hitcounter_1.HitCounter(stack, 'MyTestConstruct', {
            downstream: new lambda.Function(stack, 'TestFunction', {
                runtime: lambda.Runtime.NODEJS_14_X,
                handler: 'hello.handler',
                code: lambda.Code.fromAsset('lambda')
            }),
            readCapacity: 3
        });
    }).toThrowError(/readCapacity must be greater than 5 and less than 20/);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGl0Y291bnRlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQTJEO0FBQzNELG1DQUFtQztBQUNuQyxpREFBaUQ7QUFDakQsa0RBQWdEO0FBRWhELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsT0FBTztJQUNQLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7UUFDdkMsVUFBVSxFQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztTQUN0QyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0lBQ0gsT0FBTztJQUVQLE1BQU0sUUFBUSxHQUFHLHFCQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLFFBQVEsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQzFDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLE9BQU87SUFDUCxJQUFJLHVCQUFVLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFO1FBQ3ZDLFVBQVUsRUFBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDdEMsQ0FBQztLQUNILENBQUMsQ0FBQztJQUNILE9BQU87SUFDUCxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFPLEVBQUUsQ0FBQztJQUNqQyxRQUFRLENBQUMscUJBQXFCLENBQUMsdUJBQXVCLEVBQUU7UUFDdEQsV0FBVyxFQUFFLFVBQVU7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FDbkM7UUFDRSxTQUFTLEVBQUU7WUFDVCx3QkFBd0IsRUFBRTtnQkFDeEIsR0FBRyxFQUFFLHNCQUFzQjthQUM1QjtZQUNELGVBQWUsRUFBRTtnQkFDZixHQUFHLEVBQUUsNkJBQTZCO2FBQ25DO1NBQ0Y7S0FDRixDQUNGLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7SUFDbEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsT0FBTztJQUNQLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7UUFDdkMsVUFBVSxFQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztTQUN0QyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0lBQ0gsT0FBTztJQUNQLE1BQU0sUUFBUSxHQUFHLHFCQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsRUFBRTtRQUNyRCxnQkFBZ0IsRUFBRTtZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWtCO0FBQ2xCLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFOUIsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNWLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7WUFDdkMsVUFBVSxFQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO2dCQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUNuQyxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUN0QyxDQUFDO1lBQ0YsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7QUFDMUUsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZSwgQ2FwdHVyZSB9IGZyb20gJ2F3cy1jZGstbGliL2Fzc2VydGlvbnMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCB7IEhpdENvdW50ZXIgfSAgZnJvbSAnLi4vbGliL2hpdGNvdW50ZXInO1xuXG50ZXN0KCdEeW5hbW9EQiBUYWJsZSBDcmVhdGVkJywgKCkgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcbiAgLy8gV0hFTlxuICBuZXcgSGl0Q291bnRlcihzdGFjaywgJ015VGVzdENvbnN0cnVjdCcsIHtcbiAgICBkb3duc3RyZWFtOiAgbmV3IGxhbWJkYS5GdW5jdGlvbihzdGFjaywgJ1Rlc3RGdW5jdGlvbicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgaGFuZGxlcjogJ2hlbGxvLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKVxuICAgIH0pXG4gIH0pO1xuICAvLyBUSEVOXG5cbiAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoXCJBV1M6OkR5bmFtb0RCOjpUYWJsZVwiLCAxKTtcbn0pO1xuXG50ZXN0KCdMYW1iZGEgSGFzIEVudmlyb25tZW50IFZhcmlhYmxlcycsICgpID0+IHtcbiAgICBjb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soKTtcbiAgICAvLyBXSEVOXG4gICAgbmV3IEhpdENvdW50ZXIoc3RhY2ssICdNeVRlc3RDb25zdHJ1Y3QnLCB7XG4gICAgICBkb3duc3RyZWFtOiAgbmV3IGxhbWJkYS5GdW5jdGlvbihzdGFjaywgJ1Rlc3RGdW5jdGlvbicsIHtcbiAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJyxcbiAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKVxuICAgICAgfSlcbiAgICB9KTtcbiAgICAvLyBUSEVOXG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuICAgIGNvbnN0IGVudkNhcHR1cmUgPSBuZXcgQ2FwdHVyZSgpO1xuICAgIHRlbXBsYXRlLmhhc1Jlc291cmNlUHJvcGVydGllcyhcIkFXUzo6TGFtYmRhOjpGdW5jdGlvblwiLCB7XG4gICAgICBFbnZpcm9ubWVudDogZW52Q2FwdHVyZSxcbiAgICB9KTtcbiAgXG4gICAgZXhwZWN0KGVudkNhcHR1cmUuYXNPYmplY3QoKSkudG9FcXVhbChcbiAgICAgIHtcbiAgICAgICAgVmFyaWFibGVzOiB7XG4gICAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiB7XG4gICAgICAgICAgICBSZWY6IFwiVGVzdEZ1bmN0aW9uMjJBRDkwRkNcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIEhJVFNfVEFCTEVfTkFNRToge1xuICAgICAgICAgICAgUmVmOiBcIk15VGVzdENvbnN0cnVjdEhpdHMyNEEzNTdGMFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcbiAgfSk7XG5cbiAgdGVzdCgnRHluYW1vREIgVGFibGUgQ3JlYXRlZCBXaXRoIEVuY3J5cHRpb24nLCAoKSA9PiB7XG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKCk7XG4gICAgLy8gV0hFTlxuICAgIG5ldyBIaXRDb3VudGVyKHN0YWNrLCAnTXlUZXN0Q29uc3RydWN0Jywge1xuICAgICAgZG93bnN0cmVhbTogIG5ldyBsYW1iZGEuRnVuY3Rpb24oc3RhY2ssICdUZXN0RnVuY3Rpb24nLCB7XG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgICBoYW5kbGVyOiAnaGVsbG8uaGFuZGxlcicsXG4gICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJylcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgLy8gVEhFTlxuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcbiAgICB0ZW1wbGF0ZS5oYXNSZXNvdXJjZVByb3BlcnRpZXMoJ0FXUzo6RHluYW1vREI6OlRhYmxlJywge1xuICAgICAgU1NFU3BlY2lmaWNhdGlvbjoge1xuICAgICAgICBTU0VFbmFibGVkOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHZhbGlkYXRpb24gdGVzdFxuICB0ZXN0KCdyZWFkIGNhcGFjaXR5IGNhbiBiZSBjb25maWd1cmVkJywgKCkgPT4ge1xuICAgIGNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjaygpO1xuICBcbiAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgbmV3IEhpdENvdW50ZXIoc3RhY2ssICdNeVRlc3RDb25zdHJ1Y3QnLCB7XG4gICAgICAgIGRvd25zdHJlYW06ICBuZXcgbGFtYmRhLkZ1bmN0aW9uKHN0YWNrLCAnVGVzdEZ1bmN0aW9uJywge1xuICAgICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJyxcbiAgICAgICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpXG4gICAgICAgIH0pLFxuICAgICAgICByZWFkQ2FwYWNpdHk6IDNcbiAgICAgIH0pO1xuICAgIH0pLnRvVGhyb3dFcnJvcigvcmVhZENhcGFjaXR5IG11c3QgYmUgZ3JlYXRlciB0aGFuIDUgYW5kIGxlc3MgdGhhbiAyMC8pO1xuICB9KTtcbiAgXG4gICAiXX0=