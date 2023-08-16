const Modal = ({ showModal, setShowModal, children, overflowY = false }: any) => {
    return showModal ? (
        <div className="flex justify-center items-center fixed inset-0 z-50 w-full">
            <div
                className={
                    (overflowY ? '' : 'overflow-y-auto max-h-90') +
                    ' flex flex-col rounded-lg shadow-lg bg-white my-6 mx-6 z-50'
                }
            >
                {/*header*/}
                <div className="flex items-start justify-end pt-4 pr-4">
                    <button className="outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                        <svg
                            className="fill-default-40 w-6 h-6"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.6 28.5L7.5 26.4L15.9 18L7.5 9.6L9.6 7.5L18 15.9L26.4 7.5L28.5 9.6L20.1 18L28.5 26.4L26.4 28.5L18 20.1L9.6 28.5Z"
                                fill="#A0A0A8"
                            />
                        </svg>
                    </button>
                </div>
                {/*body*/}
                <div className="p-10 pt-0">{children}</div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => setShowModal(false)}></div>
        </div>
    ) : (
        <></>
    );
};

export default Modal;
