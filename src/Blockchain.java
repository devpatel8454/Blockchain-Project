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

            if (!current.hash.equals(current.calculateHash())) return false;
            if (!current.previousHash.equals(previous.hash)) return false;
            if (!current.hash.substring(0, difficulty).equals(target)) return false;
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
}
