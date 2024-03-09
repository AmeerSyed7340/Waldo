import { useState, useEffect } from 'react';

function LeaderboardPage() {

    useEffect(() => {
        fetch('http://localhost:3000/leaderboard')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    }, []);
    const [users, setUsers] = useState([]);
    return (<p>Leaderboard</p>);
}

export default LeaderboardPage;