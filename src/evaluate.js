// An explainable practice rubric, not a trained model or hiring assessment.
export function evaluate(question, answer) {
  const normalize = text => text.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const normalized = normalize(answer);
  const contains = phrase => (' '+normalized+' ').includes(' '+normalize(phrase)+' ');
  const matched = question.concepts.filter(group=>group.some(contains));
  const missing = question.concepts.filter(group=>!group.some(contains));
  const coverage = Math.round(matched.length / question.concepts.length * 100);
  const words = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  return {
    score:coverage, words,
    matched:matched.map(g=>g[0]), missing:missing.map(g=>g[0]),
    summary:!words?'Skipped — no answer submitted.':coverage>=75?'Good concept coverage. Check the reference answer for accuracy.':coverage>=40?'Some expected concepts are present. Add the missing ideas with an example.':'Limited concept coverage. Revisit the core idea and try again.',
    advice:words<25?'Develop your answer into a few clear sentences with an example.':words>180?'Make the answer more concise; focus on the main idea and one example.':'Keep this length and organize the explanation clearly.',
    model:question.model,
    disclaimer:'Keyword coverage only. It can miss valid paraphrases and reward incorrect mentions; it does not judge factual correctness or employability.'
  };
}
