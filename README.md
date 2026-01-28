# ⚔️ BlockBattle: Blockchain-Powered Combat Simulator

BlockBattle is a Java-based implementation of a simple blockchain applied to a turn-based battle game. Every move made by players is recorded as a transaction, ensuring a transparent and immutable history of the entire match.

## 🚀 Overview

In BlockBattle, two players engage in a strategic duel. What makes this game unique is that every round of combat is bundled into a **Block** and added to a **Blockchain**. To ensure the integrity of the game data, each block must be **mined** using a Proof-of-Work (PoW) algorithm before it is officially added to the chain.

## 🛠️ Key Features

- **Turn-Based Strategy**: Choose between `Attack`, `Defend`, or `Heal` each turn.
- **Blockchain Core**: Implements a functional blockchain with hashing and block linking.
- **Proof of Work (PoW)**: Blocks are mined with a difficulty setting (default: 3 zeros).
- **Immutable Transactions**: Every action (damage dealt, health restored) is stored as a transaction.
- **Integrity Verification**: The system validates the entire chain at the end of the game to ensure no data was tampered with.

## 📁 Project Structure

- **`Main.java`**: The entry point that initializes players and starts the battle.
- **`BattleEngine.java`**: The heart of the game logic. It manages turns, processes player input, and creates new blocks.
- **`Blockchain.java`**: Manages the list of blocks and provides the `isChainValid()` method.
- **`GameBlock.java`**: Defines the block structure, including `previousHash`, `timeStamp`, `nonce`, and the list of transactions. Contains the `mineBlock()` logic.
- **`GameTransaction.java`**: Represents a single action taken by a player (e.g., "Player-A ATTACK 15").
- **`Player.java`**: Stores player state such as Health (HP) and Defense.
- **`StringUtil.java`**: A utility class providing SHA-256 hashing functionality.

## 🎮 How to Play

1. **Run the Application**: Execute the `Main` class.
2. **Choose Your Action**: On your turn, enter:
   - `1` to **Attack**: Deal damage to the opponent.
   - `2` to **Defend**: Increase your defense for the next turn.
   - `3` to **Heal**: Restore some of your health.
3. **Mining**: After both players move, the system will mine a new block containing those actions.
4. **Victory**: The game ends when one player's health drops to 0 or below.
5. **Validation**: The final blockchain is validated to confirm the match history is secure.

## ⚙️ Technical Details

- **Language**: Java
- **Hashing Algorithm**: SHA-256
- **Consensus**: Proof of Work (Mining)
- **Data Storage**: In-memory ArrayList (simulated ledger)

---

_Developed as a demonstration of blockchain principles in a gaming context._
