import React, { useState } from "react";
import RowContent from "./RowContent";

function RowItem(props) {
    const { item, removeData, editData } = props;
    const [open, SetOpen] = useState(false);

    const toggleRow = () => {
        SetOpen(open => (!open));
    }
    let classes = '';
    if (open) {
      classes = 'open';
    }

    return (
        <li className={classes} onClick={() => toggleRow()}>
            <div className="heading">
                <div className="col">{item.id}</div>
                <div className="col">{item.name}</div>
                <div className="col">{item.type}</div>
                <div className="col">{item.createdAt}</div>
                <div className="col">{item.updatedAt}</div>
                <div className="col">
                    <button className="btn-edit" onClick={() => editData(item.id)}>Edit</button>
                    <button className="btn-delete" onClick={() => removeData(item.id)}>Delete</button>
                </div>
            </div> 
            <RowContent open={open} item={item} />
        </li>
    )
}

export default RowItem;