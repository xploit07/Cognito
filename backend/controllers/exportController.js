import { Parser } from 'json2csv';
import Exam from '../models/examModel.js';
import Result from '../models/resultModel.js';

export const exportExamResults = async (req, res) => {
  try {
    const { examId } = req.params;
    const results = await Result.find({ examId })
      .populate('studentId', 'firstName lastName email');

    const fields = [
      'studentId.firstName',
      'studentId.lastName',
      'studentId.email',
      'marksObtained',
      'percentage'
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(results);

    res.header('Content-Type', 'text/csv');
    res.attachment(`results-${examId}.csv`);
    res.send(csv);

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};