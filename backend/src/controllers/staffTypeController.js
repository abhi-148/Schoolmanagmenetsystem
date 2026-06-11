const {
  createStaffTypeService,
  getAllStaffTypesService,
  updateStaffTypeService,
  deleteStaffTypeService
} = require(
  "../services/staffTypeService"
);

const createStaffType =
async (req,res) => {

try {

const result =
await createStaffTypeService(
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

const getAllStaffTypes =
async(req,res)=>{

try{

const result =
await getAllStaffTypesService();

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
const updateStaffType =
async (req,res)=>{

try{

await updateStaffTypeService(
req.params.id,
req.body
);

return res.status(200).json({
success:true,
message:
"Staff Type Updated Successfully"
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

};

const deleteStaffType =
async(req,res)=>{

try{

await deleteStaffTypeService(
req.params.id
);

return res.status(200).json({
success:true,
message:
"Staff Type Deleted Successfully"
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
createStaffType,
getAllStaffTypes,
updateStaffType,
deleteStaffType
};