/**
 * feat(CPT) : 순열_새로운 치킨 소스 레시피
 * 
 * 주어진 매개변수인 재료의 배열(stuffArr) 가지의 수(choiceNum)받아 조합한 모든 경우의 수를 구하시오.
 * 단 , 배열의 요소중 0이 3개 이상인 경우 제외
 */


function select (arr){
  let str = ''
  let i = 0 ;
  let count = 0
  while(i < arr.length){
    str = arr[0].toString(10)
    for(let j = 0 ; j < str.length ; j++){
      if(str[j] === '0') count ++  
    }
    if (count >= 3) arr.shift()
    i++
    count = 0
    arr.push(arr.shift())
  }
  return arr
}


function newChickenRecipe(stuffArr, choiceNum) {
  
  stuffArr = select(stuffArr)
  let ans = []
  if(choiceNum > stuffArr.length) return[]

  function dfs (arr,num, depth, res){
    let result = [...res]
    if(result.length === num){
      ans.push(res)
      return
    }

    for(let i = depth ; i < arr.length ;i++){
      if(!result.includes(arr[i]) ){
        result.push(arr[i])
        dfs(arr, num , depth, result)
        result = [...res]
      }
      
    }
  }

  dfs(stuffArr, choiceNum, 0, [])
  return ans
}
