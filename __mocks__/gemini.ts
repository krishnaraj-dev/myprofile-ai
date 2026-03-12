type HistoryItem = {
  role: "user" | "model";
  parts: { text: string }[];
};

export async function getChatResponseStream(
  _message: string,
  _history: HistoryItem[],
  onChunk: (chunk: string) => void,
) {
  onChunk("Mock response");
}
