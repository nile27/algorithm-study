
/**
 *  feat(CPT) : 멱집합
 *  매개변수인 sideDishes를 받아 중복되지 않는 모든 부분 집합을 구하시오.
 *  단, 출력은 글자의 순서대로 출력한다.
 */

function missHouseMeal(sideDishes) {
  let ans = [[]]
  sideDishes = sideDishes.sort()
  function dfs (arr,depth ,res){
    let result = [...res]
       
    if(depth >= arr.length){
      return
    }

    for(let i = depth ; i < arr.length ;i++){
      if(!result.includes(arr[i]) ){
        result.push(arr[i])
        ans.push(result)
        dfs(arr , i+1 ,result)
        
        result = [...res]
      }
      
    }
  }

  dfs(sideDishes,0, [])
  return ans
}
