import { useContext, useEffect, useState, useRef, useReducer, useMemo, useCallback } from 'preact/hooks'
import './app.css'
import { shincodeContext } from './main.jsx'
import  SomeChild from './SomeChild.jsx'
import { useLocalStorage } from './useLocalStorage.jsx'

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}


export function App() {
  const [count, setCount] = useState(0);
  const shincodeInfo = useContext(shincodeContext); {/*useContextで値を取得する*/}
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, 0); {/*useReducerはstateとdispatchを返す*/}

  const handleClick = () => {
    setCount(count + 1);
  }

  useEffect(() => {
    console.log("HelloHooks")
    // setCount(couht + 1)
  }, [count]); {/*第二引数が変わった時だけ実行される*/}

  const handleRef = () => {
    console.log(ref.current.value
    );
  }

  //usememo
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   let i = 0;
  //   while (i < 20000000) i++;

  //   return count02 * count02;
  // }

    const square = useMemo(() => {
      let i = 0;
      while (i < 20000000) i++;

      return count02 * count02;
    }, [count02]);

    //useCallback 関数のメモ化
    const [counter, setCounter] = useState(0);

    // const showCount = () => {
    //   alert("これは重い処理です")
    // }

    const showCount = useCallback(() => {
      alert("これは重い処理です")
    }, [counter]);

    //カスタムフック
    const [age, setAge] = useLocalStorage("age", 20);

  return (
    <div className='App'>
      <h1>useState, useEffect</h1>   {/*データが変わったら再レンダリングされる*/}
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      <input type="text" ref={ref}/>
      <button onClick={handleRef}>UseRef</button>

      <hr />
      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({type: "increment"})}>＋</button>
      <button onClick={() => dispatch({type: "decrement"})}>ー</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント結果1：{count01}</div>
      <div>カウント結果2：{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>Count01</button>
      <button onClick={() => setCount02(count02 + 1)}>Count02</button>

      <hr />
      <h1>useCallBack</h1>
      <SomeChild showCount={showCount}/>

      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
    </div>
  )
}
