const db = require("../config/db");

// Create
const createFollowUp = async (data) => {

    const query = `
        INSERT INTO tbl_admission_follow_ups
        (
            inquiry_id,
            follow_up_date,
            next_follow_up_date,
            response_status,
            notes,
            followed_up_by_staff_id,
            created_by,
            updated_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.inquiry_id,
        data.follow_up_date,
        data.next_follow_up_date,
        data.response_status,
        data.notes,
        data.followed_up_by_staff_id,
        data.created_by,
        data.updated_by
    ];

    const [result] = await db.query(query, values);

    return result;
};

// Get All
const getAllFollowUps = async () => {

    const query = `
        SELECT
            f.*,

            ai.student_name,

            s1.full_name AS followed_up_by,

            s2.full_name AS created_by_name,

            s3.full_name AS updated_by_name

        FROM tbl_admission_follow_ups f

        LEFT JOIN admission_inquiries ai
            ON ai.id = f.inquiry_id

        LEFT JOIN staff s1
            ON s1.id = f.followed_up_by_staff_id

        LEFT JOIN staff s2
            ON s2.id = f.created_by

        LEFT JOIN staff s3
            ON s3.id = f.updated_by

        ORDER BY f.id DESC
    `;

    const [rows] = await db.query(query);

    return rows;
};

// Get By School
const getFollowUpsBySchool = async (schoolId) => {

    const query = `
        SELECT
            f.*,
            ai.student_name,
            s.full_name AS followed_up_by

        FROM tbl_admission_follow_ups f

        INNER JOIN admission_inquiries ai
            ON ai.id = f.inquiry_id

        LEFT JOIN staff s
            ON s.id = f.followed_up_by_staff_id

        WHERE ai.school_id = ?

        ORDER BY f.id DESC
    `;

    const [rows] = await db.query(query, [schoolId]);

    return rows;
};

// Get By Id
const getFollowUpById = async (id) => {

    const query = `
        SELECT *
        FROM tbl_admission_follow_ups
        WHERE id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
};

// Update
const updateFollowUp = async (id, data) => {

    const query = `
        UPDATE tbl_admission_follow_ups
        SET
            inquiry_id = ?,
            follow_up_date = ?,
            next_follow_up_date = ?,
            response_status = ?,
            notes = ?,
            followed_up_by_staff_id = ?,
            updated_by = ?
        WHERE id = ?
    `;

    const values = [
        data.inquiry_id,
        data.follow_up_date,
        data.next_follow_up_date,
        data.response_status,
        data.notes,
        data.followed_up_by_staff_id,
        data.updated_by,
        id
    ];

    const [result] = await db.query(query, values);

    return result;
};

// Delete
const deleteFollowUp = async (id) => {

    const [result] = await db.query(
        "DELETE FROM tbl_admission_follow_ups WHERE id = ?",
        [id]
    );

    return result;
};

// Duplicate Check
const checkDuplicateFollowUp = async (
    inquiryId,
    followUpDate
) => {

    const query = `
        SELECT *
        FROM tbl_admission_follow_ups
        WHERE inquiry_id = ?
        AND follow_up_date = ?
    `;

    const [rows] = await db.query(query, [
        inquiryId,
        followUpDate
    ]);

    return rows;
};

// Search
const searchFollowUps = async (keyword) => {

    const query = `
        SELECT
            f.*,
            ai.student_name

        FROM tbl_admission_follow_ups f

        INNER JOIN admission_inquiries ai
            ON ai.id = f.inquiry_id

        WHERE
            ai.student_name LIKE ?
            OR f.notes LIKE ?
            OR f.response_status LIKE ?

        ORDER BY f.id DESC
    `;

    const search = `%${keyword}%`;

    const [rows] = await db.query(query, [
        search,
        search,
        search
    ]);

    return rows;
};

// Filter By Inquiry
const getFollowUpsByInquiry = async (inquiryId) => {

    const [rows] = await db.query(
        `SELECT * FROM tbl_admission_follow_ups
         WHERE inquiry_id = ?
         ORDER BY follow_up_date DESC`,
        [inquiryId]
    );

    return rows;
};

// Filter By Staff
const getFollowUpsByStaff = async (staffId) => {

    const [rows] = await db.query(
        `SELECT * FROM tbl_admission_follow_ups
         WHERE followed_up_by_staff_id = ?
         ORDER BY follow_up_date DESC`,
        [staffId]
    );

    return rows;
};

// Filter By Response Status
const getFollowUpsByStatus = async (status) => {

    const [rows] = await db.query(
        `SELECT * FROM tbl_admission_follow_ups
         WHERE response_status = ?
         ORDER BY follow_up_date DESC`,
        [status]
    );

    return rows;
};

module.exports = {
    createFollowUp,
    getAllFollowUps,
    getFollowUpsBySchool,
    getFollowUpById,
    updateFollowUp,
    deleteFollowUp,
    checkDuplicateFollowUp,
    searchFollowUps,
    getFollowUpsByInquiry,
    getFollowUpsByStaff,
    getFollowUpsByStatus
};