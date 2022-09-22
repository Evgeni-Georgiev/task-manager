export function Main({ message, counter, stopInterval }) {

    const onClickInterval = () => {
        stopInterval();
    }

    return (
        <div className="main-content">
            <div>
                Counter: {counter}
                <br />
                Main -- {message}
            </div>
            <button onClick={onClickInterval}>Stop INterval</button>

        </div>
    );
}