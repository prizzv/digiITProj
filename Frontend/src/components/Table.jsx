import React, { useState, useEffect } from 'react';
import dummydata from "../dummyTabledata";

const DataTable = () => {
    const [data, setData] = useState(dummydata);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [newRow, setNewRow] = useState({ id: '', name: '', location: '', CGPA: '' });
    const [editRow, setEditRow] = useState(null);

    useEffect(() => {
        if (sortColumn) {
            const sortedData = [...data].sort((a, b) => {
                if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
            setData(sortedData);
        }
    }, [sortColumn, sortOrder, data]);

    const handleHeaderClick = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow({ ...newRow, [name]: value });
    };

    const handleAddRow = () => {
        if (newRow.id && newRow.name && newRow.location && newRow.CGPA) {
            setData([...data, newRow]);
            setNewRow({ id: '', name: '', location: '', CGPA: '' });
        }
    };

    const handleEditRow = (id) => {
        setEditRow(id);
        const rowToEdit = data.find((item) => item.id === id);
        if (rowToEdit) {
            setNewRow({ ...rowToEdit });
        }
    };

    const handleSaveEdit = () => {
        setData(data.map((item) => (item.id === editRow ? newRow : item)));
        setEditRow(null);
        setNewRow({ id: '', name: '', location: '', CGPA: '' });
    };

    const handleCancelEdit = () => {
        setEditRow(null);
        setNewRow({ id: '', name: '', location: '', CGPA: '' });
    };

    const handleDeleteRow = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleHeaderClick('id')}>ID</th>
                        <th onClick={() => handleHeaderClick('name')}>Name</th>
                        <th onClick={() => handleHeaderClick('location')}>Location</th>
                        <th onClick={() => handleHeaderClick('CGPA')}>CGPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{editRow === item.id ? (
                                <input
                                    type="text"
                                    name="id"
                                    value={newRow.id}
                                    onChange={handleInputChange}
                                />
                            ) : item.id}</td>
                            <td>{editRow === item.id ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={newRow.name}
                                    onChange={handleInputChange}
                                />
                            ) : item.name}</td>
                            <td>{editRow === item.id ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={newRow.location}
                                    onChange={handleInputChange}
                                />
                            ) : item.location}</td>
                            <td>{editRow === item.id ? (
                                <input
                                    type="text"
                                    name="CGPA"
                                    value={newRow.CGPA}
                                    onChange={handleInputChange}
                                />
                            ) : item.CGPA}</td>
                            <td>
                                {editRow === item.id ? (
                                    <div>
                                        <button onClick={handleSaveEdit}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleEditRow(item.id)}>Edit</button>
                                )}
                                <button onClick={() => handleDeleteRow(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input
                    type="text"
                    name="id"
                    value={newRow.id}
                    placeholder="ID"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="name"
                    value={newRow.name}
                    placeholder="Name"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="location"
                    value={newRow.location}
                    placeholder="Location"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="CGPA"
                    value={newRow.CGPA}
                    placeholder="CGPA"
                    onChange={handleInputChange}
                />
            </div>
            <div className='h-2'></div>
            <button onClick={handleAddRow}>Add Row</button>
        </div>
    );
};

export default DataTable;
