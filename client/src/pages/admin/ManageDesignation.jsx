import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import axios from "axios";

export default function ManageDesignation() {
    const [designations, setDesignations] = useState([])
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [editDesignationId, setEditDesignationId] = useState(null);
    const [editDepartmentId, setEditDepartmentId] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [addDepartmentId, setAddDepartmentId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/designations")
            .then(res => {
                setDesignations(res.data);
            })
            .catch(err => {
                console.error("Error fetching designations:", err);
            });

        axios.get("http://localhost:8080/api/departments").then(res => {
            setDepartments(res.data)
        }).catch(err => {
            console.log("Error fetching departments.", err);
        })
    }, [refreshFlag]);

    const matchedDesignations = searchKeyword == "" ? designations : designations.filter(d => d.name.toLowerCase().includes(searchKeyword.toLowerCase()));

    function handleAddClick(e) {
        setIsAddModalVisible(true);
    }

    function handleDesignationAddition(e) {
        e.preventDefault();
        const temp = {
            name: e.target.name.value,
            description: e.target.description.value,
            departmentId: addDepartmentId
        }
        axios.post("http://localhost:8080/api/designations", temp).then(res => {
            console.log(res.data);
            setRefreshFlag(!refreshFlag);
        }).catch(e => {
            console.log(e);
        })
        setIsAddModalVisible(false);
        setAddDepartmentId(null);
    }

    function handleDesignationtEdit(e) {
        e.preventDefault()
        const temp = {
            name: e.target.name.value,
            description: e.target.description.value,
            departmentId: editDepartmentId,
        }
        axios.put(`http://localhost:8080/api/designations/${editDesignationId}`, temp).then(res => {
            console.log("Designation updated successfully:", res.data);
            setRefreshFlag(!refreshFlag);
        }).catch(err => {
            console.error("Error updating designation:", err);
        });
        setEditDesignationId(null);
        setEditDepartmentId(null);
        setIsEditModalVisible(false)
    }

    function handleSearch(e) {
        setSearchKeyword(e.target.value)
    }

    function handleEditClick(e) {
        setIsEditModalVisible(true)
        setEditDesignationId(e.target.getAttribute("data-id"))
    }

    function handleDelete(e) {
        const desId = e.target.getAttribute("data-id");
        axios.delete(`http://localhost:8080/api/designations/${desId}`).then(res => {
            console.log(res.data);
            setRefreshFlag(!refreshFlag);
        }).catch(e => {
            window.alert("cannot delete the designation because some users are still referencing the designation.");
            console.log(e);
        })
    }

    return (
        <div className="flex flex-col items-stretch p-4">
            <div className="flex flex-col items-stretch "><button type="button" style={{ backgroundColor: "#718769" }} className="text-white px-4 py-2 rounded" onClick={handleAddClick}>ADD NEW DESIGNATION</button></div>
            <div>
                {/* Modal for adding a designations */}
                <Modal
                    isOpen={isAddModalVisible}
                    onClose={() => { setIsAddModalVisible(false) }}
                    title="Add New Designation"
                >
                    <form onSubmit={handleDesignationAddition} className="space-y-4">
                        <input
                            name="name"
                            placeholder="Designation name"
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            name="description"
                            placeholder="Description"
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                         <select className="w-full border px-3 py-2 rounded" onChange={(e) => {
                            setAddDepartmentId(e.target.value)
                        }} defaultValue={"default"}>
                            <option value="default" disabled>Select Department</option>
                            {
                                departments.map((d) => (<option key={d.departmentId} value={d.departmentId}>{d.name}</option>))}
                        </select>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="text-white px-4 py-2 rounded"
                                style={{ backgroundColor: "#718769" }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>

            <div>
                {/* Modal for editing designations */}
                <Modal
                    isOpen={isEditModalVisible}
                    onClose={() => { setIsEditModalVisible(false) }}
                    title="Edit Designation"
                >
                    <form onSubmit={handleDesignationtEdit} className="space-y-4">
                        <input
                            name="name"
                            required
                            className="w-full border px-3 py-2 rounded"
                            defaultValue={editDesignationId == null ? "" : designations.find(d => d.designationId == editDesignationId).name}
                        />
                        <input
                            name="description"
                            required
                            className="w-full border px-3 py-2 rounded"
                            defaultValue={editDesignationId == null ? "" : designations.find(d => d.designationId == editDesignationId).description}
                        />
                        <select className="w-full border px-3 py-2 rounded" onChange={(e) => {
                            setEditDepartmentId(e.target.value)
                        }} defaultValue={"default"}>
                            <option value="default" disabled>Select Department</option>
                            {
                                departments.map((d) => (<option key={d.departmentId} value={d.departmentId}>{d.name}</option>))}
                        </select>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="text-white px-4 py-2 rounded"
                                style={{ backgroundColor: "#718769" }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>

            <div className="flex flex-col my-4 relative">
                <input type="text" placeholder="SEARCH DESIGNATION BY NAME" className="border p-2 rounded text-center" value={searchKeyword} onChange={handleSearch} />
                <img src="../assets/search.png" className="w-6 h-6 absolute right-3 top-2" alt="" />
            </div>
            <div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Designation Name</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Department Name</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            matchedDesignations.map((d) =>
                                <tr key={d.designationId}>
                                    <td className="border p-2">{d.designationId}</td>
                                    <td className="border p-2">{d.name}</td>
                                    <td className="border p-2">{d.description}</td>
                                    <td className="border p-2">{d.departmentName}</td>
                                    <td className="border p-2 text-center">
                                        <button
                                            style={{ color: "#718769" }}
                                            className="mr-2 hover:underline"
                                            onClick={handleEditClick}
                                            data-id={d.designationId}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={handleDelete}
                                            data-id={d.designationId}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}