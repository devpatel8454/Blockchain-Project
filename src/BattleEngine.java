import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class BattleEngine {

    static Random random = new Random();
    static Scanner sc = new Scanner(System.in);

    public static void play(Player p1, Player p2) {

        System.out.println("⚔️ BLOCKBATTLE STARTED ⚔️");

        Blockchain.chain.add(new GameBlock("0", new ArrayList<>()));

        while (p1.isAlive() && p2.isAlive()) {

            ArrayList<GameTransaction> transactions = new ArrayList<>();

            processTurn(p1, p2, transactions);
            if (!p2.isAlive())
                break; // Stop if p2 died during p1's turn
            processTurn(p2, p1, transactions);

            GameBlock block = new GameBlock(
                    Blockchain.chain.get(Blockchain.chain.size() - 1).hash,
                    transactions);

            Blockchain.addBlock(block);

            System.out.println(p1.id + " Health: " + p1.health);
            System.out.println(p2.id + " Health: " + p2.health);
            System.out.println("----------------------------------");
        }

        String winnerId = (p1.isAlive() ? p1.id : p2.id);
        System.out.println("🏆 WINNER: " + winnerId);
        System.out.println("Blockchain valid: " + Blockchain.isChainValid());

        // Print and Save the chain
        Blockchain.printChain();
        Blockchain.saveChainToFile("blockchain_data.txt");
        Blockchain.saveWinnerBlocksToJson(winnerId, "winner_data.json");
    }

    private static void processTurn(Player attacker, Player defender, ArrayList<GameTransaction> txs) {

        System.out.println(attacker.id + " choose action: 1.Attack  2.Defend  3.Heal");
        int choice = sc.nextInt();

        switch (choice) {
            case 1:
                int damage = random.nextInt(15) + 10;
                int actualDamage = Math.max(0, damage - defender.defense);
                defender.health -= actualDamage;
                defender.defense = 0;
                txs.add(new GameTransaction(attacker.id, "ATTACK", actualDamage));
                break;

            case 2:
                attacker.defense = random.nextInt(10) + 5;
                txs.add(new GameTransaction(attacker.id, "DEFEND", attacker.defense));
                break;

            case 3:
                int heal = random.nextInt(10) + 10;
                attacker.health += heal;
                txs.add(new GameTransaction(attacker.id, "HEAL", heal));
                break;
        }
    }
}
