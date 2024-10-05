
## 1.프로젝트 소개 😊

`hhplus-lecture-reservation` 은 매주 토요일 특강을 청강하고자 하는 학생들이, 치열하게 한정된 인원의 수업을 신청하는 서비스입니다. 해당 프로젝트는 다음과 같은 특징을 가집니다. 

- 각 특강의 한정 인원은 30명입니다.
- 30명이 초과한 특강은 신청할 수 없습니다.
- 한 명의 사용자는 하나의 특강만을 신청할 수 있습니다.


## 2. 개발 스택 
- FrameWork: `Nest.js`
- DataBase: `SqlLight` -> `MySql`


## 3. API 엔드포인트
- [GET] /lecture/:id
- [POST] /reservation
- [GET] /reservation/:id

## 4. 아키텍쳐 설계 
좋은 아키텍처는 확장 가능하고 유지보수가 용이하며, 각 레이어가 명확하게 분리되어 있는 구조라고 생각합니다. 따라서 이번 설계에서는 단일 책임 원칙을 준수하여 각 레이어가 고유한 역할을 하도록 분리하고, 추상화를 통해 의존성을 줄이면서도 불필요한 복잡성을 피하는 방식으로 아키텍처를 구성하게 되었습니다.

설계를 진행하면서 중요하게 참고한 내용은 다음과 같습니다:
- **읽기 쉽고 단순한 코드** - 코드는 누구나 쉽게 읽을 수 있어야 하며, 너무 많은 책임을 가지고 있지 않을 것
- **의존성** 격리 - 모듈 간 미치는 영향을 최소화하기 위해 의존성 격리를 고려할 것
- **추상화** - 명세와 구현을 적절히 분리할 것
- **중복성** 최소화 - 중복된 코드는 최대한 지양할 것

실제로 이번에 추상화를 통해서 데이터 베이스 변경 시, 설정만 바꿔주면 되는 경험을 하게되었습니다!!

```
├── src/
│   ├── common/
│   │   ├── pipe
│   │   └── ── parse.date.pipe.ts
│   │   
│   ├── lecture/
│   │   ├── lecture.controller.ts
│   │   ├── lecture.service.ts
│   │   ├── lecture.repository.ts
│   │   ├── lecture.repository.imple.ts
│   │   └── lecture.module.ts
│   │
│   ├── reservation/
│   │   ├── reservation.controller.ts
│   │   ├── reservation.service.ts
│   │   ├── reservation.repository.ts
│   │   ├── reservation.repository.imple.ts
│   │   └── reservation.module.ts
│   │
│   ├── lecture-facade/
│   │   ├── lecture-facade.controller.ts
│   │   ├── lecture-facade.service.ts
│   │   └── lecture-facade.module.ts
└───    

```


## 4. 특강 신청 서비스 ERD

특강 신청 서비스에는 특강을 신청하는 로직을 수행할 때, 데이터베이스가 최소한의 락을 가져 DB의 부하를 최소화 할 수 있도록 하였고, 비관적 락을 설정하였습니다. 

낙관적 락을 선택하지 않은 이유는 확장 가능한 구조를 생각해보면 다수의 인스턴스를 낙관적락보다 비관적 락으로 설정했을 때 안정성을 얻을 수 있다고 생각했지 때문입니다. 

![이미지 설명](https://private-user-images.githubusercontent.com/85014628/373015113-85e27ca0-0f31-4a09-a0d2-4cbb630e1073.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjgwMDYwNTYsIm5iZiI6MTcyODAwNTc1NiwicGF0aCI6Ii84NTAxNDYyOC8zNzMwMTUxMTMtODVlMjdjYTAtMGYzMS00YTA5LWEwZDItNGNiYjYzMGUxMDczLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDA0VDAxMzU1NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUzMzE3YmEwMWFhYjc5ZWYzYTNjMGJlOTE4YjJiN2NhYzRlODk0OGU3YjNmNzcwMThkMTE5NzM1OTI1OTk3MzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.cHVSQ5viO0Tq-AxYjeOA3dtsYPlAebUzuDUpro2Qz7s)



1. Lecture (특강): 특강에 대한 기본 정보를 저장하는 테이블로, 특강 제목과 코치를 저장합니다. 다른 엔티티들이 이 테이블과 관계를 맺어 강의의 스케줄과 상태를 관리할 수 있도록 합니다.

2. LectureSchedule (특강 스케줄):
   특강이 열리는 날짜와 정원을 관리하는 테이블입니다. 특강이란 특별히 진행하는 강의를 뜻합니다. 특강은 여러 번 열릴 수도 있고, 각 특강 별로 정원 수도 바뀔 수 있기 때문에 Lecture와 1: N 관계를 맺어 각 강의의 스케줄을 효율적으로 관리합니다.

3. LectureStatus (강의 상태): 강의의 현재 상태, 즉 남은 좌석 수를 관리하는 테이블입니다. 강의와 스케줄 각각과 1:1 관계를 맺어 특정 날짜에 열리는 강의의 남은 좌석을 추적합니다. 또한 해당 ERD를 기준으로 기능을 구현하게 되면, 각 한정 인원도 30명이 아닌 각 수업별로 지정할 수 있습니다. 

4. Reservation (예약): 사용자가 특정 강의에 대한 예약 정보를 저장하는 테이블입니다. 사용자가 하나의 강의에 대해서만 예약할 수 있도록 제약을 두고, 사용자의 예약 내역을 추적할 수 있습니다.
