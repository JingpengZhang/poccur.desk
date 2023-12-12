import {RouterProvider} from "react-router-dom";
import router from "@/router";
import {useEffect} from "react";
import {useAppDispatch} from "@/hooks/use-redux.ts";
import {fetchMenuTree} from "@/store/main";

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchMenuTree())
  }, [])

  return (
      <RouterProvider router={router}/>
  );
}

export default App;
