# ⚔️ BlockBattle: Full-Stack Blockchain Combat Simulator

**BlockBattle** is a cutting-edge demonstration of merging turn-based combat mechanics with decentralized ledger technology. This project features a robust **Java Core** for low-level blockchain logic and a modern **React Frontend** for an interactive, visual gaming experience.

Every action—be it a strike, a defense, or a healing potion—is cryptographically secured, verified through a **Merkle Tree**, and mined into an immutable blockchain.

---

## 🌟 Key Features

- **🛡️ Dynamic Combat System**: Strategic turn-based gameplay involving Attacks, Defenses, and Heals.
- **🌳 Merkle Tree Verification**: Transactions are hashed into a Merkle Root within each block, allowing for efficient and secure data integrity checks.
- **⛏️ Proof-of-Work (PoW)**: A rigorous mining mechanism (CPU-based) that secures the network by requiring a specific hash prefix.
- **📜 Immutable Ledger**: A transparent, tamper-proof history of every move made in the game.
- **💻 Full-Stack Experience**:
  - **Java Backend**: Core blockchain engine, replay system, and data persistence.
  - **React & Vite Frontend**: A premium, responsive UI with real-time blockchain visualization and combat animations.
- **📊 Automated JSON Export**: At the conclusion of a battle, the final game state, including the complete blockchain and winner details, is automatically exported to a JSON audit log.

---

## 🏗️ Project Architecture

### ☕ Java Core (`/src`)

- **`Blockchain.java`**: The central authority managing the chain, mining difficulty, and JSON/Text persistence.
- **`GameBlock.java`**: Implements the block structure including Merkle Roots and SHA-256 linking.
- **`StringUtil.java`**: Cryptographic utility for SHA-256 and Merkle Tree generation.
- **`BattleEngine.java`**: Manages the local terminal-based battle loop.
- **`GameReplay.java`**: Verifies the chain by reconstructing game state from transactions.

### ⚛️ Frontend UI (`/frontend`)

- **`App.tsx`**: Main game controller managing the React state and blockchain integration.
- **`logic/GameBlock.ts`**: TypeScript implementation of the blockchain logic (mirrors Java core).
- **`components/BlockView.tsx`**: Visualizes blocks in real-time, showing Hashes, Merkle Roots, and Nonces.
- **`components/PlayerCard.tsx`**: Displays player stats with health bars and status indicators.

---

## 🚀 Getting Started

### 1. Run the Terminal Version (Java)

To experience the core logic via command line:

```powershell
# Compile the source
javac -d out src/*.java

# Run the game
java -cp out Main
```

### 2. Run the Web Version (React)

To experience the premium visual interface:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## ⚙️ Technical Specifications

| Feature                 | Specification                       |
| :---------------------- | :---------------------------------- |
| **Language**            | Java 8+ / TypeScript & React        |
| **Hashing Algorithm**   | SHA-256                             |
| **Integrity Check**     | Merkle Tree (Merkle Root per Block) |
| **Consensus Mechanism** | Proof-of-Work (PoW)                 |
| **Mining Difficulty**   | 3 (Trailing Zeros)                  |
| **Data Persistence**    | `.txt` (Log) & `.json` (Audit)      |

---

## 📂 Data Export Format

At the end of every game, a `winner_data.json` is generated. It follows this structure:

```json
{
  "winner": "Player-B",
  "minedBlocks": [
    {
      "blockIndex": 1,
      "hash": "000ad691...",
      "previousHash": "9fc071b5...",
      "merkleRoot": "ee1eabc1...",
      "transactions": [
        { "playerId": "Player-A", "action": "ATTACK", "value": 14 },
        { "playerId": "Player-B", "action": "ATTACK", "value": 13 }
      ]
    }
  ]
}
```

---

## 📜 License

This project is for educational purposes, demonstrating the application of blockchain data structures in a gaming environment.

_Crafted with ❤️ for the Blockchain Community._
