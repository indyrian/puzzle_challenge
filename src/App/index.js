import {useState} from "react";
import {RenderGrid} from "../components/Grid";

import './style.css';
import {CountStep} from "../components/CountStep";

function Index() {
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    const [countStep, setCountStep] = useState(0);

    const changeCount = (e) => {
        const value = e.target.value;

        setCount(() => {
            if (value < 3 || value > 16) {
                setError(true);

                return count
            } else {
                setError(false);

                return value
            }
        });
    }



    return (
        <div className="App">

            <div className={"welcome-text"}>
                <div>
                    Введите количество ячеек <input onChange={changeCount} type={"number"} min="3" max="16" />
                </div>

                <CountStep count={countStep} />
            </div>

            {error ? (
                <div className={"error"}>
                    <span>Укажите значение в диапазоне от 3 до 16 включительно</span>
                </div>
            ) : (
                <RenderGrid changeCountStep={setCountStep} count={count} />
            )}
        </div>
    );
}

export default Index;
