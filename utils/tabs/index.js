// "use client";
// import { useState } from "react";

// const Tabs = ({ tabs, selectedTab, setSelectedTab, tabTitle, orderTab }) => {
//     return (
//         <>
//             <div className=" ">
//                 <div className="bg-[#f6f6f6] sm:p-2 lg:p-3 bdark:bg-darkGreyC rounded-lg">
//                     <div>
//                         <div className="border-b bdark:border-gray-700 xl:pb-0  sm:overflow-x-auto overflow-y-hidden">
//                             <ul
//                                 className={`z-10 flex lg:flex-wrap -mb-px text-base font-medium text-left relative ${orderTab ? "justify-evenly" : ""} overflow-x-auto sm:rounded-lg`}
//                                 id="myTab"
//                                 data-tabs-toggle="#myTabContent"
//                                 role="tablist"
//                             >
//                                 {tabs.map((tab, index) => (
//                                     <li
//                                         className="mr-2 font-avenirBlack"
//                                         role="presentation"
//                                         key={index}
//                                         onClick={() => setSelectedTab(tab.id)}
//                                     >
//                                         <button
//                                             className={`p-3 rounded-t-lg w-max ${selectedTab === tab.id
//                                                 ? "border-b-4 text-primary bdark:text-darkPrimary rounded-t-lg bdark:border-darkPrimary border-[#055265] bdark:border-[#F5D38EFF]"
//                                                 : "text-black bdark:text-white"
//                                                 }`}
//                                             id={`${tab.id}-tab`}
//                                             data-tabs-target={`#${tab.id}`}
//                                             type="button"
//                                             role="tab"
//                                             aria-controls={tab.id}
//                                             aria-selected={selectedTab === tab.id ? "true" : "false"}
//                                         >
//                                             {tab.name}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div id="myTabContent" className="mt-4">
//                             {tabs.map((tab, index) => (
//                                 <div
//                                     key={index}
//                                     className={`${selectedTab !== tab.id && "hidden"} rounded-lg`}
//                                     id={tab.id}
//                                     role="tabpanel"
//                                     aria-labelledby={`${tab.id}-tab`}
//                                 >
//                                     {selectedTab === tab.id ? tab.content : null}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Tabs;

"use client";
import { useState } from "react";

const Tabs = ({ tabs, selectedTab, setSelectedTab, orderTab, totalRecords, doNotShowTotalLength }) => {
    return (
        <div className="w-full">
            <div className="bdark:from-darkGreyC bdark:to-darkGreyB rounded-xl ">
                <div className="border-b bdark:border-gray-700 p-2">
                    <ul
                        className={`z-10 flex ${orderTab ? "justify-evenly" : "gap-4"}  sm:rounded-lg`}
                        id="myTab"
                        data-tabs-toggle="#myTabContent"
                        role="tablist"
                    >
                        {tabs.map((tab, index) => (
                            <li
                                className="font-avenirBlack"
                                role="presentation"
                                key={index}
                                onClick={() => setSelectedTab(tab.id)}
                            >
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 border transition-all duration-300 rounded-lg text-sm font-semibold shadow-sm 
                                    ${selectedTab === tab.id
                                            ? "bg-[#36736F] text-white bdark:bg-darkPrimary bdark:text-darkGreyA shadow-md scale-105"
                                            : "text-gray-700 bdark:text-gray-300 hover:bg-gray-200 bdark:hover:bg-darkGreyA"
                                        }`}
                                    id={`${tab.id}-tab`}
                                    data-tabs-target={`#${tab.id}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={tab.id}
                                    aria-selected={selectedTab === tab.id ? "true" : "false"}
                                >
                                    {tab.icon && <span>{tab.icon}</span>}
                                    {tab.name}
                                    {!doNotShowTotalLength && selectedTab === tab.id && <span className="text-xs font-medium">({totalRecords})</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="myTabContent" className="mt-2">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`transition-opacity duration-300 ${selectedTab !== tab.id ? "hidden opacity-0" : "opacity-100"
                                } rounded-lg p-2 bg-white bdark:bg-darkGreyB`}
                            id={tab.id}
                            role="tabpanel"
                            aria-labelledby={`${tab.id}-tab`}
                        >
                            {selectedTab === tab.id ? tab.content : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tabs;
