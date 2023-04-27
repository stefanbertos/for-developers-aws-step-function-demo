/* Amplify Params - DO NOT EDIT
	API_DEMO_EVENTTABLE_ARN
	API_DEMO_EVENTTABLE_NAME
	API_DEMO_GRAPHQLAPIENDPOINTOUTPUT
	API_DEMO_GRAPHQLAPIIDOUTPUT
	API_DEMO_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import {SFNClient, StartExecutionCommand, StopExecutionCommand} from "@aws-sdk/client-sfn";
import {addHours, format, parseISO} from "date-fns";
import {formatInTimeZone} from "date-fns-tz";
import {default as fetch, Request} from 'node-fetch';

const sfnClient = new SFNClient({region: process.env['REGION']});

const GRAPHQL_ENDPOINT = process.env.API_DEMO_GRAPHQLAPIIDOUTPUT;
const GRAPHQL_API_KEY = process.env.API_DEMO_GRAPHQLAPIKEYOUTPUT;

async function updateExecutionArn(eventId, executionArn) {
    const query = /* GraphQL */ `
        mutation operation($input: UpdateEventInput!) {
            updateEvent(input: $input) {
                id
                executionArn
            }
        }
    `;
    const variables = {
        input: {
            id: eventId,
            executionArn: executionArn
        }
    };
    const options = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query, variables})
    };

    console.log('updateExecutionArn', GRAPHQL_ENDPOINT, options);
    const request = new Request(GRAPHQL_ENDPOINT, options);

    try {
        const response = await fetch(request);
        const body = await response.json();
        console.log('updateExecutionArn result', body);
    } catch (error) {
        console.log(error);
    }
}

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

async function startStepFunction(eventId, phone, start) {
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
                "text": "This is a notification for event at " + start,
                "phoneNumber": phone,
                "eventTable": process.env.API_DEMO_EVENTTABLE_NAME,
                "eventId": eventId
            }
        })
    };
    const command = new StartExecutionCommand(params);
    try {
        console.log('before startStepFunction', command);
        const data = await sfnClient.send(command);
        console.log('after startStepFunction', command, data);
        await updateExecutionArn(eventId, data.executionArn);
    } catch (error) {
        console.log('error startStepFunction', command, error);
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

        const oldExecutionArn = record.dynamodb.OldImage?.executionArn?.S
        const newExecutionArn = record.dynamodb.NewImage.executionArn?.S
        const deleted = record.dynamodb.NewImage._deleted?.BOOL
        const oldStart = record.dynamodb.OldImage?.start?.S
        const newStart = record.dynamodb.NewImage.start.S
        const phone = record.dynamodb.NewImage.phone.S
        const id = record.dynamodb.NewImage.id.S

        if (record.eventName === 'INSERT') {
            await startStepFunction(id, phone, newStart);
        }
        if (record.eventName === 'MODIFY') {
            if (deleted === true && newExecutionArn !== undefined) {
                await stopStepFunction(newExecutionArn);
            } else if (oldExecutionArn === newExecutionArn && newExecutionArn !== undefined && oldStart !== newStart) {
                await stopStepFunction(newExecutionArn);
                await startStepFunction(id, phone, newStart);
            }
        }
    }
    const response = {
        statusCode: 200, headers: {
            "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"
        }, "body": JSON.stringify('Successfully processed DynamoDB record')
    };
    return response;
};