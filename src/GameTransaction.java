public class GameTransaction {
    public String playerId;
    public String action;
    public int value;

    public GameTransaction(String playerId, String action, int value) {
        this.playerId = playerId;
        this.action = action;
        this.value = value;
    }
}
