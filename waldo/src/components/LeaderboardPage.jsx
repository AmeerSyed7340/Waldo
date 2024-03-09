import { useState, useEffect } from 'react';

function LeaderboardPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/leaderboard')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            }).catch(error => {
                console.error('Error fetching leaderboard', error);
            })
    }, []);


    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {users.map(user=>(
                    <li key={user._id}>
                        {user.username}: {user.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeaderboardPage;