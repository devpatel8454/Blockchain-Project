public class GameTransaction {
    public String playerId;
    public String action;
    public int value;

    public GameTransaction(String playerId, String action, int value) {
        this.playerId = playerId;
        this.action = action;
        this.value = value;
    }

    @Override
    public String toString() {
        return playerId + ":" + action + ":" + value;
    }
}
