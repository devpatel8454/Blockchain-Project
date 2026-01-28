import java.util.ArrayList;

public class Blockchain {
    public static ArrayList<GameBlock> chain = new ArrayList<>();
    public static int difficulty = 3;

    public static void addBlock(GameBlock block) {
        block.mineBlock(difficulty);
        chain.add(block);
    }

    public static boolean isChainValid() {
        for (int i = 1; i < chain.size(); i++) {
            GameBlock current = chain.get(i);
            GameBlock previous = chain.get(i - 1);

            if (!current.hash.equals(current.calculateHash())) return false;
            if (!current.previousHash.equals(previous.hash)) return false;
        }
        return true;
    }
}
