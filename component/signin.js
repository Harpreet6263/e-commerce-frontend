"use client";
import { useEffect } from "react";
import { auth, provider, signInWithPopup } from "@/utils/firebase";
import { signInWithGoogle } from "@/redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginModal } from "@/redux/slice/authSlice";
import Image from "next/image";
export default function LoginModal() {
    // const { loginModal } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (loginModal) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = '';
    //     }

    //     return () => {
    //         document.body.style.overflow = '';
    //     };
    // }, [loginModal]);

    const dispatch = useDispatch();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const data = {
                authtoken: result.user.accessToken,
            };
            await dispatch(signInWithGoogle(data));
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const closeLoginModal = () => {
        dispatch(handleLoginModal(false));
    };
    return (
        <>
            <div
                id="deleteModal"
                className={`fixed inset-0 bg-[#00000080] flex justify-center items-center z-[150] `}
                onClick={() => {
                    closeLoginModal();
                }}
            >
                <div
                    className="relative bg-white bdark:bg-darkGreyC shadow-lg p-6 rounded-lg max-w-lg max-h-[90%] overflow-y-auto min-w-[300px] sm:min-w-[500px] mx-auto w-auto scrollbarHidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className="absolute top-2.5 right-2.5 text-gray-400 bdark:text-white bg-transparent hover:bg-gray-200 bdark:hover:bg-darkGreyB hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={() => {
                            closeLoginModal();
                        }}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className=" ">
                        {/* <div className="mb-4">
                            <h3 className="text-gray-800 text-2xl font-extrabold">Sign in</h3>
                        </div> */}
                        <div className=" flex justify-center">
                           
                        </div>

                        <div className="w-[85%] mx-auto my-8">
                            <p className="text-center">Log in to unlock exclusive content and enjoy a premium experience</p>
                        </div>
                        <button
                            type="button"
                            className="w-full mb-5 flex items-center justify-center py-2 px-6 text-base tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none"
                            onClick={handleGoogleSignIn}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                className="inline mr-3"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="#fbbd00"
                                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                />
                                <path
                                    fill="#0f9d58"
                                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                />
                                <path
                                    fill="#31aa52"
                                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                />
                                <path
                                    fill="#3c79e6"
                                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                />
                                <path
                                    fill="#cf2d48"
                                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                />
                                <path
                                    fill="#eb4132"
                                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
