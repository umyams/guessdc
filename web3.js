// Import Web3 library
const Web3 = require('web3');

// Initialize Web3 instance with an Ethereum node URL
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Example contract ABI (Application Binary Interface)
const contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getValue",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{"name": "_value", "type": "uint256"}],
    "name": "setValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Example contract address
const contractAddress = '0x1234567890123456789012345678901234567890';

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Example account address with private key
const accountAddress = '0x1234567890123456789012345678901234567890';
const privateKey = 'YOUR_PRIVATE_KEY';

// Sign transaction with private key
const signTransaction = async (txObject) => {
  const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
  return signedTx.rawTransaction;
}

// Example function to get contract value
const getValue = async () => {
  const value = await contract.methods.getValue().call();
  console.log('Contract value:', value);
}

// Example function to set contract value
const setValue = async (newValue) => {
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 300000;
  
  const txObject = {
    from: accountAddress,
    to: contractAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gas: gasLimit,
    data: contract.methods.setValue(newValue).encodeABI()
  };

  const signedTx = await signTransaction(txObject);
  const receipt = await web3.eth.sendSignedTransaction(signedTx);
  console.log('Transaction receipt:', receipt);
}

// Example usage
getValue();
setValue(123);
