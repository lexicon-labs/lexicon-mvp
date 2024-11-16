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
  {
    name: "create_solana_swap",
    description:
      "Creates a Solana swap transaction to swap a specified amount of one token to another.",
    strict: true,
    parameters: {
      type: "object",
      required: ["input_mint", "output_mint", "amount", "slippage_bps"],
      properties: {
        input_mint: {
          type: "string",
          description: "The mint address of the input token.",
        },
        output_mint: {
          type: "string",
          description: "The mint address of the output token.",
        },
        amount: {
          type: "number",
          description: "The amount of input token to swap.",
        },
        slippage_bps: {
          type: "number",
          description: "The slippage tolerance in basis points.",
        },
      },
      additionalProperties: false,
    },
  },
];