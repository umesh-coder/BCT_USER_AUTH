// Define a user object for authentication
const user = {
    username: "umesh",
    password: "6969",
};

let isAuthenticated = false;

// Function to authenticate the user
function authenticateUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === user.username && password === user.password) {
        isAuthenticated = true;
        document.getElementById("auth").style.display = "none";
        document.getElementById("menu").style.display = "block";
        updateOutput("Authentication successful.");
    } else {
        updateOutput("Authentication failed. Check your username and password.");
    }
}

// Define the Block class
class Block {
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return `${this.index}-${this.previousHash}-${this.timestamp}-${JSON.stringify(this.data)}`.toString();
    }
}

// Create the Blockchain class
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "0", new Date().toISOString(), "Genesis Block");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.index = this.getLatestBlock().index + 1;
        newBlock.timestamp = new Date().toISOString();
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const blockchain = new Blockchain();

// Functions for interacting with the UI
function createBlock() {
    if (!isAuthenticated) {
        updateOutput("Authentication required to create a block.");
        return;
    }
    const data = prompt("Enter block data");
    if (data !== null) {
        blockchain.addBlock(new Block(0, "0", new Date().toISOString(), data));
        updateOutput("Block created and added to the chain.");
    }
}

function displayChain() {
    if (!isAuthenticated) {
        updateOutput("Authentication required to display the chain.");
        return;
    }
    updateOutput(JSON.stringify(blockchain.chain, null, 2));
}

function updateOutput(text) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<pre>${text}</pre>`;
}
