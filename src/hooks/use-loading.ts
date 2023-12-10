import {useState} from "react";

const UseLoading = (initialState: boolean = false, loadingText: string = '加载中') => {
  const [state, setState] = useState<boolean>(initialState);

  const [text, setText] = useState(loadingText)


  return {
    state,
    setState,
    text,
    setText
  }
}

export default UseLoading