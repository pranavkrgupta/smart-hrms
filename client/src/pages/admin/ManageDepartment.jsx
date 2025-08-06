import { useEffect, useState } from "react"
import Modal from "../../components/Modal";
// import { getEmployees } from "../../services/departmentService";
import axios from "axios";

export default function ManageDepartments() {
    const [departments, setDepartments] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [editDepartmentId, setEditDepartmentId] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const matchedDepartments = searchKeyword == "" ? departments : departments.filter(d => d.name.toLowerCase().includes(searchKeyword.toLowerCase()));

    useEffect(() => {
        axios.get("http://localhost:8080/api/departments").then(res => {
            setDepartments(res.data);
        }).catch(err => {
            console.error("Error fetching departments:", err);
        });
    }, [refreshFlag]);

    function handleAddClick(e) {
        setIsAddModalVisible(true);
    }

    function handleDepartmentAddition(e) {
        e.preventDefault();
        const temp = {
            name: e.target.name.value,
            description: e.target.description.value,
        }
        axios.post("http://localhost:8080/api/departments", temp)
            .then(res => {
                console.log("Department added successfully:", res.data);
                setRefreshFlag(!refreshFlag);
            }).catch(err => {
                console.error("Error adding department:", err);
            });

        setIsAddModalVisible(false);

    }

    function handleDepartmentEdit(e) {
        e.preventDefault()
        const temp = {
            name: e.target.departmentName.value,
            description: e.target.description.value,
        }

        axios.put(`http://localhost:8080/api/departments/${editDepartmentId}`, temp)
            .then(res => {
                console.log("Department updated successfully:", res.data);
                setRefreshFlag(!refreshFlag);
            }).catch(err => {
                console.error("Error updating department:", err);
            });
        setEditDepartmentId(null);
        setIsEditModalVisible(false)
    }

    function handleSearch(e) {
        setSearchKeyword(e.target.value)
    }

    function handleEditClick(e) {
        setIsEditModalVisible(true)
        setEditDepartmentId(e.target.getAttribute("data-id"))
    }

    function handleDelete(e) {
        const depId = e.target.getAttribute("data-id");
        axios.delete(`http://localhost:8080/api/departments/${depId}`)
            .then(res => {
                console.log("Department deleted successfully:", res.data);
                setRefreshFlag(!refreshFlag);
            }).catch(err => {
                console.error("Error deleting department:", err);
            });
    }

    return (
        <div className="flex flex-col items-stretch p-4">
            <div className="flex flex-col items-stretch "><button type="button" style={{ backgroundColor: "#718769" }} className="text-white px-4 py-2 rounded" onClick={handleAddClick}>ADD NEW DEPARTMENT</button></div>
            <div>
                {/* Modal for adding a department */}
                <Modal
                    isOpen={isAddModalVisible}
                    onClose={() => { setIsAddModalVisible(false) }}
                    title="Add New Department"
                >
                    <form onSubmit={handleDepartmentAddition} className="space-y-4">
                        <input
                            name="name"
                            placeholder="Department name"
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            name="description"
                            placeholder="Description"
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
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
                {/* Modal for editing departments */}
                <Modal
                    isOpen={isEditModalVisible}
                    onClose={() => { setIsEditModalVisible(false) }}
                    title="Edit Department"
                >
                    <form onSubmit={handleDepartmentEdit} className="space-y-4">
                        <input
                            name="departmentName"
                            required
                            className="w-full border px-3 py-2 rounded"
                            defaultValue={editDepartmentId == null ? "" : departments.find(d => d.departmentId == editDepartmentId).name}
                        />
                        <input
                            name="description"
                            required
                            className="w-full border px-3 py-2 rounded"
                            defaultValue={editDepartmentId == null ? "" : departments.find(d => d.departmentId == editDepartmentId).description}
                        />
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
                <input type="text" placeholder="SEARCH DEPARTMENTS BY NAME" className="border p-2 rounded text-center" value={searchKeyword} onChange={handleSearch} />
                <img src="../assets/search.png" className="w-6 h-6 absolute right-3 top-2" alt="" />
            </div>
            <div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Department Name</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            matchedDepartments.map((d) =>
                                <tr key={d.departmentId}>
                                    <td className="border p-2">{d.departmentId}</td>
                                    <td className="border p-2">{d.name}</td>
                                    <td className="border p-2">{d.description}</td>
                                    <td className="border p-2 text-center">
                                        <button
                                            style={{ color: "#718769" }}
                                            className="mr-2 hover:underline"
                                            onClick={handleEditClick}
                                            data-id={d.departmentId}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={handleDelete}
                                            data-id={d.departmentId}
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