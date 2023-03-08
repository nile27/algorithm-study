[프로그래머스 깊이/너비 우선 탐색(DFS/BFS) 문제 모음](https://school.programmers.co.kr/learn/courses/30/parts/12421)

코플릿에서 DFS/BFS 문제가 나왔길래, 많이 풀어서 익숙해져보자!
하는 마음으로 시도했는데,
그나마 제일 쉬워보였던 한 문제 가지고 이틀을 낑낑대다가 나가떨어졌다.... 😂

나중에.....나머지 문제도 차근차근 다시 도전해보자...😭

> BFS 알고리즘
>
> - 시작 노드를 방문 표시 후, 큐에 넣음
> - 큐에 아무 노드가 없을 때 까지
>   - 큐 가장 앞 노드를 꺼낸다.
>   - 꺼낸 노드에 인접한 노드들을 모두 보면서:
>     - 처음 방문한 노드면:
>       - 방문한 노드 표시를 해준다.
>       - 큐에 넣어준다.

## 문제

[게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844)\
![](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/9d909e5a-ca95-4088-9df9-d84cb804b2b0/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B52_hnjd3b.png)\
게임 맵의 상태 maps가 매개변수로 주어질 때, 캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 최솟값을 return 하도록 solution 함수를 완성해주세요. \
단, 상대 팀 진영에 도착할 수 없을 때는 -1을 return 해주세요.

## 제한 사항

- maps는 n x m 크기의 게임 맵의 상태가 들어있는 2차원 배열로, n과 m은 각각 1 이상 100 이하의 자연수입니다.
- n과 m은 서로 같을 수도, 다를 수도 있지만, n과 m이 모두 1인 경우는 입력으로 주어지지 않습니다.
- maps는 0과 1로만 이루어져 있으며, 0은 벽이 있는 자리, 1은 벽이 없는 자리를 나타냅니다.
- 처음에 캐릭터는 게임 맵의 좌측 상단인 (1, 1) 위치에 있으며, 상대방 진영은 게임 맵의 우측 하단인 (n, m) 위치에 있습니다.

## 입출력 예제

```javascript
let output = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
];
console.log(output); // 11

output = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1],
];
console.log(output); // -1
```

## 나의 풀이

![](https://velog.velcdn.com/images/iberis/post/a072b04a-d082-4eab-8e96-b673f2b2c2bd/image.jpg)

어떻게 풀어야할 지 감이 안와서 입출력 예제에 맞춰서 풀었더니 무참히 실패 😭 ..ㅎㅎㅋㅋㅋㅎㅎㅋ(풀다가 현타와서 약간 정신줄을 놨던 것 같다🤯)

1. 오른쪽으로 1칸 이동
   1-1. 오른쪽이 뚫렸으면(1이면) route + 1 하고 재귀 호출
2. 막혔으면(0이면) 다시 제자리로 돌아오고, 아래로 1칸 이동
   2-1. 아래쪽이 뚫렸으면(1이면) route + 1 하고 재귀 호출
3. 막혔으면(0이면) 다시 다 제자리로 돌아오고, 위로 한칸 이동
   3-1. 위쪽이 뚫렸으면(1이면) route + 1 하고 재귀 호출
4. 오른쪽 / 아래 / 위쪽 모두 막혔으면 -1 리턴
5. 위치가 목적지에 도달했으면 route 리턴

```javascript
// 가로 width, 세로 heigh
// let width = maps[0].length - 1;
// let heigh = maps.length -1;
function solution(maps) {
  let route = 1;
  let h = 0,
    w = 0;
  let location = maps[h][w];

  // 오른 쪽 maps[x][y+1] 왼쪽 maps[x][y-1], 아래쪽maps[x+1][y], 위쪽[x-1][y]
  let func = (maps, h, w) => {
    if (h === maps.length - 1 && w === maps[0].length - 1) {
      route++;
      return route;
    }

    location = maps[h][w];
    if (location) {
      ++w;
      location = maps[h][w];
      if (!location) {
        --w;
        ++h;
        location = maps[h][w];
        if (location) {
          ++route;
          return func(maps, h, w);
        } else {
          h -= 2;
          w += 1;
          location = maps[h][w];
          if (location) {
            ++route;
            return func(maps, h, w);
          } else {
            route = -1;
            return route;
          }
        }
      }
      ++route;
      return func(maps, h, w);
    }
  };

  func(maps, h, w);

  return route;
}
```

### 실패 원인

4방위 다 갈 수 있도록 코드를 짜지 않음\
방문한 곳과 방문하지 않은 곳을 구분하지 않음\
기본적인 자료구조인 큐에 대해서 먼저 더 자세히 공부하고 관련문제도 풀어보고 다시 도전해봐야겠다🔥

## 풀이

```javascript
function solution(maps) {
  let answer = 0;
  let dx = [0, 1, 0, -1];
  let dy = [1, 0, -1, 0];
  const n = maps.length;
  const m = maps[0].length;
  let queue = [[0, 0, 1]];

  while (queue.length) {
    const [x, y, count] = queue.shift();
    if (x == maps.length - 1 && y == maps[0].length - 1) {
      return count;
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (0 <= nx && nx < n && 0 <= ny && ny < m && maps[nx][ny] === 1) {
        maps[nx][ny] = 0;
        queue.push([nx, ny, count + 1]);
      }
    }
  }

  return -1;
}
```
