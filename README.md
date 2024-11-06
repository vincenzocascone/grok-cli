# Grok CLI

A Deno-based command-line application in TypeScript for interacting with the x.ai Grok API. This tool allows you to chat with Grok directly from your terminal.

## Requirements

- Deno installed on your system. [Install Deno](https://docs.deno.com/runtime/getting_started/installation/)

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/vincenzocascone/grok-cli.git
   cd grok-cli
   ```

2. **Create a `.env` file** in the project root to store your Grok API key:

   ```plaintext
   GROK_API_KEY=your_api_key_here
   ```

3. **Run the application**:

   Use the following command to start a conversation with Grok:

   ```bash
   deno run --allow-net --allow-env --allow-read main.ts
   ```

## Usage

- Once you start the application, you’ll be prompted to input messages.
- Type your message and press Enter to receive a response from Grok.
- To end the conversation, type `exit` and press Enter.

Enjoy chatting with Grok from your terminal!
