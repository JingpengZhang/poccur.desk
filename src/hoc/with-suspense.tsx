import {ComponentType, Suspense} from "react";

const withSuspense = (WrappedComponent: ComponentType, fallback: null | React.ReactNode = null) => <Suspense
    fallback={fallback}><WrappedComponent/></Suspense>

export default withSuspense