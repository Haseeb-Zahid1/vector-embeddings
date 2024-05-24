// const { Bedrock } = require("@langchain/community/llms/bedrock");
const { BedrockEmbeddings } = require("@langchain/community/embeddings/bedrock");
const { MemoryVectorStore } = require('langchain/vectorstores/memory');

// const JSON = require('json');
// Or, from web environments:
// const { Bedrock } = require("@langchain/community/llms/bedrock/web");

// If no credentials are provided, the default credentials from
// @aws-sdk/credential-provider-node will be used.

const embeddings = new BedrockEmbeddings({
  model: "amazon.titan-embed-text-v1", // You can also do e.g. "anthropic.claude-v2", "ai21.j2-grande-instruct"
  region: "us-east-1",
  // endpointUrl: "custom.amazonaws.com",
  credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  // modelKwargs: {},
});

async function getEmbeddings() {
    const res = await embeddings.embedQuery(
      "What would be a good company name for a company that makes colorful socks?"
    );
    console.log({ res });
  }
  
getEmbeddings();