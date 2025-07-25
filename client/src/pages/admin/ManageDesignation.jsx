import { useState } from "react";
import Modal from "../../components/Modal";

export default function ManageDesignation() {
    const [designations, setDesignations] = useState([
        {
            id: 1,
            designationName: "Software developer 1",
            description: "Handles software requirements"
        },
        {
            id: 2,
            designationName: "HR manager",
            description: "HR head."
        },
        {
            id: 3,
            designationName: "Sales executive",
            description: "Sales representative."
        }
    ])

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [editDesignationId, setEditDesignationId] = useState(null);

    const matchedDesignations = searchKeyword == "" ? designations : designations.filter(d => d.designationName.toLowerCase().includes(searchKeyword.toLowerCase()));

    function handleAddClick(e) {
        setIsAddModalVisible(true);
    }

    function handleDesignationAddition(e) {
        e.preventDefault();
        const temp = {
            id: e.target.id.value,
            designationName: e.target.designationName.value,
            description: e.target.description.value,
        }
        setDesignations((d) => [...designations, temp]);
        setIsAddModalVisible(false);
    }

    function handleDesignationtEdit(e) {
        e.preventDefault()
        const temp = {
            id: editDesignationId,
            designationName: e.target.designationName.value,
            description: e.target.description.value,
        }
        setDesignations(d => [...d.filter(des => des.id != temp.id), temp])
        setEditDesignationId(null);
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
        setDesignations(d => d.filter(des => des.id != desId))
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
                            name="id"
                            placeholder="Id"
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            name="designationName"
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
                            name="designationName"
                            required
                            className="w-full border px-3 py-2 rounded"
                            defaultValue={editDesignationId == null ? "" : designations.find(d => d.id == editDesignationId).designationName}
                        />
                        <input
                            name="description"
                            required
                            className="w-full border px-3 py-2 rounded"
                            defaultValue={editDesignationId == null ? "" : designations.find(d => d.id == editDesignationId).description}
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
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            matchedDesignations.map((d) =>
                                <tr key={d.id}>
                                    <td className="border p-2">{d.id}</td>
                                    <td className="border p-2">{d.designationName}</td>
                                    <td className="border p-2">{d.description}</td>
                                    <td className="border p-2 text-center">
                                        <button
                                            style={{ color: "#718769" }}
                                            className="mr-2 hover:underline"
                                            onClick={handleEditClick}
                                            data-id={d.id}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={handleDelete}
                                            data-id={d.id}
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