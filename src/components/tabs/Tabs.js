import React, { useState } from "react";
import TabStyle from "./TabStyle";
import MainTable from "../main-table/Table";
import FakeTable from "../fake-table/FakeTable";

/**
 * 8. Create a tab and add additional tables in other tabs
 */
function Tabs() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <TabStyle>
            <div className="container">
                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}
                    >
                        Table 1
                    </button>
                    <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}
                    >
                        Table 2
                    </button>
                </div>

                <div className="content-tabs">
                    <div
                        className={toggleState === 1 ? "content-tab  active-content" : "content-tab"}
                    >
                        <MainTable />
                    </div>

                    <div
                        className={toggleState === 2 ? "content-tab  active-content" : "content-tab"}
                    >
                        <FakeTable />
                    </div>
                </div>
            </div>
        </TabStyle>
    );
}

export default Tabs;
