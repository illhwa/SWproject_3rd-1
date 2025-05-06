// SurveyStep.js
import React from 'react';
import '../../styles/SurveyStep.css';

const SurveyStep = ({ questions, answers, onAnswerChange }) => {
  const handleSingleChoice = (questionId, value) => {
    onAnswerChange(questionId, value);
  };

  const handleMultipleChoice = (questionId, value) => {
    const currentValues = answers[questionId] || [];
    
    if (currentValues.includes(value)) {
      onAnswerChange(
        questionId,
        currentValues.filter(v => v !== value)
      );
    } else {
      onAnswerChange(questionId, [...currentValues, value]);
    }
  };

  return (
    <div className="survey-step">
      {questions.map(question => (
        <div key={question.id} className="question-box">
          <h3 className="question-text">{question.text}</h3>
          
          <div className="options-container">
            {question.type === 'single' ? (
              question.options.map(option => (
                <div key={option.value} className="option-item">
                  <input
                    type="radio"
                    id={`${question.id}-${option.value}`}
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={() => handleSingleChoice(question.id, option.value)}
                  />
                  <label htmlFor={`${question.id}-${option.value}`}>
                    {option.label}
                  </label>
                </div>
              ))
            ) : (
              question.options.map(option => (
                <div key={option.value} className="option-item">
                  <input
                    type="checkbox"
                    id={`${question.id}-${option.value}`}
                    name={question.id}
                    value={option.value}
                    checked={(answers[question.id] || []).includes(option.value)}
                    onChange={() => handleMultipleChoice(question.id, option.value)}
                  />
                  <label htmlFor={`${question.id}-${option.value}`}>
                    {option.label}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyStep;