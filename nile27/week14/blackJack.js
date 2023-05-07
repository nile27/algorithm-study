/**
 * feat(CPT) : 조합_블랙잭은 지켜워
 * 
 * 주어진 카드 배열 cards를 받아 3장의 카드의 합이 소수인 경우를 구하시오.
 */


const isPrime = (num) => {
  if(num === 1) return 1
  let sqrt = Math.ceil(Math.sqrt(num))

  for(let i = 2 ; i <= sqrt ; i++){
    if(num % i === 0 ) return false
  }
  return true
}

function boringBlackjack(cards) {

  let ans = 0

  function dfs (arr,depth, res){
    let result = [...res]

    if(result.length === 3){
      let sum = res.reduce((acc,cur) => acc + cur)
      if(isPrime(sum)) ans++
      return
    }

    for(let i = depth ; i < arr.length ;i++){
      if(!result.includes(arr[i]) ){
        result.push(arr[i])
        dfs(arr, i+1 ,result)
        result = [...res]
      }
      
    }
  }

  dfs(cards,0, [])
  return ans
  
}
