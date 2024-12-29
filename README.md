# Lexicon AI Agent Framework

An open-source AI agent framework for building intelligent assistants into Solana dApps. Powered by Next.js and OpenAI.

## Overview

Lexicon allows you to easily integrate an AI assistant into your Solana dApp that can:

- Execute on-chain transactions
- Swap tokens using Jupiter
- Check wallet balances and portfolios
- Provide custom functionality through configurable functions

## Getting Started

1. Set up environment variables by creating a `.env` file in the root directory:

```bash
# Required: OpenAI API key for the AI functionality
OPENAI_API_KEY=your_openai_api_key

# Required: OpenAI model to use (e.g., gpt-4, gpt-3.5-turbo)
NEXT_PUBLIC_AI_MODEL=gpt-4o

# Required: MongoDB connection for token mappings (if you want to use token mappings, and save addresses = tickers)
MONGODB_URI=your_mongodb_uri
MONGODB_DB=your_database_name

# Required: Your app's URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Helius RPC endpoint for better Solana network performance
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the demo app.

## Integration Guide

### 1. Configure Custom Functions

Add your custom functions in the `app/configs` directory:

```typescript
// app/configs/your-config/functionDefs.ts
export const tools = [
  {
    name: "your_function_name",
    description: "Description of what your function does",
    parameters: {
      // OpenAI function calling parameters
    },
  },
];

// app/configs/your-config/functions.ts
export const functionHandlers = {
  your_function_name: async (args, wallet) => {
    // Function implementation
  },
};

// app/configs/your-config/systemPrompt.ts
export const systemPrompt = `Your AI assistant's personality and instructions`;
```

### 2. Embed the Component

Add the Lexicon chat widget to your React/Next.js app:

```tsx
import LexiconButton from "./components/LexiconButton";

export default function YourApp() {
  return (
    <div>
      <LexiconButton configId="your-config" />
    </div>
  );
}
```

### 3. Customize the Look

The component is built with Tailwind CSS and is fully customizable. Override styles through:

- Custom className props
- Tailwind CSS classes
- CSS modules
- Styled-components

## Features

- 🤖 AI-powered chat interface
- 💱 Built-in Solana transaction capabilities
- 🔄 Jupiter DEX integration
- 👛 Wallet connection handling
- ⚙️ Configurable function framework
- 🎨 Customizable UI/UX
- 📱 Responsive design
- ⚡️ Real-time updates

## Learn More

- [Project Documentation](docs/README.md)
- [Configuration Guide](docs/configuration.md)
- [API Reference](docs/api-reference.md)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
