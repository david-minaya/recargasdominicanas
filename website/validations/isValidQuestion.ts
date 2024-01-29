import { IQuestion } from '../types';
import { regexps } from '../constants';

const { empty, contact } = regexps;

export function isValidQuestion(question: IQuestion) {
  return empty.test(question.name)
    && contact.test(question.contact)
    && empty.test(question.question);
}
