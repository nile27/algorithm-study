/**
 * feat(CPT) : 조합
 * 총 사람의 수인 n을 받아 가위바위보의 총 경우의 수를 구하시오 
 * 단 n이 없는 경우 3으로 초기화 시킨다.
 */

function rockPaperScissors (n = 3) {

  let arr = ["rock", "paper", "scissors"]
  
  let result = [];

  function dfs(count, arr, stack) {
    if (count === 0) {
      result.push(stack)
      return
    }

    for (let i = 0; i < arr.length; i++) {
      let pick = arr[i]
      dfs(count - 1, arr, stack.concat(pick))
    }
  }

  dfs(n, arr, [])
  return result
};
