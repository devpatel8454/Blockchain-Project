
export class Player {
    public id: string;
    public health: number = 100;
    public defense: number = 0;

    constructor(id: string) {
        this.id = id;
    }

    public isAlive(): boolean {
        return this.health > 0;
    }
}
