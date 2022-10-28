import React, { useState } from "react";
import axios from "axios";
import ModalStyle from "./ModalStyle";

function TableModal(props) {

    const { SetIsOpen, data, setFilteredItems, filteredItems } = props;
    const [item, setItem] = useState(data);

    const handleClick = () => {
        SetIsOpen(false)
    }

    const handleChange = (e) => {
        setItem({ ...item, description: e.target.value })
    }

    const handleUpdate = () => {
        const event = new Date();
        axios.put(`${process.env.REACT_APP_SERVER_API}/apis/${data.id}`, { description: item.description, updatedAt: event.toISOString() })
            .then((res) => {
                let newArr = [];
                filteredItems.forEach((element) => {
                    if (element.id === res.data.id) {
                        newArr.push(res.data);
                    } else {
                        newArr.push(element);
                    }
                })
                setFilteredItems(newArr);
                setItem(res.data);
                SetIsOpen(false);
            })
            .catch((err) => {
                console.log(err);
                SetIsOpen(false);
            });
    }

    return (
        <ModalStyle>
            <div className="modal" onClick={handleClick}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <span className="close" onClick={handleClick}>&times;</span>
                        <h3>Edit Description</h3>
                    </div>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <p>Name: {item.name}</p>
                        <textarea value={item.description} onChange={(e) => handleChange(e)}></textarea>
                    </div>
                    <div className="modal-footer" onClick={e => e.stopPropagation()}>
                        <button className="btn-cancel" onClick={handleClick}>Cancel</button>
                        <button className="btn-ok" onClick={handleUpdate}>OK</button>
                    </div>
                </div>
            </div>
        </ModalStyle>
    )
}

export default TableModal;