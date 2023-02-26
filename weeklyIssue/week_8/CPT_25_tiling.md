## 문제

세로 길이 2, 가로 길이 n인 2 x n 보드가 있습니다. 2 x 1 크기의 타일을 가지고 이 보드를 채우는 모든 경우의 수를 리턴해야 합니다.
(n은 1 이상 자연수)

>### [프로그래머스 2 x n 타일링](https://school.programmers.co.kr/learn/courses/30/lessons/12900)
>프로그래머스에 동일한 문제가 있는데, \
return 밑에 **console.log(solution(60000));** 을 적으면 통과되고, 안적으면 런타임 에러로 통과가 안된다. (맞은 거 맞겠지..?🤔)

## 프로그래머스 문제에서 제한사항

- 가로의 길이 n은 60,000이하의 자연수 입니다.
- 경우의 수가 많아 질 수 있으므로, 경우의 수를 1,000,000,007으로 나눈 나머지를 return해주세요.

## 입출력 예시

```javascript
let output = tiling(2);
console.log(output); // --> 2

output = tiling(4);
console.log(output); // --> 5
```

처음에 이 문제가 왜 재귀함수인지도 이해가 안돼서 그림으로 그렸다. 😂 \
재귀함수 문제라는 것만 이해하면, 그 뒤 풀이는 그렇게 어렵진 않은 편...

