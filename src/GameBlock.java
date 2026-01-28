import java.util.ArrayList;
import java.util.Date;
public class GameBlock {
    public String hash;
    public String previousHash;
    public ArrayList<GameTransaction> transactions;
    private long timeStamp;
    private int nonce;

    public GameBlock(String previousHash, ArrayList<GameTransaction> transactions) {
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.timeStamp = new Date().getTime();
        this.hash = calculateHash();
    }

    public String calculateHash() {
        return StringUtil.applySha256(
                previousHash +
                        Long.toString(timeStamp) +
                        Integer.toString(nonce) +
                        transactions.toString()
        );
    }

    public void mineBlock(int difficulty) {
        String target = new String(new char[difficulty]).replace('\0', '0');
        while (!hash.substring(0, difficulty).equals(target)) {
            nonce++;
            hash = calculateHash();
        }
        System.out.println("⛏️ Block Mined: " + hash);
    }
}
