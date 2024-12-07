import "dotenv/config";
import { CursorIsStartedError, DataAPIClient } from "@datastax/astra-db-ts";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  GROQ_API_KEY,
  GROQ_MODEL,
  // HUGGINGFACE_API,
} = process.env;

const groq = createOpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    let docContext = "";

    // You can create your using langchain hugginface for creating embeddings if you are not using AstraDB NVIDIA embedding.
    // For more info check this 👇
    // https://js.langchain.com/docs/integrations/text_embedding/hugging_face_inference/

    // const embeddings = new HuggingFaceInferenceEmbeddings({
    //   apiKey: HUGGINGFACE_API,
    //   model: "sentence-transformers/all-mpnet-base-v2",
    // });

    // const embedding = await embeddings.embedQuery(latestMessage);

    const collection = db.collection(ASTRA_DB_COLLECTION);

    const cursor = collection.find(
      {},

      // Only use this if you are creating your own embeddings 
      // {
      //   sort: {
      //     $vector: embedding,
      //   },
      //   limit: 5,
      // }


      // By default AstraDb provide NVIDIA NV-Embed-QA model for creating embedding 
      // For more info check this 👇
      // https://docs.datastax.com/en/astra-db-serverless/integrations/embedding-providers/nvidia.html 

      {
        sort: {
          $vectorize: latestMessage,
        },
        limit: 5,
      }
    );

    // console.log("cursor = ",cursor)
    let documents = [];
    try {
      documents = await cursor.toArray();
    } catch (e) {
      if (e instanceof CursorIsStartedError) {
        console.log("cursor error", e.message); // "Cursor is already initialized..."
      }
    }

    const docsMap = documents?.map((doc) => doc.text);

    docContext = docsMap.toString();
    // console.log("docContext =", docContext);

    const template = {
      role: "system",
      content: `You are an AI lawyer who knows everything about "THE CONSTITUTION OF INDIA". Use the below context to augment what you know about the constitution of india. The context will provide you with the most recent data from the constitution of india. If the context doesn't include the information you need do not give answer based on your existing knowledge and don't mention the source of your information or what the context does or doesn't include. Format responses using markdown and don't return images. 
        -------------
        START CONTEXT

        ${docContext}

        END CONTEXT
        -------------
        QUESTION: ${latestMessage}
        -------------
        `,
    };

    const model = groq(GROQ_MODEL);

    const response = streamText({
      model,
      messages: [template, ...messages],
      temperature: 0.5,
      frequencyPenalty: 1,
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.log("Error in db connection...", error);
  }
}
