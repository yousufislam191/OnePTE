import User from './user.model';
import Answer from './answer.model';
import Question from './question.model';
import RMMCQ from './rmmcq.model';
import RO from './ro.model';
import SST from './sst.model';

const defineAssociations = () => {
	// User → Answer    --- One-to-Many relationship ---
	User.hasMany(Answer, { foreignKey: 'user_id', as: 'answers' });
	Answer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

	//  Question → Answer    --- Many-to-One relationship ---
	Question.hasMany(Answer, { foreignKey: 'question_id', as: 'answers' });
	Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

	// Question → SST, RO, RMMCQ    --- One-to-One relationship ---
	Question.belongsTo(SST, { foreignKey: 'sst_id', as: 'sst' });
	Question.belongsTo(RO, { foreignKey: 'ro_id', as: 'ro' });
	Question.belongsTo(RMMCQ, { foreignKey: 'rmmcq_id', as: 'rmmcq' });
};

export default defineAssociations;
