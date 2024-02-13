import React, { useEffect, useState } from 'react';
import './profile.css';
import { AchievementCard } from './achievement-card';
import { ONE, TEN } from '../constants/AchievementMessage';
import Tab from './tab';
import TabPanel from './tab-panel';

function Profile() {
    const [playerWins, setPlayerWins] = useState(0);
    const [opponentWins, setOpponentWins] = useState(0);
    const [threeMove, setThreeMove] = useState(0);
    const [currentTies, setCurrentTies] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    const handleChangeTab = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        const storedPlayerWins = localStorage.getItem('playerWins');
        const storedOpponentWins = localStorage.getItem('opponentWins');
        const storedThreeMove = localStorage.getItem('threeMove');
        const storedCurrentMove = localStorage.getItem('currentTies');

        if (storedPlayerWins) setPlayerWins(parseInt(storedPlayerWins));
        if (storedOpponentWins) setOpponentWins(parseInt(storedOpponentWins));
        if (storedThreeMove) setThreeMove(parseInt(storedThreeMove));
        if (storedCurrentMove) setCurrentTies(parseInt(storedCurrentMove));
    }, []);

    const isAchievementActive = (current, total) => {
        return current >= total;
    };

    return (
        <div>
            <div className="tabs-container">
                <Tab label="Settings" setActiveTab={handleChangeTab} index={0}/>
                <Tab label="Achievements" setActiveTab={handleChangeTab} index={1} />
                <Tab label="Profile" setActiveTab={handleChangeTab} index={2} />
            </div>
            <TabPanel value={activeTab} index={0}>
                Contents of the "Settings" 
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <div className="image-container">
                    <AchievementCard
                        imagePath="images/achievement-processing/1-win.png"
                        altText="1 win"
                        achievementText="You have won 1 time"
                        current={playerWins - 1}
                        total={ONE}
                        isActive={isAchievementActive(playerWins, ONE)}
                    />
                    <AchievementCard
                        imagePath="images/achievement-processing/10-win.png"
                        altText="10 win"
                        achievementText="You have won 10 times"
                        current={playerWins - 1}
                        total={TEN}
                        isActive={isAchievementActive(playerWins, TEN)}
                    />
                    <AchievementCard
                        imagePath="images/achievement-processing/3-move.png"
                        altText="3 move"
                        achievementText="You defeated the super opponent in three moves 1 time"
                        current={threeMove}
                        total={ONE}
                        isActive={isAchievementActive(threeMove, ONE)}
                    />
                    <AchievementCard
                        imagePath="images/achievement-processing/lose.png"
                        altText="lose 1"
                        achievementText="You lost 1 time"
                        current={opponentWins - 1}
                        total={ONE}
                        isActive={isAchievementActive(opponentWins, ONE)}
                    />
                    <AchievementCard
                        imagePath="images/achievement-processing/lose.png"
                        altText="lose 10"
                        achievementText="You lost 10 times"
                        current={opponentWins - 1}
                        total={TEN}
                        isActive={isAchievementActive(opponentWins, TEN)}
                    />
                    <AchievementCard
                        imagePath="images/achievement-processing/draw.png"
                        altText="draw 1"
                        achievementText="You have a draw 1 time"
                        current={currentTies - 1}
                        total={ONE}
                        isActive={isAchievementActive(currentTies, ONE)}
                    />
                    <AchievementCard
                        imagePath="images/achievement-processing/draw.png"
                        altText="draw 10"
                        achievementText="You have a draw 10 times"
                        current={currentTies - 1}
                        total={TEN}
                        isActive={isAchievementActive(currentTies, TEN)}
                    />
                </div>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
               Contents of the "Profile" 
            </TabPanel>
        </div>
    );
}

export default Profile;