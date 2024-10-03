1. Lecture (특강): 특강에 대한 기본 정보를 저장하는 테이블로, 특강 제목과 코치를 저장합니다. 다른 엔티티들이 이 테이블과 관계를 맺어 강의의 스케줄과 상태를 관리할 수 있도록 합니다.

2. LectureSchedule (특강 스케줄):
   특강이 열리는 날짜와 정원을 관리하는 테이블입니다. 특강이란 특별히 진행하는 강의를 뜻합니다. 특강은 여러 번 열릴 수도 있고, 각 특강 별로 정원 수도 바뀔 수 있기 때문에 Lecture와 1 관계를 맺어 각 강의의 스케줄을 효율적으로 관리합니다.

3. LectureStatus (강의 상태): 강의의 현재 상태, 즉 남은 좌석 수를 관리하는 테이블입니다. 강의와 스케줄 각각과 N:1 관계를 맺어 특정 날짜에 열리는 강의의 남은 좌석을 추적합니다.

4. Reservation (예약): 사용자가 특정 강의에 대한 예약 정보를 저장하는 테이블입니다. 사용자가 하나의 강의에 대해서만 예약할 수 있도록 제약을 두고, 사용자의 예약 내역을 추적할 수 있습니다.
