import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from "ai";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  GROQ_API_KEY,
  // HUGGINGFACE_API,
} = process.env;

const groq = createOpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
})
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const {messages}  = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    let docContext = "";

    // const embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: HUGGINGFACE_API,
    //   model: "sentence-transformers/all-mpnet-base-v2",
    // });

    // const embedding = await embeddings.embedQuery(latestMessage);

    try {
      const collection = db.collection(ASTRA_DB_COLLECTION);

      const cursor = collection.find({}, {
        sort: {
          $vectorize: latestMessage,
        },
        limit: 7,
      });

      const documents = await cursor.toArray();

      const docsMap = documents?.map(doc => doc.text);

      docContext = JSON.stringify(docsMap);

    } catch (error) {
      console.log("Error in finding collection...", error);
      docContext = "";
    }

    const template = {
        role:"system",
        content:`You are an AI lawyer who knows everything about "THE CONSTITUTION OF INDIA". Use the below context to augment what you know about the constitution of india. The context will provide you with the most recent data from the constitution of india. If the context doesn't include the information you need do not give answer based on your existing knowledge and don't mention the source of your information or what the context does or doesn't include. Format responses using markdown and don't return images. 
        -------------
        START CONTEXT

        ${docContext}

        END CONTEXT
        -------------
        QUESTION: ${latestMessage}
        -------------
        `
    }

    const model = groq('llama-3.1-70b-versatile')

    // const response = await groq.chat.completions.create({
    //     messages: [template,...messages],
    //     model: "llama-3.1-70b-versatile",
    //     // stream:true,
    //   });

    const response = streamText({
      model,
      messages:[template,...messages],
      temperature: 0.5,
      frequencyPenalty: 1,
    })
  

      // console.log("documents = ",response.choices[0]?.message?.content)

      // const res = streamText({});
      // res.toAIStreamResponse(response.choices[0]?.message?.content||"Error from AI")      

      // return new Response(response.choices[0]?.message?.content ||"Error from AI",{ status: 201 })

      return response.toDataStreamResponse()


  } catch (error) {
    console.log("Error in db connection...", error);
  }
}
