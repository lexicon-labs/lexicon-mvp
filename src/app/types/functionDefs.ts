export const tools = [
  {
    name: "create_solana_transaction",
    description:
      "Creates a Solana transaction to send a specified amount of SOL to a recipient wallet.",
    strict: true,
    parameters: {
      type: "object",
      required: ["recipient_wallet", "amount_sol"],
      properties: {
        amount_sol: {
          type: "number",
          description: "The amount of SOL to send.",
        },
        recipient_wallet: {
          type: "string",
          description: "The recipient's wallet address in base58 format.",
        },
      },
      additionalProperties: false,
    },
  },
];


