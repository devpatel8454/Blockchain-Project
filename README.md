# ⚔️ BlockBattle: Blockchain-Powered Combat Simulator

**BlockBattle** is a sophisticated Java implementation that merges turn-based combat mechanics with blockchain technology. Every action taken by players is cryptographically secured, bundled into blocks, and appended to an immutable ledger, ensuring the integrity and transparency of the entire match history.

---

## 🌟 Key Features

- **🛡️ Strategic Combat**: A turn-based system where players choose to **Attack**, **Defend**, or **Heal**.
- **⛓️ Robust Blockchain**: A custom-built blockchain implementation featuring SHA-256 hashing and block linking.
- **⛏️ Proof-of-Work (PoW)**: Implements a mining mechanism where each block must solve a cryptographic puzzle before being added to the chain.
- **📜 Immutable Ledger**: Every game event is recorded as a transaction, creating a permanent, tamper-proof record of the battle.
- **✅ Integrity Verification**: Automatic validation of the entire blockchain at the end of the game to detect any data tampering.
- **🔄 Game Replay System**: A built-in replay engine that reconstructs the game state directly from the blockchain data to verify consistency.

---

## 🏗️ Project Architecture

The project is organized into several core components:

- **`Main.java`**: The entry point. Orchestrates player initialization, the battle sequence, and the final replay verification.
- **`BattleEngine.java`**: The core game loop. Manages player turns, processes inputs, and interfaces with the blockchain to record actions.
- **`Blockchain.java`**: The ledger manager. Handles the chain of blocks, provides validation logic, and persists data to disk.
- **`GameBlock.java`**: The fundamental data structure of the chain. Contains the transaction list, timestamp, nonce, and mining logic.
- **`GameTransaction.java`**: Represents an atomic game action (e.g., Damage dealt, HP restored).
- **`GameReplay.java`**: A verification tool that re-runs the game logic using only the data stored on the blockchain.
- **`Player.java`**: Manages player state, including health points (HP) and defensive capabilities.
- **`StringUtil.java`**: A utility class providing SHA-256 hashing via Java's `MessageDigest`.

---

## 🎮 How to Play

### 1. Setup & Execution

Compile and run the `Main` class using your favorite IDE or the command line:

```bash
javac src/*.java -d out
java -cp out Main
```

### 2. Gameplay Mechanics

During your turn, you can choose one of three actions:

- **`1` Attack**: Strike your opponent. Damage is mitigated by the opponent's current defense.
- **`2` Defend**: Brace for impact. Increases your defense for the next incoming attack.
- **`3` Heal**: Use a potion to restore a portion of your health.

### 3. The Blockchain Process

1. **Action Recording**: Your moves are stored as transactions.
2. **Block Creation**: After each round, transactions are bundled into a new block.
3. **Mining**: The system performs Proof-of-Work mining (finding a hash with 3 leading zeros).
4. **Chain Extension**: The mined block is linked to the previous block's hash and added to the chain.

---

## ⚙️ Technical Specifications

| Component       | Technology                          |
| :-------------- | :---------------------------------- |
| **Language**    | Java 8+                             |
| **Hashing**     | SHA-256                             |
| **Consensus**   | Proof-of-Work (PoW)                 |
| **Difficulty**  | 3 (Adjustable in `Blockchain.java`) |
| **Persistence** | `blockchain_data.txt`               |

---

## 📊 Sample Output

```text
⚔️ BLOCKBATTLE STARTED ⚔️
Player-A choose action: 1.Attack  2.Defend  3.Heal
1
⛏️ Block Mined: 000a1b2c3d4e5f...
Player-A Health: 100
Player-B Health: 85
----------------------------------
...
🏆 WINNER: Player-A
Blockchain valid: true
✅ Blockchain data saved to blockchain_data.txt
```

---

_This project serves as an educational demonstration of how blockchain principles can be applied to ensure data integrity in gaming environments._
