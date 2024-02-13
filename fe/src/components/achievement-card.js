import React from 'react';
import './profile.css';
import ProgressBar from './progress-bar';

export function AchievementCard({ imagePath, altText, achievementText, current, total }) {
    const isProgressBarActive = current < total;

    return (
        <div className={`tab-container ${isProgressBarActive}`}>
            <div className={`achievements-image ${isProgressBarActive ? 'non-active' : ''}`}>
                <img src={imagePath} alt={altText} />
                <div className="achievements-text">{achievementText}</div>
            </div>
            <div className="progress-bar-container">
                <ProgressBar current={current} total={total} />
            </div>
        </div>
    );
}