import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import nodeHtmlToImage from 'node-html-to-image'
import bent from 'bent'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const client = bent('string');
    const html = await client('https://ogimage.blob.core.windows.net/templates/1.html');
    
    console.log('date', req.query.date);

    const img = await nodeHtmlToImage({
        html: html,
        content: {
            title: req.query.title,
            author: req.query.author,
            date: req.query.date
        }
    });
    const data = [];
    data.push(img);

    context.res = {
        setEncoding: 'binary',
        body: Buffer.concat(data),
        headers: {
            'Content-Type': 'image/png'
        }
    };
};

export default httpTrigger;