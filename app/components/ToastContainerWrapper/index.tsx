import { ClientOnly } from "remix-utils/client-only";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerWrapper = () => {
    return (
        <ClientOnly fallback={<div />}>
            {() => <ToastContainer />}
        </ClientOnly>
    );
}

export default ToastContainerWrapper;