import {
  useState
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getReportCard
}
from "../../schoolMediumApiervices/reportCardService";

function ReportCard() {

  const [
    studentId,
    setStudentId
  ] = useState("");

  const [
    examId,
    setExamId
  ] = useState("");

  const [
    report,
    setReport
  ] = useState(null);

  const fetchReport =
  async () => {

    try {

      const response =
        await getReportCard(
          studentId,
          examId
        );

      setReport(
        response.data
      );

    } catch (error) {

      console.log(error);

      alert(
        "Report Not Found"
      );

    }

  };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Report Card
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="number"
              placeholder="Student ID"
              className="border p-3 rounded-lg"
              value={studentId}
              onChange={(e) =>
                setStudentId(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Exam ID"
              className="border p-3 rounded-lg"
              value={examId}
              onChange={(e) =>
                setExamId(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                fetchReport
              }
              className="bg-blue-600 text-white rounded-lg"
            >
              Get Report
            </button>

          </div>

        </div>

        {report && (

          <div className="bg-white p-6 rounded-xl shadow-sm">

            <h2 className="text-2xl font-bold mb-4">
              Student Report Card
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">

              <p>
                <strong>
                  Student:
                </strong>
                {" "}
                {report.student}
              </p>

              <p>
                <strong>
                  Roll No:
                </strong>
                {" "}
                {report.roll_number}
              </p>

              <p>
                <strong>
                  Exam:
                </strong>
                {" "}
                {report.exam_name}
              </p>

              <p>
                <strong>
                  Grade:
                </strong>
                {" "}
                {report.grade}
              </p>

            </div>

            <table className="w-full border">

              <thead>

                <tr className="bg-slate-100">

                  <th className="p-3">
                    Subject
                  </th>

                  <th className="p-3">
                    Max Marks
                  </th>

                  <th className="p-3">
                    Obtained
                  </th>

                </tr>

              </thead>

              <tbody>

                {report.subjects?.map(
                  (
                    subject,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-t"
                    >

                      <td className="p-3">
                        {
                          subject.subject_name
                        }
                      </td>

                      <td className="p-3">
                        {
                          subject.max_marks
                        }
                      </td>

                      <td className="p-3">
                        {
                          subject.obtained_marks
                        }
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            <div className="mt-6 space-y-2">

              <p>
                <strong>
                  Total Marks:
                </strong>
                {" "}
                {report.totalMarks}
              </p>

              <p>
                <strong>
                  Obtained Marks:
                </strong>
                {" "}
                {report.obtainedMarks}
              </p>

              <p>
                <strong>
                  Percentage:
                </strong>
                {" "}
                {report.percentage}%
              </p>

              <p>
                <strong>
                  Grade:
                </strong>
                {" "}
                {report.grade}
              </p>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>

  );

}

export default ReportCard;