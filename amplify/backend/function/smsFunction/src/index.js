import {SSMClient, GetParameterCommand} from "@aws-sdk/client-ssm";
import got from 'got';

const ssmClient = new SSMClient({region: process.env['REGION']});
const input = {"Name": process.env['smsSecret'], WithDecryption: true}
const command = new GetParameterCommand(input);
const parameter = await ssmClient.send(command); // top-level await - optimalization for function startup https://aws.amazon.com/about-aws/whats-new/2022/01/aws-lambda-es-modules-top-level-await-node-js-14/
const secret = JSON.parse(parameter.Parameter.Value);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const {data} = await got.post("https://portal.bulkgate.com/api/1.0/simple/transactional", {
        json: {
            application_id: secret.smsApplicationId,
            application_token: secret.smsToken,
            number: event.phoneNumber,
            text: event.text,
            sender_id: 'gText',
            sender_id_value: 'BulkGate'
        }
    }).json();

    console.log(data);

    return {
        statusCode: 200, headers: {
            "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"
        }, body: JSON.stringify('SMS notification succesfully send'),
    };
};
