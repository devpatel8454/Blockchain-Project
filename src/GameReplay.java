public class GameReplay {

    public static void replay(Player p1, Player p2) {

        p1.health = 100;
        p2.health = 100;

        for (GameBlock block : Blockchain.chain) {
            for (GameTransaction tx : block.transactions) {

                Player attacker = tx.playerId.equals(p1.id) ? p1 : p2;
                Player defender = attacker == p1 ? p2 : p1;

                switch (tx.action) {
                    case "ATTACK":
                        defender.health -= tx.value;
                        defender.defense = 0;
                        break;
                    case "DEFEND":
                        attacker.defense = tx.value;
                        break;
                    case "HEAL":
                        attacker.health += tx.value;
                        break;
                }
            }
        }
    }
}
