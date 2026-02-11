
export interface GameTransaction {
    playerId: string;
    action: "ATTACK" | "DEFEND" | "HEAL";
    value: number;
}
