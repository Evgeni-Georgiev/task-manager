// Components:
// - Small and reusable
// - Strongly specialized in for one purpose
import { useState } from "react";
import { Header } from "../header/Header"
import { Footer } from "../footer/Footer"
import { Main } from "../main/Main"
import { useRef } from 'react';
export function Layout() {

    let btnRef = useRef();
    const [message, setMessage] = useState("Layout state");
    const [count, setCount] = useState(0);
    const [intervalID, setIntervalID] = useState();

    const counterEve = (e) => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        const int = setInterval(() => { setCount((oldCount) => oldCount + 1) }, 500)
        // setCount(count + 1)
        setIntervalID(int);
    }

    const stopInterval = () => {
        clearInterval(intervalID)
        setIntervalID(null)
    }

    return (
        <div>
            <Header />
            Layout
            <Main message={message} counter={count} stopInterval={stopInterval} />
            <button ref={btnRef} onClick={counterEve}>Click</button>
            <Footer />
        </div>
    );
}