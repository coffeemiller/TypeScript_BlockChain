import crypto from "crypto";

interface BlockShape {
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public readonly hash: string;
    constructor(
        public readonly prevHash: string,
        public readonly height: number,
        public readonly data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}
 
class Blockchain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if (this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
        const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(block);
    }
    public getBlocks() {
        return [...this.blocks];
    }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

blockchain.getBlocks().push(new Block("xxxxxx", 111111, "HACKEDDDD"));
// blockchain.getBlocks()[blockchain.getBlocks().length - 1].data = "hell 12312312312";

console.log(blockchain.getBlocks());