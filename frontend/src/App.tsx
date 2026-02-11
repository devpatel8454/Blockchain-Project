
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Player } from './logic/Player';
import { Blockchain } from './logic/Blockchain';
import { GameBlock } from './logic/GameBlock';
import type { GameTransaction } from './logic/GameTransaction';
import { PlayerCard } from './components/PlayerCard';
import { BlockView } from './components/BlockView';
import { Sword, Shield, Heart, RotateCcw } from 'lucide-react';

const ATTACK_ICON = <Sword size={18} />;
const DEFEND_ICON = <Shield size={18} />;
const HEAL_ICON = <Heart size={18} />;

// Game Constants (matching Java)
const DIFFICULTY = 3;

function App() {
  const [player1, setPlayer1] = useState(new Player('Player-A'));
  const [player2, setPlayer2] = useState(new Player('Player-B'));
  const [blockchain, setBlockchain] = useState(new Blockchain());
  const [logs, setLogs] = useState<string[]>(["⚔️ BLOCKBATTLE STARTED ⚔️"]);
  const [turn, setTurn] = useState<number>(0); // 0 = P1, 1 = P2 (Wait, P2 is AI, so simplified)
  const [gameOver, setGameOver] = useState<boolean>(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: 'info' | 'action' | 'mining' = 'info') => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const processRound = (p1Action: 'ATTACK' | 'DEFEND' | 'HEAL') => {
    if (gameOver) return;

    let p1 = Object.assign(new Player(player1.id), player1);
    let p2 = Object.assign(new Player(player2.id), player2);
    let txs: GameTransaction[] = [];

    // --- Player 1 Turn ---
    addLog(`${p1.id} chose ${p1Action}`, 'action');
    let p1Value = 0;

    switch (p1Action) {
      case 'ATTACK':
        const rawDmg = Math.floor(Math.random() * 15) + 10;
        const actualDmg = Math.max(0, rawDmg - p2.defense);
        p2.health -= actualDmg;
        p2.defense = 0; // Defense resets after being hit (simplified from Java logic? Java: defender.defense = 0 after hit)
        p1Value = actualDmg;
        txs.push({ playerId: p1.id, action: 'ATTACK', value: actualDmg });
        addLog(`${p1.id} attacks for ${actualDmg} dmg!`);
        break;
      case 'DEFEND':
        const def = Math.floor(Math.random() * 10) + 5;
        p1.defense = def;
        p1Value = def;
        txs.push({ playerId: p1.id, action: 'DEFEND', value: def });
        addLog(`${p1.id} defends (+${def} shield)`);
        break;
      case 'HEAL':
        const heal = Math.floor(Math.random() * 10) + 10;
        p1.health = Math.min(100, p1.health + heal);
        p1Value = heal;
        txs.push({ playerId: p1.id, action: 'HEAL', value: heal });
        addLog(`${p1.id} heals for ${heal} HP`);
        break;
    }

    // Check Win Condition
    if (p2.health <= 0) {
      p2.health = 0;
      setPlayer1(p1);
      setPlayer2(p2);
      finalizeRound(txs); // Mine block even if game ends mid-round? Java: "if (!p2.isAlive()) break;"
      endGame(p1);
      return;
    }

    // --- Player 2 (AI) Turn ---
    // Simple AI: Random 1-3
    const p2ActionIdx = Math.floor(Math.random() * 3) + 1;
    let p2Value = 0;

    switch (p2ActionIdx) {
      case 1: // ATTACK
        const rawDmg = Math.floor(Math.random() * 15) + 10;
        const actualDmg = Math.max(0, rawDmg - p1.defense);
        p1.health -= actualDmg;
        p1.defense = 0;
        p2Value = actualDmg;
        txs.push({ playerId: p2.id, action: 'ATTACK', value: actualDmg });
        addLog(`${p2.id} attacks for ${actualDmg} dmg!`);
        break;
      case 2: // DEFEND
        const def = Math.floor(Math.random() * 10) + 5;
        p2.defense = def;
        p2Value = def;
        txs.push({ playerId: p2.id, action: 'DEFEND', value: def });
        addLog(`${p2.id} defends (+${def} shield)`);
        break;
      case 3: // HEAL
        const heal = Math.floor(Math.random() * 10) + 10;
        p2.health = Math.min(100, p2.health + heal);
        p2Value = heal;
        txs.push({ playerId: p2.id, action: 'HEAL', value: heal });
        addLog(`${p2.id} heals for ${heal} HP`);
        break;
    }

    // Update State
    setPlayer1(p1);
    setPlayer2(p2);

    if (p1.health <= 0) {
      p1.health = 0;
      finalizeRound(txs);
      endGame(p2);
    } else {
      finalizeRound(txs);
    }
  };

  const finalizeRound = (txs: GameTransaction[]) => {
    // Mine Block
    const newBlock = new GameBlock(
      blockchain.getLatestBlock().hash,
      txs
    );
    
    // In a real app we'd use a worker, but for difficulty 3 it's instant
    newBlock.mineBlock(blockchain.difficulty);
    
    const newChain = new Blockchain();
    newChain.chain = [...blockchain.chain, newBlock];
    setBlockchain(newChain);
    
    addLog(`⛏️ Block #${newChain.chain.length - 1} Mined: ${newBlock.hash.substring(0, 10)}...`, 'mining');
  };

  const downloadGameData = (winner: Player) => {
    const gameData = {
      winner: winner.id,
      timestamp: new Date().toISOString(),
      blockchain: blockchain.chain.map((block, index) => ({
        blockIndex: index,
        hash: block.hash,
        previousHash: block.previousHash,
        merkleRoot: block.merkleRoot,
        timeStamp: block.timeStamp,
        nonce: block.nonce,
        transactions: block.transactions
      }))
    };

    const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `winner_data_${winner.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addLog(`✅ Game data exported to JSON`, 'info');
  };

  const endGame = (winner: Player) => {
    setGameOver(true);
    addLog(`🏆 WINNER: ${winner.id}`);
    downloadGameData(winner);
  };

  const resetGame = () => {
    setPlayer1(new Player('Player-A'));
    setPlayer2(new Player('Player-B'));
    setBlockchain(new Blockchain());
    setLogs(["⚔️ NEW GAME STARTED ⚔️"]);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">⚔️ BlockBattle</h1>
      <p className="subtitle">Blockchain-Powered Combat Simulator</p>
      
      <div className="arena">
        <PlayerCard player={player1} isActive={!gameOver} isWinner={gameOver && player1.health > 0} />
        <div className="vs-badge">VS</div>
        <PlayerCard player={player2} isActive={false} isWinner={gameOver && player2.health > 0} />
      </div>

      <div className="controls-container">
        <button 
          className="action-btn btn-attack" 
          onClick={() => processRound('ATTACK')}
          disabled={gameOver}
        >
          {ATTACK_ICON} Attack
        </button>
        <button 
          className="action-btn btn-defend" 
          onClick={() => processRound('DEFEND')}
          disabled={gameOver}
        >
          {DEFEND_ICON} Defend
        </button>
        <button 
          className="action-btn btn-heal" 
          onClick={() => processRound('HEAL')}
          disabled={gameOver}
        >
          {HEAL_ICON} Heal
        </button>
      </div>

      {gameOver && (
          <button className="action-btn reset-btn" onClick={resetGame}>
            <RotateCcw size={16} /> New Game
          </button>
      )}

      <div className="logs-container">
        {logs.map((log, i) => (
          <div key={i} className={`log-entry ${log.includes('Mined') ? 'log-block-mined' : ''}`}>
            {log}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>

      <h3 style={{marginTop: '2rem'}}>Blockchain Ledger</h3>
      <div className="blockchain-container">
        {blockchain.chain.map((block, i) => (
          <BlockView key={block.hash} block={block} index={i} isLatest={i === blockchain.chain.length - 1} />
        ))}
      </div>
    </div>
  );
}

export default App;
