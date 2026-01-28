public class Player {
    public String id;
    public int health = 100;
    public int defense = 0;

    public Player(String id) {
        this.id = id;
    }

    public boolean isAlive() {
        return health > 0;
    }
}
