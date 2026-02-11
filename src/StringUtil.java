import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;

public class StringUtil {

    public static String applySha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes("UTF-8"));

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getMerkleRoot(ArrayList<GameTransaction> transactions) {
        int count = transactions.size();
        if (count == 0)
            return "";

        List<String> previousTreeLayer = new ArrayList<>();
        for (GameTransaction transaction : transactions) {
            previousTreeLayer.add(applySha256(transaction.toString()));
        }

        List<String> treeLayer = previousTreeLayer;
        while (count > 1) {
            treeLayer = new ArrayList<>();
            for (int i = 1; i < previousTreeLayer.size(); i += 2) {
                treeLayer.add(applySha256(previousTreeLayer.get(i - 1) + previousTreeLayer.get(i)));
            }

            // If odd number of hashes, hash the last one with itself
            if (previousTreeLayer.size() % 2 == 1) {
                String last = previousTreeLayer.get(previousTreeLayer.size() - 1);
                treeLayer.add(applySha256(last + last));
            }

            previousTreeLayer = treeLayer;
            count = treeLayer.size();
        }

        return (treeLayer.size() == 1) ? treeLayer.get(0) : "";
    }
}
