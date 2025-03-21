import Joi from 'joi';

const questionSchema = Joi.object({
  questionText: Joi.string().required(),
  questionType: Joi.string().valid('mcq', 'msq').required(),
  options: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      isCorrect: Joi.boolean().required()
    })
  ).min(2).required(),
  marks: Joi.number().min(0).required()
}).custom((value, helpers) => {
  if (value.questionType === 'mcq' && 
      value.options.filter(o => o.isCorrect).length !== 1) {
    return helpers.error('any.invalid');
  }
  return value;
});

export const validateQuestions = (req, res, next) => {
  const questions = Array.isArray(req.body) ? req.body : [req.body];
  
  const { error } = Joi.array().items(questionSchema).validate(questions, {
    messages: {
      'any.invalid': 'MCQ questions must have exactly one correct answer'
    }
  });
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  
  next();
};