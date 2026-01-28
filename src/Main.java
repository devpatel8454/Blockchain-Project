public class Main {
    public static void main(String[] args) {

        Player player1 = new Player("Player-A");
        Player player2 = new Player("Player-B");

        BattleEngine.play(player1, player2);
    }
}
