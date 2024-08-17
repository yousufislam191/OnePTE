import Answer from './answer.model';
import Question from './question.model';
import RMMCQ from './rmmcq.model';
import RO from './ro.model';
import SST from './sst.model';
import User from './user.model';

// Define associations
User.hasMany(Answer, { foreignKey: 'user_id', as: 'answers' });
Answer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Question.hasMany(Answer, { foreignKey: 'question_id', as: 'answers' });
Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

Question.belongsTo(SST, { foreignKey: 'sst_id', as: 'sst' });
SST.hasMany(Question, { foreignKey: 'sst_id', as: 'questions' });

Question.belongsTo(RO, { foreignKey: 'ro_id', as: 'ro' });
RO.hasMany(Question, { foreignKey: 'ro_id', as: 'questions' });

Question.belongsTo(RMMCQ, { foreignKey: 'rmmcq_id', as: 'rmmcq' });
RMMCQ.hasMany(Question, { foreignKey: 'rmmcq_id', as: 'questions' });
