/* Amplify Params - DO NOT EDIT
ENV
REGION
Amplify Params - DO NOT EDIT */
import {SFNClient, StartExecutionCommand, StopExecutionCommand} from "@aws-sdk/client-sfn";
import {addHours, format, parseISO} from "date-fns";
import {formatInTimeZone} from "date-fns-tz";

const sfnClient = new SFNClient({region: process.env['REGION']});

async function stopStepFunction(smsNotificationStepFunctionArn) {
//https://docs.aws.amazon.com/en_us/AWSJavaScriptSDK/v3/latest/clients/client-sfn/classes/stopexecutioncommand.html
    const params = {
        executionArn: smsNotificationStepFunctionArn,
        cause: 'Deletion of entry'
    };
    const command = new StopExecutionCommand(params);
    try {
        console.log('before stopStepFunction', command);
        const data = await sfnClient.send(command);
        console.log('after stopStepFunction', command, data);
    } catch (error) {
        console.log('error stopStepFunction', command, error);
    }
}

async function callStepFunction(eventId, phone, start) {
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sfn/classes/startexecutioncommand.html
    const timestamp = addHours(parseISO(start), -24).toISOString()
    const day = format(parseISO(start), 'dd.LL.yyyy');
    const time = formatInTimeZone(new Date(start), 'Europe/Prague', 'HH:mm');
    const params = {
        stateMachineArn: "arn:aws:states:eu-central-1:536115498177:stateMachine:MyStateMachine",
        input: JSON.stringify({
            "input": {
                "timestamp": timestamp,
                "day": day,
                "time": time,
                "phoneNumber": phone,
                "eventTable": "Event-y4svjrv34fhnpjiymnzkg2n6tq-staging",
                "eventId": eventId
            }
        })
    };
    const command = new StartExecutionCommand(params);
    try {
        console.log('before callStepFunction', command, input);
        const data = await sfnClient.send(command);
        console.log('after callStepFunction', command, data);
        await updateSmsNotificationArn(eventId, data.executionArn);
    } catch (error) {
        console.log('error callStepFunction', command, error);
    }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    for (const record of event.Records) {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);

        const executionArn = record.dynamodb.NewImage.executionArn?.S
        const deleted = record.dynamodb.NewImage._deleted?.BOOL
        const oldStart = record.dynamodb.OldImage.start.S
        const newStart = record.dynamodb.NewImage.start.S
        const phone = record.dynamodb.NewImage.phone.S
        const id = record.dynamodb.NewImage.id.S

        if (record.eventName === 'CREATE') {
            await callStepFunction(id, phone, newStart);
        }
        /*  if (record.eventName === 'MODIFY') {
        if (deleted === true) {
        await stopStepFunction(executionArn);
        } else if (oldStart !== newStart) {
        await stopStepFunction(executionArn);
        await callStepFunction(id, phone, newStart);
        }
        }
        */
    }
    const response = {
        statusCode: 200, headers: {
            "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"
        }, "body": JSON.stringify('Successfully processed DynamoDB record')
    };
    return response;
};