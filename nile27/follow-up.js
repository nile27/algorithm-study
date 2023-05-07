/**
 *
 * @param {*} n 참가인원
 * @param {*} words 끝말잇기 리스트
 * @returns [번호, 차례]
 *
 * feat(PGS) : 영어 끝말잇기
 * 끝말 잇기 게임에서 몇 번의 참가자가 몇 차례에서 졌는지 출력하시오.
 * 단. 끝말잇기가 정상적으로 이루어져있을땐 [0,0]을 출력하시오.
 */

function solution(n, words) {
  var answer = [0, 0];
  let set = new Set();
  let trigger = "";
  let i = 0;

  function ansfunc(size) {
    if (size % n === 0) {
      answer[0] = n;
      answer[1] = Math.ceil(size / n);
    } else {
      answer[0] = size % n;
      answer[1] = Math.ceil(size / n);
    }
  }

  while (i < words.length) {
    if (set.has(words[i])) {
      ansfunc(set.size + 1);
      return answer;
    } else if (i !== 0 && trigger !== words[i][0]) {
      ansfunc(set.size + 1);
      console.log(words[i]);
      return answer;
    }
    set.add(words[i]);
    trigger = words[i][words[i].length - 1];
    i++;
  }

  return answer;
}
