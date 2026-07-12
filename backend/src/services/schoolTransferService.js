const {
  createSchoolTransfer,

  getAllSchoolTransfers,
  getSchoolTransfersBySchool,
  getSchoolTransfersByStaff,
  getSchoolTransfersByStudent,

  getSchoolTransferById,
  getSchoolTransferByIdAndSchool,
  getSchoolTransferByIdAndStaff,
  getSchoolTransferByIdAndStudent,

  approveSchoolTransfer,
  rejectSchoolTransfer,
  completeSchoolTransfer

} = require("../repositories/schoolTransferRepository");

const {
  updateStudentSchool
} = require("../repositories/studentRepository");

const {
  updateStaffSchool
} = require("../repositories/staffRepository");

// Create
const createSchoolTransferService = async (data) => {

  data.status = "ACTIVE";

  // School Admin creates transfer
  if (
    data.created_by_role === "SCHOOL_ADMIN"
  ) {

    data.transfer_status = "APPROVED";
    data.approved_by_staff_id =
      data.created_by_staff_id;

    data.approved_at = new Date();

  }

  // Staff requests transfer
  else if (
    data.created_by_role === "STAFF"
  ) {

    data.transfer_status = "PENDING";

  }

  // Student requests transfer
  else if (
    data.created_by_role === "STUDENT"
  ) {

    data.transfer_status = "PENDING";

  }

  return await createSchoolTransfer(
    data
  );

};

// Get All
const getAllSchoolTransfersService =
async (user) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllSchoolTransfers();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getSchoolTransfersBySchool(
      user.schoolId
    );

  }

  if (
    user.role === "STAFF"
  ) {

    return await getSchoolTransfersByStaff(
      user.id
    );

  }

  if (
    user.role === "STUDENT"
  ) {

    return await getSchoolTransfersByStudent(
      user.id
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Get By Id
const getSchoolTransferByIdService =
async (
  id,
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getSchoolTransferById(
      id
    );

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getSchoolTransferByIdAndSchool(
      id,
      user.schoolId
    );

  }

  if (
    user.role === "STAFF"
  ) {

    return await getSchoolTransferByIdAndStaff(
      id,
      user.id
    );

  }

  if (
    user.role === "STUDENT"
  ) {

    return await getSchoolTransferByIdAndStudent(
      id,
      user.id
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Approve
const approveSchoolTransferService =
async (
  id,
  approvedBy
) => {

  const transfer =
    await getSchoolTransferById(id);

  if (!transfer) {

    throw new Error(
      "Transfer Not Found"
    );

  }

  if (
    transfer.transfer_status !==
    "PENDING"
  ) {

    throw new Error(
      "Only Pending Transfer can be Approved"
    );

  }

  return await approveSchoolTransfer(
    id,
    approvedBy
  );

};

// Reject
const rejectSchoolTransferService =
async (
  id,
  approvedBy
) => {

  const transfer =
    await getSchoolTransferById(id);

  if (!transfer) {

    throw new Error(
      "Transfer Not Found"
    );

  }

  if (
    transfer.transfer_status !==
    "PENDING"
  ) {

    throw new Error(
      "Only Pending Transfer can be Rejected"
    );

  }

  return await rejectSchoolTransfer(
    id,
    approvedBy
  );

};

// Complete
const completeSchoolTransferService =
async (
  id,
  updatedBy
) => {

  const transfer =
    await getSchoolTransferById(id);

  if (!transfer) {

    if (
  transfer.transfer_status !==
  "APPROVED"
) {

  throw new Error(
    "Only Approved Transfer can be Completed"
  );

}

    throw new Error(
      "Transfer Not Found"
    );

  }

  if (transfer.student_id) {

    await updateStudentSchool(
      transfer.student_id,
      transfer.to_school_id
    );

  }

 console.log("Transfer =>", transfer);

if (transfer.staff_id) {

  console.log(
    "Updating Staff School",
    transfer.staff_id,
    transfer.to_school_id
  );

  await updateStaffSchool(
    transfer.staff_id,
    transfer.to_school_id
  );

} 

  await completeSchoolTransfer(
    id,
    updatedBy
  );

  return {
    message:
      "School Transfer Completed Successfully"
  };

};

module.exports = {
  createSchoolTransferService,
  getAllSchoolTransfersService,
  getSchoolTransferByIdService,
  approveSchoolTransferService,
  rejectSchoolTransferService,
  completeSchoolTransferService
};