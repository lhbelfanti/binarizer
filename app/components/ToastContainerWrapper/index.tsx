import { ClientOnly } from "remix-utils/client-only";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerWrapper = () => {
    return (
        <ClientOnly fallback={<div />}>
            {
                () =>
                    <ToastContainer
                        theme="dark"
                        position="bottom-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={true}
                        draggable={false}
                        pauseOnHover={true}
                        style={{
                            width: '100%',
                            bottom: '0',
                            padding: '0',
                            margin: '0',
                        }}
                        toastStyle={{
                            bottom: '0',
                            padding: '0',
                            margin: '0 0 1.5rem 0',
                        }}
                    />
            }
        </ClientOnly>
    );
}

export default ToastContainerWrapper;