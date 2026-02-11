
import React from 'react';
import { Player } from '../logic/Player';
import { Heart, Shield } from 'lucide-react';
import './PlayerCard.css';

interface Props {
    player: Player;
    isActive: boolean;
    isWinner?: boolean;
}

export const PlayerCard: React.FC<Props> = ({ player, isActive, isWinner }) => {
    return (
        <div className={`player-card ${isActive ? 'active' : ''} ${isWinner ? 'winner' : ''}`}>
            <div className="player-header">
                <h2>{player.id}</h2>
                {isWinner && <span className="winner-badge">🏆 WINNER</span>}
                {!player.isAlive() && <span className="dead-badge">💀 ELIMINATED</span>}
            </div>

            <div className="stat-row">
                <Heart className="icon heart" size={20} />
                <div className="bar-container">
                    <div
                        className="bar health-bar"
                        style={{ width: `${Math.max(0, player.health)}%` }}
                    />
                    <span className="stat-value">{player.health}/100</span>
                </div>
            </div>

            <div className="stat-row defense-row">
                <Shield className="icon shield" size={20} />
                <span className="stat-text">Defense: {player.defense}</span>
            </div>
        </div>
    );
};
