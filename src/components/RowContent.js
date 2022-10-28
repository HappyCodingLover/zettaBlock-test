import React from "react";

function RowContent(props) {

    const { open, item } = props;

    let extraContent = (<div className="content">
    </div>);

    /**
     * 2. Should allow users to expand the row when they click on it and see extra content
     */
    if (open) {
        extraContent = (
        <div className="content open">
            <div className="content-table">
                <p>Description</p>
                <i>{item.description}</i>
            </div>
        </div>);
    }

    return (
        <>
            {extraContent}
        </>
    )
}

export default RowContent;