import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenAbi from '../abi/MyToken.json';
import faucetAbi from '../abi/Faucet.json';

const tokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const faucetAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export default function Home() {
  const [account, setAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("0");
  const [faucetBalance, setFaucetBalance] = useState("0");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    const signer = await provider.getSigner();
    updateBalances(signer);
  };

  const updateBalances = async (signer) => {
    try {
      const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
      
      // Get user balance
      const userBalance = await token.balanceOf(await signer.getAddress());
      setTokenBalance(ethers.formatUnits(userBalance, 18));
      
      // Get faucet balance
      const faucetBal = await token.balanceOf(faucetAddress);
      setFaucetBalance(ethers.formatUnits(faucetBal, 18));
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const fundFaucet = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
      const amount = ethers.parseUnits("1000", 18);
      
      const tx = await token.transfer(faucetAddress, amount);
      await tx.wait();
      
      alert("✅ Faucet funded with 1000 tokens!");
      updateBalances(signer);
    } catch (error) {
      console.error("Funding failed:", error);
      alert("❌ Funding failed: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  const claimTokens = async () => {
    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const iface = new ethers.Interface(faucetAbi.abi);
      const data = iface.encodeFunctionData("claim");

      const tx = await signer.sendTransaction({
        to: faucetAddress,
        data,
      });

      await tx.wait();
      alert("🎉 Tokens claimed successfully!");
      updateBalances(signer);
    } catch (error) {
      console.error("Claim failed:", error);
      alert("❌ Claim failed: " + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  const formatAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '300',
            color: '#2d3748',
            margin: '0 0 10px 0'
          }}>
            🪙 Token Faucet
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.1rem',
            margin: '0'
          }}>
            Claim free tokens for testing
          </p>
        </div>

        {/* Wallet Info Card */}
        <div style={{
          backgroundColor: '#f7fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            color: '#2d3748',
            fontSize: '1.2rem',
            fontWeight: '500'
          }}>
            Wallet Info
          </h3>
          
          <div style={{ marginBottom: '12px' }}>
            <span style={{ color: '#4a5568', fontWeight: '500' }}>Connected: </span>
            <span style={{ 
              color: '#2d3748',
              fontFamily: 'monospace',
              backgroundColor: '#edf2f7',
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              {formatAddress(account)}
            </span>
          </div>
          
          <div>
            <span style={{ color: '#4a5568', fontWeight: '500' }}>Your Balance: </span>
            <span style={{
              color: '#38a169',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              {parseFloat(tokenBalance).toFixed(2)} TKN
            </span>
          </div>
        </div>

        {/* Faucet Info Card */}
        <div style={{
          backgroundColor: '#f0fff4',
          border: '1px solid #c6f6d5',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            margin: '0 0 12px 0',
            color: '#2d3748',
            fontSize: '1.2rem',
            fontWeight: '500'
          }}>
            Faucet Status
          </h3>
          <div>
            <span style={{ color: '#4a5568', fontWeight: '500' }}>Available Tokens: </span>
            <span style={{
              color: '#38a169',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              {parseFloat(faucetBalance).toFixed(2)} TKN
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={claimTokens} 
            disabled={loading}
            style={{
              flex: '1',
              minWidth: '200px',
              backgroundColor: loading ? '#a0aec0' : '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 24px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#3182ce';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#4299e1';
            }}
          >
            {loading ? "⏳ Processing..." : "🎁 Claim Tokens"}
          </button>
          
          <button 
            onClick={fundFaucet} 
            disabled={loading}
            style={{
              flex: '1',
              minWidth: '200px',
              backgroundColor: loading ? '#a0aec0' : '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 24px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#38a169';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#48bb78';
            }}
          >
            {loading ? "⏳ Processing..." : "💰 Fund Faucet"}
          </button>
        </div>

        {/* Info Section */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#edf2f7',
          borderRadius: '8px',
          color: '#4a5568',
          fontSize: '0.9rem',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>How it works:</strong>
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            • <strong>Claim Tokens:</strong> Get free tokens from the faucet to your wallet
          </p>
          <p style={{ margin: '0' }}>
            • <strong>Fund Faucet:</strong> Transfer tokens from your wallet to the faucet (for testing)
          </p>
        </div>
      </div>
    </div>
  );
}