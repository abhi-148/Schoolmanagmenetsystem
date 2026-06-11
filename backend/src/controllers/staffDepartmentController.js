const {
  createDepartmentService,
  getAllDepartmentsService,
  updateDepartmentService,
  deleteDepartmentService
} = require(
  "../services/staffDepartmentService"
);

const createDepartment =
async (req,res) => {

try {

const result =
await createDepartmentService(
req.body
);

return res.status(201).json({
success:true,
data:result
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

};

const getAllDepartments =
async (req,res) => {

try {

const result =
await getAllDepartmentsService();

return res.status(200).json({
success:true,
data:result
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

};

const updateDepartment =
async (req,res) => {

try {

await updateDepartmentService(
req.params.id,
req.body
);

return res.status(200).json({
success:true,
message:
"Department Updated Successfully"
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

};

const deleteDepartment =
async (req,res) => {

try {

await deleteDepartmentService(
req.params.id
);

return res.status(200).json({
success:true,
message:
"Department Deleted Successfully"
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

};

module.exports = {
createDepartment,
getAllDepartments,
updateDepartment,
deleteDepartment
};