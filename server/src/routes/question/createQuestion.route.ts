import { Question } from '../../entities/question.entity';
import { compileEmail } from '../../utils/compileEmail';
import { post, route } from '../../utils/routeBuilder';

post('/')
export const createQuestion = route(async (req, res) => {
  
  const { question } = req.body;
  await Question.insert(question);

  await res.transporter.sendMail({
    from: '"Recargas Dominicanas" <noreply@recargasdominicanas.do>',
    to: process.env.EMAIL_RECIPIENTS,
    subject: `${question.name} (Pregunta)`,
    html: await compileEmail('question.hbs', question),
  });
});
