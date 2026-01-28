public class Main {
    public static void main(String[] args) {

        Player player1 = new Player("Player-A");
        Player player2 = new Player("Player-B");

        BattleEngine.play(player1, player2);
        GameReplay.replay(player1, player2);

        System.out.println("Replay Result:");

        System.out.println(player1.id + " Health: " + player1.health);
        System.out.println(player2.id + " Health: " + player2.health);

    }
}
