const { BedrockEmbeddings } = require("@langchain/community/embeddings/bedrock");
const { MemoryVectorStore } = require('langchain/vectorstores/memory');

const embeddings = new BedrockEmbeddings({
  model: "amazon.titan-embed-text-v1",
  region: "us-east-1",
  credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function createVectorStoreFromTexts(texts, metadatas) {
  const embeddingPromises = texts.map(function(text) {
    return embeddings.embedQuery(text);
  });
  const textEmbeddings = await Promise.all(embeddingPromises);

//   console.log

  return MemoryVectorStore.fromTexts(texts, metadatas, embeddings);
}

async function semanticSearch(vectorStore, queryText, topK = 1) {
  return vectorStore.similaritySearch(queryText, topK);
}

(async function() {
  const texts = ["Hello, world!", "How are you?", "Good morning!"];
  const metadatas = [
    { id: "1", info: "Greeting" },
    { id: "2", info: "Question" },
    { id: "3", info: "Morning greeting" }
    
  ];

  const vectorStore = await createVectorStoreFromTexts(texts, metadatas);

  const queryText = "morning";
  const results = await semanticSearch(vectorStore, queryText, 1); 

  console.log(`Results for "${queryText}":`, results);
})();
