/**
 * feat(CPT):DP_금고를 털어라
 */

function ocean(target, type) {
  let dp = Array.from( {length: target+1} ,(v) => 0);
  dp[0] = 1

  for (let i = 0 ; i < type.length ; i++){
    dp[type[i]] += 1
    for(let j = type[i] + 1 ; j <= target ; j++){
      dp[j] += dp[j - type[i]]
    }
  }
  return dp[target]
}