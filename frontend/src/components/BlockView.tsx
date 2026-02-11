
import React from 'react';
import { GameBlock } from '../logic/GameBlock';
import { Hash, Link as LinkIcon, Layers } from 'lucide-react';
import './BlockView.css';

interface Props {
    block: GameBlock;
    index: number;
    isLatest: boolean;
}

export const BlockView: React.FC<Props> = ({ block, index, isLatest }) => {
    return (
        <div className={`block-view ${isLatest ? 'latest' : ''}`}>
            <div className="block-header">
                <span className="block-label">Block #{index}</span>
                <span className="block-time">
                    {new Date(block.timeStamp).toLocaleTimeString()}
                </span>
            </div>

            <div className="block-content">
                <div className="block-field">
                    <Hash size={14} className="field-icon" />
                    <span className="hash-text" title={block.hash}>
                        {block.hash.substring(0, 10)}...{block.hash.substring(block.hash.length - 4)}
                    </span>
                </div>

                <div className="block-field">
                    <LinkIcon size={14} className="field-icon" />
                    <span className="hash-text dim" title={block.previousHash}>
                        {block.previousHash === "0" 
                            ? "Genesis" 
                            : `${block.previousHash.substring(0, 8)}...`}
                    </span>
                </div>

                <div className="block-field">
                    <Layers size={14} className="field-icon" />
                    <span className="hash-text dim" title={block.merkleRoot}>
                        MR: {block.merkleRoot ? `${block.merkleRoot.substring(0, 10)}...` : "Empty"}
                    </span>
                </div>

                <div className="block-field">
                    <Layers size={14} className="field-icon" />
                    <span>{block.transactions.length} Txns</span>
                </div>

                <div className="block-field">
                   <span className="nonce">Nonce: {block.nonce}</span>
                </div>
            </div>
        </div>
    );
};
