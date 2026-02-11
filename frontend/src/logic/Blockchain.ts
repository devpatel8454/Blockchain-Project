
import { GameBlock } from './GameBlock';

export class Blockchain {
    public chain: GameBlock[];
    public difficulty: number = 3;

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    private createGenesisBlock(): GameBlock {
        return new GameBlock("0", []);
    }

    public getLatestBlock(): GameBlock {
        return this.chain[this.chain.length - 1];
    }

    public addBlock(newBlock: GameBlock): void {
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    public isChainValid(): boolean {
        const target = Array(this.difficulty + 1).join("0");

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Re-calculate hash to verify content hasn't changed
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.error("Invalid Hash for block " + i);
                return false;
            }

            // Verify linkage
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.error("Invalid Previous Hash for block " + i);
                return false;
            }

            // Verify Proof of Work
            if (currentBlock.hash.substring(0, this.difficulty) !== target) {
                console.error("Invalid Proof of Work for block " + i);
                return false;
            }
        }
        return true;
    }
}
