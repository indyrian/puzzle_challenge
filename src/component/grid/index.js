import './style.css';
import {useEffect, useState} from "react";

export const RenderGrid = ({ count }) => {
    const EMPTY = {
        countLine: null,
        title: "",
        key: "empty",
    }

    const [fivers, setFivers] = useState({});
    const [correctFivers, setCorrectFivers] = useState([]);
    const [complited, setComplited] = useState(false);

    useEffect(() => {
        let fivers = {},
            correctFivers = [],
            countLine = 0;

        for (let i = 1; i < (count * count); i++) {
            if ((i - 1) % count === 0) {
                countLine++;
                fivers[countLine] = [];
            }


            fivers[countLine].push({
                countLine,
                title: i,
                key: i
            });

            correctFivers.push(i);
        }

        if (Array.isArray(fivers[countLine])) {
            addEmpty(countLine, fivers[countLine])
        }

        setFivers(fivers);
        setCorrectFivers(correctFivers)
    }, [count]);


    const onClickFiver = (e) => {
        let line = Number(e.target.id.split("_")[0]),
            index = Number(e.target.id.split("_")[1]);

        let indexElem = fivers[line].findIndex(elem => elem.key === index)

        let locationEmpty = {
            line: null,
            index: indexElem
        };
        let locationFiver = {
            line,
            index: indexElem
        };

        //TODO Запилить бабель на ? (null | undefined)

        if (fivers[line - 1] && fivers[line - 1][indexElem].key === EMPTY.key) {
            locationEmpty.line = line - 1;

            replaceFiver(locationEmpty, locationFiver);
            console.log("space top")
        } else if (fivers[line + 1] && fivers[line + 1][indexElem].key === EMPTY.key) {
            locationEmpty.line = line + 1;

            replaceFiver(locationEmpty, locationFiver);
            console.log("space down")
        } else if (fivers[line][indexElem + 1] && fivers[line][indexElem + 1].key === EMPTY.key) {
            locationEmpty.line = line;
            locationEmpty.index = indexElem + 1;

            replaceFiver(locationEmpty, locationFiver);
            console.log("space right")
        } else if (fivers[line][indexElem - 1] && fivers[line][indexElem - 1].key === EMPTY.key) {
            locationEmpty.line = line;
            locationEmpty.index = indexElem - 1;

            replaceFiver(locationEmpty, locationFiver);

            console.log("space left")
        } else {
            console.log("no space")
        }
    }

    const addEmpty = (countLine, array) => {
        EMPTY.countLine = countLine;

        return array.push(EMPTY);
    }

    const random = () => {
        let arr = [];

        for (const key in fivers) {
            fivers[key].forEach(e => arr.push(e))
        }

        arr.sort(() => Math.random() - 0.5);

        let obj = {}
        let countLine = 0;

        for (let i = 1; i < (count * count); i++) {
            if ((i - 1) % count === 0) {
                countLine++;
                obj[countLine] = [];
            }
        }

        countLine = 0;

        arr.forEach((element, index) => {
            if (index % count === 0) {
                countLine++;
            }

            //TODO кажется я тут малость мутирую данные

            element.countLine = countLine;
            obj[countLine].push(element);
        })

        setFivers(obj);
    }

    const replaceFiver = (locationEmpty, locationFiver) => {
        let newFivers = JSON.parse(JSON.stringify(fivers));
        let fiver = JSON.parse(JSON.stringify(fivers[locationFiver.line][locationFiver.index]));

        fiver.countLine = locationEmpty.line;
        EMPTY.countLine = locationFiver.line;

        newFivers[locationEmpty.line][locationEmpty.index] = fiver;
        newFivers[locationFiver.line][locationFiver.index] = EMPTY;

        setFivers(newFivers);


        let arrKeyFivers = [],
            inprogress = true;


        for (const [_, value] of Object.entries(newFivers)) {
            value.forEach(element => {
                arrKeyFivers.push(element.key)
            })
        }

        correctFivers.forEach((value, index) => {
            if (value !== arrKeyFivers[index]) {
                inprogress = false;
            }
        })


        if (inprogress == true) {

            console.log("complited")

            setComplited(true);
        }
    }

    const renderFiver = () => {
        if (!Object.keys(fivers).length) return;

        let arr = [];

        for (const key in fivers) {
            fivers[key].forEach(e => {
                arr.push(<div key={e.key} id={`${e.countLine}_${e.key}`} onClick={onClickFiver} className={"fiver"}>{e.title}</div>)
            })
        }

        return arr;
    }

    return (
        <>
            <button onClick={random}>перемешать</button>

            <div className={"wrapper"}>
                <div></div>
                <div style={{gridTemplateColumns: `repeat(${count}, 1fr)`}} className={"grid"}>
                    {renderFiver()}
                </div>
                <div></div>
            </div>
        </>
    )
}