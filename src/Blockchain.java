import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class Blockchain {
    public static ArrayList<GameBlock> chain = new ArrayList<>();
    public static int difficulty = 3;

    public static void addBlock(GameBlock block) {
        block.mineBlock(difficulty);
        chain.add(block);
    }

    public static boolean isChainValid() {
        String target = new String(new char[difficulty]).replace('\0', '0');
        for (int i = 1; i < chain.size(); i++) {
            GameBlock current = chain.get(i);
            GameBlock previous = chain.get(i - 1);

            if (!current.hash.equals(current.calculateHash()))
                return false;
            if (!current.previousHash.equals(previous.hash))
                return false;
            if (!current.hash.substring(0, difficulty).equals(target))
                return false;
        }
        return true;
    }

    public static void printChain() {
        System.out.println("\n===== BLOCKCHAIN DATA =====");
        for (int i = 0; i < chain.size(); i++) {
            GameBlock block = chain.get(i);
            System.out.println("Block #" + i);
            System.out.println("Hash: " + block.hash);
            System.out.println("Previous Hash: " + block.previousHash);
            System.out.println("Merkle Root: " + block.merkleRoot);
            System.out.println("Transactions:");
            for (GameTransaction tx : block.transactions) {
                System.out.println("  " + tx.playerId + " -> " + tx.action + " : " + tx.value);
            }
            System.out.println("---------------------------");
        }
    }

    public static void saveChainToFile(String filename) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
            writer.println("===== BLOCKCHAIN DATA =====");
            for (int i = 0; i < chain.size(); i++) {
                GameBlock block = chain.get(i);
                writer.println("Block #" + i);
                writer.println("Hash: " + block.hash);
                writer.println("Previous Hash: " + block.previousHash);
                writer.println("Merkle Root: " + block.merkleRoot);
                writer.println("Transactions:");
                for (GameTransaction tx : block.transactions) {
                    writer.println("  " + tx.playerId + " -> " + tx.action + " : " + tx.value);
                }
                writer.println("---------------------------");
            }
            System.out.println("✅ Blockchain data saved to " + filename);
        } catch (IOException e) {
            System.out.println("❌ Error saving blockchain data: " + e.getMessage());
        }
    }

    public static void saveWinnerBlocksToJson(String winnerId, String filename) {
        StringBuilder json = new StringBuilder();
        json.append("{\n");
        json.append("  \"winner\": \"").append(winnerId).append("\",\n");
        json.append("  \"minedBlocks\": [\n");

        boolean firstBlock = true;
        for (int i = 0; i < chain.size(); i++) {
            GameBlock block = chain.get(i);

            // Collect blocks that are relevant (e.g., all blocks in the chain for now, or
            // filtered by winner)
            if (!firstBlock)
                json.append(",\n");

            json.append("    {\n");
            json.append("      \"blockIndex\": ").append(i).append(",\n");
            json.append("      \"hash\": \"").append(block.hash).append("\",\n");
            json.append("      \"previousHash\": \"").append(block.previousHash).append("\",\n");
            json.append("      \"merkleRoot\": \"").append(block.merkleRoot).append("\",\n");
            json.append("      \"transactions\": [\n");

            for (int j = 0; j < block.transactions.size(); j++) {
                GameTransaction tx = block.transactions.get(j);
                json.append("        {\n");
                json.append("          \"playerId\": \"").append(tx.playerId).append("\",\n");
                json.append("          \"action\": \"").append(tx.action).append("\",\n");
                json.append("          \"value\": ").append(tx.value).append("\n");
                json.append("        }");
                if (j < block.transactions.size() - 1)
                    json.append(",");
                json.append("\n");
            }
            json.append("      ]\n");
            json.append("    }");
            firstBlock = false;
        }

        json.append("\n  ]\n");
        json.append("}");

        try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
            writer.print(json.toString());
            System.out.println("✅ Winner data saved to JSON: " + filename);
        } catch (IOException e) {
            System.out.println("❌ Error saving winner data: " + e.getMessage());
        }
    }
}
