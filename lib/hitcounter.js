"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const lambda = require("aws-cdk-lib/aws-lambda");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
class HitCounter extends constructs_1.Construct {
    constructor(scope, id, props) {
        var _a;
        if (props.readCapacity !== undefined && (props.readCapacity < 5 || props.readCapacity > 20)) {
            throw new Error('readCapacity must be greater than 5 and less than 20');
        }
        super(scope, id);
        const table = new dynamodb.Table(this, "Hits", {
            partitionKey: {
                name: "path",
                type: dynamodb.AttributeType.STRING
            },
            encryption: dynamodb.TableEncryption.AWS_MANAGED,
            readCapacity: (_a = props.readCapacity) !== null && _a !== void 0 ? _a : 5
        });
        this.table = table;
        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.handler);
        // grant the lambda role invoke permissions to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCwyQ0FBdUM7QUFldkMsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFPdkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjs7UUFDOUQsSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDekYsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1NBQ3pFO1FBQ0gsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUM3QyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUNwQztZQUNELFVBQVUsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVc7WUFDaEQsWUFBWSxRQUFFLEtBQUssQ0FBQyxZQUFZLG1DQUFJLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzVELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLFdBQVcsRUFBRTtnQkFDWCx3QkFBd0IsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVk7Z0JBQ3ZELGVBQWUsRUFBRSxLQUFLLENBQUMsU0FBUzthQUNqQztTQUNGLENBQUMsQ0FBQztRQUVILDREQUE0RDtRQUM1RCxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZDLHNFQUFzRTtRQUN0RSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBdkNELGdDQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGl0Q291bnRlclByb3BzIHtcbiAgLyoqIHRoZSBmdW5jdGlvbiBmb3Igd2hpY2ggd2Ugd2FudCB0byBjb3VudCB1cmwgaGl0cyAqKi9cbiAgZG93bnN0cmVhbTogbGFtYmRhLklGdW5jdGlvbjtcbiAgLyoqXG4gICogVGhlIHJlYWQgY2FwYWNpdHkgdW5pdHMgZm9yIHRoZSB0YWJsZVxuICAqXG4gICogTXVzdCBiZSBncmVhdGVyIHRoYW4gNSBhbmQgbG93ZXIgdGhhbiAyMFxuICAqXG4gICogZGVmYXVsdCA1XG4gICovXG4gIHJlYWRDYXBhY2l0eT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEhpdENvdW50ZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICAvKiogYWxsb3dzIGFjY2Vzc2luZyB0aGUgY291bnRlciBmdW5jdGlvbiAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaGFuZGxlcjogbGFtYmRhLkZ1bmN0aW9uO1xuXG4gIC8qKiB0aGUgaGl0IGNvdW50ZXIgdGFibGUgKi9cbiAgcHVibGljIHJlYWRvbmx5IHRhYmxlOiBkeW5hbW9kYi5UYWJsZTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogSGl0Q291bnRlclByb3BzKSB7XG4gICAgaWYgKHByb3BzLnJlYWRDYXBhY2l0eSAhPT0gdW5kZWZpbmVkICYmIChwcm9wcy5yZWFkQ2FwYWNpdHkgPCA1IHx8IHByb3BzLnJlYWRDYXBhY2l0eSA+IDIwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlYWRDYXBhY2l0eSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiA1IGFuZCBsZXNzIHRoYW4gMjAnKTtcbiAgICAgIH1cbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgXCJIaXRzXCIsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiBcInBhdGhcIixcbiAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBlbmNyeXB0aW9uOiBkeW5hbW9kYi5UYWJsZUVuY3J5cHRpb24uQVdTX01BTkFHRUQsXG4gICAgICByZWFkQ2FwYWNpdHk6IHByb3BzLnJlYWRDYXBhY2l0eSA/PyA1XG4gICAgfSk7XG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuXG4gICAgdGhpcy5oYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnSGl0Q291bnRlckhhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGhhbmRsZXI6ICdoaXRjb3VudGVyLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIERPV05TVFJFQU1fRlVOQ1RJT05fTkFNRTogcHJvcHMuZG93bnN0cmVhbS5mdW5jdGlvbk5hbWUsXG4gICAgICAgIEhJVFNfVEFCTEVfTkFNRTogdGFibGUudGFibGVOYW1lXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9ucyB0byBvdXIgdGFibGVcbiAgICB0YWJsZS5ncmFudFJlYWRXcml0ZURhdGEodGhpcy5oYW5kbGVyKTtcblxuICAgIC8vIGdyYW50IHRoZSBsYW1iZGEgcm9sZSBpbnZva2UgcGVybWlzc2lvbnMgdG8gdGhlIGRvd25zdHJlYW0gZnVuY3Rpb25cbiAgICBwcm9wcy5kb3duc3RyZWFtLmdyYW50SW52b2tlKHRoaXMuaGFuZGxlcik7XG4gIH1cbn1cbiJdfQ==