
import sha256 from 'crypto-js/sha256';
import type { GameTransaction } from './GameTransaction';

export class GameBlock {
    public hash: string;
    public previousHash: string;
    public merkleRoot: string;
    public transactions: GameTransaction[];
    public timeStamp: number;
    public nonce: number; // Public for validation

    constructor(previousHash: string, transactions: GameTransaction[]) {
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.timeStamp = Date.now();
        this.nonce = 0;
        this.merkleRoot = GameBlock.calculateMerkleRoot(this.transactions);
        this.hash = this.calculateHash();
    }

    private static calculateMerkleRoot(transactions: GameTransaction[]): string {
        let count = transactions.length;
        if (count === 0) return "";

        let previousTreeLayer: string[] = [];
        for (const transaction of transactions) {
            // Stringify the transaction to hash it
            const txStr = `${transaction.playerId}:${transaction.action}:${transaction.value}`;
            previousTreeLayer.push(sha256(txStr).toString());
        }

        let treeLayer = previousTreeLayer;
        while (count > 1) {
            treeLayer = [];
            for (let i = 1; i < previousTreeLayer.length; i += 2) {
                treeLayer.push(sha256(previousTreeLayer[i - 1] + previousTreeLayer[i]).toString());
            }

            // If odd number of hashes, hash the last one with itself
            if (previousTreeLayer.length % 2 === 1) {
                const last = previousTreeLayer[previousTreeLayer.length - 1];
                treeLayer.push(sha256(last + last).toString());
            }

            previousTreeLayer = treeLayer;
            count = treeLayer.length;
        }

        return treeLayer.length === 1 ? treeLayer[0] : "";
    }

    public calculateHash(): string {
        return sha256(
            this.previousHash +
            this.timeStamp.toString() +
            this.nonce.toString() +
            this.merkleRoot
        ).toString();
    }

    public mineBlock(difficulty: number): void {
        const target = Array(difficulty + 1).join("0");
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("⛏️ Block Mined: " + this.hash);
    }
}
