const {
  createBranchTransfer,
  getAllBranchTransfers,
  getBranchTransfersBySchool,
  getBranchTransfersByStaff,
  getBranchTransfersByStudent,

  getBranchTransferById,
  getBranchTransferByIdAndSchool,
  getBranchTransferByIdAndStaff,
  getBranchTransferByIdAndStudent,

  approveBranchTransfer,
  rejectBranchTransfer,
  completeBranchTransfer
} = require("../repositories/branchTransferRepository");
const {
  updateStudentBranch
} = require("../repositories/studentRepository");

const {
  updateStaffBranch
} = require("../repositories/staffRepository");

// Create
const createBranchTransferService = async (data) => {

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

  // Staff Request
  else if (
    data.created_by_role === "STAFF"
  ) {

    data.transfer_status = "PENDING";

  }

  // Student Request
  else if (
    data.created_by_role === "STUDENT"
  ) {

    data.transfer_status = "PENDING";

  }

  return await createBranchTransfer(
    data
  );

};

// Get All
const getAllBranchTransfersService =
async (user) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllBranchTransfers();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getBranchTransfersBySchool(
      user.schoolId
    );

  }

  if (
    user.role === "STAFF"
  ) {

    return await getBranchTransfersByStaff(
      user.id
    );

  }

  if (
    user.role === "STUDENT"
  ) {

    return await getBranchTransfersByStudent(
      user.id
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Get By Id
const getBranchTransferByIdService =
async (
  id,
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getBranchTransferById(
      id
    );

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getBranchTransferByIdAndSchool(
      id,
      user.schoolId
    );

  }

  if (
    user.role === "STAFF"
  ) {

    return await getBranchTransferByIdAndStaff(
      id,
      user.id
    );

  }

  if (
    user.role === "STUDENT"
  ) {

    return await getBranchTransferByIdAndStudent(
      id,
      user.id
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Approve
const approveBranchTransferService =
async (
  id,
  approvedBy
) => {

  const transfer =
    await getBranchTransferById(id);

    if (
  transfer.transfer_status ===
  "COMPLETED"
) {

  throw new Error(
    "Transfer Already Completed"
  );

}

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

  return await approveBranchTransfer(
    id,
    approvedBy
  );

};

// Reject
const rejectBranchTransferService =
async (
  id,
  approvedBy
) => {

  const transfer =
    await getBranchTransferById(id);

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

  return await rejectBranchTransfer(
    id,
    approvedBy
  );

};

// Complete
const completeBranchTransferService =
async (
  id,
  updatedBy
) => {

  const transfer =
    await getBranchTransferById(id);

  if (!transfer) {

    throw new Error(
      "Branch Transfer Not Found"
    );
  }

  if (
  transfer.transfer_status !==
  "APPROVED"
) {

  throw new Error(
    "Only Approved Transfer can be Completed"
  );

}

  // Student Transfer
  if (transfer.student_id) {

    await updateStudentBranch(
      transfer.student_id,
      transfer.to_branch_id,
      transfer.to_batch_id
    );

  }

  // Staff Transfer
  if (transfer.staff_id) {

    await updateStaffBranch(
      transfer.staff_id,
      transfer.to_branch_id
    );

  }

  await completeBranchTransfer(
    id,
    updatedBy
  );

  return {
    message:
      "Branch Transfer Completed Successfully"
  };

};

module.exports = {
  createBranchTransferService,
  getAllBranchTransfersService,
  getBranchTransferByIdService,
  approveBranchTransferService,
  rejectBranchTransferService,
  completeBranchTransferService
};