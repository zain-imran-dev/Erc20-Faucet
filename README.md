# ERC20 Faucet Project

A decentralized ERC20 token faucet built with Hardhat, Solidity, and Next.js. This project allows users to claim test tokens from a faucet contract and includes a modern web interface for interaction.
<img width="983" height="1062" alt="image" src="https://github.com/user-attachments/assets/13bfee9c-59d4-48bf-8a98-a8329aa48236" />

## 🚀 Features

- **ERC20 Token Faucet**: Smart contract that distributes test tokens to users
- **Web Interface**: Modern React/Next.js frontend for easy interaction
- **Wallet Integration**: MetaMask wallet connection
- **Real-time Balance Updates**: Live token balance tracking
- **Rate Limiting**: One claim per block to prevent spam
- **Funding Mechanism**: Ability to fund the faucet with tokens

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd erc20-faucet
   ```

2. **Install dependencies**
   ```bash
   # Install Hardhat and contract dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Compile contracts**
   ```bash
   npx hardhat compile
   ```

## 🚀 Usage

### Starting the Development Environment

1. **Start Hardhat local network**
   ```bash
   npx hardhat node
   ```

2. **Deploy contracts** (in a new terminal)
   ```bash
   npx hardhat ignition deploy ./ignition/modules/FaucetModule.js
   ```

3. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Using the Faucet

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask
2. **Fund the Faucet**: Transfer tokens to the faucet contract (optional)
3. **Claim Tokens**: Click "Claim Tokens" to receive 100 test tokens
4. **View Balances**: See your token balance and faucet balance in real-time

## 📁 Project Structure

```
erc20-faucet/
├── contracts/                 # Smart contracts
│   ├── Faucet.sol           # Main faucet contract
│   └── MyToken.sol          # ERC20 token contract
├── frontend/                 # React/Next.js frontend
│   ├── abi/                 # Contract ABIs
│   ├── pages/               # Next.js pages
│   └── styles/              # CSS styles
├── ignition/                 # Hardhat Ignition deployment
│   └── modules/             # Deployment modules
├── test/                     # Contract tests
└── hardhat.config.js        # Hardhat configuration
```

## 🔧 Smart Contracts

### Faucet Contract (`contracts/Faucet.sol`)
- Distributes 100 tokens per claim
- Rate limiting: one claim per block
- Tracks user claim history
- Emits events for successful claims

### MyToken Contract (`contracts/MyToken.sol`)
- Standard ERC20 token implementation
- Uses OpenZeppelin contracts
- Configurable initial supply

## 🧪 Testing

Run the test suite:
```bash
npx hardhat test
```

Run tests with gas reporting:
```bash
REPORT_GAS=true npx hardhat test
```

## 🛠️ Development

### Available Scripts

- `npx hardhat compile` - Compile contracts
- `npx hardhat test` - Run tests
- `npx hardhat node` - Start local network
- `npx hardhat ignition deploy` - Deploy contracts
- `npm run dev` - Start frontend development server

### Configuration

The project uses Hardhat for development and testing. The configuration can be found in `hardhat.config.js`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract libraries
- [Hardhat](https://hardhat.org/) for Ethereum development environment
- [Next.js](https://nextjs.org/) for the React framework
- [Ethers.js](https://ethers.org/) for Ethereum interactions

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
