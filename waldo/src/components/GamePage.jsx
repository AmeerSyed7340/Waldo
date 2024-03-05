import '../styles/GamePage.css'

function GamePage(){
    function handleClick(event){
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;

        console.log(`x: ${x} and y: ${y}`);
    }

    return (
        <>
            <h1 className='title' style={{width: '200px'}}>Find Waldo</h1>
            <div className='main-content' onClick={handleClick}>

            </div>
        </>
    )
}

export default GamePage;