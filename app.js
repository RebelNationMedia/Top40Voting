// Billboard Hot 100 Chart Application
class BillboardChart {
    constructor() {
        this.chartData = {
            "chart_date": "July 5, 2025",
            "next_update": "July 13, 2025 12:01 AM",
            "songs": [
                {
                    "position": 1,
                    "title": "Ordinary",
                    "artist": "Alex Warren",
                    "movement": "steady",
                    "weeks_at_1": 4,
                    "weeks_on_chart": 20,
                    "last_week": 1
                },
                {
                    "position": 2,
                    "title": "What I Want",
                    "artist": "Morgan Wallen ft. Tate McRae",
                    "movement": "up",
                    "weeks_on_chart": 6,
                    "last_week": 3
                },
                {
                    "position": 3,
                    "title": "Manchild",
                    "artist": "Sabrina Carpenter",
                    "movement": "down",
                    "weeks_on_chart": 3,
                    "last_week": 2
                },
                {
                    "position": 4,
                    "title": "Just In Case",
                    "artist": "Morgan Wallen",
                    "movement": "steady",
                    "weeks_on_chart": 14,
                    "last_week": 4
                },
                {
                    "position": 5,
                    "title": "I'm The Problem",
                    "artist": "Morgan Wallen",
                    "movement": "up",
                    "weeks_on_chart": 21,
                    "last_week": 6
                },
                {
                    "position": 6,
                    "title": "Luther",
                    "artist": "Kendrick Lamar & SZA",
                    "movement": "down",
                    "weeks_on_chart": 31,
                    "last_week": 5
                },
                {
                    "position": 7,
                    "title": "A Bar Song (Tipsy)",
                    "artist": "Shaboozey",
                    "movement": "steady",
                    "weeks_on_chart": 52,
                    "last_week": 7
                },
                {
                    "position": 8,
                    "title": "Die With A Smile",
                    "artist": "Lady Gaga & Bruno Mars",
                    "movement": "steady",
                    "weeks_on_chart": 47,
                    "last_week": 8
                },
                {
                    "position": 9,
                    "title": "Lose Control",
                    "artist": "Teddy Swims",
                    "movement": "steady",
                    "weeks_on_chart": 67,
                    "last_week": 9
                },
                {
                    "position": 10,
                    "title": "Outside",
                    "artist": "Cardi B",
                    "movement": "new",
                    "weeks_on_chart": 1,
                    "last_week": null
                },
                {
                    "position": 11,
                    "title": "Beautiful Things",
                    "artist": "Benson Boone",
                    "movement": "steady",
                    "weeks_on_chart": 39,
                    "last_week": 11
                },
                {
                    "position": 12,
                    "title": "Pink Pony Club",
                    "artist": "Chappell Roan",
                    "movement": "steady",
                    "weeks_on_chart": 16,
                    "last_week": 12
                },
                {
                    "position": 13,
                    "title": "I Had Some Help",
                    "artist": "Post Malone ft. Morgan Wallen",
                    "movement": "steady",
                    "weeks_on_chart": 12,
                    "last_week": 13
                },
                {
                    "position": 14,
                    "title": "Love Me Not",
                    "artist": "Raven Len",
                    "movement": "up",
                    "weeks_on_chart": 8,
                    "last_week": 17
                },
                {
                    "position": 15,
                    "title": "Moth",
                    "artist": "Leon Thomas",
                    "movement": "steady",
                    "weeks_on_chart": 11,
                    "last_week": 15
                },
                {
                    "position": 16,
                    "title": "Birds of a Feather",
                    "artist": "Billie Eilish",
                    "movement": "steady",
                    "weeks_on_chart": 23,
                    "last_week": 16
                },
                {
                    "position": 17,
                    "title": "Nokia",
                    "artist": "Drake",
                    "movement": "steady",
                    "weeks_on_chart": 7,
                    "last_week": 17
                },
                {
                    "position": 18,
                    "title": "Espresso",
                    "artist": "Sabrina Carpenter",
                    "movement": "down",
                    "weeks_on_chart": 15,
                    "last_week": 16
                },
                {
                    "position": 19,
                    "title": "Sorry I'm Here For Someone Else",
                    "artist": "Benson Boone",
                    "movement": "up",
                    "weeks_on_chart": 4,
                    "last_week": 22
                },
                {
                    "position": 20,
                    "title": "I Got Better",
                    "artist": "Morgan Wallen",
                    "movement": "steady",
                    "weeks_on_chart": 9,
                    "last_week": 20
                }
            ]
        };
        
        this.votes = this.loadVotes();
        this.init();
    }

    init() {
        this.updateHeader();
        this.renderChart();
        this.startCountdown();
        this.setupAutoRefresh();
    }

    updateHeader() {
        document.getElementById('chart-date').textContent = this.chartData.chart_date;
        document.getElementById('next-update').textContent = this.chartData.next_update;
    }

    renderChart() {
        const chartGrid = document.getElementById('chart-grid');
        chartGrid.innerHTML = '';

        this.chartData.songs.forEach((song, index) => {
            const songCard = this.createSongCard(song);
            chartGrid.appendChild(songCard);
            
            // Add staggered animation delay
            setTimeout(() => {
                songCard.style.opacity = '1';
                songCard.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    createSongCard(song) {
        const card = document.createElement('div');
        card.className = `song-card ${song.position === 1 ? 'position-1' : ''}`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';

        const movementSymbol = this.getMovementSymbol(song.movement);
        const movementText = this.getMovementText(song);
        const voteData = this.votes[song.position] || { likes: 0, dislikes: 0 };

        card.innerHTML = `
            <div class="song-header">
                <div class="position">#${song.position}</div>
                <div class="movement ${song.movement}">${movementSymbol}</div>
            </div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
                <div class="song-stats">
                    <span>Weeks on Chart: ${song.weeks_on_chart}</span>
                    ${song.weeks_at_1 ? `<span>Weeks at #1: ${song.weeks_at_1}</span>` : ''}
                    <span>${movementText}</span>
                </div>
            </div>
            <div class="voting-section">
                <div class="vote-buttons">
                    <button class="vote-btn like" data-position="${song.position}" data-type="like">
                        👍 Like
                    </button>
                    <button class="vote-btn dislike" data-position="${song.position}" data-type="dislike">
                        👎 Dislike
                    </button>
                </div>
                <div class="vote-counts">
                    <div class="vote-count likes">
                        👍 <span id="likes-${song.position}">${voteData.likes}</span>
                    </div>
                    <div class="vote-count dislikes">
                        👎 <span id="dislikes-${song.position}">${voteData.dislikes}</span>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for voting
        const likeBtn = card.querySelector('.vote-btn.like');
        const dislikeBtn = card.querySelector('.vote-btn.dislike');

        likeBtn.addEventListener('click', () => this.vote(song.position, 'like'));
        dislikeBtn.addEventListener('click', () => this.vote(song.position, 'dislike'));

        return card;
    }

    getMovementSymbol(movement) {
        switch (movement) {
            case 'up':
                return '↑';
            case 'down':
                return '↓';
            case 'steady':
                return '→';
            case 'new':
                return 'NEW';
            default:
                return '→';
        }
    }

    getMovementText(song) {
        switch (song.movement) {
            case 'up':
                return `Up from #${song.last_week}`;
            case 'down':
                return `Down from #${song.last_week}`;
            case 'steady':
                return `Steady at #${song.position}`;
            case 'new':
                return 'New Entry';
            default:
                return '';
        }
    }

    vote(position, type) {
        if (!this.votes[position]) {
            this.votes[position] = { likes: 0, dislikes: 0 };
        }

        this.votes[position][type === 'like' ? 'likes' : 'dislikes']++;
        this.updateVoteDisplay(position);
        this.saveVotes();
        this.animateVoteButton(position, type);
    }

    updateVoteDisplay(position) {
        const voteData = this.votes[position];
        document.getElementById(`likes-${position}`).textContent = voteData.likes;
        document.getElementById(`dislikes-${position}`).textContent = voteData.dislikes;
    }

    animateVoteButton(position, type) {
        const button = document.querySelector(`[data-position="${position}"][data-type="${type}"]`);
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    loadVotes() {
        try {
            const saved = sessionStorage.getItem('billboardVotes');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }

    saveVotes() {
        try {
            sessionStorage.setItem('billboardVotes', JSON.stringify(this.votes));
        } catch (e) {
            console.warn('Unable to save votes');
        }
    }

    startCountdown() {
        // Set target date to next Sunday at 12:01 AM
        const now = new Date();
        const targetDate = new Date(now);
        
        // Calculate days until next Sunday
        const daysUntilSunday = (7 - now.getDay()) % 7;
        if (daysUntilSunday === 0 && now.getHours() >= 0 && now.getMinutes() >= 1) {
            // If it's already past 12:01 AM on Sunday, set for next Sunday
            targetDate.setDate(now.getDate() + 7);
        } else {
            targetDate.setDate(now.getDate() + daysUntilSunday);
        }
        
        targetDate.setHours(0, 1, 0, 0); // 12:01 AM
        
        const updateCountdown = () => {
            const now = new Date();
            const distance = targetDate.getTime() - now.getTime();

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('countdown-time').textContent = 
                    `${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                document.getElementById('countdown-time').textContent = 'Updating...';
                this.simulateChartUpdate();
                // Reset for next week
                this.startCountdown();
            }
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    simulateChartUpdate() {
        // Simulate chart update by showing notification
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #00ff00;
                color: #000;
                padding: 15px 20px;
                border-radius: 5px;
                font-weight: bold;
                z-index: 1000;
                animation: slideIn 0.5s ease;
            `;
            notification.textContent = 'Chart Updated! New rankings available.';
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 5000);
        }, 2000);
    }

    setupAutoRefresh() {
        // Auto-refresh simulation is handled by the countdown timer
        console.log('Auto-refresh setup complete');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BillboardChart();
});

// Add CSS for slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Handle responsive behavior
window.addEventListener('resize', () => {
    // Adjust layout on resize if needed
    const cards = document.querySelectorAll('.song-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
});

// Add touch support for mobile devices
document.addEventListener('touchstart', () => {
    // Enable touch interactions
}, { passive: true });

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('vote-btn')) {
            focused.click();
        }
    }
});

// Add accessibility features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            const songCard = btn.closest('.song-card');
            const songTitle = songCard.querySelector('.song-title').textContent;
            btn.setAttribute('aria-label', 
                `${btn.textContent} for ${songTitle}`
            );
        });
    }, 100);
});