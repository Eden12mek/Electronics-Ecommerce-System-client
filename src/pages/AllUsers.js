import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaFilter, FaSort } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";
import AdminDeleteUser from "../components/AdminDeleteUser";
import AddEmployee from "../components/AddEmployee";
import AdminEditEmployee from "../components/AdminEditEmployee";

const AllUsers = ({ data, fetchdata }) => {
  const [allUser, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedRole, setSelectedRole] = useState("all");
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [openEditEmployee, setOpenEditEmployee] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    _id: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers]);

  // Update the edit button click handler
  const handleEditClick = (e, user) => {
    e.stopPropagation(); // Prevent row click from triggering
    setUpdateUserDetails(user);
    setOpenEditEmployee(true);
  };

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  // Apply filters, search, and sorting
  useEffect(() => {
    let results = [...allUser];

    // apply search filter
    if (searchTerm) {
      results = results.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // apply role filter
    if (selectedRole !== "all") {
      results = results.filter((user) => user.role === selectedRole);
    }

    // apply sorting with date and selling price
    switch (sortOption) {
      case "a-z":
        results.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        break;
      case "z-a":
        results.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
        break;
      case "newest":
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      default:
        break;
    }
    setFilteredUsers(results);
  }, [allUser, searchTerm, selectedRole, sortOption]);
  // Extract unique roles
  const roles = ["all", ...new Set(allUser.map((user) => user.role))];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white py-2 px-4 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenAddEmployee(true)}
        >
          Add Employee
        </button>
      </div>
      <div className="  p-4 space-y-4">
        <div className="flex justify-end">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                className="p-2 pr-8 border rounded-md appearance-none w-full bg-white"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                {roles
                  .filter((rol) => rol !== "all")
                  .map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <FaFilter />
              </div>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <select
                className="p-2 pr-8 border rounded-md appearance-none w-full bg-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="a-z">A-Z (Name)</option>
                <option value="z-a">Z-A (Name)</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <FaSort />
              </div>
            </div>
            {/* Rows per page selector */}
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="p-1 border rounded text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
          </div>

      
        </div>
        <div className="overflow-x-auto">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-gray-100 p-3 text-sm font-semibold text-gray-700">
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="p-3">{user?.firstName + " " + user?.lastName}</td>

                <td className="p-3">{user?.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'employee' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user?.role}
                  </span>
                </td>
                <td className="p-3">{moment(user?.createdAt).format("LL")}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdateUserDetails(user);
                        setOpenEditEmployee(true);
                      }}
                      className="text-gray-600 hover:text-blue-500"
                      title="Edit user"
                    >
                      <MdModeEdit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdateUserDetails(user);
                        setDeleteUser(true);
                      }}
                      className="text-gray-600 hover:text-red-600"
                      title="Delete user"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    {/* User Count */}
      <div className="text-sm text-gray-500 mb-2">
        Showing {filteredUsers.length} of {allUser.length} users
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l-md border ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border-t border-b ${
                currentPage === page 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 rounded-r-md border ${
              currentPage === totalPages || totalPages === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </nav>
      </div>

        {/*  Add Employee Modal */}
        {openAddEmployee && (
          <AddEmployee
            onClose={() => setOpenAddEmployee(false)}
            fetchdata={fetchAllUsers}
          />
        )}
        {/*  Edit Employee Modal */}
        {openEditEmployee && (
          <AdminEditEmployee
            userData={updateUserDetails}
            onClose={() => setOpenEditEmployee(false)}
            fetchdata={fetchAllUsers}
          />
        )}


        {openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )}
        {deleteUser && (
          <AdminDeleteUser
            userData={updateUserDetails}
            onClose={() => setDeleteUser(false)}
            fetchdata={fetchAllUsers}
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
