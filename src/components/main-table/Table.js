import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import Pagination from '../Pagination'
import TableModal from '../edit-modal/Modal';
import RowItem from '../RowItem';
import ContainerStyles from './TableStyle'

const SpinnerStyle = styled.div`
    .spinner:not([hidden]) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spinner::after {
        content: "";
        width: 80px;
        height: 80px;
        border: 2px solid #f3f3f3;
        border-top: 3px solid #a37ff6;
        border-radius: 100%;
        will-change: transform;
        animation: spin 1s infinite linear
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`

const Button = styled.button`
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    font-size: 16px;
    padding: 10px;
    border-radius: 2px;
    border: solid 1px #ffff;
    color: #ffffff;
    ${(props) => (props.disabled ? disabled : enabled)};
    ${(props) => (props.active ? active : '')};
`;

const enabled = `
    cursor: pointer;
    background-color: #392b58;
    transition: background-color 0.2s;

    &:hover {
        background-color: #a37ff6;
    }
`;

const active = `
    background-color: #a37ff6;
`

const disabled = `
  background-color: #969696;
`;


function MainTable() {
    const [loading, setLoading] = useState(true);
    const [pageItems, setPageItems] = useState([]);
    const [defaultItems, setDefaultItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isOpen, SetIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    /**
     * 1. Should display all fetched APIs with their properties
    */

    const getData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/apis`);
        setDefaultItems(response.data)
        setFilteredItems(response.data)
        setLoading(false);
    }

    /**
     * 6. Should allow users to delete a record
     */
    const removeData = (id) => {
        setLoading(true);
        axios.delete(`${process.env.REACT_APP_SERVER_API}/apis/${id}`).then((res) => {
            addState({ state: res.data, type: 'remove' }, true);
            const del = defaultItems.filter((item) => id !== item.id);
            setFilteredItems(del);
            setDefaultItems(del);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }

    /**
     * 3. Should allow users to modify the description
     */

    const editData = (id) => {
        SetIsOpen(true)
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_SERVER_API}/apis/${id}`)
            .then((res) => {
                addState({ state: res.data, type: 'update' }, true);
                setData(res.data)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false)
            })
    }

    const onChangePage = (pageOfItems) => {
        setPageItems(pageOfItems)
    }

    const compareBy = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    /**
     * 4. Should allow users to sort the rows by name
     */

    const sortBy = (key) => {
        let arrayCopy = [...filteredItems];
        arrayCopy.sort(compareBy(key));
        setFilteredItems(arrayCopy)
    }

    /**
     * 5. Should allow users to filter/search by keyword
     */
    const handleFilter = (e) => {
        const inputValue = e.target.value.toString().toLowerCase();
        const newFilteredItems = defaultItems.filter(item => {
            const itemNameLowerCase = item.name.toLowerCase();
            return itemNameLowerCase.includes(inputValue);
        });

        if (newFilteredItems.length === 0) {
            newFilteredItems.push({ fakeId: 0, name: '' });
        }
        setFilteredItems(newFilteredItems);
    }

    const getCurrentState = (idx) => {
        return history[idx];
    }

    const addState = (newState, permanent = true) => {
        const index = permanent ?
            currentIndex + 1 :
            currentIndex;

        let n_history = history.slice(0, index);
        n_history.push(newState);
        setHistory(n_history);
        if (permanent) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    /**
     * 9. Add the ability to redo changes
     */
    const handleUndo = () => {
        if (canUndo()) {
            setCurrentIndex(currentIndex - 1);
            recycleData(currentIndex - 1);
        }
    }

    /**
     * 10. Add the ability to undo changes
     */
    const handleRedo = () => {
        if (canRedo()) {
            setCurrentIndex(currentIndex + 1);
            recycleData(currentIndex + 1);
        }
    }

    const canUndo = () => {
        return currentIndex > 0;
    }

    const canRedo = () => {
        return currentIndex < history.length - 1;
    }

    const recycleData = (curIdx) => {
        const recycle = getCurrentState(curIdx);
        setLoading(true);
        if (recycle.type === 'update') {
            const event = new Date();
            axios.put(`${process.env.REACT_APP_SERVER_API}/apis/${recycle.state.id}`, { ...recycle.state, updatedAt: event.toISOString() })
                .then(() => {
                    let newArr = [];
                    filteredItems.forEach((element) => {
                        if (element.id === recycle.state.id) {
                            newArr.push(recycle.state);
                        } else {
                            newArr.push(element);
                        }
                    })
                    setFilteredItems(newArr);
                    setLoading(false);
                }

                )
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else if (recycle.type === 'remove') {
            axios.post(`${process.env.REACT_APP_SERVER_API}/apis`, recycle.state)
                .then((res) => {
                    setFilteredItems([...filteredItems, recycle.state]);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
        } else if (recycle.type === 'new') {
            axios.delete(`${process.env.REACT_APP_SERVER_API}/apis/${recycle.state.id}`, { ...recycle.state })
                .then(() => {
                    const del = filteredItems.filter((item) => recycle.state.id !== item.id);
                    setFilteredItems(del);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
        }
    }

    let noResultsMessage = (filteredItems[0]?.fakeId === 0) ? <div className='empty'>No results found!</div> : '';

    if (loading) {
        return (
            <SpinnerStyle>
                <div className='spinner'></div>
            </SpinnerStyle>
        )
    }

    return (
        <ContainerStyles>
            <div className='table-container'>
                <div className='tools'>
                    <div className="wrapper">
                        <input id="field" type="text" required onInput={handleFilter} />
                        <label id="label">Filter items</label>
                        <i className="zmdi zmdi-search"></i>
                    </div>
                    <Pagination items={filteredItems} onChangePage={onChangePage} />
                    <div className='btn-group'>
                        {
                            canUndo() ? (
                                <Button onClick={handleUndo}>Undo</Button>

                            ) : (
                                <Button onClick={handleUndo} disabled>Undo</Button>
                            )
                        }
                        {
                            canRedo() ? (
                                <Button onClick={handleRedo}>Redo</Button>

                            ) : (
                                <Button onClick={handleRedo} disabled>Redo</Button>
                            )
                        }
                    </div>
                </div>
                <div className='table'>
                    <div className='header'>
                        <div className='hcol' onClick={() => sortBy('id')}>ID</div>
                        <div className='hcol' onClick={() => sortBy('name')}>Name</div>
                        <div className='hcol' onClick={() => sortBy('type')}>Type</div>
                        <div className='hcol' onClick={() => sortBy('createdAt')}>CreatedAt</div>
                        <div className='hcol' onClick={() => sortBy('updatedAt')}>UpdatedAt</div>
                        <div className='hcol'>Operation</div>
                    </div>

                    <ul>
                        {filteredItems[0]?.fakeId !== 0 && pageItems.map((item, idx) => {
                            return (
                                <RowItem item={item} key={idx} removeData={removeData} editData={editData} />
                            )
                        })}
                    </ul>
                </div>
                {noResultsMessage}
                {
                    isOpen && (
                        <TableModal SetIsOpen={SetIsOpen} data={data} setFilteredItems={setFilteredItems} filteredItems={filteredItems} />
                    )
                }
            </div>
        </ContainerStyles>
    );
}

export default MainTable;