![](https://velog.velcdn.com/images/iberis/post/96f49c44-e06f-4fe3-857c-d51f129f445a/image.jpg)

```javascript
// memoization:
let tiling = function (n) {
  let memo = [0, 1, 2];

  const func = (size) => {
    if (memo[size]) return memo[size];

    memo[size] = func(size - 2) + func(size - 1);
    return memo[size];
  };
  return func(n);
};
```

### ❓ 궁금한 점

프로그래머스 문제에서 왜 **`return return memo[n] % 1000000007;`** 이 아닌, \
**`memo[size] = (memo[size - 2] + memo[size - 1]) % 1000000007;`** 로 풀어야 하는지 좀 이해가 안된다.

memo[size] = **(memo[size - 2] % 1000000007)** + **(memo[size - 1] % 1000000007;)** \
구하려는 경우의 수가 이전 경우의 수를 1000000007로 나눈 `나머지들의 합`인게 맞는 건가..?

```javascript
// tabulation: O(N) 데이터를 테이블에 정리하면서 bottom-up 방식으로 해결하는 기법

let tiling = function (n) {
  let memo = [0, 1, 2];

  for (let size = 3; size <= n; size++) {
    memo[size] = (memo[size - 2] + memo[size - 1]) % 1000000007;
  }

  return memo[n];
};
```

```javascript
//  dynamic with slicing window: O(N)
// 필요한 최소한의 데이터만을 활용하는 것을 말합니다.
// 크기 n의 문제에 대한 해결을 위해 필요한 데이터는 오직 2개뿐이라는 사실을 이용합니다.
let tiling = function (n) {
  if (n <= 2) return n;
  let first = 1,
    sec = 2;

  for (let size = 3; size <= n; size++) {
    let next = first + sec;
    first = sec;
    sec = next % 1000000007;
  }

  return sec;
};
```

---

## 슬라이딩 윈도우 알고리즘(Sliding Window)

> **고정 사이즈**의 윈도우가 이동하면서 윈도우 내에 있는 데이터를 이용해 문제를 풀이하는 알고리즘을 말한다. \
> 교집합의 정보를 공유하고, 차이가 나는 양쪽 끝 원소만 갱신한다. \
> 배열이나 리스트의 요소의 일정 범위의 값을 비교할 때 사용하면 유용하다.

## 투포인터 알고리즘(two pointers)

> 1차원 배열에서 어떤 특정 조건을 만족하는 **연속 구간** 구할 때, \
>  각자 다른 원소를 가리키는 **2개의 포인터**로 **구간의 길이를 가변적**으로 조작하며 조건을 충족하는 구간을 찾는 알고리즘이다.

**투포인터 알고리즘 문제의 유형**

- 포인터 2개가 같은 방향으로 진행하는것
- 포인터 2개가 양끝에서 시작하여 반대로 진행하는 것
- 포인터 하나는 한쪽 방향으로만 진행하고, 다른 포인터는 양쪽으로 이동하는 것

![](https://velog.velcdn.com/images/iberis/post/6fc5e78d-ca22-4f96-ac48-1328ef03981f/image.jpg)

**투 포인트 알고리즘**은 구간의 넓이가 조건에 따라 유동적으로 변하며, \
**슬라이딩 (윈도우) 알고리즘**은 항상 구간의 넓이가 고정되어 있다는 차이점이 있다

---

## 투 포인터 알고리즘 문제 (라고 해서 풀었는데 맞는 지 모르겠다😓)

[[2020 카카오 인턴십] 보석 쇼핑](https://school.programmers.co.kr/learn/courses/30/lessons/67258)

- 두 포인터 `모두 오른쪽`으로 이동하는 유형

진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 \
가장 짧은 구간의 시작 진열대 번호와 끝 진열대 번호를 차례대로 배열에 담아서 return 해야한다. \
만약 가장 짧은 구간이 여러 개라면 시작 진열대 번호가 가장 작은 구간을 return 합니다.

## 제한사항

- gems 배열의 크기는 1 이상 100,000 이하입니다.
- gems 배열의 각 원소는 진열대에 나열된 보석을 나타냅니다.
- gems 배열에는 1번 진열대부터 진열대 번호 순서대로 보석이름이 차례대로 저장되어 있습니다.
- gems 배열의 각 원소는 길이가 1 이상 10 이하인 알파벳 대문자로만 구성된 문자열입니다.

## 입출력 예

```javascript
let answer = solution([ "DIA", "RUBY", "RUBY", "DIA", "DIA" "EMERALD", "SAPPHIRE", "DIA" ]);
console.log(answer); // [3, 7]

answer = solution(["AA", "AB", "AC", "AA", "AC"]);
console.log(answer); // [1, 3]

answer = solution(["XYZ", "XYZ", "XYZ"]);
console.log(answer); // [1, 1]

answer = solution(["ZZZ", "YYY", "NNNN", "ZZZ", "BBB"]);
console.log(answer); // [1, 5]
```

### 풀이를 위해 알아야하는 Map의 메소드
Map 은 등록된 순서를 기억해서 순서대로 순회하는 이터러블 객체이다.

```javascript
let newMap = new Map([["AA", 0], ["AB", 1]]);

console.log(newMap); // Map(2) { 'AA' => 0, 'AB' => 1 }
console.log(newMap.values()); // [Map Iterator] { 0, 1 }

// 이터레이터 객체에는 순회 결과 객체를 반환하는 next( ) 메서드가 있습니다.
// 순회 결과 객체에는 다음 순회 값이 있으면 그 값을 보유하는 value 프로퍼티가 있습니다. {value: 이터레이터 값, done: false }
console.log(newMap.values().next()); // { value: 0, done: false }
console.log(newMap.values().next().value); // 0;


let valuesIterator = newMap.values();
let 첫번째_호출 = valuesIterator.next();
let 두번째_호출 = valuesIterator.next();
console.log(두번째_호출); // { value: 1, done: false }
let 세번째_호출 = valuesIterator.next();
console.log(세번째_호출); // { value: undefined, done: true }
```

## 풀이

1. 모든 보석 종류(중복 없이)의 개수를 구한다.
2. 보석 {key = 보석 이름, value = 보석의 인덱스} 를 Map으로 저장한다.
3. 동일한 보석이 있는 경우 삭제하고 다시 등록하여 보석 Map의 보석 순서를 문제의 배열의 인덱스 순서와 동일하게 유지 
4. 처음 구한 중복 없는 보석 종류의 size와 보석 Map 요소의 size가 같다면, \
Map의 value인 [시작 인덱스 번호 + 1, 끝 인덱스 번호 + 1]를 
새로운 배열 gemLengths의 배열의 요소로 넣는다. 
5. 이렇게 모인 gemLengths 요소들을 길이가 짧은 순서대로, 길이가 같은 건 시작 진열대 번호가 작은 순서대로 정렬
6. 정렬된 gemLengths 배열의 첫 번째 요소 리턴 (길이가 가장 짧고, 시작 번호가 가장 작은 구간)
![](https://velog.velcdn.com/images/iberis/post/7b39476b-25e8-4469-994d-872d14267453/image.JPG)
```javascript
function solution(gems) {
  let gemsSize = new Set(gems).size;
  const gemsMap = new Map();
  const gemLengths = [];

  gems.forEach((el, i) => {
    gemsMap.delete(el);
    gemsMap.set(el, i);
    if (gemsMap.size === gemsSize) {
      gemLengths.push([gemsMap.values().next().value + 1, i + 1]);
    }
  });

  gemLengths.sort((a, b) => {
    // 배열의 길이 같다면 시작하는 인덱스가 작은 게 앞에 오도록
    if ((a[1] - a[0]) === (b[1] - b[0])) {
      return a[0] - b[0];
    }
    // 길이가 짧은 배열이 앞에 오도록
    return (a[1] - a[0]) - (b[1] - b[0]);
  });

  return gemLengths[0];
}
```

---

참고: https://ji-musclecode.tistory.com/37 \
https://velog.io/@zwon/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%94%A9-%EC%9C%88%EB%8F%84%EC%9A%B0Sliding-Window \
https://ansohxxn.github.io/algorithm/twopointer/#-%EC%BD%94%EB%93%9C2-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%9D%B8%ED%84%B4%EC%89%BD-2020--%EB%B3%B4%EC%84%9D-%EC%87%BC%ED%95%91
